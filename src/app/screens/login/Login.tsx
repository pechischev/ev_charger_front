import * as React from "react";
import { Component, ReactNode } from "react";
import "./Login.scss";
import { autobind } from "core-decorators";
import { EPaths } from "@app/config";
import { Page } from "@layouts/page";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { PasswordField, EmailField } from "@components/fields";
import { AppContext } from "@context";
import { LoginStore } from "./LoginStore";
import { EApiRoutes, TApiResponse } from "@services/transport";
import { Button } from "@components/button";

@autobind
export class Login extends Component {
    private readonly store = new LoginStore();

    private static redirect(): void {
        AppContext.getHistory().push(`/${EPaths.DASHBOARD}`);
    }

    componentDidMount(): void {
        this.store.login$.subscribe((response: TApiResponse<EApiRoutes.SIGN_IN>) => {
            AppContext.getUserStore().fetchAdminTokens(response);
            Login.redirect();
        });
    }

    render(): ReactNode {
        return (
            <Page layer="page-simple">
                <div className="container">
                    <div className="row">
                        <div className="col col-login mx-auto">
                            <CustomForm
                                error$={this.store.error$}
                                submit={this.store.login}
                                render={this.renderForm}
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
                    <div className="card-title text-center">Login to Loop EVChargers CMS</div>
                    <EmailField name={"email"}/>
                    <PasswordField label={"Password"} name={"password"}/>
                    <div className="form-footer">
                        <Button
                            disabled={!submitting}
                            onClick={() => api.handleSubmit()}
                            type="primary"
                            text="Sign in"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
