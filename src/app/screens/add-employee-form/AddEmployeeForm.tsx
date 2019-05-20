import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { FormRenderProps } from "react-final-form";
import { CustomForm } from "@components/custom-form";
import { AddEmployeeFormStore } from "./AddEmployeeFormStore";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { EmployeeForm } from "@app/components/employee-form";

@observer
@autobind
export class AddEmployeeForm extends Component<{}> {
    private readonly store = new AddEmployeeFormStore();

    constructor(props: {}) {
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
                                keepDirtyOnReinitialize={false}
                                validateData={this.store.validateData}
                                error$={this.store.error$}
                                submit={this.store.createUser}
                                render={(api, submitting) => this.renderEmployeeForm(api, submitting)}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private renderEmployeeForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <EmployeeForm api={api} submitting={submitting || false} canCancel={true}/>
        );
    }
}
