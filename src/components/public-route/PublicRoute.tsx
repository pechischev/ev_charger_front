import * as React from "react";
import { SFC } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { IPublicRouteProps } from "./IPublicRouteProps";
import { EPaths } from "../../app/config";
import { AppContext } from "../../context";

export const PublicRoute: SFC<IPublicRouteProps> = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) => {
                return isAccessGranted(props) ? (
                    <Redirect exact={true} push={true} to={`/${EPaths.DASHBOARD}`} />
                ) : (
                    <Component {...props} />
                );
            }}
        />
    );
};

function isAccessGranted(props: RouteComponentProps): boolean {
    const shouldRedirect = props.location.pathname !== props.match.url;
    if (isOneOfPaths(AppContext.getPublicPaths(), props.location.pathname) && !shouldRedirect) {
        return false;
    }
    return false;
}

export function isOneOfPaths(paths: string[], pathname: string): boolean {
    return paths.reduce<boolean>((prev, current) => {
        if (current === "/" && pathname === current) {
            // tslint:disable-next-line:no-parameter-reassignment
            prev = false;
            return prev;
        } else if (pathname.includes(current) && current !== "/") {
            // tslint:disable-next-line:no-parameter-reassignment
            prev = false;
            return prev;
        }
        return prev;
    }, true);
}
