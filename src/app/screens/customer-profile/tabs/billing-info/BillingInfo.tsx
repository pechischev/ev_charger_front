import * as React from "react";
import { Component, ReactNode } from "react";
import { BillingList } from "./BillingList";
import "./BillingInfo.scss";

export class BillingInfo extends Component {
    render(): ReactNode {
        return (
            <div className="billing-list">
                <BillingList canSearch={false} />
            </div>
        );
    }
}
