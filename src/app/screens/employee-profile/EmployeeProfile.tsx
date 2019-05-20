import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { observer } from "mobx-react";
import "./EmployeeProfile.scss";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { EmployeeProfileStore } from ".";
import { EmployeeForm } from "@app/components/employee-form";
import { IEmployee } from "@entities/company-employees";

@observer
@autobind
export class EmployeeProfile extends Component<RouteProps> {
    private readonly store = new EmployeeProfileStore();

    constructor(props: RouteProps) {
        super(props);
        this.store.init();

        if (this.props.location) {
            const { id } = qs.parse(this.props.location.search);
            this.store.getEmployee(id as string);
            this.store.setEmployeeId(id as string);
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
                                data={{} as IEmployee}
                                error$={this.store.error$}
                                submit={this.store.updateEmployee}
                                render={(api, submitting) => this.getSettingsForm(api, submitting)}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private getSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <EmployeeForm api={api} submitting={submitting || false} canCancel={true}/>
        );
    }
}
