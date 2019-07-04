import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { ServiceRequestList } from ".";
import "./ServiceRequest.scss";

export class ServiceRequests extends Component {
    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Service Request</div>
                </div>
                <div className="page-content">
                    <Card title="Request list" isPrint={true} content={<ServiceRequestList/>}/>
                </div>
            </div>
        );
    }
}
