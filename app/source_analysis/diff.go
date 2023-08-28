package source_analysis

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"slices"
	"strings"

	"github.com/hexops/gotextdiff"
	"github.com/hexops/gotextdiff/myers"
	"github.com/hexops/gotextdiff/span"
)

const (
	MAX_CONCURRENT_JOBS = 8
	MAX_FILES           = 1000
)

type FilePathPair struct {
	firstFilePath  string
	secondFilePath string
}

func (s *SourceAnalysis) GetFileDiff(firstFilePath string, secondFilePath string) string {
	return getFileDiff(firstFilePath, secondFilePath)
}

func (s *SourceAnalysis) GetFolderDiff(firstFolderPath string, secondFolderPath string) string {
	var diffBuilder strings.Builder
	var filePaths [2][]string
	jobs := make(chan FilePathPair, MAX_FILES)
	results := make(chan string, MAX_FILES)
	jobCount := 0

	// Getting file names from two folders concurrently
	{
		channel := make(chan []string, 2)
		go getPHPFileNames(firstFolderPath, channel)
		go getPHPFileNames(secondFolderPath, channel)
		filePaths[0] = <-channel
		filePaths[1] = <-channel
	}

	for i := 0; i < MAX_CONCURRENT_JOBS; i++ {
		go dispatchDiffJobs(jobs, results)
	}

	for _, firstPath := range filePaths[0] {
		secondPathIndex, found := slices.BinarySearch(filePaths[1], firstPath)
		var secondPath string

		if found {
			secondPath = filePaths[1][secondPathIndex]
		} else {
			secondPath = os.DevNull
		}

		jobs <- FilePathPair{firstPath, secondPath}
		jobCount += 1
	}

	// Handling files in second folder that are not in first folder (Converse of above loop)
	for _, secondPath := range filePaths[1] {
		_, found := slices.BinarySearch(filePaths[0], secondPath)

		if !found {
			jobs <- FilePathPair{os.DevNull, secondPath}
			jobCount += 1
		}
	}

	close(jobs)

	for i := 0; i < jobCount; i++ {
		diffBuilder.WriteString(<-results)
	}

	return diffBuilder.String()
}

func dispatchDiffJobs(jobs <-chan FilePathPair, results chan<- string) {
	for job := range jobs {
		results <- getFileDiff(job.firstFilePath, job.secondFilePath)
	}
}

func getPHPFileNames(rootDirectory string, channel chan []string) {
	fileNames := make([]string, 0, MAX_FILES)

	err := filepath.WalkDir(rootDirectory, func(path string, info fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && strings.HasSuffix(info.Name(), ".php") {
			fileNames = append(fileNames, path)
		}

		return nil
	})

	check(err)
	slices.Sort(fileNames)
	channel <- fileNames
}

func getFileDiff(firstFilePath string, secondFilePath string) string {
	var firstFileContent string
	var secondFileContent string

	{
		bytes, err := os.ReadFile(firstFilePath)
		check(err)
		firstFileContent = string(bytes)
	}

	{
		bytes, err := os.ReadFile(secondFilePath)
		check(err)
		secondFileContent = string(bytes)
	}

	edits := myers.ComputeEdits(span.URIFromPath(firstFilePath), firstFileContent, secondFileContent)
	diff := fmt.Sprint(gotextdiff.ToUnified(firstFilePath, secondFilePath, firstFileContent, edits))

	return diff
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
