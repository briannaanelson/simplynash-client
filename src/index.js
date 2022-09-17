import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from 'react-router-dom'
import { SimplyNash } from './SimplyNash'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
      <Router>
        <SimplyNash />
      </Router>
   </React.StrictMode>,
  document.getElementById("root")
)
