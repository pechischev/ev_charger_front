import * as React from "react";
import * as React from "react";
import { Component, MouseEvent, ReactNode, Fragment } from "react";
import Popup from "reactjs-popup";
import "./Modal.scss";
import { Button } from "@components/button";
import { autobind } from "core-decorators";
import * as _ from "lodash";

interface IModalProps {
    trigger: JSX.Element;
    title: string;
    children: JSX.Element | ((close: () => void, isOpen?: boolean) => JSX.Element);

    action?(event: MouseEvent<HTMLElement>): void;
}

@autobind
export class Modal extends Component<IModalProps> {
    render(): ReactNode {
        const { children, trigger, title } = this.props;
        const content = _.isFunction(children) ? children : this.renderContent;
        return (
            <Popup
                trigger={trigger}
                modal={true}
                closeOnDocumentClick={true}
            >
                {(close, isOpen) => (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" aria-label="Close" onClick={close}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        {content(close, isOpen)}
                    </div>
                )}
            </Popup>
        );
    }

    private renderContent(close: () => void, isOpen?: boolean): ReactNode {
        const { action, children } = this.props;
        return (
            <Fragment>
                <div className="modal-body">
                    { children }
                </div>
                <div className="modal-footer">
                    <Button
                        type="secondary"
                        onClick={ close }
                        text={ "Close" }
                    />
                    {action && <Button type="primary" onClick={ action } text="Submit"/> }
                </div>
            </Fragment>
        ) ;
    }
}
