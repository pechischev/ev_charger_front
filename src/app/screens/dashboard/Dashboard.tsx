import * as React from "react";
import { Component, ReactNode } from "react";

export class Dashboard extends Component {
    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Dashboards</div>
                </div>
                <div className="page-content"/>
            </div>
        );
    }
}
