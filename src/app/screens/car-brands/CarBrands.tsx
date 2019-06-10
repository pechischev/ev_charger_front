import * as React from "react";
import { Component, ReactNode } from "react";
import { Card } from "@components/card";
import { Button } from "@components/button";
import { AppContext } from "@context";
import { CarBrandsList } from ".";
import { Modal } from "@components/modal";
import { CreateCarBrandForm } from "./view";

export class CarBrands extends Component {

    render(): ReactNode {
        const actionElement = this.getActionElement();
        return (
            <div className="side-app">
                <div className="page-header">Car brands</div>
                <div className="page-content">
                    <Card title="Car brands list" content={<CarBrandsList actionElement={actionElement}/>}/>
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
                        disabled={!AppContext.getUserStore().isAdmin()}
                    />
                }
                title="Add Charger"
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
