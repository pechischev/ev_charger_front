import classNames from "classnames";
import * as React from "react";
import { FC } from "react";
import "./Button.scss";
import { IButtonProps } from "./IButtonProps";
import { observer } from "mobx-react";

export const Button: FC<IButtonProps> = observer(({ className = "", textContent, disabled, onClick, hidden }) => {
    const classes = classNames({
        [className]: true,
        button: true,
    });
    return (
        <div className={classes} data-disabled={disabled} data-hidden={hidden} onClick={onClick}>
            <div className={"button__text"}>{textContent}</div>
        </div>
    );
});

Button.defaultProps = {
    className: "",
    textContent: "",
    disabled: false,
    hidden: false,
    onClick: void 0,
};
