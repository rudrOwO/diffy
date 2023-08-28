package app

import (
	"context"
	"fmt"
	"os"

	runtime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) SetContext(ctx context.Context) {
	a.ctx = ctx
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

func (a *App) PromptForFolderPath() string {
	var currentDirectoryPath string

	if runtime.Environment(a.ctx).BuildType == "dev" {
		currentDirectoryPath = "/home/rudro/Dev/test"
	} else {
		currentDirectoryPath, _ = os.Getwd()
	}

	folderPath, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		DefaultDirectory: currentDirectoryPath,
		Title:            "Chose a Project Folder",
	})

	if err != nil {
		fmt.Println("Error in Prompt", err)
	}

	return folderPath
}
