import * as React from "react";
import { Component, ReactNode } from "react";
import "./Login.scss";
import { autobind } from "core-decorators";
import { EPaths } from "@app/config";
import { Page } from "@layouts/page";

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
                            {this.renderForm()}
                        </div>
                    </div>
                </div>
            </Page>
        );
    }

    private renderForm(): ReactNode {
        return (
            <div className="card">
                <div className="card-body p-6">
                    <div className="card-title text-center">Login to Loop CMS</div>
                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"/>
                            <span className="custom-control-label">Remember me</span>
                        </label>
                    </div>
                    <div className="form-footer">
                        <button className="btn btn-primary btn-block" onClick={this.onSignIn}>Sign in</button>
                    </div>
                </div>
            </div>
        );
    }

    private onSignIn() {
        window.location.pathname = `/${EPaths.DASHBOARD}`;
    }
}
