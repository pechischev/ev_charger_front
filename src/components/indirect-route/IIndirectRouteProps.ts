import * as React from "react";
import { RouteComponentProps, RouteProps } from "react-router";
import { Observable } from "rxjs";

// tslint:disable-next-line:no-any
export type TComponent = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

export interface IIndirectRouteProps extends RouteProps {
    component: TComponent;
    // tslint:disable-next-line:no-any
    observable: Observable<any>;
}
