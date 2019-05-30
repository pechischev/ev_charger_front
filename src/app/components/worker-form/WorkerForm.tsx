import * as React from "react";
import { Component, ReactNode } from "react";
import { EmailField, InputField, MultiSelectField, PasswordField, SelectField } from "@components/fields";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { EWorkerFieldTypes } from "./EWorkerFieldTypes";
import { IWorkerForm } from "./interfaces";
import { Button } from "@components/button";
import { redirectToWorkerList } from "@utils/history";
import "./WorkerForm.scss";
import { AppContext } from "@context";
import { ERole } from "@app/config";
import { EStatus } from "@entities/user";

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
                />
            </div>
        );
    }

    private getRoleSettingsFields(): ReactNode {
        const { submitting, api } = this.props;
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
                    label={"Residences list"}
                    options={AppContext.getInfoStore().residences}
                    placeholder={"Select residences list"}
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
