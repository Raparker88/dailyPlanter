import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { SeedPlan } from "./components/SeedPlan"

ReactDOM.render(
    <Router>
        <SeedPlan/>
    </Router>
    , document.getElementById("root"))
