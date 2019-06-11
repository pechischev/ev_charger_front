import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { Card } from "@components/card";
import { Button } from "@components/button";
import { CarModelsList, CarModelsStore } from ".";
import { Modal } from "@components/modal";
import { CreateCarModelForm, EditCarBrandForm } from "./view";
import "./CarModels.scss";
import { Breadcrumb, IBreadcrumb } from "@components/breadcrumb";
import { redirectToBrandSettings, redirectToSettings } from "@utils/history";
import { RouteProps } from "react-router";
import * as qs from "query-string";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

@observer
@autobind
export class CarModels extends Component<RouteProps> {
    private readonly store = new CarModelsStore();
    private readonly breadcrumbs: IBreadcrumb[] = [
        { label: "Settings", handler: redirectToSettings },
        { label: "Car brands", handler: redirectToBrandSettings },
        { label: "Car models" },
    ];

    constructor(props: RouteProps) {
        super(props);

        this.store.init();
        if (this.props.location) {
            const { id } = qs.parse(this.props.location.search);
            this.store.getVehicleBrand(id as string);
            this.store.setVehicleBrandId(id as string);
        }
    }

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">
                    <div className="page-title">Car models</div>
                    <Breadcrumb crumbs={this.breadcrumbs}/>
                </div>
                <div className="page-content">
                    <Card
                        title="Car models list"
                        content={this.renderBrandProfile()}
                    />
                </div>
            </div>
        );
    }

    private renderBrandProfile(): ReactNode {
        const actionElement = this.getActionElement();
        const { title } = this.store.getData();
        return (
            <Fragment>
                <div className="brand-info_main main-info">
                    <div className="main-info_image">
                    <span className="main-info_image__initial" data-shown={false}>
                        {this.getInitialCharacter(title)}
                    </span>
                    </div>
                    <div className="main-info_content">
                        <div className="main-info_content__name">
                            {title}
                        </div>
                        <div className="main-info_content__action">
                            <Modal
                                trigger={
                                    <Button
                                        type="primary"
                                        text="Change brand name"
                                    />
                                }
                                title="Edit car brand"
                            >
                                {(close) => <EditCarBrandForm
                                    data={this.store.getData()}
                                    brandId={this.store.getVehicleBrandId()}
                                    onClose={close}
                                    onEdit={this.store.updateBrandData}
                                />}
                            </Modal>

                        </div>
                    </div>
                </div>
                <CarModelsList
                    brandId={this.store.getVehicleBrandId()}
                    actionElement={actionElement}
                    onRemoveItem={this.store.removeCarModel}
                    updateList$={this.store.updateModelList$}
                />
            </Fragment>
        );
    }

    private getActionElement(): ReactNode {
        return (
            <Modal
                trigger={
                    <Button
                        type="primary"
                        text="Add car model"
                    />
                }
                title="Add car model"
            >
                {(close) => <CreateCarModelForm
                    onClose={close}
                    onCreate={() => {
                        this.store.updateModelList$.next();
                    }}
                />}
            </Modal>
        );
    }

    private getInitialCharacter(line: string = ""): string {
        return line.charAt(0);
    }
}
