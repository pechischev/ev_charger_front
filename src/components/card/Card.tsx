import * as React from "react";
import {FC} from "react";
import "./Card.scss";
import {ICardProps} from "@components/card";
import * as _ from "lodash";

export const Card: FC<ICardProps> = ({title = "", content = "", className = ""}) => {
    return (
        <div className={`page-card ${className}`}>
            <div className="page-card-header" data-hidden={_.isEmpty(title)}>
                <div className="page-card-header__title">{title}</div>
            </div>
            <div className="page-card-body">
                {content}
            </div>
        </div>
    );
};
