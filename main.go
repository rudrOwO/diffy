package main

import (
	app "github.com/rudrOwO/php-code-analyzer/app"
	source_analysis "github.com/rudrOwO/php-code-analyzer/app/source_analysis"
	frontend "github.com/rudrOwO/php-code-analyzer/frontend"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

func main() {
	app := new(app.App)
	source_analysis := new(source_analysis.SourceAnalysis)

	// Create application with options
	err := wails.Run(&options.App{
		Title:       "PHP Code Analyzer",
		StartHidden: false,
		Width:       1280,
		Height:      720,
		AssetServer: &assetserver.Options{
			Assets: frontend.Assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.SetContext,
		Bind: []any{
			app,
			source_analysis,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
