import * as React from "react";
import { Component, ReactNode, Fragment } from "react";
import { AmountField, InputField, SelectField } from "@components/fields";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { ETransactionFieldTypes } from "./ETransactionFieldTypes";
import { ITransactionForm } from "./interfaces";
import { Button } from "@components/button";
import { redirectToTransactionList } from "@utils/history";
import "./TransactionForm.scss";
import { AppContext } from "@context";

@observer
@autobind
export class TransactionForm extends Component<ITransactionForm> {
    constructor(props: ITransactionForm) {
        super(props);
        AppContext.getInfoStore().getResidences();
    }

    render(): ReactNode {
        return (
            <div className="transactions-form">
                {this.renderContainer("Object details", this.getProfileInfoFields())}
                {this.renderContainer("Payment information", this.getRoleSettingsFields())}
                <div/>
            </div>
        );
    }

    private getProfileInfoFields(): ReactNode {
        return (
            <Fragment>
                <SelectField
                    name={ETransactionFieldTypes.RESIDENCE}
                    label={"Residence"}
                    options={AppContext.getInfoStore().residences}
                    placeholder={"Select residence"}
                    disabled={true}
                />
                <InputField
                    name={ETransactionFieldTypes.USER}
                    label={"User"}
                    placeholder={"Select user"}
                    disabled={true}
                />
            </Fragment>
        );
    }

    private getRoleSettingsFields(): ReactNode {
        const pathname = AppContext.getHistory().location.pathname;
        const isCreate = !!~pathname.indexOf("create");
        return (
            <Fragment>
                <InputField
                    label={"Status"}
                    name={ETransactionFieldTypes.STATUS}
                    isVisible={!isCreate}
                    disabled={true}
                />
                <InputField
                    label={"Payment type"}
                    name={ETransactionFieldTypes.PAYMENT_TYPE}
                    disabled={true}
                />
                <AmountField
                    name={ETransactionFieldTypes.AMOUNT}
                    label="Amount"
                    placeholder="Enter amount"
                    disabled={true}
                />
                <div className="transactions-form-button clearfix">
                    <Button
                        className="float-right"
                        type="secondary"
                        onClick={redirectToTransactionList}
                        text="Back"
                    />
                </div>
            </Fragment>
        );
    }

    private renderContainer(title: string, fields: ReactNode): ReactNode {
        return (
            <div className="transaction-settings">
                <div className="transaction-settings__title">{title}</div>
                <div className="transaction-settings__container">
                    {fields}
                </div>
            </div>
        );
    }
}
