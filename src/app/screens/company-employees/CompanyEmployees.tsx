import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { redirectToAddCompanyEmployeeForm } from "@utils/history";
import { Button } from "@components/button";
import { CompanyEmployeesList } from "./CompanyEmployeesList";
import "./CompanyEmployees.scss";

export class CompanyEmployees extends Component {
    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">CMS Users</div>
                <div className="page-content">
                    <Card
                        title="Users list"
                        content={
                            <CompanyEmployeesList
                                actionElement={actionElement}
                                onRemoveItem={() => void 0}
                                onViewItem={() => void 0}
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
                type="primary"
                onClick={() => redirectToAddCompanyEmployeeForm()}
                text={"Add company user"}
            />
        );
    }
}
