import { EPaths } from "@app/config";
import { PrivateRoute } from "@components/private-route";
import { AppContext, stores } from "@context";
import * as React from "react";
import { Component, ReactNode } from "react";
import { Redirect, Route, Router, Switch } from "react-router";
import "./App.scss";
import { Provider } from "mobx-react";
import { Dashboard } from "@app/screens/dashboard";
import { Layout } from "@layouts/layout";
import { PublicRoute } from "@components/public-route";
import { ErrorScreen } from "@app/screens/error-screen";
import { Login } from "@app/screens/login";
import { CustomerProfile } from "./screens/customer-profile";
import { Users } from "@app/screens/users/Users";

export class App extends Component {
    constructor(props: object) {
        super(props);
        AppContext.getUserStore().login();
    }

    render(): ReactNode {
        return (
            <Provider {...stores}>
                <Router history={AppContext.getHistory()}>
                    {this.renderRoutes()}
                </Router>
            </Provider>
        );
    }

    private renderRoutes(): ReactNode {
        return (
            <div className="app">
                <Switch>
                    <PublicRoute exact={true} path={`/${EPaths.LOGIN}`} component={Login}/>
                    <Route exact={true} path={`/${EPaths.ERROR}`} component={ErrorScreen}/>
                    <Route path={"/"}>
                        <Layout>
                            <Switch>
                                <PrivateRoute
                                    exact={true}
                                    path={"/"}
                                    component={() => <Redirect to={`/${EPaths.DASHBOARD}`}/>}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.DASHBOARD}`}
                                    component={Dashboard}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.USER_LIST}`}
                                    component={Users}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.USER_LIST}/${EPaths.CUSTOMER_PROFILE}`}
                                    component={CustomerProfile}
                                />
                            </Switch>
                        </Layout>
                    </Route>
                </Switch>
            </div>
        );
    }
}
