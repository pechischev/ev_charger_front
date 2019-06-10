import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { Button } from "@components/button";
import { CarBrandsList, CarBrandsStore } from ".";
import { Modal } from "@components/modal";
import { CreateCarBrandForm } from "./view";
import "./CarBrands.scss";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { redirectToSettings } from "@utils/history";

export class CarBrands extends Component {
    private readonly store = new CarBrandsStore();

    render(): ReactNode {
        const actionElement = this.getActionElement();
        const links: IBreadcrumb[] = [
            { label: "Settings", handler: redirectToSettings },
            { label: "Car brands" },
        ];
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Car brands</div>
                    <Breadcrumb crumbs={links}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Car brands list"
                        content={
                            <CarBrandsList
                                actionElement={actionElement}
                                onRemoveItem={this.store.removeCarBrand}
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    private getActionElement(): ReactNode {
        return (
            <Modal
                trigger={
                    <Button
                        type="primary"
                        text="Add car brand"
                    />
                }
                title="Add car brand"
            >
                {(close) => <CreateCarBrandForm
                    onClose={close}
                    onCreate={() => {
                        this.store.updateChargerList$.next();
                        close();
                    }}
                />}
            </Modal>
        );
    }
}
