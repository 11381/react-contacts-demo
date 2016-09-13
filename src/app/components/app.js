import React, { Component } from "react";
import Contacts from "./contacts";

export default class App extends Component {
    render(){
        return (
            <div className="container">
                <Contacts />
            </div>
        );
    }
}