import { Component, ReactNode, Fragment } from "react";
import * as React from "react";
import { Card } from "@components/card";
import { InputField } from "@components/fields";
import { FormRenderProps } from "react-final-form";
import { redirectToUsersList } from "@utils/history";
import { CustomForm } from "@components/custom-form";
import { Button } from "@components/button";
import { AddUserFormStore } from "./AddUserFormStore";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { EUserFieldTypes, UserForm } from "@app/components/user-form";

@observer
@autobind
export class AddUserForm extends Component<{}> {
    private readonly store = new AddUserFormStore();

    constructor(props: {}) {
        super(props);
        this.store.init();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">New User</div>
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
                                    render={(api, submitting) => this.renderUserForm(api, submitting)}
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
                <UserForm passwordFields={
                    <InputField
                        label={"Password"}
                        name={EUserFieldTypes.PASSWORD}
                        type={"password"}
                        placeholder={"Enter password"}
                    />
                }/>
                <div className="profile-form-button clearfix">
                    <Button
                        className="btn btn-block float-right"
                        type="secondary"
                        onClick={() => redirectToUsersList()}
                        text={"Cancel"}
                    />
                    <Button
                        className="btn btn-block float-right"
                        type="primary"
                        disabled={!submitting}
                        onClick={() => api.handleSubmit()}
                        text={"Save"}
                        style={{
                            marginRight: 10
                        }}
                    />
                </div>
            </Fragment>
        );
    }
}
