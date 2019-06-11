import * as React from "react";
import { FC } from "react";
import "./Card.scss";
import { ICardProps } from "@components/card";
import * as _ from "lodash";
import { observer } from "mobx-react";

export const Card: FC<ICardProps> = observer(({ title = "", content = "", className = "", onClick }) => {
    return (
        <div className={`page-card ${className}`} onClick={onClick || void 0}>
            <div className="page-card-header" data-hidden={_.isEmpty(title)}>
                <div className="page-card-header__title">{title}</div>
            </div>
            <div className="page-card-body">
                {content}
            </div>
        </div>
    );
});
