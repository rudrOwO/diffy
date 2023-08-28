package source_analysis

import (
	"os"
	"regexp"
)

var (
	ifPattern      = regexp.MustCompile(`\bif\b`)
	elseifPattern  = regexp.MustCompile(`\belseif\b`)
	switchPattern  = regexp.MustCompile(`\bswitch\b`)
	forPattern     = regexp.MustCompile(`\bfor\b`)
	foreachPattern = regexp.MustCompile(`\bforeach\b`)
	whilePattern   = regexp.MustCompile(`\bwhile\b`)
	doWhilePattern = regexp.MustCompile(`\bdo\b`)
)

func (s *SourceAnalysis) GetComplexity(filePath string) int {
	var code string

	{
		bytes, err := os.ReadFile(filePath)
		check(err)
		code = string(bytes)
	}

	complexity := 1

	complexity += len(ifPattern.FindAllStringIndex(code, -1))
	complexity += len(elseifPattern.FindAllStringIndex(code, -1))
	complexity += len(switchPattern.FindAllStringIndex(code, -1))
	complexity += len(forPattern.FindAllStringIndex(code, -1))
	complexity += len(foreachPattern.FindAllStringIndex(code, -1))
	complexity += len(whilePattern.FindAllStringIndex(code, -1))
	complexity += len(doWhilePattern.FindAllStringIndex(code, -1))

	return complexity
}
