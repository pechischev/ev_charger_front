import { Component, ReactNode } from "react";
import * as React from "react";
import "./Login.scss";
import { Page } from "../../../layout/page";

export class Login extends Component {
    render(): ReactNode {
        return (
            <Page>
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
            <form className="card" method="post">
                <div className="card-body p-6">
                    <div className="card-title text-center">Login to Loop CMS</div>
                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"/>
                            <span className="custom-control-label">Remember me</span>
                        </label>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                    </div>
                </div>
            </form>
        );
    }
}