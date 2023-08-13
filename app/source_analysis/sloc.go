package source_analysis

import (
	"bufio"
	"os"
	"strings"
)

func GetSLOC(filePath string) int {
	file, err := os.Open(filePath)

	if err != nil {
		panic("Error opening file:" + filePath)
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	sloc := 0

	inMultiLineComment := false

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		// Skip empty lines
		if line == "" {
			continue
		}

		// Skip single-line comments
		if strings.HasPrefix(line, "//") {
			continue
		}

		// Handle multi-line comments
		if strings.HasPrefix(line, "/*") && !inMultiLineComment {
			inMultiLineComment = true
			continue
		}
		if strings.HasSuffix(line, "*/") && inMultiLineComment {
			inMultiLineComment = false
			continue
		}
		if inMultiLineComment {
			continue
		}

		// Count code lines
		sloc++
	}

	if err := scanner.Err(); err != nil {
		panic("Error reading file:")
	}

	return sloc
}
