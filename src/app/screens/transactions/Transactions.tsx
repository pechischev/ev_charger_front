import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { TransactionsList } from ".";
import { getRange } from "@utils";

export class Transactions extends Component {
    render(): ReactNode {
        const range = getRange();
        return (
            <div className="side-app">
                <div className="page-header">Transactions</div>
                <div className="page-content">
                    <Card
                        title="Transactions table"
                        isPrint={true}
                        content={
                            <TransactionsList
                                isSum={true}
                                canDateSearch={true}
                                range={range}
                            />
                        }
                    />
                </div>
            </div>
        );
    }
}
