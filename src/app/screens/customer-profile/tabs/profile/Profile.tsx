import * as React from "react";
import { Component, ReactNode } from "react";
import { IUser } from "@entities/user";
import { InputField } from "@components/fields";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import "./Profile.scss";

interface IProfileProps {
    data: IUser;
}

export class Profile extends Component<IProfileProps> {
    render(): ReactNode {
        return (
            <div className="tab-container-profile">
                <CustomForm
                    submit={this.onSave}
                    render={(api, submitting) => this.getSettingsForm(api, submitting)}
                />
            </div>
        );
    }

    private getSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <>
                <div className="profile-settings">
                    <div className="profile-settings__title">Profile info</div>
                    <div className="profile-settings__container">
                        <InputField
                            label={"First name"}
                            name={"firstName"}
                            placeholder={"Enter first name"}
                        />
                        <InputField
                            label={"Last name"}
                            name={"lastName"}
                            placeholder={"Enter email"}
                        />
                        <InputField
                            label={"Email address"}
                            name={"email"}
                            placeholder={"Enter email"}
                        />
                        <InputField
                            label={"Phone number"}
                            name={"phone"}
                            placeholder={"Enter phone"}
                        />
                        <InputField
                            label={"Residence"}
                            name={"residence"}
                            placeholder={"Enter residence"}
                        />
                        <InputField
                            label={"New password"}
                            name={"newPassword"}
                            type={"password"}
                            placeholder={"Enter new password"}
                        />
                        <InputField
                            label={"Confirm Password"}
                            name={"confPassword"}
                            type={"password"}
                            placeholder={"Enter confirm password"}
                        />
                    </div>
                </div>
                <div className="profile-settings">
                    <div className="profile-settings__title">Mailing address</div>
                    <div className="profile-settings__container">
                        <InputField
                            label={"Address"}
                            name={"address"}
                            placeholder={"Enter address"}
                        />
                        <InputField
                            label={"Apt/Unit"}
                            name={"aptUnit"}
                            placeholder={"Enter apt/unit"}
                        />
                        <InputField
                            label={"City"}
                            name={"city"}
                            placeholder={"Enter city"}
                        />
                        <InputField
                            label={"Zip code"}
                            name={"zipCode"}
                            placeholder={"Enter zip code"}
                        />
                        <InputField
                            label={"State"}
                            name={"state"}
                            placeholder={"Enter state"}
                        />
                    </div>
                </div>
                <div className="profile-settings">
                    <div className="profile-settings__title">Vehicle</div>
                    <div className="profile-settings__container">
                        <InputField
                            label={"Make"}
                            name={"make"}
                            placeholder={"Enter make"}
                        />
                        <InputField
                            label={"Model"}
                            name={"model"}
                            placeholder={"Enter model"}
                        />
                        <InputField
                            label={"Year"}
                            name={"year"}
                            placeholder={"Enter year"}
                        />
                        <InputField
                            label={"Licence plate"}
                            name={"licencePlate"}
                            placeholder={"Enter licence plate"}
                        />
                    </div>
                </div>
            </>
        );
    }

    private onSave() {

    }
}
