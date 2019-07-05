import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { TransactionsList } from ".";
import { AppContext } from "@context";
import * as qs from "query-string";

export class Transactions extends Component {
    render(): ReactNode {
        let fromFilter = 0;
        let toFilter = 0;
        if (AppContext.getHistory().location) {
            const { from, to } = qs.parse(AppContext.getHistory().location.search);
            if (!!from && !!to) {
                fromFilter = parseInt(`${from}`, 10) / 1000;
                toFilter = parseInt(`${to}`, 10) / 1000;
            }
        }
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
                                range={{
                                    start: fromFilter,
                                    end: toFilter,
                                }}
                            />
                        }
                    />
                </div>
            </div>
        );
    }
}
