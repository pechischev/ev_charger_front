import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { observer } from "mobx-react";
import "./TransactionProfile.scss";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { TransactionProfileStore } from ".";
import { TransactionForm } from "@app/components/transaction-form";

@observer
@autobind
export class TransactionProfile extends Component<RouteProps> {
    private readonly store = new TransactionProfileStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.init();

        if (this.props.location) {
            const { id } = qs.parse(this.props.location.search);
            this.store.setTransactionId(id as string);
        }
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">Transaction ID {this.store.getTransactionId}</div>
                <div className="page-content">
                    <Card
                        title="Transaction information"
                        className="residence-card"
                        content={
                            <CustomForm
                                validateData={this.store.validateData}
                                data={this.store.transformData(this.store.getData())}
                                error$={this.store.error$}
                                submit={this.store.onSubmit}
                                render={this.getTransactionForm}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private getTransactionForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <TransactionForm api={api} submitting={submitting || false} canCancel={true}/>
        );
    }
}
