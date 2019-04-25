import React, { Component, ReactNode } from "react";
import { Redirect, Route, Router, Switch } from "react-router";
import { AppContext } from "../context";
import { EPaths } from "./config";
import { Login } from "./screen/login";
import "./App.scss";
import { Provider } from "mobx-react";
import { Page } from "../layout/page";

export class App extends Component {
    render(): ReactNode {
        return (
            <Provider>
                <Router history={AppContext.getHistory()}>
                    <div className="app">

                    </div>
                    {/*<div className="app">

                    <Switch>
                        <Route exact={true} path={`/${EPaths.LOGIN}`} component={() => <Login />} />
                    </Switch>
                    </div>*/}

                </Router>
            </Provider>
        );
    }

    private renderRoute(): ReactNode {
        return (
            <Route path="/" component={Page}>
                <Redirect to={EPaths.DASHBOARD}/>
                <Route component={() => <div>Sidebar</div>} onEnter={this.requireAuth.bind(this)} >
                    <Route path={EPaths.DASHBOARD} component={() => <div/>}/>
                </Route>
                <Route exact={true} path={`/${EPaths.LOGIN}`} component={() => <Login />} />
            </Route>
        )
    }

    private requireAuth(nextState: any, replace: any, callback: any) {
        if (true) {
            replace({
                pathname: `/${EPaths.LOGIN}`
            });
        }
        callback();
    }
}