import { EPaths } from "@app/config";
import { AppContext } from "@context";
import * as React from "react";
import { FC } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import * as UrlPattern from "url-pattern";
import { IPrivateRouteProps } from "./IPrivateRouteProps";
import { OperatorAccessRoutes } from "./RolesAccessRoutes";

export const PrivateRoute: FC<IPrivateRouteProps> = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) => {
                return isAccessGranted(props) ? (
                    isAccessRoleGranted(props) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            exact={true}
                            push={true}
                            to={{
                                pathname: `/${EPaths.DASHBOARD}`,
                                state: { from: props.location },
                            }}
                        />
                    )
                ) : (
                    <Redirect
                        exact={true}
                        push={true}
                        to={{
                            pathname: `/${EPaths.LOGIN}`,
                            state: { from: props.location },
                        }}
                    />
                );
            }}
        />
    );
};

export function isId(pathname: string, template: string): string {
    if (!pathname) {
        return "";
    }
    const pattern = new UrlPattern(`/${template}/:id`);
    const matched = pattern.match(pathname);
    if (!matched) {
        return "";
    }
    return matched.id;
}

function isAccessRoleGranted(props: RouteComponentProps): boolean {
    const pathname = props.location.pathname;
    if (!AppContext.getUserStore().isAdmin()) {
        return OperatorAccessRoutes.indexOf(pathname.substring(1, pathname.length) as EPaths) !== -1;
    }
    return true;
}

function isAccessGranted(props: RouteComponentProps): boolean {
    const shouldRedirect = props.location.pathname !== props.match.url;
    if (isOneOfPaths(AppContext.getPublicPaths(), props.location.pathname) && !shouldRedirect) {
        return false;
    }
    return AppContext.getUserStore().isLoggedIn();
}

export function isOneOfPaths(paths: string[], pathname: string): boolean {
    return paths.reduce<boolean>((prev, current) => {
        if (current === "/" && pathname === current) {
            return true;
        }
        if (pathname.includes(current) && current !== "/") {
            // tslint:disable-next-line:no-parameter-reassignment
            return true;
        }
        return prev;
    }, false);
}
