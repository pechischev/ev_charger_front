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
import { ErrorScreen } from "@layouts/error-screen";
import { Login } from "@app/screens/login";
import { UserProfile } from "@app/screens/user-profile";
import { Users } from "@app/screens/users/Users";
import { AddUserForm } from "@app/screens/add-user-form";
import { Residences } from "@app/screens/residences/Residences";
import { ResidenceProfile } from "@app/screens/residence-profile";
import { AddResidence } from "@app/screens/add-residence";
import { Settings } from "@app/screens/settings";
// import { CompanySettings } from "@app/screens/company-settings";

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
                                    path={`/${EPaths.USER_PROFILE}`}
                                    component={UserProfile}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.USER_CREATE_FORM}`}
                                    component={AddUserForm}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.RESIDENCE_LIST}`}
                                    component={Residences}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.RESIDENCE_PROFILE}`}
                                    component={ResidenceProfile}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.RESIDENCE_CREATE_FORM}`}
                                    component={AddResidence}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.SETTINGS}`}
                                    component={Settings}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.USERS_LIST_SETTINGS}`}
                                    component={Settings}
                                />
                                {/*<PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.COMPANY_INFO_SETTINGS}`}
                                    component={CompanySettings}
                                />*/}
                                <PrivateRoute
                                    exact={true}
                                    path={`/${EPaths.BILLING_INFO_SETTINGS}`}
                                    component={Settings}
                                />
                            </Switch>
                        </Layout>
                    </Route>
                </Switch>
            </div>
        );
    }
}
