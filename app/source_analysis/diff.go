package source_analysis

import (
	"fmt"
	"os"

	"github.com/hexops/gotextdiff"
	"github.com/hexops/gotextdiff/myers"
	"github.com/hexops/gotextdiff/span"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func GetFileDiff(firstFilePath string, secondFilePath string) string {
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

func GetFolderDiff(firstFolderPath string, secondFolderPath string) string {
	return ""
}
