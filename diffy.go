package main

import (
	"context"

	app "github.com/rudrOwO/diffy/app"
	frontend "github.com/rudrOwO/diffy/frontend"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

func main() {
	// Create an instance of the app structure
	app := app.NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:       "diffy",
		StartHidden: true,
		Width:       1024,
		Height:      768,
		AssetServer: &assetserver.Options{
			Assets: frontend.Assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup: func(ctx context.Context) {
			app.SetContext(ctx)
		},
		Bind: []any{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
