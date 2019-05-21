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
                                keepDirtyOnReinitialize={false}
                                validateData={this.store.validateData}
                                data={this.store.transformData(this.store.getData())}
                                error$={this.store.error$}
                                submit={this.store.updateWorker}
                                render={this.getSettingsForm}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private getSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <WorkerForm api={api} submitting={submitting || false} canCancel={true}/>
        );
    }
}
