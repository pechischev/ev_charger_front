import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { Card } from "@components/card";
import { PasswordField } from "@components/fields";
import { FormRenderProps } from "react-final-form";
import { redirectToUsersList } from "@utils/history";
import { CustomForm } from "@components/custom-form";
import { Button } from "@components/button";
import { AddUserFormStore } from "./AddUserFormStore";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { EUserFieldTypes, UserForm } from "@app/components/user-form";
import { RouteProps } from "react-router";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";

@observer
@autobind
export class AddUserForm extends Component<RouteProps> {
    private readonly store = new AddUserFormStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Users", handler: redirectToUsersList },
        { label: "New User" },
    ];
    constructor(props: RouteProps) {
        super(props);
        this.store.init();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">New User</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        className="customer-info"
                        content={
                            <div className="tab-container-profile">
                                <CustomForm
                                    keepDirtyOnReinitialize={false}
                                    validateData={this.store.validateData}
                                    error$={this.store.error$}
                                    submit={this.store.createUser}
                                    render={this.renderUserForm}
                                />
                            </div>
                        }
                    />
                </div>
            </div>
        );
    }

    private renderUserForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <Fragment>
                <UserForm
                    passwordFields={
                        <PasswordField
                            label={"Password"}
                            name={EUserFieldTypes.PASSWORD}
                        />
                    }
                />
                <div className="profile-form-button clearfix">
                    <Button
                        className="float-right"
                        type="secondary"
                        onClick={redirectToUsersList}
                        text={"Cancel"}
                    />
                    <Button
                        className="float-right"
                        type="primary"
                        disabled={!submitting}
                        onClick={() => api.handleSubmit()}
                        text={"Save"}
                        style={{
                            marginRight: 10,
                        }}
                    />
                </div>
            </Fragment>
        );
    }
}
