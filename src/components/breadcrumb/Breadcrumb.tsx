import * as React from "react";
import { FC } from "react";
import { observer } from "mobx-react";
import "./Breadcrumb.scss";
import { IBreadcrumb, IBreadcrumbProps } from "./interfaces";

export const Breadcrumb: FC<IBreadcrumbProps> = observer(({ crumbs = [] }) => {
    return (
        <>
            {crumbs.map((item: IBreadcrumb, index) => {
                return (
                    <div className="breadcrumb" key={index}>
                        <div
                            className="breadcrumb_root"
                            onClick={!!item.handler ? item.handler : void 0}
                            data-active={!!item.handler}
                        >
                            {item.label}
                        </div>
                        <div className="breadcrumb_arrow" data-visible={!!item.handler}/>
                    </div>
                );
            })}
        </>
    );
});
