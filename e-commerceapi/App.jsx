import { BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import Success from "./Sucess"
import React from 'react'
import Pay from './Pay'

function App() {
  return (
    <Router>
        <Switch>
            <Route path= "/pay">
                <Pay/>
            </Route>
            <Route path = "/success">
                <Success/>
                </Route> 
        </Switch>
        
    </Router>
  )
}

export default App