import * as React from "react";
import { FC } from "react";
import "./Footer.scss";
import { IFooterProps } from "./IFooterProps";

export const Footer: FC<IFooterProps> = ({children, className = ""}) => {
    return(
        <div className={`footer ${className}`}>
            {children}
        </div>
    );
};
