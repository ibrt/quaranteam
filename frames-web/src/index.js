import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import theme from './theme'

ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'))

serviceWorker.unregister()
