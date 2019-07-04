import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { redirectToAddWorkerForm, redirectToSettings, redirectToWorkerForm } from "@utils/history";
import { Button } from "@components/button";
import { WorkersList } from "./WorkersList";
import "./Workers.scss";
import { WorkersStore } from "./WorkersStore";
import { autobind } from "core-decorators";
import { RouteProps } from "react-router";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";

@autobind
export class Workers extends Component<RouteProps> {
    private readonly store = new WorkersStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Settings", handler: redirectToSettings },
        { label: "CMS Users" },
    ];
    constructor(props: RouteProps) {
        super(props);
        this.store.init();
    }

    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">CMS Users</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Users list"
                        isPrint={true}
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
