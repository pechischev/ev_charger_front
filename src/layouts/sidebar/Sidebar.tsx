import * as React from "react";
import { Component, ReactNode } from "react";
import { NavLink, RouteProps } from "react-router-dom";
import { EPaths, Nullable } from "@app/config";
import "./Sidebar.scss";
import { ILink } from "@layouts/sidebar/ILink";
import { AppContext } from "@context";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { action, observable } from "mobx";

@observer
@autobind
export class Sidebar extends Component<RouteProps> {
    @observable private options: ILink[] = [
        { value: "Dashboard", path: EPaths.DASHBOARD, iconType: "dashboard", isEnabled: true },
        { value: "Users", path: EPaths.USER_LIST, iconType: "users", isEnabled: true },
        { value: "Residences", path: EPaths.RESIDENCE_LIST, iconType: "residences", isEnabled: true },
        { value: "Payments", path: "", iconType: "payments", isEnabled: false },

    ];

    @observable private currentPath = "";

    constructor(props: RouteProps) {
        super(props);

        AppContext.getUserStore().profile$.subscribe(this.updateOptions);
        AppContext.getHistory().listen(location1 => (this.currentPath = location1.pathname));
        AppContext.getHistory().push(window.location.pathname); // Hack to push history when initial load
    }

    render(): ReactNode {
        return (
            <div className="app-sidebar">
                <ul className="side-menu">
                    {
                        this.options.map((link, index) => this.renderLink(link, index))
                    }
                </ul>
            </div>
        );
    }

    private renderLink(link: ILink, index: number): Nullable<ReactNode> {
        const { path, value, iconType, isEnabled } = link;
        if (!isEnabled) {
            return void 0;
        }
        return (
            <li key={index}>
                <NavLink className={`side-menu__item ${path === this.currentPath ? "active" : ""}`} to={`/${path}`}>
                    <span className="side-menu__icon" data-icon={iconType}/>
                    <span className="side-menu__label">{value}</span>
                </NavLink>
            </li>
        );
    }

    @action.bound
    private updateOptions() {
        this.options = [...this.options, {
            value: "Settings",
            path: EPaths.SETTINGS,
            iconType: "settings",
            isEnabled: AppContext.getUserStore().isAdmin(),
        }];
    }
}
