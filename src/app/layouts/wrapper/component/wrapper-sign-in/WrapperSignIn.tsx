import { observer } from "mobx-react";
import * as React from "react";
import { FC } from "react";
import { IWrapperProps } from "./IWrapperProps";
import "./WrapperSignIn.scss";

export const WrapperSignIn: FC<IWrapperProps> = observer(({ title, error, className, children, notice }) => {
    return (
        <div className={`wrapper sign-in ${className || ""}`}>
            <div className={"sign-in__container"}>
                <h2>{title}</h2>
                <div className={"sign-in__logo"} />
                {error ? <div className={"sign-in__error"}>{error}</div> : void 0}
                <div className={"sign-in__notice"}>{notice}</div>
                {children}
            </div>
        </div>
    );
});
