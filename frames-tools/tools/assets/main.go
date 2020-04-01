package main

import (
	"encoding/csv"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"github.com/davecgh/go-spew/spew"
	"github.com/ibrt/errors"
	"github.com/ibrt/quaranteam/frames-tools/lib/console"
	"github.com/ibrt/quaranteam/frames-tools/lib/shell"
	"gopkg.in/alecthomas/kingpin.v2"
)

var (
	app            = kingpin.New("assets", "Tools for frame assets.")
	generateCmd    = app.Command("generate", "Generate frame assets from language definitions.")
	generateInput  = generateCmd.Arg("input", "Input file with language definitions (CSV).").Required().ExistingFile()
	generateOutput = generateCmd.Arg("output", "Output directory for generated assets.").Required().String()
)

func main() {
	defer console.Recover()
	app.HelpFlag.Short('h')

	switch kingpin.MustParse(app.Parse(os.Args[1:])) {
	case generateCmd.FullCommand():
		doGenerate(*generateInput, *generateOutput)
	}
}

func doGenerate(inputPath, outputPath string) {
	rows := loadCsv(inputPath)
	errors.MaybeMustWrap(os.MkdirAll(filepath.Join(outputPath), 0777))

	for i, row := range rows {
		console.Headerf("(%03v/%03v) %v: %v\n", i+1, len(rows), row.LanguageCode, row.LanguageName)
		genericAssetsPath := filepath.Join(outputPath, "assets-generic", "frames", row.LanguageCode)
		webAssetsPath := filepath.Join(outputPath, "assets-web", "frames", row.LanguageCode)

		errors.MaybeMustWrap(os.MkdirAll(genericAssetsPath, 0777))
		errors.MaybeMustWrap(os.MkdirAll(webAssetsPath, 0777))

		spew.Dump(row)

		generateSVG(svgTemplateFrameSimple, row.StayHome, row.SaveLives, filepath.Join(genericAssetsPath, "frame-simple.svg"))
		generateSVG(svgTemplateFrameSimple, fmt.Sprintf("%v  •  %v", row.StayHome, row.SaveLives), "#QUARANTEAM", filepath.Join(genericAssetsPath, "frame-quaranteam.svg"))
		generatePNG(filepath.Join(genericAssetsPath, "frame-simple.svg"), filepath.Join(webAssetsPath, "frame-simple.png"), 720)
		generatePNG(filepath.Join(genericAssetsPath, "frame-quaranteam.svg"), filepath.Join(webAssetsPath, "frame-quaranteam.png"), 720)
		generatePNG(filepath.Join(genericAssetsPath, "frame-simple.svg"), filepath.Join(webAssetsPath, "frame-simple.2x.png"), 1440)
		generatePNG(filepath.Join(genericAssetsPath, "frame-quaranteam.svg"), filepath.Join(webAssetsPath, "frame-quaranteam.2x.png"), 1440)
		generatePNG(filepath.Join(genericAssetsPath, "frame-simple.svg"), filepath.Join(genericAssetsPath, "frame-simple.png"), 2880)
		generatePNG(filepath.Join(genericAssetsPath, "frame-quaranteam.svg"), filepath.Join(genericAssetsPath, "frame-quaranteam.png"), 2880)
	}
}

type Row struct {
	LanguageCode                string
	LanguageName                string
	LanguageLabel               string
	StayHome                    string
	SaveLives                   string
	FacebookOverlayIDSimple     string
	FacebookOverlayIDQuaranteam string
}

func loadCsv(inputPath string) []*Row {
	fd, err := os.Open(inputPath)
	errors.MaybeMustWrap(err)
	defer errors.IgnoreClose(fd)

	records, err := csv.NewReader(fd).ReadAll()
	errors.MaybeMustWrap(err)

	rows := make([]*Row, len(records)-1)

	for i, record := range records[1:] {
		rows[i] = &Row{
			LanguageCode:                strings.TrimSpace(record[0]),
			LanguageName:                strings.TrimSpace(record[1]),
			LanguageLabel:               strings.TrimSpace(record[2]),
			StayHome:                    strings.TrimSpace(record[3]),
			SaveLives:                   strings.TrimSpace(record[4]),
			FacebookOverlayIDSimple:     strings.TrimSpace(record[5]),
			FacebookOverlayIDQuaranteam: strings.TrimSpace(record[6]),
		}
	}

	return rows
}

func generateSVG(svgTemplate, top, bottom, outputPath string) {
	console.Infof("Generating SVG at '%v'...\n", outputPath)
	svgTemplate = strings.ReplaceAll(svgTemplate, "%TOP%", top)
	svgTemplate = strings.ReplaceAll(svgTemplate, "%BOTTOM%", bottom)
	errors.MaybeMustWrap(ioutil.WriteFile(outputPath, []byte(svgTemplate), 0777))
}

func generatePNG(inputPath, outputPath string, size int) {
	console.Infof("Generating PNG at '%v'...\n", outputPath)
	errors.MaybeMustWrap(shell.NewCommand("svpng", "-h", fmt.Sprintf("%v", size), "-w", fmt.Sprintf("%v", size), "-y", inputPath, outputPath).Run())
}
