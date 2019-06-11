import { autobind } from "core-decorators";
import { EBillingFieldType } from ".";
import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import "./BillingSettings.scss";
import { observer } from "mobx-react";
import { AmountField } from "@components/fields";
import { Button } from "@components/button";
import { RouteProps } from "react-router";
import { redirectToSettings } from "@utils/history";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { BillingSettingsStore } from "./BillingSettingsStore";

@observer
@autobind
export class BillingSettings extends Component<RouteProps> {
    private readonly store = new BillingSettingsStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.init();
        this.store.getBillingInfo();
    }

    render(): ReactNode {
        const links: IBreadcrumb[] = [
            { label: "Settings", handler: redirectToSettings },
            { label: "Billing Information" },
        ];
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Billing Information</div>
                    <Breadcrumb crumbs={links}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Customize your payment details"
                        className="billing-info"
                        content={
                            <CustomForm
                                keepDirtyOnReinitialize={false}
                                validateData={this.store.validateData}
                                data={this.store.transformCompanyData(this.store.getData())}
                                error$={this.store.error$}
                                submit={this.store.updateBillingInfo}
                                render={this.renderBillingForm}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private renderBillingForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <div className="billing-info-form">
                <div className="column">
                    <AmountField
                        name={EBillingFieldType.SERVICE_FEE}
                        placeholder={"Enter service fee"}
                        label={"Service Fee"}
                    />
                    <div className="form__button clearfix">
                        <Button
                            disabled={!submitting}
                            onClick={() => api.handleSubmit()}
                            type="primary"
                            text="Submit"
                        />
                    </div>
                </div>
                <div className="column"/>
                <div className="column"/>
            </div>
        );
    }
}
