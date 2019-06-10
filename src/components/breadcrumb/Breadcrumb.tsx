import * as React from "react";
import { FC } from "react";
import { observer } from "mobx-react";
import "./Breadcrumb.scss";
import { IBreadcrumb, IBreadcrumbProps } from "./interfaces";

export const Breadcrumb: FC<IBreadcrumbProps> = observer(({ crumbs = [] }) => {
    return (
        <div className="breadcrumb">
            {crumbs.map((item: IBreadcrumb, index) => {
                return (
                    <div
                        className="breadcrumb__root"
                        onClick={item.handler}
                        data-active={!!item.handler}
                        key={index}
                    >
                        {item.label}
                    </div>
                );
            })}
        </div>
    );
});
