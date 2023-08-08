package main

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetSLOC(filePath string) int {
	file, err := os.Open(filePath)

	if err != nil {
		panic("Error opening file:")
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

func (a *App) GetDiff(arg1 string, arg2 string) string {
	// Run the 'git diff' command with the provided file paths
	cmd := exec.Command("git", "diff", arg1, arg2)

	// Capture the command output
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error running 'git diff': %v\n", err)
		fmt.Println(string(output))
		os.Exit(1)
	}

	// Print the diff output
	fmt.Println(string(output))
	return string(output)
}
