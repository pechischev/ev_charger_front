import classNames from "classnames";
import * as React from "react";
import { FC } from "react";
import "./Button.scss";
import { IButtonProps } from "./IButtonProps";
import { observer } from "mobx-react";

export const Button: FC<IButtonProps> = observer(({ className = "", text, disabled, type, onClick, ...rest }) => {
    const classes = classNames({
        ["custom-button"]: true,
        [className]: true,
        ["btn-block"]: true,
        btn: true,
        disabled
    });
    return (
        <button {...rest} className={classes} data-type={type} onClick={onClick}>
            {text}
        </button>
    );
});

Button.defaultProps = {
    className: "",
    text: "",
    disabled: false,
    onClick: void 0,
};
