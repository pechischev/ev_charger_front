import { FC, MouseEvent } from "react";
import Popup from "reactjs-popup";
import * as React from "react";
import "./Modal.scss";
import { Button } from "@components/button";

interface IModalProps {
    trigger: JSX.Element;
    title: string;

    action?(event: MouseEvent<HTMLElement>): void;
}

export const Modal: FC<IModalProps> = ({children, trigger, title, action}) => (
    <Popup
        trigger={trigger}
        modal={true}
        closeOnDocumentClick={true}
    >
        {(close) => (
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button type="button" className="close" aria-label="Close" onClick={close}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                   {children}
                </div>
                <div className="modal-footer">
                    <Button className="btn-secondary" onClick={close} text={"Close"}/>
                    {action &&  <Button className="btn-primary" onClick={action} text={"Save changes"}/>}
                </div>
            </div>
        )}
    </Popup>
);
