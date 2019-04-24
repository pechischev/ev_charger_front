import { EPaths } from "@app/config";
import { ErrorScreen } from "@app/screens/error-screen";
import { Stub } from "@app/screens/stub";
import { PrivateRoute } from "@components/private-route";
import { AppContext, stores } from "@context";
import DevTools from "mobx-react-devtools";
import * as React from "react";
import { Component, ReactNode } from "react";
import { Route, Router, Switch } from "react-router";
import "./App.scss";
import { Provider } from "mobx-react";

export class App extends Component {
    constructor(props: object) {
        super(props);
        AppContext.getUserStore().login();
    }

    render(): ReactNode {
        return (
            <Provider {...stores}>
                <Router history={AppContext.getHistory()}>
                    <div className={"app"}>
                        <DevTools/>
                        <Switch>
                            {/*<PublicRoute exact={true} path={`/${EPaths.LOGIN}`} component={Login}/>*/}
                            <PrivateRoute
                                exact={true}
                                path={`/${EPaths.DASHBOARD}`}
                                component={() => <Stub title={"dashboard"}/>}
                            />
                            <PrivateRoute
                                exact={true}
                                path={`/${EPaths.SETTINGS}`}
                                component={() => <Stub title={"Settings"}/>}
                            />
                            <Route exact={true} path={`/${EPaths.ERROR}`} component={ErrorScreen}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
