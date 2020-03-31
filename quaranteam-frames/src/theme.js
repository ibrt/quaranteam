export default {
  breakpoints: [ '40em', '52em', '64em' ],
  space:       [ 0, 8, 16, 32, 64, 128, 256, 512, 1024 ],
  fonts:       {
    body:      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    heading:   'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes:   [ 12, 14, 16, 20, 24, 32, 48, 64, 96 ],
  fontWeights: {
    body:    400,
    heading: 700,
    bold:    700
  },
  lineHeights: {
    body:    1.5,
    heading: 1.125
  },
  colors:      {
    text:       '#000',
    background: '#fff',
    primary:    'rgb(188, 21, 118)',
    secondary:  'rgb(189, 85, 144)',
    muted:      '#f6f6f6'
  },
  radii:       [ 32 ],
  text:        {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading'
    }
  },
  buttons:     {
    primary: {
      backgroundColor: 'primary',
      borderRadius:    9999,
      color:           'background',
      cursor:          'pointer',
      padding:         2,
      '&:hover':       {
        backgroundColor: 'secondary'
      }
    }
  },
  forms:       {
    slider: {
      backgroundColor: 'muted',
      color:           'primary',
      '&:focus':       {
        color: 'secondary'
      }
    }
  }
}