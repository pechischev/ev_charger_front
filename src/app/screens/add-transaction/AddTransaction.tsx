import * as React from "react";
import { Component, ReactNode } from "react";
import { AddTransactionStore } from "./AddTransactionStore";
import { Card } from "@components/card";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { RouteProps } from "react-router";
import { TransactionForm } from "@app/components/transaction-form";

@observer
@autobind
export class AddTransaction extends Component<RouteProps> {
    private readonly store = new AddTransactionStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.init();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">New Transaction</div>
                <div className="page-content">
                    <Card
                        title="Add Transaction"
                        className="customer-info"
                        content={
                            <div className="tab-container-profile">
                                <CustomForm
                                    keepDirtyOnReinitialize={false}
                                    validateData={this.store.validateData}
                                    error$={this.store.error$}
                                    submit={() => void 0}
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
            <TransactionForm
                api={api}
                submitting={submitting || false}
                canCancel={true}
            />
        );
    }
}
