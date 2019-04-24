import { AppContext } from "@context";
import { Transport } from "@services/transport";
import { observer } from "mobx-react";
import * as React from "react";
import { Component, ReactNode } from "react";
import "./Header.scss";
import { HeaderStore } from "./HeaderStore";
import { IHeaderProps } from "./IHeaderProps";
import { head } from "lodash";
import { Link } from "react-router-dom";
import { Nullable } from "@app/config";

@observer
export class Header extends Component<IHeaderProps> {
    private readonly store = new HeaderStore();

    componentDidMount(): void {
        this.store.emitUrl();
        this.store.transport = new Transport(AppContext.getUserStore().getAdminTokens());
        this.store.getLogoutSubject().subscribe(() => AppContext.getUserStore().logout());
        const profileAction = head(this.store.getOptions());
        if (!profileAction) {
            return;
        }
        this.store.saveData$.subscribe(() => profileAction.onClick());
    }

    render(): ReactNode {
        const hasTitlePrefix = this.props.titlePrefix !== undefined;
        const titlePrefix = hasTitlePrefix && this.renderTitlePrefix();
        return (
            <div className={"header"}>
                <div className={"header__title"}>
                    {titlePrefix}
                    {this.props.title}
                </div>
            </div>
        );
    }

    private renderTitlePrefix(): Nullable<ReactNode> {
        const {titlePrefix} = this.props;
        if (titlePrefix) {
            const {name, link} = titlePrefix;
            if (link) {
                return (
                    <small className="header__title-prefix">
                        <Link className="header__title-prefix-link" to={link}>
                            {name || link}
                        </Link>
                    </small>
                );
            }
            else if (name) {
                return <small className="header__title-prefix">{name}</small>;
            }
        }
        return;
    }
}
