import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { AmountField, InputField, InputTextareaField, SelectField } from "@components/fields";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { ETransactionFieldTypes } from "./ETransactionFieldTypes";
import { ITransactionForm } from "./interfaces";
import { Button } from "@components/button";
import { redirectToTransactionList } from "@utils/history";
import "./TransactionForm.scss";
import { AppContext } from "@context";
import { get, isEmpty } from "lodash";

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
        const { isChangeStatus, api } = this.props;
        const comment = get(api.values, "comment", "");
        return (
            <Fragment>
                <SelectField
                    name={ETransactionFieldTypes.RESIDENCE}
                    label={"Site"}
                    options={AppContext.getInfoStore().residences}
                    placeholder={"Select site"}
                    disabled={true}
                />
                <InputField
                    name={ETransactionFieldTypes.USER}
                    label={"User"}
                    placeholder={"Select user"}
                    disabled={true}
                />
                <InputTextareaField
                    label={"Payment Source"}
                    name={ETransactionFieldTypes.COMMENT}
                    isVisible={isChangeStatus || !isEmpty(comment)}
                />
            </Fragment>
        );
    }

    private getRoleSettingsFields(): ReactNode {
        return (
            <Fragment>
                <SelectField
                    label={"Status"}
                    name={ETransactionFieldTypes.STATUS}
                    options={[
                        { id: "paid", title: "Paid" },
                        { id: "overdue", title: "Overdue" },
                    ]}
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
                    <Button
                        className="float-right"
                        type="primary"
                        disabled={!this.props.submitting}
                        onClick={() => this.props.api.handleSubmit()}
                        text="Save"
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
