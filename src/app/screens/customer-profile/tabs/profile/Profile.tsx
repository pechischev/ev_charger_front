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
                <div className="profile-settings">
                    <div className="profile-settings__title">Profile settings</div>
                    <div className="profile-settings__container">
                        <CustomForm
                            submit={this.onChangeMainInfo}
                            render={(api, submitting) => this.getMainSettingsForm(api, submitting)}
                        />
                    </div>
                </div>
                <div className="profile-settings">
                    <div className="profile-settings__title">Change Password</div>
                    <div className="profile-settings__container">
                        <CustomForm
                            submit={this.onChangePassword}
                            render={(api, submitting) => this.getPasswordSettingsForm(api, submitting)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private getMainSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <>
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
            </>
        );
    }

    private onChangeMainInfo() {

    }

    private getPasswordSettingsForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <>
                <InputField
                    label={"Current password"}
                    name={"curPassword"}
                    placeholder={"Enter current password"}
                />
                <InputField
                    label={"New password"}
                    name={"newPassword"}
                    placeholder={"Enter new password"}
                />
                <InputField
                    label={"Confirmation password"}
                    name={"confirmPassword"}
                    placeholder={"Enter confirmation password"}
                />
            </>
        );
    }

    private onChangePassword() {

    }
}
