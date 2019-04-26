import * as React from "react";
import { Component, ReactNode } from "react";
import "./Login.scss";
import { autobind } from "core-decorators";
import { EPaths } from "@app/config";
import { Page } from "@layouts/page";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { InputField } from "@components/fields";

@autobind
export class Login extends Component {
    render(): ReactNode {
        return (
            <Page layer={"page-simple"}>
                <div className="container">
                    <div className="row">
                        <div className="col col-login mx-auto">
                            <div className="text-center mb-6">
                                <img src="./img/logo.png" className="h-6" alt=""/>
                            </div>
                            <CustomForm
                                submit={this.onSignIn}
                                render={(api, submitting) => this.renderForm(api, submitting)}
                            />
                        </div>
                    </div>
                </div>
            </Page>
        );
    }

    private renderForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <div className="card">
                <div className="card-body p-6">
                    <div className="card-title text-center">Login to Loop CMS</div>
                    <InputField
                        label={"Email address"}
                        name={"email"}
                        placeholder={"Enter email"}
                    />
                    <InputField
                        label={"Password"}
                        name={"password"}
                        placeholder={"Password"}
                        type={"password"}
                    />
                    <div className="form-group">
                        <label className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"/>
                            <span className="custom-control-label">Remember me</span>
                        </label>
                    </div>
                    <div className="form-footer">
                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => api.handleSubmit()}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private onSignIn(): void {
        window.location.pathname = `/${EPaths.DASHBOARD}`;
    }
}
