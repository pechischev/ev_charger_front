import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { redirectToAddWorkerForm, redirectToWorkerForm } from "@utils/history";
import { Button } from "@components/button";
import { WorkersList } from "./WorkersList";
import "./Workers.scss";
import { WorkersStore } from "./WorkersStore";
import { autobind } from "core-decorators";
import { RouteProps } from "react-router";

@autobind
export class Workers extends Component<RouteProps> {
    private readonly store = new WorkersStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.init();
    }

    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">CMS Users</div>
                <div className="page-content">
                    <Card
                        title="Users list"
                        content={
                            <WorkersList
                                actionElement={actionElement}
                                onViewItem={redirectToWorkerForm}
                                onRemoveItem={this.store.removeWorker}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        return (
            <Button
                type="primary"
                onClick={redirectToAddWorkerForm}
                text={"Add company user"}
            />
        );
    }
}
