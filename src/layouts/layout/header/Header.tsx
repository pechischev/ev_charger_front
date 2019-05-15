import * as React from "react";
import { Component, ReactNode } from "react";
import "./Header.scss";
import { Dropdown, DropdownContent, DropdownTrigger } from "@components/dropdown";
import { HeaderStore } from "./HeaderStore";

interface IHeaderProps {
    userName?: string;
}

export class Header extends Component<IHeaderProps> {
    private readonly store = new HeaderStore();

    render(): ReactNode {
        return (
            <header className="header">
                <div className="container-fluid">
                    <div className="d-flex">
                        {this.renderLogo()}
                        <a aria-label="Hide Sidebar" className="app-sidebar__toggle" data-toggle="sidebar" href="#">
                            <span/><span/><span/>
                        </a>
                        <div className="d-flex order-lg-2 ml-auto">
                            {this.renderMessageBox()}
                            {this.renderUserAvatar()}
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    private renderLogo(): ReactNode {
        return (
            <a className="header-brand" href={"/"}>
                <div className="header-brand-img"/>
            </a>
        );
    }

    private renderUserAvatar(): ReactNode {
        return (
            <Dropdown>
                <DropdownTrigger className="nav-link pr-0 leading-none d-flex header-bar-person">
                    <span className="avatar avatar-md brround" style={{ backgroundImage: "url(./img/25.jpg)" }}/>
                    <span className="ml-2 d-none d-lg-block">
                        <span className="text-dark">Simon Russell</span>
                    </span>
                </DropdownTrigger>
                <DropdownContent
                    options={[
                        {
                            value: <><i className="dropdown-icon mdi mdi-account-outline"/> Profile</>,
                            onClick: () => void 0,
                        },
                        {
                            value: <>
                                <span className="float-right"><span className="badge badge-primary">6</span></span>
                                <i className="dropdown-icon mdi mdi-message-outline"/>Inbox
                            </>,
                            onClick: () => void 0,
                        },
                        { divider: true },
                        {
                            value: <><i className="dropdown-icon mdi mdi-logout-variant"/>Sign out</>,
                            onClick: () => this.store.logout(),
                        },
                    ]}
                    className="option__menu"
                />
            </Dropdown>
        );
    }

    private renderMessageBox(): ReactNode {
        return (
            <Dropdown className="d-none d-md-flex">
                <DropdownTrigger className="nav-link icon">
                    <i className="icon_mail"/>
                    <span className="nav-unread badge badge-info badge-pill">2</span>
                </DropdownTrigger>
                <DropdownContent
                    options={[
                        {
                            value: "2 New Messages",
                            onClick: () => void 0,
                        },
                        { divider: true },
                        {
                            value: "See all Messages",
                            onClick: () => void 0,
                        },
                    ]}
                    className="option__menu"
                />
            </Dropdown>
        );
    }

}
