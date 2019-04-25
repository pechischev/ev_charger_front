import { Nullable } from "@app/config";
import { SubscribableComponent } from "@components/subscribable-component";
import { autobind } from "core-decorators";
import { attempt, isError } from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { createRef, ReactNode, RefObject } from "react";
import { default as Scrollbars, positionValues } from "react-custom-scrollbars";
import * as ReactDOM from "react-dom";
import EventListener from "react-event-listener";
import "./CustomScrollbar.scss";
import { CustomScrollbarStore } from "./CustomScrollbarStore";
import { ICustomScrollbarProps } from "./ICustomScrollbarProps";

@observer
@autobind
export class CustomScrollbar extends SubscribableComponent<ICustomScrollbarProps> {
    private readonly store = new CustomScrollbarStore();
    private readonly scrollRef: RefObject<Scrollbars> = createRef();

    scrollToTop(): void {
        attempt(() => {
            this.scrollRef.current!.scrollToTop();
            this.scrollRef.current!.forceUpdate();
        });
    }

    scrollTop(top: number): void {
        attempt(() => this.scrollRef.current!.scrollTop(top));
    }

    scrollToBottom(): void {
        attempt(() => {
            this.scrollRef.current!.scrollToBottom();
            this.scrollRef.current!.forceUpdate();
        });
    }

    scrollToRight(): void {
        attempt(() => {
            this.scrollRef.current!.scrollToRight();
            this.scrollRef.current!.forceUpdate();
        });
    }

    getValues(): Nullable<positionValues> {
        const result = attempt<Nullable<positionValues>>(() => this.scrollRef.current!.getValues());
        if (isError(result)) {
            return void 0;
        }
        return result;
    }

    render(): ReactNode {
        return (
            <Scrollbars
                ref={this.scrollRef}
                autoHeight={true}
                autoHeightMax={this.store.getMaxHeight() || CustomScrollbarStore.DEFAULT_HEIGHT}
                universal={true}
                id={this.props.id}
                className={this.props.className || ""}
                onScroll={this.props.onScroll}
                onScrollStop={this.onScrollTop}
                renderThumbVertical={(props) => <div {...props} className="scroll__thumb-vertical" />}
            >
                <EventListener target={window} onResize={this.updateHeight} />
                {this.props.children}
            </Scrollbars>
        );
    }

    componentDidMount(): void {
        this.updateHeight();
        attempt(() => this.props.updateScrollHeight$!.subscribe(this.updateHeight));
        attempt(() =>
            this.props.showScroll$!.subscribe(() => {
                this.updateHeight();
                this.scrollToTop();
            }),
        );
    }

    componentDidUpdate(): void {
        this.updateHeight();
        if (this.props.shouldScrollToRight) {
            attempt(() => this.scrollRef.current!.scrollToRight());
            attempt(this.props.scrollToRight!, false);
        }
    }

    updateHeight(): void {
        const element = ReactDOM.findDOMNode(this);
        if (!element || !element.parentElement) {
            return;
        }
        this.store.setMaxHeight(element.parentElement.offsetHeight);
    }

    private onScrollTop(): void {
        if (!this.getValues()) {
            return;
        }
        attempt(this.props.onScrollUpdated!, this.getValues());
    }
}
