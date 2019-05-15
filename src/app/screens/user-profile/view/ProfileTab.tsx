import * as React from "react";
import { Component, ReactNode } from "react";
import { InputField } from "@components/fields";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import "./ProfileTab.scss";
import { ICustomer } from "@entities/customer";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { ProfileTabStore } from "./ProfileTabStore";
import { Transport } from "@services/transport";
import { AppContext } from "@context";
import { EFieldTypes } from "../constants";
import { IFieldError } from "@app/config/IFieldError";

interface IProfileProps {
    data?: ICustomer;
}

@observer
@autobind
export class ProfileTab extends Component<IProfileProps> {
    private readonly store = new ProfileTabStore();

    constructor(props: IProfileProps) {
        super(props);
        this.store.transport = new Transport(AppContext.getUserStore().getAdminTokens());
    }

    render(): ReactNode {
        return (
            <div className="tab-container-profile">
                <CustomForm
                    error$={this.store.error$}
                    validateData={this.validateData}
                    keepDirtyOnReinitialize={false}
                    data={this.props.data}
                    submit={this.store.edit}
                    render={(api, submitting) => this.getSettingsForm(api, submitting)}
                />
            </div>
        );
    }

    private validateData(): IFieldError[] {
        return ([
            {type: EFieldTypes.FIRST_NAME, codes: []},
            {type: EFieldTypes.LAST_NAME, codes: []},
            {type: EFieldTypes.EMAIL, codes: [15]},
            {type: EFieldTypes.PHONE, codes: [19]},
            {type: EFieldTypes.RESIDENCE, codes: []},
            {type: EFieldTypes.NEW_PASSWORD, codes: [17, 20]},
            {type: EFieldTypes.CONFIRM_PASSWORD, codes: [20]},
            {type: EFieldTypes.ADDRESS, codes: []},
            {type: EFieldTypes.APT_UNIT, codes: []},
            {type: EFieldTypes.CITY, codes: []},
            {type: EFieldTypes.ZIP_CODE, codes: []},
            {type: EFieldTypes.STATE, codes: []},
            {type: EFieldTypes.MAKES, codes: []},
            {type: EFieldTypes.MODEL, codes: []},
            {type: EFieldTypes.YEAR, codes: []},
            {type: EFieldTypes.LICENSE_PLATE, codes: []},
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
                    label={"New password"}
                    name={EFieldTypes.NEW_PASSWORD}
                    type={"password"}
                    placeholder={"Enter new password"}
                />
                <InputField
                    label={"Confirm Password"}
                    name={EFieldTypes.CONFIRM_PASSWORD}
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
            </>
        );
    }

    private getVehicleFields(): ReactNode {
        return (
            <>
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
            </>
        );
    }
}
