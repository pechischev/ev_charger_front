import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { Button } from "@components/button";
import { CarModelsList, CarModelsStore } from ".";
import { Modal } from "@components/modal";
import { CreateCarModelForm } from "./view";
import "./CarModels.scss";

export class CarModels extends Component {
    private readonly store = new CarModelsStore();

    render(): ReactNode {
        return (
            <div className="side-app">
                <div className="page-header">Car models</div>
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
        const data = {
            photo: "",
            brandName: "Ford",
        };
        return (
            <>
                <div className="brand-info_main main-info">
                    <div className="main-info_image">
                    <span className="main-info_image__initial" data-shown={!!data.photo}>
                        {this.getInitialCharacter(data.brandName)}
                    </span>
                    </div>
                    <div className="main-info_content">
                        <div className="main-info_content__name">
                            {data.brandName}
                        </div>
                        <div className="main-info_content__action">
                            <Button
                                type="primary"
                                text="Change brand name"
                                onClick={() => {/*TODO: реализвать попап для редактирования имени бренда*/}}
                            />
                        </div>
                    </div>
                </div>
                <CarModelsList
                    actionElement={actionElement}
                    onRemoveItem={this.store.removeCarBrand}
                />
            </>
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
                        this.store.updateChargerList$.next();
                        close();
                    }}
                />}
            </Modal>
        );
    }

    private getInitialCharacter(line: string = ""): string {
        return line.charAt(0);
    }
}
