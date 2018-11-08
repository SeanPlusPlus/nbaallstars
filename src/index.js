/* eslint react/jsx-filename-extension: 0 */
import React from 'react'
import ReactDOM from 'react-dom'

// styles
import './styles/index.css'

// service workers
import * as serviceWorker from './utils/serviceWorker'

// App
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()
