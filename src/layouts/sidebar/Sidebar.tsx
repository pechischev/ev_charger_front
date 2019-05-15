import { Component, ReactNode } from "react";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { EPaths } from "@app/config";
import "./Sidebar.scss";
import { ILink } from "@layouts/sidebar/ILink";

export class Sidebar extends Component {
    private readonly options: ILink[] = [
        {value: "Dashboard", path: EPaths.DASHBOARD, iconName: "fa-dashboard"},
        {value: "Users", path: EPaths.USER_LIST, iconName: "fa-dashboard"},
        {value: "Residences", path: EPaths.RESIDENCE_LIST, iconName: "fa-dashboard"},
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
        const {path, value, iconName} = link;
        return (
            <li key={index}>
                <NavLink className="side-menu__item" activeClassName={"active"} to={`/${path}`}>
                    {!!iconName && <i className={`side-menu__icon fa ${iconName}`}/>}
                    <span className="side-menu__label">{value}</span>
                </NavLink>
            </li>
        );
    }
}
