
import * as React from "react";
import { Component, ReactNode } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { IIndirectRouteProps } from "./IIndirectRouteProps";
import { IndirectRouteStore } from "./IndirectRouteStore";
import { EPaths } from "../../app/config";
import { observer } from "mobx-react";

@observer
export class IndirectRoute extends Component<IIndirectRouteProps> {
    private readonly store = new IndirectRouteStore();

    componentDidMount(): void {
        this.store.setObservable(this.props.observable);
        this.store.checkRoute();
    }

    render(): ReactNode {
        const { component: ReactComponent, ...rest } = this.props;
        this.store.getValidState(); // Hack to inform MobX about store's observables
        return (
            <Route
                {...rest}
                render={(props: RouteComponentProps) =>
                    this.store.getValidState() ? (
                        <ReactComponent {...props} />
                    ) : (
                        <Redirect
                            exact={true}
                            push={true}
                            to={{
                                pathname: `/${EPaths.LOGIN}`,
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        );
    }
}
