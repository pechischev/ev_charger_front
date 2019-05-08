import { FC } from "react";
import * as React from "react";
import "./Content.scss";

export const Content: FC = ({children}) => {
    return (
        <div className="app-content">
            {children}
        </div>
    );
};
