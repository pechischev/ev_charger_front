import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { TransactionsList } from ".";

export class Transactions extends Component {
    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">Transactions</div>
                <div className="page-content">
                    <Card
                        title="Transactions table"
                        content={
                            <TransactionsList canDateSearch={true}/>
                        }
                    />
                </div>
            </div>
        );
    }
}
