import * as React from "react";
import { Component, ReactNode } from "react";
import { EmailField, InputField, PasswordField, SelectField } from "@components/fields";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { EEmployeeFieldTypes } from "./EEmployeeFieldTypes";
import { IEmployeeForm } from "./interfaces";
import { Button } from "@components/button";
import { redirectToEmployeeListSettings } from "@utils/history";
import "./EmployeeForm.scss";
import { AppContext } from "@context";

@observer
@autobind
export class EmployeeForm extends Component<IEmployeeForm> {
    constructor(props: IEmployeeForm) {
        super(props);

        AppContext.getInfoStore().getStates();
    }

    render(): ReactNode {
        return (
            <div className="employee-form">
                {this.renderContainer("Profile Information", this.getProfileInfoFields())}
                {this.renderContainer("Role settings", this.getRoleSettingsFields())}
                <div />
            </div>
        );
    }

    private getProfileInfoFields(): ReactNode {
        return (
            <div>
                <InputField
                    label={"First name"}
                    name={EEmployeeFieldTypes.FIRST_NAME}
                    placeholder={"Enter first name"}
                />
                <InputField
                    label={"Last name"}
                    name={EEmployeeFieldTypes.LAST_NAME}
                    placeholder={"Enter last name"}
                />
                <EmailField name={EEmployeeFieldTypes.EMAIL}/>
                <PasswordField
                    label="Password"
                    name={EEmployeeFieldTypes.PASSWORD}
                />
                <PasswordField
                    label="Confirm Password"
                    name={EEmployeeFieldTypes.CONFIRM_PASSWORD}
                />
            </div>
        );
    }

    private getRoleSettingsFields(): ReactNode {
        const { submitting, api } = this.props;
        return (
            <div>
                <SelectField
                    name={EEmployeeFieldTypes.STATUS}
                    label={"Status"}
                    options={AppContext.getInfoStore().states}
                    placeholder={"Select status"}
                />
                <SelectField
                    name={EEmployeeFieldTypes.ROLE}
                    label={"Role"}
                    options={AppContext.getInfoStore().states}
                    placeholder={"Select role"}
                />
                <SelectField
                    name={EEmployeeFieldTypes.RESIDENCES_LIST}
                    label={"Residences list"}
                    options={AppContext.getInfoStore().states}
                    placeholder={"Select residences list"}
                />
                <div className="employee-form-button clearfix">
                    <Button
                        className="float-right"
                        type="secondary"
                        onClick={() => redirectToEmployeeListSettings()}
                        text={"Cancel"}
                    />
                    <Button
                        className="float-right"
                        type="primary"
                        disabled={!submitting}
                        onClick={() => api.handleSubmit()}
                        text="Create"
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
}
