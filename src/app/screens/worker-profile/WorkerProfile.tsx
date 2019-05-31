import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { observer } from "mobx-react";
import "./WorkerProfile.scss";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { WorkerProfileStore } from ".";
import { WorkerForm } from "@app/components/worker-form";
import { Modal } from "@components/modal";
import { BindOperatorForm } from "./view";

@observer
@autobind
export class WorkerProfile extends Component<RouteProps> {
    private readonly store = new WorkerProfileStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.init();

        if (this.props.location) {
            const { id } = qs.parse(this.props.location.search);
            this.store.setWorkerId(id as string);
            this.store.getEmployee();
        }
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">CMS User</div>
                <div className="page-content">
                    <Card
                        className="residence-card"
                        title="Profile"
                        content={
                            <CustomForm
                                validateData={this.store.validateData}
                                data={this.store.transformData(this.store.getData())}
                                error$={this.store.error$}
                                submit={this.store.onSubmit}
                                render={this.getSettingsForm}
                            />
                        }
                    />
                </div>
                <Modal
                    title={"The selected residences are already assigned to the operator. " +
                    "Are you sure you want to remap the residence?"}
                    open={this.store.showModal()}
                    onClose={this.store.closeModal}
                    action={this.store.onUpdateWorker}
                    actionOptions={{
                        title: "Yes",
                    }}
                />
                <Modal
                    title={"You want to change the role of the user from Operator to Administrator. " +
                    "Select the reassignment of the Residence and the Clients"}
                    open={this.store.showBindOperatorModal()}
                    onClose={this.store.closeBindOperatorModal}
                >
                    {(close) => <BindOperatorForm
                        workerId={this.store.getWorkerId()}
                        onClose={close}
                        onEdit={this.store.onUpdateWorker}
                    />}
                </Modal>
            </div>
        );
    }

    private getSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <WorkerForm api={api} submitting={submitting || false} canCancel={true}/>
        );
    }
}
