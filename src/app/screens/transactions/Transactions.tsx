import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { redirectOnAddTransactionForm } from "@utils/history";
import { Button } from "@components/button";
import { TransactionsList } from ".";

export class Transactions extends Component {
    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">Transactions</div>
                <div className="page-content">
                    <Card title="Transactions table" content={<TransactionsList actionElement={actionElement}/>}/>
                </div>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        return (
            <Button
                type="primary"
                onClick={redirectOnAddTransactionForm}
                text="Add transaction"
            />
        );
    }
}
