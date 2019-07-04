import * as React from "react";
import { FC } from "react";
import "./Content.scss";

export const Content: FC = ({ children }) => {
    return (
        <div className="app-content">
            {children}
        </div>
    );
};
