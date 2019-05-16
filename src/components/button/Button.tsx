import classNames from "classnames";
import * as React from "react";
import { FC } from "react";
import "./Button.scss";
import { IButtonProps } from "./IButtonProps";
import { observer } from "mobx-react";

export const Button: FC<IButtonProps> = observer(({ className = "", text, disabled, type, onClick, ...rest }) => {
    const classes = classNames({
        [className]: true,
        btn: true,
        disabled: disabled
    });
    return (
        <button {...rest} className={classes} onClick={onClick}>
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
