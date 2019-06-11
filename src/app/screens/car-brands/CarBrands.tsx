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
import { RouteProps } from "react-router";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

@observer
@autobind
export class CarBrands extends Component<RouteProps> {
    private readonly store = new CarBrandsStore();
    private readonly breadcrumbs: IBreadcrumb[] = [
        { label: "Settings", handler: redirectToSettings },
        { label: "Car brands" },
    ];

    constructor(props: RouteProps) {
        super(props);

        this.store.init();
    }

    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Car brands</div>
                    <Breadcrumb crumbs={this.breadcrumbs}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Car brands list"
                        content={
                            <CarBrandsList
                                actionElement={actionElement}
                                onRemoveItem={this.store.removeCarBrand}
                                updateList$={this.store.updateBrandList$}
                                checkUsedModel={(params) => this.store.transport.checkUsedVehicleData(params)}
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
                        this.store.updateBrandList$.next();
                        close();
                    }}
                />}
            </Modal>
        );
    }
}
