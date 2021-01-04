import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TicketsBoard from "./components/TicketsBoard";
import Navbar from "./components/Navbar";

class App extends Component{
    render() {
        return (
            <div className="App">
                <Navbar/>
                <TicketsBoard/>
            </div>
        )
    }
}

export default App;
