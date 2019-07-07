import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { ResidencesList } from "@app/screens/residences/ResidencesList";
import { redirectToResidenceCreateForm } from "@utils/history";
import { Button } from "@components/button";
import { AppContext } from "@context";
import * as qs from "query-string";
import { get } from "lodash";
import { Nullable } from "@app/config";

export class Residences extends Component {
    render(): ReactNode {
        let typeTab: Nullable<string> = void 0;
        if (AppContext.getHistory().location) {
            typeTab = get(
                qs.parse(AppContext.getHistory().location.search) as unknown as Nullable<string>, "type", void 0,
            );
        }
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Sites</div>
                </div>
                <div className="page-content">
                    <Card
                        title="Site list"
                        isPrint={true}
                        content={
                            <ResidencesList actionElement={actionElement} type={typeTab}/>
                        }
                    />
                </div>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        const readOnly = !AppContext.getUserStore().isAdmin();
        return (
            <Button
                type={"primary"}
                onClick={redirectToResidenceCreateForm}
                text="Add site"
                disabled={readOnly}
            />
        );
    }
}
