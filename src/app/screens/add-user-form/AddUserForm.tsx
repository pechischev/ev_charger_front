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
import { EFieldTypes } from "./constants";

@observer
@autobind
export class AddUserForm extends Component {
    private readonly store = new AddUserFormStore();

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
                <div className="profile-form-fields">
                    {this.renderContainer("Profile Information", this.getProfileInfoFields())}
                    {this.renderContainer("Mailing address", this.getMailingAddressFields())}
                    {this.renderContainer("Vehicle", this.getVehicleFields())}
                </div>
                <div className="profile-form-button clearfix">
                    <Button
                        className="btn-secondary float-right"
                        onClick={() => redirectToUsersList()}
                        text={"Cancel"}
                    />
                    <Button
                        className="btn-primary float-right"
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

    private getProfileInfoFields(): ReactNode {
        return (
            <Fragment>
                <InputField
                    label={"First name"}
                    name={EFieldTypes.FIRST_NAME}
                    placeholder={"Enter first name"}
                />
                <InputField
                    label={"Last name"}
                    name={EFieldTypes.LAST_NAME}
                    placeholder={"Enter email"}
                />
                <InputField
                    label={"Email address"}
                    name={EFieldTypes.EMAIL}
                    placeholder={"Enter email"}
                />
                <InputField
                    label={"Phone number"}
                    name={EFieldTypes.PHONE}
                    placeholder={"Enter phone"}
                />
                <InputField
                    label={"Residence"}
                    name={EFieldTypes.RESIDENCE}
                    placeholder={"Enter residence"}
                />
                <InputField
                    label={"Password"}
                    name={EFieldTypes.PASSWORD}
                    type={"password"}
                    placeholder={"Enter password"}
                />
            </Fragment>
        );
    }

    private getMailingAddressFields(): ReactNode {
        return (
            <Fragment>
                <InputField
                    label={"Address"}
                    name={EFieldTypes.ADDRESS}
                    placeholder={"Enter address"}
                />
                <InputField
                    label={"Apt/Unit"}
                    name={EFieldTypes.APT_UNIT}
                    placeholder={"Enter apt/unit"}
                />
                <InputField
                    label={"City"}
                    name={EFieldTypes.CITY}
                    placeholder={"Enter city"}
                />
                <InputField
                    label={"Zip code"}
                    name={EFieldTypes.ZIP_CODE}
                    placeholder={"Enter zip code"}
                />
                <InputField
                    label={"State"}
                    name={EFieldTypes.STATE}
                    placeholder={"Enter state"}
                />
            </Fragment>
        );
    }

    private getVehicleFields(): ReactNode {
        return (
            <Fragment>
                <InputField
                    label={"Makes"}
                    name={EFieldTypes.MAKES}
                    placeholder={"Enter makes"}
                />
                <InputField
                    label={"Model"}
                    name={EFieldTypes.MODEL}
                    placeholder={"Enter model"}
                />
                <InputField
                    label={"Year"}
                    name={EFieldTypes.YEAR}
                    placeholder={"Enter year"}
                />
                <InputField
                    label={"Licence plate"}
                    name={EFieldTypes.LICENSE_PLATE}
                    placeholder={"Enter licence plate"}
                />
            </Fragment>
        );
    }

    private renderContainer(title: string, fields: ReactNode): ReactNode {
        return (
            <div className="profile-settings">
                <div className="profile-settings__title">{title}</div>
                <div className="profile-settings__container">
                    {fields}
                </div>
            </div>
        );
    }
}
