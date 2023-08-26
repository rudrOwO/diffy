package app

import (
	"context"
	"fmt"
	"os"

	source_analysis "github.com/rudrOwO/php-code-analyzer/app/source_analysis"
	runtime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) SetContext(ctx context.Context) {
	a.ctx = ctx
}

// registering methods with the application context (ctx)
func (a *App) GetSLOC(filePath string) int {
	return source_analysis.GetSLOC(filePath)
}

func (a *App) GetFileDiff(firstFilePath string, secondFilePath string) string {
	return source_analysis.GetFileDiff(firstFilePath, secondFilePath)
}

func (a *App) GetFolderDiff(firstFolderPath string, secondFolderPath string) string {
	return source_analysis.GetFolderDiff(firstFolderPath, secondFolderPath)
}

func (a *App) PromptForFilePath() string {
	var currentDirectoryPath string

	if runtime.Environment(a.ctx).BuildType == "dev" {
		currentDirectoryPath = "/home/rudro/Dev/test"
	} else {
		currentDirectoryPath, _ = os.Getwd()
	}

	filePath, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		DefaultDirectory: currentDirectoryPath,
		Title:            "Chose a PHP file",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "PHP Files (*.php)",
				Pattern:     "*.php",
			},
		},
	})

	if err != nil {
		fmt.Println("Error in Prompt", err)
	}

	return filePath
}
