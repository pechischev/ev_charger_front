import classNames from "classnames";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IOverlayProps } from "./IOverlayProps";
import { OverlayStore } from "./OverlayStore";

@observer
@autobind
export class Overlay extends Component<IOverlayProps> {
    private readonly store = new OverlayStore();

    componentDidMount(): void {
        document.addEventListener("click", this.clickOutside);
    }

    componentWillUnmount(): void {
        document.removeEventListener("click", this.clickOutside);
    }

    componentDidUpdate(): void {
        const { onHide, onShow } = this.props;
        if (onHide && !this.store.getIsOpened()) {
            onHide();
        }
        if (onShow && this.store.getIsOpened()) {
            onShow();
        }
    }

    render(): ReactNode {
        const { className = "", children, overlayName } = this.props;
        const classes = classNames({
            [className]: true,
            [overlayName]: true,
            [`${overlayName}--opened`]: this.store.getIsOpened(),
        });
        return (
            <div className={classes} onClick={this.onClick}>
                {children}
            </div>
        );
    }

    private onClick(event: React.MouseEvent<HTMLDivElement>): void {
        const target = event.target as HTMLElement;
        if (!this.canChangeState(target)) {
            return;
        }
        this.store.setLastActiveElement(event.target);
        this.store.changeOpenState(!this.store.getIsOpened());
    }

    private clickOutside(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        if (!this.canChangeState(target)) {
            return;
        }
        if (event.target === this.store.getLastActiveElement()) {
            return;
        }
        this.store.changeOpenState(false);
    }

    private canChangeState(target: HTMLElement): boolean {
        if (this.props.readOnly) {
            return false;
        }
        if (!this.props.optionsRef || !this.props.optionsRef.current) {
            return true;
        }
        const options = this.props.optionsRef.current;
        if (options.contains(target) && target.nodeName !== "LI") {
            return false;
        }
        return true;
    }
}
