package shell

import (
	"io"
	"strings"

	"github.com/codeskyblue/go-sh"
	"github.com/ibrt/errors"
)

// Command describes a command to be spawned in a shell.
type Command struct {
	cmd     string
	params  []interface{}
	showCmd bool
	env     map[string]string
	dir     string
	stdout  io.Writer
}

// NewCommand creates a new Command.
func NewCommand(cmd string, params ...interface{}) *Command {
	return &Command{
		cmd:     cmd,
		params:  params,
		showCmd: true,
		env:     make(map[string]string),
	}
}

// AddParams appends the given params to the command.
func (c *Command) AddParams(params ...interface{}) *Command {
	c.params = append(c.params, params...)
	return c
}

// AddParamsString appends the given params to the command.
func (c *Command) AddParamsString(params ...string) *Command {
	for _, param := range params {
		c.params = append(c.params, param)
	}
	return c
}

// HideCmd causes the command to not be echoed when run.
func (c *Command) HideCmd() *Command {
	c.showCmd = false
	return c
}

// SetDir sets the command working directory.
func (c *Command) SetDir(dir string) *Command {
	c.dir = dir
	return c
}

// SetStdout sets the command standard output.
func (c *Command) SetStdout(stdout io.Writer) *Command {
	c.stdout = stdout
	return c
}

// SetEnv sets an environment variable.
func (c *Command) SetEnv(key, value string) *Command {
	c.env[key] = value
	return c
}

// Succeeds returns true if running the command succeeds, false otherwise.
func (c *Command) Succeeds() bool {
	return c.Run() == nil
}

// Run runs the command.
func (c *Command) Run() error {
	return errors.MaybeWrap(c.toSH().Run(), errors.Skip(1))
}

// MustRun runs the tools, panics on error.
func (c *Command) MustRun() {
	errors.MaybeMustWrap(c.Run())
}

// Output runs the command and returns its combined output as string.
func (c *Command) Output() (string, error) {
	rawOutput, err := c.toSH().Output()
	if err != nil {
		return "", errors.Wrap(err, errors.Skip(1))
	}
	return strings.TrimSpace(string(rawOutput)), nil
}

// MustOutput is like output but panics on error.
func (c *Command) MustOutput() string {
	output, err := c.Output()
	errors.MaybeMustWrap(err)
	return output
}

func (c *Command) toSH() *sh.Session {
	shl := sh.NewSession()
	shl.ShowCMD = c.showCmd

	if c.dir != "" {
		shl.SetDir(c.dir)
	}

	if c.stdout != nil {
		shl.Stdout = c.stdout
	}

	for k, v := range c.env {
		shl.SetEnv(k, v)
	}

	return shl.Command(c.cmd, c.params...)
}
