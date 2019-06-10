import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { Button } from "@components/button";
import { CarBrandsList, CarBrandsStore } from ".";
import { Modal } from "@components/modal";
import { CreateCarBrandForm } from "./view";
import "./CarBrands.scss";

export class CarBrands extends Component {
    private readonly store = new CarBrandsStore();

    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">Car brands</div>
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
