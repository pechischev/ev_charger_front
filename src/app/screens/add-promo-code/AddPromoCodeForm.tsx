import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { FormRenderProps } from "react-final-form";
import { redirectToPromoCodeList, redirectToUsersList } from "@utils/history";
import { CustomForm } from "@components/custom-form";
import { AddPromoCodeFormStore } from "./AddPromoCodeFormStore";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { RouteProps } from "react-router";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { PromoCodeForm } from "@app/components/promo-code-form";

@observer
@autobind
export class AddPromoCodeForm extends Component<RouteProps> {
    private readonly store = new AddPromoCodeFormStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Users", handler: redirectToUsersList },
        { label: "Promo Codes", handler: redirectToPromoCodeList },
        { label: "New promo code" },
    ];

    constructor(props: RouteProps) {
        super(props);
        this.store.init();
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">New promo code</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Promo code"
                        content={
                            <CustomForm
                                keepDirtyOnReinitialize={false}
                                validateData={this.store.validateData}
                                error$={this.store.error$}
                                submit={this.store.createPromoCode}
                                render={this.renderUserForm}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private renderUserForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <PromoCodeForm
                api={api}
                submitting={submitting || false}
                canCancel={false}
            />
        );
    }
}
