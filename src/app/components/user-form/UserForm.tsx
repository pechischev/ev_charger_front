import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { FormSpy } from "react-final-form";
import {
    EmailField,
    InputField,
    LicencePlateField,
    PhoneField,
    SelectField,
    YearField,
    ZipCodeField
} from "@components/fields";
import { AppContext } from "@context";
import { FormState } from "final-form";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { get } from "lodash";
import { IUserForm } from "./interfaces";
import { EUserFieldTypes } from "./EUserFieldTypes";

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
                <EmailField name={ EUserFieldTypes.EMAIL } />
                <PhoneField name={ EUserFieldTypes.PHONE } />
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
                <ZipCodeField name={ EUserFieldTypes.ZIP_CODE }/>
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
                <YearField name={ EUserFieldTypes.YEAR } />
                <LicencePlateField name={ EUserFieldTypes.LICENSE_PLATE } />
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
}
