import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TicketsBoard from "./components/TicketsBoard";
import Navbar from "./components/Navbar";

import {BrowserRouter as Router, Route} from "react-router-dom"

import {Provider} from "react-redux"
import store from "./store";

class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={TicketsBoard}/>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;
