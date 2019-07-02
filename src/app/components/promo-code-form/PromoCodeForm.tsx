import * as React from "react";
import { Component, ReactNode, ReactText } from "react";
import { AmountField, InputField, MultiSelectField, PromoCodeField, SelectField } from "@components/fields";
import { AppContext } from "@context";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { EPromoCodeFieldTypes } from "./EPromoCodeFieldTypes";
import { Nullable } from "@app/config";
import { EMessages } from "@utils/EMessage";
import { IPromoCodeForm } from "@app/components/promo-code-form/interfaces";
import { Button } from "@components/button";
import { redirectToPromoCodeList } from "@utils/history";
import "./PromoCodeForm.scss";
import { EDiscountCharacter, EDiscountType } from "@entities/promo-code";
import { EStatus } from "@entities/user";
import { isNull, get } from "lodash";

@observer
@autobind
export class PromoCodeForm extends Component<IPromoCodeForm> {
    constructor(props: IPromoCodeForm) {
        super(props);

        AppContext.getInfoStore().getResidences();
    }

    render(): ReactNode {
        return (
            <div className="code-form-fields">
                {this.getFirstColumnFields()}
                {this.getSecondColumnFields()}
                <div/>
            </div>
        );
    }

    private getFirstColumnFields(): ReactNode {
        const isCreate = !!~AppContext.getHistory().location.pathname.indexOf("create");
        return (
            <div>
                <PromoCodeField
                    name={EPromoCodeFieldTypes.CODE}
                    disabled={!isCreate}
                />
                <SelectField
                    label={"Value Discount Type"}
                    name={EPromoCodeFieldTypes.AMOUNT_TYPE}
                    placeholder={"Select value discount type"}
                    options={
                        [
                            { id: EDiscountType.PERCENTAGE, title: EDiscountCharacter.PERCENTAGE },
                            { id: EDiscountType.VALUE, title: EDiscountCharacter.CURRENCY },
                        ]
                    }
                    disabled={!isCreate}
                />
                <AmountField
                    label={"Discount Amount"}
                    name={EPromoCodeFieldTypes.AMOUNT}
                    placeholder={"Enter discount amount"}
                    validate={this.validateDiscountField}
                    disabled={!isCreate}
                />
            </div>
        );
    }

    private getSecondColumnFields(): ReactNode {
        const isCreate = !!~AppContext.getHistory().location.pathname.indexOf("create");
        return (
            <div>
                <InputField
                    label={"Promo Code Valid"}
                    name={EPromoCodeFieldTypes.TIME_ACTION}
                    placeholder={"Enter promo code valid"}
                    validate={this.validateTimeField}
                    disabled={!isCreate}
                />
                <MultiSelectField
                    label={"Residence list"}
                    name={EPromoCodeFieldTypes.RESIDENCES}
                    placeholder={"Select residence"}
                    options={AppContext.getInfoStore().residences}
                    disabled={!isCreate}
                />
                <SelectField
                    label={"Status"}
                    name={EPromoCodeFieldTypes.STATUS}
                    placeholder={"Select status"}
                    options={
                        [
                            { id: EStatus.ACTIVE, title: "Active" },
                            { id: EStatus.INACTIVE, title: "Inactive" },
                        ]
                    }
                />
                <div className="code-form-fields__buttons clearfix">
                    <Button
                        className={`float-right ${this.props.canCancel ? "button-view" : "button-hidden"}`}
                        type="secondary"
                        onClick={redirectToPromoCodeList}
                        text={"Cancel"}
                    />
                    <Button
                        className="float-right"
                        type="primary"
                        disabled={!this.props.submitting || !AppContext.getUserStore().isAdmin()}
                        onClick={() => this.props.api.handleSubmit()}
                        text={isCreate ? "Create" : "Save"}
                        style={{
                            marginRight: 10,
                        }}
                    />
                </div>
            </div>
        );
    }

    private validateDiscountField(value: ReactText, allValues: object): Nullable<ReactText> {
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

        const discountType = get(allValues, "discountType");
        const floatValue = parseFloat(`${value}`);
        const isPercentage = discountType === EDiscountType.PERCENTAGE;
        if (isPercentage && (floatValue < 0 || floatValue > maxDiscount)) {
            return EMessages.AMOUNT_INCORRECT_RANGE;
        }

        return void 0;
    }

    private validateTimeField(value: ReactText, allValues: object): Nullable<ReactText> {
        if (!value) {
            return EMessages.EMPTY;
        }
        if (parseInt(`${value}`, 10) < 1) {
            return EMessages.AMOUNT_INCORRECT;
        }
        if (/\D/.test(`${value}`)) {
            return EMessages.ONLY_NUMBER;
        }
        return void 0;
    }
}
