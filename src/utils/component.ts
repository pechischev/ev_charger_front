import * as React from "react";
import { EPaths } from "@app/config";
import { IPrivateRouteProps, isId } from "@components/private-route";
import { ComponentClass } from "react";

export function shouldRenderComponent(predicate: boolean): (element: React.ReactNode) => React.ReactNode {
    if (!predicate) {
        return () => undefined;
    }
    return (element: React.ReactNode) => element;
}

export function withPathId<T>(
    props: T,
    location: IPrivateRouteProps["location"],
    Component: ComponentClass<T>,
    path: EPaths,
): JSX.Element {
    if (!location) {
        return React.createElement(Component, { ...props });
    }
    const id = isId(location.pathname, path);
    if (!id) {
        return React.createElement(Component, { ...props });
    }
    return React.createElement(Component, { ...props, id });
}
