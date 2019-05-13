import * as React from "react";
import { Component, ReactNode } from "react";
import { IUser } from "@entities/user";

interface IBillingInfoProps {
    data: IUser;
}

export class BillingInfo extends Component<IBillingInfoProps> {
    render(): ReactNode {
        return (
            <div className="">
                BillingInfo
            </div>
        );
    }
}
