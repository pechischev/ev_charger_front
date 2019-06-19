import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { observer } from "mobx-react";
import "./PromoCodeProfile.scss";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { autobind } from "core-decorators";
import { CustomForm } from "@components/custom-form";
import { FormRenderProps } from "react-final-form";
import { redirectToPromoCodeList, redirectToSettings } from "@utils/history";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { PromoCodeForm } from "@app/components/promo-code-form";
import { PromoCodeProfileStore } from ".";

@observer
@autobind
export class PromoCodeProfile extends Component<RouteProps> {
    private readonly store = new PromoCodeProfileStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Settings", handler: redirectToSettings },
        { label: "Promo Codes", handler: redirectToPromoCodeList },
        { label: "Profile" },
    ];

    constructor(props: RouteProps) {
        super(props);
        this.store.init();

        if (this.props.location) {
            const { id } = qs.parse(this.props.location.search);
            this.store.getPromoCode(id as string);
            this.store.setPromoCodeId(id as string);
        }
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Promo Code</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Promo Code profile"
                        content={
                            <CustomForm
                                keepDirtyOnReinitialize={false}
                                validateData={this.store.validateData}
                                data={this.store.transformPromoCodeData(this.store.getData())}
                                error$={this.store.error$}
                                submit={this.store.updatePromoCode}
                                render={this.getPromoCodeForm}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private getPromoCodeForm(api: FormRenderProps, submitting?: boolean): ReactNode {
        return (
            <PromoCodeForm
                api={api}
                submitting={submitting || false}
                canCancel={false}
            />
        );
    }
}
