import * as React from "react";
import "./Page.scss";

interface IPageProps {
    layer?: string;
}

export const Page: React.FC<IPageProps> = ({
                                               children,
                                               layer = "page-main"
                                           }) => (
    <div className="page">
        <div className={layer}>
            {children}
        </div>
    </div>
);
