import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { redirectOnAddUserForm, redirectToSettings } from "@utils/history";
import { Button } from "@components/button";
import { AppContext } from "@context";
import { PromoCodeList, PromoCodesStore } from ".";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";

export class PromoCodes extends Component {
    private readonly store = new PromoCodesStore();

    render(): ReactNode {
        const actionElement = this.getActionElement();
        const links: IBreadcrumb[] = [
            { label: "Settings", handler: redirectToSettings },
            { label: "Promo Code" },
        ];
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Promo Code</div>
                    <Breadcrumb crumbs={links}/>
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
                onClick={redirectOnAddUserForm}
                text={"Add Promo Code"}
                disabled={!AppContext.getUserStore().isAdmin()}
            />
        );
    }
}
