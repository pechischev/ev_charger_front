import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import "./Settings.scss";
import {
    redirectToBillingInfoSettings,
    redirectToCompanyInfoSettings,
    redirectToPromoCodeSettings,
    redirectToWorkerList,
} from "@utils/history";

export class Settings extends Component {
    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Settings</div>
                </div>
                <div className="page-content settings-container">
                    <Card
                        content={this.getCardInfo(
                            "CMS Users",
                            "users",
                            "Invite more users to your company account.",
                        )}
                        onClick={redirectToWorkerList}
                    />
                    <Card
                        content={this.getCardInfo(
                            "Company Information",
                            "company",
                            "Tell us your company information and we will add it to your quotes and invoices.",
                        )}
                        onClick={redirectToCompanyInfoSettings}
                    />
                    <Card
                        content={this.getCardInfo(
                            "Billing / Promo",
                            "billing",
                            "Customize your payment details.",
                        )}
                        onClick={redirectToBillingInfoSettings}
                    />
                    <Card
                        content={this.getCardInfo(
                            "Promo Code",
                            "promo",
                            "Set up your promotional codes.",
                        )}
                        onClick={redirectToPromoCodeSettings}
                    />
                </div>
            </div>
        );
    }

    private getCardInfo(title: string, img: string, description: string): ReactNode {
        return (
            <div className="card-info">
                <div className="card-info_header">
                    <div className="header__image" data-type={img}/>
                    <div className="header__text">{title}</div>
                </div>
                <div className="card-info_description">{description}</div>
            </div>
        );
    }
}
