import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { FormSpy } from "react-final-form";
import { InputField, SelectField } from "@components/fields";
import { AppContext } from "@context";
import { FormState } from "final-form";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { get } from "lodash";
import { IUserForm } from "./interfaces";
import { EUserFieldTypes } from "./EUserFieldTypes";
import { EMessages } from "@utils/EMessage";

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
                { this.renderContainer("Profile Information", this.getProfileInfoFields()) }
                { this.renderContainer("Mailing address", this.getMailingAddressFields()) }
                { this.renderContainer("Vehicle", this.getVehicleFields()) }
                <FormSpy
                    onChange={ this.onChangeData }
                    subscription={ {
                        values: true,
                        modified: true,
                    } }
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
        return (
            <Fragment>
                <InputField
                    label={ "First name" }
                    name={ EUserFieldTypes.FIRST_NAME }
                    placeholder={ "Enter first name" }
                />
                <InputField
                    label={ "Last name" }
                    name={ EUserFieldTypes.LAST_NAME }
                    placeholder={ "Enter last name" }
                />
                <InputField
                    label={ "Email address" }
                    name={ EUserFieldTypes.EMAIL }
                    placeholder={ "Enter email" }
                    validate={ (value) => this.validateEmailValue(value) }
                />
                <InputField
                    label={ "Phone number" }
                    name={ EUserFieldTypes.PHONE }
                    placeholder={ "Enter phone" }
                    mask={ "+9 (999) 999 99-99" }
                    validate={ (value) => this.validatePhoneValue(value) }
                    parse={(value) => {
                        return this.formatPhoneValue(value);
                    }}
                />
                <SelectField
                    label={ "Residence" }
                    name={ EUserFieldTypes.RESIDENCE }
                    placeholder={ "Select residence" }
                    options={ AppContext.getInfoStore().residences }
                />
                { passwordFields }
            </Fragment>
        );
    }

    private getMailingAddressFields(): ReactNode {
        return (
            <Fragment>
                <InputField
                    label={ "Address" }
                    name={ EUserFieldTypes.ADDRESS }
                    placeholder={ "Enter address" }
                />
                <InputField
                    label={ "Apt/Unit" }
                    name={ EUserFieldTypes.APT_UNIT }
                    placeholder={ "Enter apt/unit" }
                />
                <InputField
                    label={ "City" }
                    name={ EUserFieldTypes.CITY }
                    placeholder={ "Enter city" }
                />
                <InputField
                    label={ "Zip code" }
                    name={ EUserFieldTypes.ZIP_CODE }
                    placeholder={ "Enter zip code" }
                    mask={ "99999" }
                    validate={ (value) => this.validateZipCodeValue(value) }
                />
                <SelectField
                    label={ "State" }
                    name={ EUserFieldTypes.STATE }
                    placeholder={ "Select state" }
                    options={ AppContext.getInfoStore().states }
                />
            </Fragment>
        );
    }

    private getVehicleFields(): ReactNode {
        return (
            <Fragment>
                <SelectField
                    label={ "Makes" }
                    name={ EUserFieldTypes.MAKES }
                    placeholder={ "Select make" }
                    options={ AppContext.getInfoStore().makes }
                />
                <SelectField
                    label={ "Model" }
                    name={ EUserFieldTypes.MODEL }
                    placeholder={ "Select model" }
                    options={ AppContext.getInfoStore().models }
                />
                <InputField
                    label={ "Year" }
                    name={ EUserFieldTypes.YEAR }
                    placeholder={ "Enter year" }
                    mask={ "9999" }
                    validate={ (value) => this.validateYearValue(value) }
                />
                <InputField
                    label={ "Licence plate" }
                    name={ EUserFieldTypes.LICENSE_PLATE }
                    placeholder={ "Enter licence plate" }
                    mask={ "AAAAAAAA" }
                />
            </Fragment>
        );
    }

    private renderContainer(title: string, fields: ReactNode): ReactNode {
        return (
            <div className="profile-settings">
                <div className="profile-settings__title">{ title }</div>
                <div className="profile-settings__container">
                    { fields }
                </div>
            </div>
        );
    }

    private validatePhoneValue(value: string): string {
        if (!value) {
            return EMessages.EMPTY;
        }
        const phone = value.replace(/[^\d]/g, "");
        if (phone.length !== 11 || phone.charAt(0) !== "1") {
            return EMessages.PHONE_LENGTH;
        }
        if (isNaN(parseInt(phone, 10))) {
            return EMessages.ONLY_NUMBER;
        }
        return "";
    }

    private validateZipCodeValue(value: any): string {
        if (!value) {
            return EMessages.EMPTY;
        }
        if (isNaN(value)) {
            return EMessages.ONLY_NUMBER;
        }
        return "";
    }

    private validateEmailValue(value: string = ""): string {
        if (value.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === -1) {
            return EMessages.EMAIL_INCORRECT;
        }
        return "";
    }

    private validateYearValue(value: string): string {
        if (!value) {
            return EMessages.EMPTY;
        }
        if (parseInt(value, 10) < 2000 || parseInt(value, 10) > (new Date()).getFullYear()) {
            return ("Year can be from 2000 to " + (new Date()).getFullYear());
        }
        if (isNaN(parseInt(value, 10))) {
            return EMessages.ONLY_NUMBER;
        }
        return "";
    }

    private formatPhoneValue(value: string): string {
        if (!value) {
            return value;
        }
        return value.replace(/[^\d]/g, "")
    }
}
