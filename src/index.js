/* eslint react/jsx-filename-extension: 0 */
import React from 'react'
import ReactDOM from 'react-dom'
import { setGlobal } from 'reactn'

// styles
import './styles/index.css'

// service workers
import * as serviceWorker from './utils/serviceWorker'

// App
import App from './App'

// Reactn global state set up
setGlobal({
  user: null,
})

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()
