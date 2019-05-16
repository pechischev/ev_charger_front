import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import "./ProfileTab.scss";
import { ICustomer } from "@entities/customer";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { ProfileTabStore } from "./ProfileTabStore";
import { Button } from "@components/button"
import { IItem } from "@entities/_common";
import { UserForm } from "@app/components/user-form";

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
        const { userId } = this.props;
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
                <UserForm passwordFields={null}/>
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
}
