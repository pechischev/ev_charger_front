import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import "./Dashboard.scss";
import { Button } from "@components/button";
import {
    redirectToActiveResidence,
    redirectToActiveUsers,
    redirectToTransactionList, redirectToTransactionsThisMonth,
    redirectToUsersThisMonth,
} from "@utils/history";
import { LastTransactionsList } from ".";
import { LineChart } from "@components/chart";
import { DashboardStore } from "./DashboardStore";
import { RouteProps } from "react-router";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Nullable } from "@app/config";
import { AppContext } from "@context";

@autobind
@observer
export class Dashboard extends Component<RouteProps> {
    private readonly store = new DashboardStore();

    constructor(props: RouteProps) {
        super(props);

        this.store.init();
        this.store.getStatistics();
        this.store.getReportData();
    }

    render(): ReactNode {
        const date = new Date();
        const thisMonth = date.getMonth();
        const thisYear = date.getFullYear();
        const toDay = (new Date(thisYear, thisMonth + 1, 0)).getDate();
        const from = new Date(thisYear, thisMonth, 1).getTime();
        const to = new Date(thisYear, thisMonth, toDay).getTime();
        const actionElement = this.getActionElement();
        const { userCount, amountSum, countNewUsers, residenceCount } = this.store.getStatisticsData();
        const iaAdmin = AppContext.getUserStore().isAdmin();
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Dashboard</div>
                </div>
                <div className="page-content">
                    <div className="dashboard-main-cards" data-full={iaAdmin}>
                        <Card
                            className="main-cards"
                            content={this.renderMainCard(
                                residenceCount || 0,
                                "Number of active sites",
                                "site",
                            )}
                            onClick={redirectToActiveResidence}
                        />
                        <Card
                            className="main-cards"
                            content={this.renderMainCard(
                                userCount || 0,
                                "Number of active users",
                                "users",
                            )}
                            onClick={redirectToActiveUsers}
                        />
                        <Card
                            className="main-cards"
                            content={this.renderMainCard(
                                countNewUsers || 0,
                                "Number of new users this month",
                                "new-users",
                            )}
                            onClick={() => redirectToUsersThisMonth(from, to)}
                        />
                        <Card
                            className="main-cards"
                            content={this.renderMainCard(
                                `$ ${amountSum || 0}`,
                                "Total revenue this month",
                                "revenue",
                            )}
                            onClick={() => redirectToTransactionsThisMonth(from, to)}
                        />
                    </div>
                    <Card
                        className={`dashboard-graph ${!this.store.isExistData() ? "dashboard-graph_hidden" : ""}`}
                        title="Statistics"
                        content={this.renderGraph()}
                    />
                    <Card
                        className="dashboard-table"
                        title="Last transactions"
                        content={
                            <LastTransactionsList
                                step={10}
                                canSearch={false}
                                actionElement={actionElement}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private renderMainCard(value: string | number, title: string, icon: string): ReactNode {
        return (
            <div className="main-card">
                <div className="main-card_description">
                    <div className="main-card__title">{title}</div>
                    <div className="main-card__value">{value}</div>
                </div>
                <div className="main-card_icon" data-image={icon}/>
            </div>
        );
    }

    private renderGraph(): Nullable<ReactNode> {
        if (!this.store.isExistData()) {
            return null;
        }
        const data = this.store.getData();
        return (
            <div
                style={{
                    width: "100%",
                    height: 400,
                    display: "flex",
                }}
            >
                <LineChart data={data}/>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        const iaAdmin = AppContext.getUserStore().isAdmin();
        return (
            <Button
                type={"primary"}
                onClick={redirectToTransactionList}
                text="See more"
                disabled={!iaAdmin}
            />
        );
    }
}
