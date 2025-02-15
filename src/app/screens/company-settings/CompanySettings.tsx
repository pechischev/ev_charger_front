import { autobind } from "core-decorators";
import { CompanySettingsStore, ECompanyFieldType } from ".";
import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import "./CompanySettings.scss";
import { observer } from "mobx-react";
import { EmailField, InputField, PhoneField, SelectField, ZipCodeField } from "@components/fields";
import { AppContext } from "@context";
import { Button } from "@components/button";
import { RouteProps } from "react-router";
import { redirectToSettings } from "@utils/history";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";

@observer
@autobind
export class CompanySettings extends Component<RouteProps> {
    private readonly store = new CompanySettingsStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Settings", handler: redirectToSettings },
        { label: "Company Information" },
    ];
    constructor(props: RouteProps) {
        super(props);
        this.store.init();
        AppContext.getInfoStore().getStates();
        this.store.getCompanyInfo();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Company Information</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Customize your Company Information"
                        className="company-info"
                        content={
                            <CustomForm
                                keepDirtyOnReinitialize={false}
                                validateData={this.store.validateData}
                                data={this.store.transformCompanyData(this.store.getData())}
                                error$={this.store.error$}
                                submit={this.store.updateCompanyInfo}
                                render={this.renderCompanyForm}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private renderCompanyForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <div className="company-info-form">
                <div className="column">
                    <InputField
                        name={ECompanyFieldType.TITLE}
                        placeholder={"Enter company name"}
                        label={"Company Name"}
                    />
                    <InputField
                        name={ECompanyFieldType.ADDRESS}
                        placeholder={"Enter first address"}
                        label={"Address 1"}
                    />
                    <InputField
                        name={ECompanyFieldType.EXTRA_ADDRESS}
                        placeholder={"Enter second address"}
                        label={"Address 2"}
                    />
                </div>
                <div className="column">
                    <SelectField
                        name={ECompanyFieldType.STATE}
                        label={"State"}
                        options={AppContext.getInfoStore().states}
                        placeholder={"Select state"}
                    />
                    <ZipCodeField
                        name={ECompanyFieldType.ZIP_CODE}
                    />
                    <InputField
                        name={ECompanyFieldType.CITY}
                        placeholder={"Enter city"}
                        label={"City"}
                    />
                </div>
                <div className="column">
                    <PhoneField
                        name={ECompanyFieldType.PHONE}
                    />
                    <EmailField
                        name={ECompanyFieldType.EMAIL}
                    />
                    <div className="form__button clearfix">
                        <Button
                            disabled={!submitting}
                            onClick={() => api.handleSubmit()}
                            type="primary"
                            text="Submit"
                        />
                    </div>
                </div>
            </ div>
        );
    }
}
