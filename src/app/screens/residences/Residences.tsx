import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import * as React from "react";
import { ResidencesList } from "@app/screens/residences/ResidencesList";

export class Residences extends Component {
    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">Residences</div>
                <div className="page-content">
                    <Card title="Users table" content={<ResidencesList actionElement={actionElement}/>}/>
                </div>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        return (
            <button
                className="btn btn-secondary btn-block"
                onClick={() => void 0}
            >
                Add residence
            </button>
        );
    }
}
