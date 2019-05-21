import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { redirectToAddWorkerForm } from "@utils/history";
import { Button } from "@components/button";
import { WorkersList } from "./WorkersList";
import "./Workers.scss";

export class Workers extends Component {
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
