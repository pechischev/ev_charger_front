import React, { Component, ReactNode } from "react";
import { Route, Router, Switch } from "react-router";
import { AppContext } from "../context";
import { EPaths } from "./config";
import { Login } from "./screen/login";
import "./App.scss"

export class App extends Component {
    render(): ReactNode {
        return (
            <div className="app">
                <Router history={AppContext.getHistory()}>
                    <Switch>
                        <Route path={`/${EPaths.LOGIN}`} component={() => <Login />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}