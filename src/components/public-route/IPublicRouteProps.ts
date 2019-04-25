import * as React from "react";
import { RouteComponentProps, RouteProps } from "react-router";

// tslint:disable-next-line:no-any
export type TComponent = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

export interface IPublicRouteProps extends RouteProps {
    component: TComponent;
}
