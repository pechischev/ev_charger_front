import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { FormRenderProps } from "react-final-form";
import { CustomForm } from "@components/custom-form";
import { AddWorkerFormStore } from "./AddWorkerFormStore";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { WorkerForm } from "@app/components/worker-form";
import { RouteProps } from "react-router";

@observer
@autobind
export class AddWorkerForm extends Component<RouteProps> {
    private readonly store = new AddWorkerFormStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.init();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">Add company user</div>
                <div className="page-content">
                    <Card
                        className="employee-info"
                        title="Add User"
                        content={
                            <CustomForm
                                validateData={this.store.validateData}
                                error$={this.store.error$}
                                submit={this.store.createWorker}
                                render={this.renderEmployeeForm}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private renderEmployeeForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <WorkerForm api={api} submitting={submitting || false} canCancel={true}/>
        );
    }
}
