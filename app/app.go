package app

import (
	"context"

	source_analysis "github.com/rudrOwO/diffy/app/source_analysis"
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

func (a *App) GetCommitDiff(firstCommit string, secondCommit string, projectPath string) string {
	return source_analysis.GetCommitDiff(firstCommit, secondCommit, projectPath)
}
