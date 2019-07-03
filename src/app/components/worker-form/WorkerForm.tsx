import * as React from "react";
import { Component, ReactNode } from "react";
import { EmailField, InputField, MultiSelectField, PasswordField, SelectField } from "@components/fields";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { EWorkerFieldTypes } from "./EWorkerFieldTypes";
import { IWorkerData, IWorkerForm } from "./interfaces";
import { Button } from "@components/button";
import { redirectToWorkerList } from "@utils/history";
import "./WorkerForm.scss";
import { AppContext } from "@context";
import { ERole, Nullable } from "@app/config";
import { EStatus } from "@entities/user";
import { get, isEqual, toNumber } from "lodash";
import { FormRenderProps, FormSpy } from "react-final-form";
import { EMessages } from "@utils/EMessage";

@observer
@autobind
export class WorkerForm extends Component<IWorkerForm> {
    constructor(props: IWorkerForm) {
        super(props);
        AppContext.getInfoStore().getResidences();
    }

    render(): ReactNode {
        return (
            <div className="employee-form">
                {this.renderContainer("Profile Information", this.getProfileInfoFields())}
                {this.renderContainer("Role settings", this.getRoleSettingsFields())}
                <div/>
                <FormSpy
                    subscription={{
                        values: true,
                        modified: true,
                    }}
                    onChange={this.onChangeForm}
                />
            </div>
        );
    }

    private getProfileInfoFields(): ReactNode {
        return (
            <div>
                <InputField
                    label={"First name"}
                    name={EWorkerFieldTypes.FIRST_NAME}
                    placeholder={"Enter first name"}
                />
                <InputField
                    label={"Last name"}
                    name={EWorkerFieldTypes.LAST_NAME}
                    placeholder={"Enter last name"}
                />
                <EmailField name={EWorkerFieldTypes.EMAIL}/>
                <PasswordField
                    label="Password"
                    name={EWorkerFieldTypes.PASSWORD}
                />
                <PasswordField
                    label="Confirm Password"
                    name={EWorkerFieldTypes.CONFIRM_PASSWORD}
                    validate={(value, allValues: IWorkerData) => {
                        const { password } = allValues;
                        if (!password || !value) {
                            return void 0;
                        }
                        return this.validatePasswordValue(value, password);
                    }}
                />
            </div>
        );
    }

    private getRoleSettingsFields(): ReactNode {
        const { submitting, api } = this.props;
        const isCreate = !!~AppContext.getHistory().location.pathname.indexOf("create");
        return (
            <div>
                <SelectField
                    name={EWorkerFieldTypes.STATUS}
                    label={"Status"}
                    options={[
                        { id: EStatus.ACTIVE, title: "Active" },
                        { id: EStatus.INACTIVE, title: "Inactive" },
                    ]}
                    placeholder={"Select status"}
                />
                <SelectField
                    name={EWorkerFieldTypes.ROLE}
                    label={"Role"}
                    options={[
                        { id: ERole.ADMIN, title: "Admin" },
                        { id: ERole.OPERATOR, title: "Operator" },
                    ]}
                    placeholder={"Select role"}
                />
                <MultiSelectField
                    name={EWorkerFieldTypes.RESIDENCES_LIST}
                    label={"Sites list"}
                    options={AppContext.getInfoStore().residences}
                    placeholder={"Select sites list"}
                    disabled={!this.activeResidenceList(api)}
                />
                <div className="employee-form-button clearfix">
                    <Button
                        className="float-right"
                        type="secondary"
                        onClick={redirectToWorkerList}
                        text={"Cancel"}
                    />
                    <Button
                        className="float-right"
                        type="primary"
                        disabled={!submitting}
                        onClick={() => api.handleSubmit()}
                        text={isCreate ? "Create" : "Save"}
                        style={{
                            marginRight: 10,
                        }}
                    />
                </div>
            </div>
        );
    }

    private renderContainer(title: string, fields: ReactNode): ReactNode {
        return (
            <div className="employee-settings">
                <div className="employee-settings__title">{title}</div>
                <div className="employee-settings__container">
                    {fields}
                </div>
            </div>
        );
    }

    private activeResidenceList(api: Pick<FormRenderProps, "values">): boolean {
        const status = get(api.values, EWorkerFieldTypes.STATUS, EStatus.INACTIVE);
        const role = get(api.values, EWorkerFieldTypes.ROLE);
        return isEqual(status, EStatus.ACTIVE) && isEqual(toNumber(role), ERole.OPERATOR);
    }

    private onChangeForm(api: Pick<FormRenderProps, "values">): void {
        if (!this.activeResidenceList(api)) {
            this.props.api.form.change(EWorkerFieldTypes.RESIDENCES_LIST, void 0);
        }
    }

    private validatePasswordValue(value: string = "", password: string = ""): Nullable<string> {
        const MIN_LENGTH_PASSWORD = 6;
        if (!value) {
            return EMessages.EMPTY;
        }
        if (value.length < MIN_LENGTH_PASSWORD) {
            return EMessages.PASSWORD_INCORRECT;
        }
        if (value !== password) {
            return EMessages.PASSWORDS_INCORRECT;
        }
        return void 0;
    }
}
