import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { redirectOnAddPromoCodeForm, redirectToSettings } from "@utils/history";
import { Button } from "@components/button";
import { PromoCodeList, PromoCodesStore } from ".";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { RouteProps } from "react-router";

@observer
@autobind
export class PromoCodes extends Component {
    private readonly store = new PromoCodesStore();
    private readonly links: IBreadcrumb[] = [
        { label: "Settings", handler: redirectToSettings },
        { label: "Promo Codes" },
    ];

    constructor(props: RouteProps) {
        super(props);

        this.store.init();
    }

    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Promo Code</div>
                    <Breadcrumb crumbs={this.links}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Promo Code list"
                        content={
                            <PromoCodeList
                                actionElement={actionElement}
                                onRemoveItem={this.store.removeCharger}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        return (
            <Button
                type={"primary"}
                onClick={redirectOnAddPromoCodeForm}
                text={"Add Promo Code"}
            />
        );
    }
}
