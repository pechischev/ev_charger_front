import { DropdownContent, DropdownTrigger } from "@components/dropdown";
import { Overlay } from "@components/overlay";
import { observer } from "mobx-react";
import * as React from "react";
import { Children, cloneElement, Component, createRef, ReactChild, ReactNode, RefObject } from "react";
import { isNumber, isString } from "util";
import "./Dropdown.scss";
import { IDropdown } from "./IDropdown";

@observer
export class Dropdown extends Component<IDropdown> {
    private static readonly CONTENT_PADDING = 10;
    private readonly contentRef: RefObject<HTMLDivElement> = createRef();

    render(): ReactNode {
        const { className } = this.props;
        return (
            <Overlay overlayName={"dropdown"} className={className}>
                {this.getBoundChildren()}
            </Overlay>
        );
    }

    componentDidUpdate(): void {
        if (!this.contentRef.current) {
            return;
        }
        this.contentRef.current.style.marginLeft = "0";
        const element = this.contentRef.current.getBoundingClientRect();
        const screenWidth = document.documentElement && document.documentElement.clientWidth;
        if (!screenWidth) {
            return;
        }
        if (element.left + element.width > screenWidth) {
            this.contentRef.current.style.marginLeft = `${screenWidth -
                element.left -
                element.width -
                Dropdown.CONTENT_PADDING}px`;
        }
    }

    private getBoundChildren(): ReactNode[] {
        return Children.map(this.props.children, (child: ReactChild) => {
            if (isString(child) || isNumber(child)) {
                return void 0;
            }
            if (child.type === DropdownTrigger) {
                // tslint:disable-next-line:no-parameter-reassignment
                child = cloneElement(child);
            }
            if (child.type === DropdownContent) {
                // tslint:disable-next-line:no-parameter-reassignment
                child = cloneElement(child, { contentRef: this.contentRef });
            }
            return child;
        });
    }
}
