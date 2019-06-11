import * as React from "react";
import { Component, ReactNode, ReactText } from "react";
import { AmountField, InputField, PromoCodeField, SelectField } from "@components/fields";
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
                        [{ id: "1", title: "%" }, { id: "2", title: "$" }]
                    }
                    disabled={!isCreate}
                />
                <AmountField
                    label={"Discount Amount"}
                    name={EPromoCodeFieldTypes.AMOUNT}
                    placeholder={"Enter discount amount"}
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
                <SelectField
                    label={"Residence list"}
                    name={EPromoCodeFieldTypes.RESIDENCES}
                    placeholder={"Select residence"}
                    options={AppContext.getInfoStore().residences}
                    disabled={!isCreate}
                />
                <SelectField
                    label={"Ststus"}
                    name={EPromoCodeFieldTypes.STATUS}
                    placeholder={"Select status"}
                    options={
                        [{ id: "1", title: "Active" }, { id: "2", title: "Inactive" }]
                    }
                    isVisible={isCreate}
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

    private validateTimeField(value: ReactText, allValues: object): Nullable<ReactText> {
        if (/\D/.test(`${value}`)) {
            return EMessages.ONLY_NUMBER;
        }
        return void 0;
    }
}
