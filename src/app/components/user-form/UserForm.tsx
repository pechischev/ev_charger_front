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
    ZipCodeField,
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
        return (
            <Fragment>
                <InputField
                    label={"First name"}
                    name={EUserFieldTypes.FIRST_NAME}
                    placeholder={"Enter first name"}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <InputField
                    label={"Last name"}
                    name={EUserFieldTypes.LAST_NAME}
                    placeholder={"Enter last name"}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <EmailField
                    name={EUserFieldTypes.EMAIL}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <PhoneField
                    name={EUserFieldTypes.PHONE}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <SelectField
                    label={"Residence"}
                    name={EUserFieldTypes.RESIDENCE}
                    placeholder={"Select residence"}
                    options={AppContext.getInfoStore().residences}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                {passwordFields}
            </Fragment>
        );
    }

    private getMailingAddressFields(): ReactNode {
        return (
            <Fragment>
                <InputField
                    label={"Address"}
                    name={EUserFieldTypes.ADDRESS}
                    placeholder={"Enter address"}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <InputField
                    label={"Apt/Unit"}
                    name={EUserFieldTypes.APT_UNIT}
                    placeholder={"Enter apt/unit"}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <InputField
                    label={"City"}
                    name={EUserFieldTypes.CITY}
                    placeholder={"Enter city"}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <ZipCodeField
                    name={EUserFieldTypes.ZIP_CODE}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <SelectField
                    label={"State"}
                    name={EUserFieldTypes.STATE}
                    placeholder={"Select state"}
                    options={AppContext.getInfoStore().states}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
            </Fragment>
        );
    }

    private getVehicleFields(): ReactNode {
        return (
            <Fragment>
                <SelectField
                    label={"Makes"}
                    name={EUserFieldTypes.MAKES}
                    placeholder={"Select make"}
                    options={AppContext.getInfoStore().makes}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <SelectField
                    label={"Model"}
                    name={EUserFieldTypes.MODEL}
                    placeholder={"Select model"}
                    options={AppContext.getInfoStore().models}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <YearField
                    name={EUserFieldTypes.YEAR}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <LicencePlateField
                    name={EUserFieldTypes.LICENSE_PLATE}
                    disabled={!AppContext.getUserStore().isAdmin()}
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
