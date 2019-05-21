import * as React from "react";
import { Component, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { EPaths } from "@app/config";
import "./Sidebar.scss";
import { ILink } from "@layouts/sidebar/ILink";

export class Sidebar extends Component {
    private readonly options: ILink[] = [
        { value: "Dashboard", path: EPaths.DASHBOARD, iconType: "dashboard", isEnabled: true },
        { value: "Users", path: EPaths.USER_LIST, iconType: "users", isEnabled: true },
        { value: "Residences", path: EPaths.RESIDENCE_LIST, iconType: "residences", isEnabled: true },
        { value: "Payments", path: "", iconType: "payments", isEnabled: false },
        { value: "Settings", path: EPaths.SETTINGS, iconType: "settings", isEnabled: true },
    ];

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

    private renderLink(link: ILink, index: number): ReactNode {
        const { path, value, iconType, isEnabled } = link;
        if (!isEnabled) {
            return void 0;
        }
        return (
            <li key={index}>
                <NavLink className="side-menu__item" activeClassName={"active"} to={`/${path}`}>
                    <span className="side-menu__icon" data-icon={iconType}/>
                    <span className="side-menu__label">{value}</span>
                </NavLink>
            </li>
        );
    }
}
