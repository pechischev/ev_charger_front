import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import * as React from "react";
import { Component, createRef, MouseEvent, ReactNode, RefObject } from "react";
import { ContextMenuTriggerStore } from "./ContextMenuTriggerStore";
import { IContextMenuTriggerWrapper } from "./IContextMenuTriggerWrapper";

const { ContextMenuTrigger } = require("react-contextmenu");

@observer
@autobind
export class ContextMenuTriggerWrapper extends Component<IContextMenuTriggerWrapper> {
    // @ts-ignore
    private readonly menuTrigger: RefObject<ContextMenuTrigger> = createRef();
    private readonly store = new ContextMenuTriggerStore();

    componentDidMount(): void {
        if (!this.props.setShowMenuHandler) {
            return;
        }
        this.props.setShowMenuHandler(this.showMenu);
    }

    render(): ReactNode {
        const { id, data, children, className = "", ...props } = this.props;
        return (
            <ContextMenuTrigger
                id={id}
                attributes={{ className, onContextMenu: this.onContextMenu, onMouseDown: this.onMouseDown }}
                collect={() => data}
                ref={this.menuTrigger}
                disable={this.store.getDisabled()}
                {...props}
            >
                {children}
            </ContextMenuTrigger>
        );
    }

    showMenu(event: MouseEvent<HTMLElement>): void {
        this.onContextMenu();
        if (!this.menuTrigger.current) {
            return;
        }
        this.menuTrigger.current.handleContextClick(event);
    }

    private onContextMenu(): void {
        const callback = this.props.onContextMenu;
        if (!callback) {
            return;
        }
        callback(this.props.data);
    }

    private onMouseDown(event: MouseEvent<HTMLElement>): void {
        this.store.setDisabled(event.defaultPrevented);
    }
}
