import * as React from "react";
import { Component, ReactNode } from "react";
import { AddResidenceStore } from "./AddResidenceStore";
import { Card } from "@components/card";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { EResidenceFieldTypes, ResidenceForm } from "@app/components/residence-form";
import { RouteProps } from "react-router";
import { redirectToResidenceList } from "@utils/history";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { IResidence } from "@entities/residence";
import { get } from "lodash";
import { parseAmountFieldValue } from "@utils";

@observer
@autobind
export class AddResidence extends Component<RouteProps> {
    private readonly store = new AddResidenceStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Sites", handler: redirectToResidenceList },
        { label: "New site" },
    ];

    constructor(props: RouteProps) {
        super(props);
        this.store.init();

        this.store.getBillingInfo();
    }

    render(): ReactNode {
        const percent = 100;
        const defaultBilling = 99;
        const defaultServiceFee = get(this.store.getBillingData(), "defaultSubscriptionValue", 10) / percent;

        const data: Partial<IResidence> = {
            [EResidenceFieldTypes.BILLING_RATE]: "99.00",
            [EResidenceFieldTypes.SERVICE_FEE]: parseAmountFieldValue(
                `${Math.round(defaultBilling * defaultServiceFee * percent) / percent}`
            ),
        };
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">New site</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Add site"
                        className="customer-info"
                        content={
                            <div className="tab-container-profile">
                                <CustomForm
                                    keepDirtyOnReinitialize={false}
                                    validateData={this.store.validateData}
                                    data={data}
                                    error$={this.store.error$}
                                    submit={this.store.createResidence}
                                    render={this.renderResidenceForm}
                                />
                            </div>
                        }
                    />
                </div>
            </div>
        );
    }

    private renderResidenceForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <ResidenceForm
                api={api}
                submitting={submitting || false}
                canCancel={true}
            />
        );
    }
}
