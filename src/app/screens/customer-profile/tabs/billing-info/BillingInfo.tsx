import * as React from "react";
import { Component, ReactNode } from "react";
import { IUser } from "@entities/user";
import { BillingList } from "./BillingList";
import "./BillingInfo.scss";

interface IBillingInfoProps {
    data: IUser;
}

export class BillingInfo extends Component<IBillingInfoProps> {
    render(): ReactNode {
        return (
            <div className="billing-list">
                <BillingList canSearch={false} />
            </div>
        );
    }
}
