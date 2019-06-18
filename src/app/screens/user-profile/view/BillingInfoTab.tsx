import * as React from "react";
import { Component, ReactNode } from "react";
import { BillingList } from "./BillingList";
import "./BillingInfoTab.scss";

interface IBillingInfoTabProps {
    userId?: string;
}

export class BillingInfoTab extends Component<IBillingInfoTabProps> {
    render(): ReactNode {
        return (
            <div className="billing-list">
                <BillingList canSearch={false} userId={this.props.userId} />
            </div>
        );
    }
}
