package source_analysis

import (
	"os/exec"
)

func GetFileDiff(firstFilePath string, secondFilePath string) string {
	cmd := exec.Command("diff", "-u", firstFilePath, secondFilePath)
	output, _ := cmd.CombinedOutput()
	return string(output)
}

func GetFolderDiff(firstFolderPath string, secondFolderPath string) string {
	return ""
}
