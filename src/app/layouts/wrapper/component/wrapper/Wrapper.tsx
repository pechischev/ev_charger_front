import * as React from "react";
import { FC } from "react";
import { IWrapperProps } from "./IWrapperProps";
import "./Wrapper.scss";

export const Wrapper: FC<IWrapperProps> = ({
                                                className = "",
                                                children,
                                            }) => {
    return (
        <div className={`wrapper ${className}`}>
            {children}
        </div>
    );
};
