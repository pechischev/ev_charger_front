import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import "./Header.scss";
import { Dropdown, DropdownContent, DropdownTrigger } from "@components/dropdown";
import { HeaderStore } from "./HeaderStore";
import { AppContext } from "@context";
import { observer } from "mobx-react";
import { redirectToWorkerForm } from "@utils/history";

interface IHeaderProps {
    userName?: string;
}

@observer
export class Header extends Component<IHeaderProps> {
    private readonly store = new HeaderStore();

    constructor(props: IHeaderProps) {
        super(props);

        this.store.init();
        this.store.getProfile();
    }

    render(): ReactNode {
        return (
            <header className="header">
                <div className="container-fluid">
                    <div className="d-flex">
                        {this.renderLogo()}
                        {this.renderMenuButton()}
                        {this.renderUserAvatar()}
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

    private renderMenuButton(): ReactNode {
        const sideBarStore = AppContext.getSideBarStore();
        return (
            <div
                className="header-menu-controller"
                data-show={sideBarStore.mode}
                onClick={sideBarStore.changeSideBarMode}
            >
                <span/><span/><span/>
            </div>
        );
    }

    private renderUserAvatar(): ReactNode {
        const data = AppContext.getUserStore().getUser();
        const options = [];
        if (AppContext.getUserStore().isAdmin()) {
            options.push(
                {
                    value: <Fragment>Profile</Fragment>,
                    onClick: () => {
                        if (!data) {
                            return;
                        }
                        redirectToWorkerForm(data.getId());
                    },
                },
                { divider: true },
            );
        }
        options.push(
            {
                value: <Fragment><i className="dropdown-icon mdi mdi-logout-variant"/>Sign out</Fragment>,
                onClick: () => this.store.logout(),
            },
        );
        return (
            <Dropdown className="ml-auto">
                <DropdownTrigger className="nav-link pr-0 leading-none d-flex header-bar-person">
                    <div className="header-bar-person__image">
                        <span data-show="true">
                            {this.getInitialCharacter(data && data.getFirstName())}
                            {this.getInitialCharacter(data && data.getLastName())}
                        </span>
                    </div>
                    <span className="ml-2 header-bar-person__value">
                        <span className="text-dark">{data && data.getName()}</span>
                    </span>
                </DropdownTrigger>
                <DropdownContent
                    options={options}
                    className="option__menu"
                />
            </Dropdown>
        );
    }

    private getInitialCharacter(line: string = ""): string {
        return line.charAt(0);
    }

}
