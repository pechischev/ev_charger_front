import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import * as React from "react";
import { ResidencesList } from "@app/screens/residences/ResidencesList";
import { redirectToResidenceCreateForm } from "@utils/history";
import { Button } from "@components/button";
import { AppContext } from "@context";

export class Residences extends Component {
    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">Residences</div>
                <div className="page-content">
                    <Card title="Residence list" content={<ResidencesList actionElement={actionElement}/>}/>
                </div>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        return (
            <Button
                type={"primary"}
                onClick={redirectToResidenceCreateForm}
                text="Add residence"
                disabled={!AppContext.getUserStore().isAdmin()}
            />
        );
    }
}
