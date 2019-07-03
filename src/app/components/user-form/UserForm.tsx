import * as React from "react";
import { Component, ReactNode } from "react";
import { FormSpy } from "react-final-form";
import {
    EmailField,
    InputField,
    LicencePlateField,
    PhoneField,
    SelectField,
    YearField,
    ZipCodeField,
} from "@components/fields";
import { AppContext } from "@context";
import { FormState } from "final-form";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { get } from "lodash";
import { IUserForm } from "./interfaces";
import { EUserFieldTypes } from "./EUserFieldTypes";
import "./UserForm.scss";

@observer
@autobind
export class UserForm extends Component<IUserForm> {
    constructor(props: IUserForm) {
        super(props);

        AppContext.getInfoStore().getResidences();
        AppContext.getInfoStore().getStates();
        AppContext.getInfoStore().getMakes();
    }

    render(): ReactNode {
        return (
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
        );
    }

    private onChangeData(state: FormState): void {
        if (get(state.modified, EUserFieldTypes.MAKES)) {
            const makesId = get(state.values, EUserFieldTypes.MAKES);
            AppContext.getInfoStore().getModels(makesId);
        }
    }

    private getProfileInfoFields(): ReactNode {
        const { passwordFields } = this.props;
        const readonly = !AppContext.getUserStore().isAdmin();
        return (
            <div className="profile-form-fields_block">
                <InputField
                    label={"First name"}
                    name={EUserFieldTypes.FIRST_NAME}
                    placeholder={"Enter first name"}
                    disabled={readonly}
                />
                <InputField
                    label={"Last name"}
                    name={EUserFieldTypes.LAST_NAME}
                    placeholder={"Enter last name"}
                    disabled={readonly}
                />
                <EmailField
                    name={EUserFieldTypes.EMAIL}
                    disabled={readonly}
                />
                <PhoneField
                    name={EUserFieldTypes.PHONE}
                    disabled={readonly}
                />
                <SelectField
                    label={"Site"}
                    name={EUserFieldTypes.RESIDENCE}
                    placeholder={"Select site"}
                    options={AppContext.getInfoStore().residences}
                    disabled={readonly}
                />
                {passwordFields}
            </div>
        );
    }

    private getMailingAddressFields(): ReactNode {
        const readonly = !AppContext.getUserStore().isAdmin();
        return (
            <div className="profile-form-fields_block">
                <InputField
                    label={"Address"}
                    name={EUserFieldTypes.ADDRESS}
                    placeholder={"Enter address"}
                    disabled={readonly}
                />
                <InputField
                    label={"Apt/Unit"}
                    name={EUserFieldTypes.APT_UNIT}
                    placeholder={"Enter apt/unit"}
                    disabled={readonly}
                />
                <InputField
                    label={"City"}
                    name={EUserFieldTypes.CITY}
                    placeholder={"Enter city"}
                    disabled={readonly}
                />
                <ZipCodeField
                    name={EUserFieldTypes.ZIP_CODE}
                    disabled={readonly}
                />
                <SelectField
                    label={"State"}
                    name={EUserFieldTypes.STATE}
                    placeholder={"Select state"}
                    options={AppContext.getInfoStore().states}
                    disabled={readonly}
                />
            </div>
        );
    }

    private getVehicleFields(): ReactNode {
        const readonly = !AppContext.getUserStore().isAdmin();
        return (
            <div className="profile-form-fields_block">
                <SelectField
                    label={"Makes"}
                    name={EUserFieldTypes.MAKES}
                    placeholder={"Select make"}
                    options={AppContext.getInfoStore().makes}
                    disabled={readonly}
                />
                <SelectField
                    label={"Model"}
                    name={EUserFieldTypes.MODEL}
                    placeholder={"Select model"}
                    options={AppContext.getInfoStore().models}
                    disabled={readonly}
                />
                <YearField
                    name={EUserFieldTypes.YEAR}
                    disabled={readonly}
                />
                <LicencePlateField
                    name={EUserFieldTypes.LICENSE_PLATE}
                    disabled={readonly}
                />
            </div>
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
