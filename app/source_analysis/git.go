package source_analysis

import (
	"fmt"
	"os"
	"os/exec"
)

func GetFileDiff(firstFilePath string, secondFilePath string) string {
	// Run the 'unix diff' command with the provided file paths
	cmd := exec.Command("diff", firstFilePath, secondFilePath)

	// Capture the command output
	output, _ := cmd.CombinedOutput()

	return string(output)
}

func GetCommitDiff(firstCommit string, secondCommit string, projectPath string) string {
	// Run the 'git diff' command with the provided file paths
	cmd := exec.Command("git", "diff", firstCommit, secondCommit, "--", projectPath)

	// Capture the command output
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error running 'git diff': %v\n", err)
		fmt.Println(string(output))
		os.Exit(1)
	}
	return string(output)
}
