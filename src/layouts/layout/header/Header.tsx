import * as React from "react";
import { Component, ReactNode } from "react";
import "./Header.scss";
import { Dropdown, DropdownContent, DropdownTrigger } from "@components/dropdown";

interface IHeaderProps {
    userName?: string;
}

export class Header extends Component<IHeaderProps> {
    render() {
        return (
            <header className="header py-4">
                <div className="container-fluid">
                    <div className="d-flex">
                        {this.renderLogo()}

                        <a aria-label="Hide Sidebar" className="app-sidebar__toggle" data-toggle="sidebar" href="#"/>
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
                <img alt="loop logo" className="header-brand-img" src="./img/logo.png"/>
            </a>
        );
    }

    private renderUserAvatar(): ReactNode {
        return (
            <Dropdown>
                <DropdownTrigger className={"nav-link pr-0 leading-none d-flex"}>
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
                        {divider: true},
                        {
                            value: <><i className="dropdown-icon mdi mdi-logout-variant"/>Sign out</>,
                            onClick: () => void 0,
                        },
                    ]}
                    className={"option__menu"}
                />
            </Dropdown>
        );
    }

    private renderMessageBox() {
        return (
            <Dropdown className={"d-none d-md-flex"}>
                <DropdownTrigger className={"nav-link icon"}>
                    <i className="fa fa-envelope-o"/>
                    <span className=" nav-unread badge badge-info badge-pill">2</span>
                </DropdownTrigger>
                <DropdownContent
                    options={[
                        {
                            value: "2 New Messages",
                            onClick: () => void 0,
                        },
                        {divider: true},
                        {
                            value: "See all Messages",
                            onClick: () => void 0,
                        },
                    ]}
                    className={"option__menu"}
                />
            </Dropdown>
        );
    }

}
