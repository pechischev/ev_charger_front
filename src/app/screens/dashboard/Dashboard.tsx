import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import "./Dashboard.scss";
import { Button } from "@components/button";
import { redirectToTransactionList } from "@utils/history";
import { LastTransactionsList } from ".";

export class Dashboard extends Component {
    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Dashboards</div>
                </div>
                <div className="page-content">
                    <div className="dashboard-main-cards">
                        <Card
                            className="main-cards"
                            content={this.renderMainCard(
                                "25",
                                "Number of active residences",
                                "residence",
                            )}
                        />
                        <Card
                            className="main-cards"
                            content={this.renderMainCard(
                                "25",
                                "Number of active users",
                                "users",
                            )}
                        />
                        <Card
                            className="main-cards"
                            content={this.renderMainCard(
                                "25",
                                "Number of new users this month",
                                "new-users",
                            )}
                        />
                        <Card
                            className="main-cards"
                            content={this.renderMainCard(
                                `${25}$`,
                                "Total revenue this month",
                                "revenue",
                            )}
                        />
                    </div>
                    <Card
                        className="dashboard-graph"
                        title="Statistics"
                        content={this.renderGraph}
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

    private renderMainCard(value: string, title: string, icon: string): ReactNode {
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

    private renderGraph(): ReactNode {
        return void 0;
    }

    private getActionElement(): ReactNode {
        return (
            <Button
                type={"primary"}
                onClick={redirectToTransactionList}
                text="See more"
            />
        );
    }
}
