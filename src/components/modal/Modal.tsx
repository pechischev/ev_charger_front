import * as React from "react";
import { Component, Fragment, MouseEvent, ReactNode } from "react";
import Popup from "reactjs-popup";
import "./Modal.scss";
import { Button } from "@components/button";
import { autobind } from "core-decorators";
import * as _ from "lodash";

interface IModalProps {
    trigger?: JSX.Element;
    open?: boolean;
    title: string;
    children?: JSX.Element | ((close: () => void, isOpen?: boolean) => JSX.Element);

    action?(event: MouseEvent<HTMLElement>): void;

    onClose?(): void;
}

@autobind
export class Modal extends Component<IModalProps> {
    render(): ReactNode {
        const {children, trigger, title, open, onClose} = this.props;
        const content = _.isFunction(children) ? children : this.renderContent;
        return (
            <Popup
                trigger={trigger}
                modal={true}
                closeOnDocumentClick={true}
                open={open}
                onClose={onClose}
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
        const {action, children} = this.props;
        return (
            <Fragment>
                <div className="modal-body" style={{display: !!children ? "" : "none"}}>
                    {children}
                </div>
                <div className="modal-footer clearfix">
                    {action &&
                    <Button
                        className="float-right"
                        type="primary"
                        onClick={action}
                        text="Save changes"
                    />}
                    <Button
                        className="float-right"
                        type="secondary"
                        onClick={close}
                        text={"Close"}
                    />
                    {action &&<Button type="primary" onClick={(event) => {
                        action(event);
                        close();
                    }} text="Submit"/>}
                </div>
            </Fragment>
        );
    }
}
