package console

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/fatih/color"
	"github.com/ibrt/errors"
)

// Infof prints an info style log line.
func Infof(format string, a ...interface{}) {
	color.HiWhite(format, a...)
}

// Headerf prints a header style log line.
func Headerf(format string, a ...interface{}) {
	color.HiBlue(format, a...)
}

// Successf prints a success style log line.
func Successf(format string, a ...interface{}) {
	color.HiGreen(format, a...)
}

// Warningf prints a warning style log line.
func Warningf(format string, a ...interface{}) {
	color.HiYellow(format, a...)
}

// Errorf prints an error style log line.
func Errorf(format string, a ...interface{}) {
	color.HiRed(format, a...)
}

// Warning prints a warning style log line, with stack trace.
func Warning(err error) {
	color.HiYellow("warning: %s", err)
	for i, stackLine := range errors.FormatCallers(errors.GetCallersOrCurrent(err)) {
		fmt.Printf("  %v: %s\n", i, stackLine)
	}
}

// Error prints an error style log line, with stack trace.
func Error(err error) {
	color.HiRed("error: %s", err)
	for i, stackLine := range errors.FormatCallers(errors.GetCallersOrCurrent(err)) {
		fmt.Printf("  %v: %s\n", i, stackLine)
	}
}

// Recover calls Error on a recovered panic and exits.
func Recover() {
	if err := errors.MaybeWrapRecover(recover()); err != nil {
		Error(err)
		os.Exit(1)
	}
}

// MustConfirm prompts the user to confirm a dangerous operation, panics if confirmation is denied.
func MustConfirm(format string, a ...interface{}) {
	prompt := color.HiYellowString(format+" [y/n]: ", a...)
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Printf(prompt)
		resp, err := reader.ReadString('\n')
		errors.MaybeMustWrap(err)

		switch strings.ToLower(strings.TrimSpace(resp)) {
		case "y", "yes":
			return
		case "n", "no":
			errors.MustErrorf("user did not confirm")
		}
	}
}
