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
import { ReactText } from "react";
import { Nullable } from "@app/config";
import { EMessages } from "@utils/EMessage";
import { isNull } from "lodash";

@observer
@autobind
export class BillingSettings extends Component<RouteProps> {
    private readonly store = new BillingSettingsStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Settings", handler: redirectToSettings },
        { label: "Billing Information" },
    ];
    constructor(props: RouteProps) {
        super(props);
        this.store.init();
        this.store.getBillingInfo();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Billing Information</div>
                    <Breadcrumb crumbs={this.links}/>
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
                        validate={this.validateServiceFeeField}
                        label={"Service Fee, %"}
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


    private validateServiceFeeField(value: ReactText, allValues: object): Nullable<ReactText> {
        const dataFormatRegex = /\d+[.,]\d{2}/g;
        const onlyLetterRegex = /[a-zA-Z]/g;
        const maxDiscount = 100;

        if (!value) {
            return void 0;
        }
        const regValue = `${value}`.match(dataFormatRegex);
        if (!isNull(`${value}`.match(onlyLetterRegex)) || isNull(regValue)
            || regValue[0].length !== `${value}`.length) {
            return EMessages.AMOUNT_VALUE_FORMAT_INCORRECT;
        }

        const floatValue = parseFloat(`${value}`);
        if (floatValue < 0 || floatValue > maxDiscount) {
            return EMessages.AMOUNT_INCORRECT_RANGE;
        }

        return void 0;
    }
}
