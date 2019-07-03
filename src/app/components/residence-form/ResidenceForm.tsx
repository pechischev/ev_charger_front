import * as React from "react";
import { Component, Fragment, ReactNode, ReactText } from "react";
import { AmountField, InputField, SelectField, ZipCodeField } from "@components/fields";
import { AppContext } from "@context";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IResidenceForm } from "./interfaces";
import { EResidenceFieldTypes } from "./EResidenceFieldTypes";
import { Button } from "@components/button";
import "./ResidenceForm.scss";
import { redirectToResidenceList } from "@utils/history";
import { ResidenceFormStore } from "./ResidenceFormStore";
import { Nullable } from "@app/config";
import { get, isNull } from "lodash";
import { EMessages } from "@utils/EMessage";

@observer
@autobind
export class ResidenceForm extends Component<IResidenceForm> {
    private readonly store = new ResidenceFormStore();

    constructor(props: IResidenceForm) {
        super(props);
        this.store.init();
        this.store.getOperators();

        AppContext.getInfoStore().getStates();
    }

    render(): ReactNode {
        const readonly = !AppContext.getUserStore().isAdmin();
        return (
            <div className="residence-main-info clearfix">
                <Fragment>
                    <div className="residence-info float-left">
                        <div className="two-object-column clearfix">
                            <InputField
                                name={EResidenceFieldTypes.TITLE}
                                placeholder={"Enter site name"}
                                label={"Site Name"}
                                disabled={readonly}
                            />
                            <InputField
                                name={EResidenceFieldTypes.CITY}
                                placeholder={"Enter city"}
                                label={"City"}
                                disabled={readonly}
                            />
                        </div>
                        <InputField
                            name={EResidenceFieldTypes.ADDRESS}
                            placeholder={"Enter first address"}
                            label={"Address 1"}
                            disabled={readonly}
                        />
                        <div className="two-object-column clearfix">
                            <SelectField
                                name={EResidenceFieldTypes.OPERATOR}
                                label={"Property Operator"}
                                placeholder={"Select property operator"}
                                options={this.store.operators}
                                disabled={readonly}
                            />
                            <AmountField
                                name={EResidenceFieldTypes.BILLING_RATE}
                                placeholder={"Enter user billing rate"}
                                label={"User Billing Rate"}
                                validate={this.validateBillingRateField}
                                disabled={readonly}
                            />
                        </div>
                    </div>
                    <div className="residence-info float-right">
                        <div className="two-object-column clearfix">
                            <SelectField
                                name={EResidenceFieldTypes.STATE}
                                label={"State"}
                                options={AppContext.getInfoStore().states}
                                placeholder={"Select state"}
                                disabled={readonly}
                            />
                            <ZipCodeField
                                name={EResidenceFieldTypes.ZIP_CODE}
                                disabled={readonly}
                            />
                        </div>
                        <InputField
                            name={EResidenceFieldTypes.EXTRA_ADDRESS}
                            placeholder={"Enter second address"}
                            label={"Address 2"}
                            disabled={readonly}
                        />
                        <div className="two-object-column clearfix">
                            {this.renderAdminFields()}
                        </div>
                    </div>
                </Fragment>
                <div className="residence-info__buttons clearfix">
                    <Button
                        className={`float-right ${this.props.canCancel ? "button-view" : "button-hidden"}`}
                        type="secondary"
                        onClick={redirectToResidenceList}
                        text="Cancel"
                    />
                    <Button
                        className="float-right"
                        type="primary"
                        disabled={!this.props.submitting || readonly}
                        onClick={() => this.props.api.handleSubmit()}
                        text="Save"
                    />
                </div>
            </div>
        );
    }

    private renderAdminFields(): ReactNode {
        if (!AppContext.getUserStore().isAdmin()) {
            return void 0;
        }
        const isCreate = !!~AppContext.getHistory().location.pathname.indexOf("create");
        return (
            <Fragment>
                <AmountField
                    name={EResidenceFieldTypes.SERVICE_FEE}
                    placeholder={"Enter service fee"}
                    label={"Service Fee"}
                    validate={this.validateServiceField}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />

                <SelectField
                    label={"Site Status"}
                    name={EResidenceFieldTypes.STATUS}
                    options={[
                        { id: "active", title: "Active" },
                        { id: "inactive", title: "Inactive" },
                    ]}
                    isVisible={!isCreate}
                />
            </Fragment>
        );
    }

    private validateServiceField(value: ReactText, allValues: object): Nullable<ReactText> {
        const rateValue = get(allValues, EResidenceFieldTypes.BILLING_RATE);
        const dataFormatRegex = /\d+[.,]\d{2}/g;
        const onlyLetterRegex = /[a-zA-Z]/g;

        if (!value || !rateValue) {
            return void 0;
        }
        const regValue = `${value}`.match(dataFormatRegex);
        if (!isNull(`${value}`.match(onlyLetterRegex)) || isNull(regValue)
            || regValue[0].length !== `${value}`.length) {
            return EMessages.AMOUNT_VALUE_FORMAT_INCORRECT;
        }

        if (parseFloat(rateValue) < parseFloat(`${value}`)) {
            return EMessages.SERVICE_FEE_INCORRECT;
        }

        return void 0;
    }

    private validateBillingRateField(value: ReactText, allValues: object): Nullable<ReactText> {
        if (!value) {
            return void 0;
        }

        if (parseFloat(`${value}`) <= 0) {
            return EMessages.AMOUNT_INCORRECT;
        }

        return void 0;
    }
}
