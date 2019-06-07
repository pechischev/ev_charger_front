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
import { Modal } from "@components/modal";
import { redirectToSettings, redirectToWorkerList } from "@utils/history";

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
                <div className="page-header">
                    <div className="page-title">Add company user</div>
                    <div className="page-breadcrumb breadcrumb">
                        <div className="breadcrumb_root" onClick={redirectToSettings}>Settings</div>
                        <div className="breadcrumb_arrow"/>
                        <div className="breadcrumb_root" onClick={redirectToWorkerList}>CMS Users</div>
                        <div className="breadcrumb_arrow"/>
                        <div className="breadcrumb_child">Add company user</div>
                    </div>
                </div>
                <div className="page-content">
                    <Card
                        className="employee-info"
                        title="Add User"
                        content={
                            <CustomForm
                                validateData={this.store.validateData}
                                error$={this.store.error$}
                                submit={this.store.onSubmit}
                                render={this.renderEmployeeForm}
                            />
                        }
                    />
                </div>
                <Modal
                    title={"The selected residences are already assigned to the operator. " +
                    "Are you sure you want to remap the residence?"}
                    open={this.store.showModal()}
                    onClose={this.store.closeModal}
                    action={this.store.onCreateWorker}
                    actionOptions={{
                        title: "Yes"
                    }}
                />
            </div>
        );
    }

    private renderEmployeeForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <WorkerForm api={api} submitting={submitting || false} canCancel={true}/>
        );
    }
}
