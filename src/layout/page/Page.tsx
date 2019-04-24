import * as React from "react";
import "./Page.scss";

interface IPageProps {

}

export const Page: React.FC<IPageProps> = ({
                                               children,
                                           }) => (
    <div className={"page"}>
        <div className={"page-simple"}>
            {children}
        </div>
    </div>
);
