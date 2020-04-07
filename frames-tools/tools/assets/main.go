package main

import (
	"encoding/csv"
	"encoding/json"
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
	app                = kingpin.New("assets", "Tools for frame assets.")
	updateLanguagesCmd = app.Command("update-languages", "Update the languages spec in assets.")
	generateCmd        = app.Command("generate", "Generate frame assets from language definitions.")
	generateInput      = generateCmd.Arg("input", "Input file with language definitions (CSV).").Required().ExistingFile()
	generateOutput     = generateCmd.Arg("output", "Output directory for generated assets.").Required().String()
)

func main() {
	defer console.Recover()
	app.HelpFlag.Short('h')

	switch kingpin.MustParse(app.Parse(os.Args[1:])) {
	case updateLanguagesCmd.FullCommand():
		doUpdateLanguages()
	case generateCmd.FullCommand():
		doGenerate(*generateInput, *generateOutput)
	}
}

func doUpdateLanguages() {
	console.Headerf("Updating languages...")
	shell.NewCommand("curl", "-o", "tools/assets/assets/languages.csv", "https://docs.google.com/spreadsheets/d/1urAB1-77qg6nhO7LimEgdE_U_jtIGcTYuYCxXJVTFd0/export?format=csv&id=1urAB1-77qg6nhO7LimEgdE_U_jtIGcTYuYCxXJVTFd0&gid=155183454").MustRun()
}

func doGenerate(inputPath, outputPath string) {
	rows := loadCsv(inputPath)
	errors.MaybeMustWrap(os.MkdirAll(filepath.Join(outputPath), 0777))

	tempPath, err := ioutil.TempDir("", "quaranteam")
	errors.MaybeMustWrap(err)
	defer func() { errors.Ignore(os.RemoveAll(tempPath)) }()

	for i, row := range rows {
		console.Headerf("(%03v/%03v) %v: %v\n", i+1, len(rows), row.LanguageCode, row.LanguageName)
		tempPath := filepath.Join(tempPath, "frames", row.LanguageCode)
		outputPath := filepath.Join(outputPath, "public", "frames", row.LanguageCode)

		errors.MaybeMustWrap(os.MkdirAll(tempPath, 0777))
		errors.MaybeMustWrap(os.MkdirAll(outputPath, 0777))

		spew.Dump(row)

		generateSVG(svgTemplateFrameSimple, row.StayHome, row.SaveLives, filepath.Join(tempPath, "frame-simple.svg"))
		generateSVG(svgTemplateFrameSimple, fmt.Sprintf("%v  •  %v", row.StayHome, row.SaveLives), "#QUARANTEAM", filepath.Join(tempPath, "frame-quaranteam.svg"))
		generateSVG(svgTemplateFrameCrossed, row.StayHome, row.SaveLives, filepath.Join(tempPath, "frame-crossed.svg"))
		generatePNG(filepath.Join(tempPath, "frame-simple.svg"), filepath.Join(outputPath, "frame-simple.png"), 1440)
		generatePNG(filepath.Join(tempPath, "frame-quaranteam.svg"), filepath.Join(outputPath, "frame-quaranteam.png"), 1440)
		generatePNG(filepath.Join(tempPath, "frame-crossed.svg"), filepath.Join(outputPath, "frame-crossed.png"), 1440)
	}

	specPath := filepath.Join(outputPath, "src", "assets")
	errors.MaybeMustWrap(os.MkdirAll(specPath, 0777))
	generateSpec(rows, filepath.Join(specPath, "frames.json"))
}

type Row struct {
	LanguageCode                string
	LanguageName                string
	LanguageLabel               string
	StayHome                    string
	SaveLives                   string
	FacebookOverlayIDSimple     string
	FacebookOverlayIDQuaranteam string
	FacebookOverlayIDCrossed    string
	SkipGeneratingAssets        bool
	AutoCapitalize              bool
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
			FacebookOverlayIDCrossed:    strings.TrimSpace(record[7]),
			SkipGeneratingAssets:        strings.TrimSpace(record[8]) == "yes",
			AutoCapitalize:              strings.TrimSpace(record[9]) == "yes",
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

type Language struct {
	Code   string   `json:"code"`
	Label  string   `json:"label"`
	Frames []*Frame `json:"frames"`
}

type Frame struct {
	Type        string  `json:"type"`
	FBOverlayID *string `json:"fbId"`
}

func generateSpec(rows []*Row, outputPath string) {
	console.Infof("Generating spec at '%v'...\n", outputPath)
	spec := make(map[string]*Language)

	for _, row := range rows {
		if row.SkipGeneratingAssets {
			continue
		}

		if row.AutoCapitalize {
			row.LanguageLabel = strings.Title(row.LanguageLabel)
			row.StayHome = strings.ToTitle(row.StayHome)
			row.SaveLives = strings.ToTitle(row.SaveLives)
		}

		spec[row.LanguageCode] = &Language{
			Code:  row.LanguageCode,
			Label: row.LanguageLabel,
			Frames: []*Frame{
				{
					Type:        "simple",
					FBOverlayID: emptyToNil(row.FacebookOverlayIDSimple),
				},
				{
					Type:        "quaranteam",
					FBOverlayID: emptyToNil(row.FacebookOverlayIDQuaranteam),
				},
				{
					Type:        "crossed",
					FBOverlayID: emptyToNil(row.FacebookOverlayIDCrossed),
				},
			},
		}
	}

	buf, err := json.MarshalIndent(spec, "", "  ")
	errors.MaybeMustWrap(err)
	errors.MaybeMustWrap(ioutil.WriteFile(outputPath, buf, 0777))
}

func emptyToNil(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}
