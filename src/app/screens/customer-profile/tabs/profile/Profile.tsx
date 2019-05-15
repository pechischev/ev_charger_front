import * as React from "react";
import { Component, ReactNode } from "react";
import { InputField } from "@components/fields";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import "./Profile.scss";
import { ICustomer } from "@entities/customer";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { ProfileStore } from "./ProfileStore";
import { EFormTypes } from "@app/config";

interface IProfileProps {
    data?: ICustomer;
}

@observer
@autobind
export class Profile extends Component<IProfileProps> {
    private readonly store = new ProfileStore();

    render(): ReactNode {
        return (
            <div className="tab-container-profile">
                <CustomForm
                    error$={this.store.error$}
                    validateData={this.validateData}
                    keepDirtyOnReinitialize={false}
                    data={this.props.data}
                    submit={this.onSave}
                    render={(api, submitting) => this.getSettingsForm(api, submitting)}
                />
            </div>
        );
    }

    private validateData() {
        return ([
            {type: EFormTypes.FIRST_NAME, codes: []},
            {type: EFormTypes.LAST_NAME, codes: []},
            {type: EFormTypes.EMAIL, codes: [15]},
            {type: EFormTypes.PHONE, codes: [19]},
            {type: EFormTypes.RESIDENCE, codes: []},
            {type: EFormTypes.NEW_PASSWORD, codes: [17, 20]},
            {type: EFormTypes.CONFIRM_PASSWORD, codes: [20]},
            {type: EFormTypes.ADDRESS, codes: []},
            {type: EFormTypes.APT_UNIT, codes: []},
            {type: EFormTypes.CITY, codes: []},
            {type: EFormTypes.ZIP_CODE, codes: []},
            {type: EFormTypes.STATE, codes: []},
            {type: EFormTypes.MAKES, codes: []},
            {type: EFormTypes.MODEL, codes: []},
            {type: EFormTypes.YEAR, codes: []},
            {type: EFormTypes.LICENSE_PLATE, codes: []},
        ]);
    }

    private getSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <>
                <div className="profile-form-fields">
                    <div className="profile-settings">
                        <div className="profile-settings__title">Profile Info</div>
                        <div className="profile-settings__container">
                            {this.getProfileInfoFields()}
                        </div>
                    </div>
                    <div className="profile-settings">
                        <div className="profile-settings__title">Mailing address</div>
                        <div className="profile-settings__container">
                            {this.getMailingAddressFields()}
                        </div>
                    </div>
                    <div className="profile-settings">
                        <div className="profile-settings__title">Vehicle</div>
                        <div className="profile-settings__container">
                            {this.getVehicleFields()}
                        </div>
                    </div>
                </div>
                <div className="profile-form-button clearfix">
                    <button
                        className="btn btn-secondary btn-block float-right"
                        onClick={() => api.handleSubmit()}
                    >
                        Save
                    </button>
                </div>
            </>
        );
    }

    private getProfileInfoFields(): ReactNode {
        return (
            <>
                <InputField
                    label={"First name"}
                    name={EFormTypes.FIRST_NAME}
                    placeholder={"Enter first name"}
                />
                <InputField
                    label={"Last name"}
                    name={EFormTypes.LAST_NAME}
                    placeholder={"Enter email"}
                />
                <InputField
                    label={"Email address"}
                    name={EFormTypes.EMAIL}
                    placeholder={"Enter email"}
                />
                <InputField
                    label={"Phone number"}
                    name={EFormTypes.PHONE}
                    placeholder={"Enter phone"}
                />
                <InputField
                    label={"Residence"}
                    name={EFormTypes.RESIDENCE}
                    placeholder={"Enter residence"}
                />
                <InputField
                    label={"New password"}
                    name={EFormTypes.NEW_PASSWORD}
                    type={"password"}
                    placeholder={"Enter new password"}
                />
                <InputField
                    label={"Confirm Password"}
                    name={EFormTypes.CONFIRM_PASSWORD}
                    type={"password"}
                    placeholder={"Enter confirm password"}
                />
            </>
        );
    }

    private getMailingAddressFields(): ReactNode {
        return (
            <>
                <InputField
                    label={"Address"}
                    name={EFormTypes.ADDRESS}
                    placeholder={"Enter address"}
                />
                <InputField
                    label={"Apt/Unit"}
                    name={EFormTypes.APT_UNIT}
                    placeholder={"Enter apt/unit"}
                />
                <InputField
                    label={"City"}
                    name={EFormTypes.CITY}
                    placeholder={"Enter city"}
                />
                <InputField
                    label={"Zip code"}
                    name={EFormTypes.ZIP_CODE}
                    placeholder={"Enter zip code"}
                />
                <InputField
                    label={"State"}
                    name={EFormTypes.STATE}
                    placeholder={"Enter state"}
                />
            </>
        );
    }

    private getVehicleFields(): ReactNode {
        return (
            <>
                <InputField
                    label={"Makes"}
                    name={EFormTypes.MAKES}
                    placeholder={"Enter makes"}
                />
                <InputField
                    label={"Model"}
                    name={EFormTypes.MODEL}
                    placeholder={"Enter model"}
                />
                <InputField
                    label={"Year"}
                    name={EFormTypes.YEAR}
                    placeholder={"Enter year"}
                />
                <InputField
                    label={"Licence plate"}
                    name={EFormTypes.LICENSE_PLATE}
                    placeholder={"Enter licence plate"}
                />
            </>
        );
    }
}
