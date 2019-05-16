import * as React from "react";
import { Component, ReactNode, Fragment } from "react";
import { InputField, SelectField } from "@components/fields";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps, FormSpy } from "react-final-form";
import "./ProfileTab.scss";
import { ICustomer } from "@entities/customer";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { ProfileTabStore } from "./ProfileTabStore";
import { AppContext } from "@context";
import { Button } from "@components/button";
import { FormState } from "final-form";
import { get } from "lodash";
import { EFieldTypes } from "@app/screens/add-user-form/constants";
import { IItem } from "@entities/_common";

interface IProfileProps {
    data?: ICustomer;
    userId?: string;

    models: IItem[];
}

@observer
@autobind
export class ProfileTab extends Component<IProfileProps> {
    private readonly store = new ProfileTabStore();

    constructor(props: IProfileProps) {
        super(props);
        this.store.init();
    }

    render(): ReactNode {
        const {userId} = this.props;

        return (
            <div className="tab-container-profile">
                <CustomForm
                    error$={this.store.error$}
                    validateData={this.store.validateData}
                    keepDirtyOnReinitialize={false}
                    data={this.store.transformUserData(this.props.data)}
                    submit={(data) => this.store.updateUser(data, userId as string)}
                    render={(api, submitting) => this.getSettingsForm(api, submitting)}
                />
            </div>
        );
    }

    private getSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <Fragment>
                <div className="profile-form-fields">
                    {this.renderContainer("Profile Information", this.getProfileInfoFields())}
                    {this.renderContainer("Mailing address", this.getMailingAddressFields())}
                    {this.renderContainer("Vehicle", this.getVehicleFields())}
                    <FormSpy
                        onChange={this.onChangeData}
                        subscription={{
                            values: true,
                            modified: true,
                        }}
                    />
                </div>
                <div className="profile-form-button clearfix">
                    <Button
                        className="btn-primary btn-block float-right"
                        disabled={!submitting}
                        onClick={() => api.handleSubmit()}
                        text={"Save"}
                    />
                </div>
            </Fragment>
        );
    }

    private onChangeData(state: FormState): void {
        if (get(state.modified, EFieldTypes.MAKES)) {
            const makesId = get(state.values, EFieldTypes.MAKES);
            AppContext.getInfoStore().getModels(makesId);
        }
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
                <SelectField
                    label={"Residence"}
                    name={EFieldTypes.RESIDENCE}
                    placeholder={"Select residence"}
                    options={AppContext.getInfoStore().residences}
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
                <SelectField
                    label={"State"}
                    name={EFieldTypes.STATE}
                    placeholder={"Select state"}
                    options={AppContext.getInfoStore().states}
                />
            </Fragment>
        );
    }

    private getVehicleFields(): ReactNode {
        return (
            <Fragment>
                <SelectField
                    label={"Makes"}
                    name={EFieldTypes.MAKES}
                    placeholder={"Select make"}
                    options={AppContext.getInfoStore().makes}
                />
                <SelectField
                    label={"Model"}
                    name={EFieldTypes.MODEL}
                    placeholder={"Select model"}
                    options={this.props.models}
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
