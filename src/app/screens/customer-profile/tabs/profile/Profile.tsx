import * as React from "react";
import { Component, ReactNode } from "react";
import { InputField } from "@components/fields";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import "./Profile.scss";
import { ICustomer } from "@entities/customer";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

interface IProfileProps {
    data?: ICustomer;
}

@observer
@autobind
export class Profile extends Component<IProfileProps> {
    render(): ReactNode {
        return (
            <div className="tab-container-profile">
                <CustomForm
                    keepDirtyOnReinitialize={false}
                    data={this.props.data}
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
                            name={"userData.firstName"}
                            placeholder={"Enter first name"}
                        />
                        <InputField
                            label={"Last name"}
                            name={"userData.lastName"}
                            placeholder={"Enter email"}
                        />
                        <InputField
                            label={"Email address"}
                            name={"userData.email"}
                            placeholder={"Enter email"}
                        />
                        <InputField
                            label={"Phone number"}
                            name={"phone"}
                            placeholder={"Enter phone"}
                        />
                        <InputField
                            label={"Residence"}
                            name={"contactData.residence.title"}
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
                            name={"contactData.address"}
                            placeholder={"Enter address"}
                        />
                        <InputField
                            label={"Apt/Unit"}
                            name={"contactData.aptUnit"}
                            placeholder={"Enter apt/unit"}
                        />
                        <InputField
                            label={"City"}
                            name={"contactData.city"}
                            placeholder={"Enter city"}
                        />
                        <InputField
                            label={"Zip code"}
                            name={"contactData.zipCode"}
                            placeholder={"Enter zip code"}
                        />
                        <InputField
                            label={"State"}
                            name={"contactData.state.title"}
                            placeholder={"Enter state"}
                        />
                    </div>
                </div>
                <div className="profile-settings">
                    <div className="profile-settings__title">Vehicle</div>
                    <div className="profile-settings__container">
                        <InputField
                            label={"Make"}
                            name={"vehicle.make"}
                            placeholder={"Enter make"}
                        />
                        <InputField
                            label={"Model"}
                            name={"vehicle.model"}
                            placeholder={"Enter model"}
                        />
                        <InputField
                            label={"Year"}
                            name={"vehicle.year"}
                            placeholder={"Enter year"}
                        />
                        <InputField
                            label={"Licence plate"}
                            name={"vehicle.licensePlate"}
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
