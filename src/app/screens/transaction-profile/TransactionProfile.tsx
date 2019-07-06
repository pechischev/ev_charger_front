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
import { AppContext } from "@context";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { redirectToTransactionList } from "@utils/history";
import { get } from "lodash";

@observer
@autobind
export class TransactionProfile extends Component<RouteProps> {
    private readonly store = new TransactionProfileStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Transactions", handler: redirectToTransactionList },
        { label: "Profile" },
    ];

    constructor(props: RouteProps) {
        super(props);
        this.store.init();

        if (AppContext.getHistory().location) {
            const { id } = qs.parse(AppContext.getHistory().location.search);
            this.store.setTransactionId(`${id}`);
            this.store.getTransactionData(parseInt(`${id}`, 10));
        }
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Transaction ID {this.store.getTransactionId}</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Transaction information"
                        className="residence-card"
                        content={
                            <CustomForm
                                validateData={this.store.validateData}
                                data={this.store.transformData(this.store.getData())}
                                error$={this.store.error$}
                                submit={this.store.updateTransaction}
                                render={this.getTransactionForm}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private getTransactionForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        const isChangeStatus = (this.store.getData().status === "overdue") && get(api.values, "status") === "paid";
        return (
            <TransactionForm api={api} submitting={submitting} canCancel={true} isChangeStatus={isChangeStatus}/>
        );
    }
}
