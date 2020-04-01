export default {
  breakpoints: [ '40em', '52em', '64em' ],
  space:       [ 0, 8, 16, 32, 64, 128, 256, 512, 1024 ],
  fonts:       {
    body:      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    monospace: 'Menlo, monospace'
  },
  fontSizes:   [ 12, 14, 16, 20, 24, 32, 48, 64, 96 ],
  fontWeights: {
    body:    400,
    heading: 600,
    bold:    600
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
    title: {
      fontFamily: 'body',
      fontSize: '2.2rem',
      lineHeight: 1.2992,
      fontWeight: 'bold',
      paddingBottom: 1
    },
    subtitle: {
      fontFamily: 'body',
      fontSize: '1.5rem',
      lineHeight: 1.2992,
      fontWeight: 'normal'
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
    label: {
      fontFamily: 'body',
      paddingBottom: 1,
    },
    slider: {
      backgroundColor: 'muted',
      color:           'primary',
      '&:focus':       {
        color: 'secondary'
      }
    }
  },
  links: {
    menu: {
      color: 'black',
      fontFamily: 'body',
      fontSize: '17.6px',
      fontWeight: 'bold',
      letterSpacing: 'normal',
      lineHeight: '31.68px',
      textDecoration: 'none',
      textTransform: 'uppercase'
    }
  }
}
