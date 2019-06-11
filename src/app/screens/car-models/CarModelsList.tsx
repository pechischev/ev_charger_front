import "./CarModels.scss";
import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { Button } from "@components/button";
import * as React from "react";
import { Fragment, ReactNode } from "react";
import { AppContext } from "@context";
import { action, observable } from "mobx";
import { Modal } from "@components/modal";
import { IModelListItem } from "@entities/car-settings";
import _ from "lodash";

interface ICarModelsListProps extends IList<IModelListItem> {
    brandId?: number;

    onRemoveItem(chargerId: number): Promise<void>;
}

@observer
@autobind
export class CarModelsList extends List<IModelListItem, ICarModelsListProps> {
    @observable private isOpenModal = false;

    render(): ReactNode {
        return (
            <Fragment>
                {this.renderList()}
                <Modal
                    open={this.isOpenModal}
                    onClose={this.closeModal}
                    title={"Removing a car model"}
                    action={this.deleteCarModel}
                    actionOptions={{
                        title: "Delete",
                        type: !AppContext.getUserStore().isAdmin() ? "disabled" : "delete",
                    }}
                />
            </Fragment>
        );
    }

    protected getColumns(): Array<IColumn<IModelListItem>> {
        return [
            { id: "title", label: "Car model", size: "1fr" },
            {
                id: "actions", label: "", size: "150px",
                handler: () => {
                    return (
                        <Button
                            type="delete"
                            onClick={this.onDeleteCarModel}
                            text="Delete"
                        />
                    );
                },
            },
        ];
    }

    protected onClickRow(item: IModelListItem): void {
        // TODO: modal edit name this car model
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_VEHICLE_MODELS>> {
        const { brandId } = this.props;
        if (!brandId) {
            return new Promise((resolve) => resolve());
        }
        return this.store.transport.getVehicleModels(params, _.toString(brandId));
    }

    private onDeleteCarModel(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.openModal();
    }

    private deleteCarModel(): void {
        const item = this.store.getSelectedItem();
        if (!item) {
            return;
        }
        this.props.onRemoveItem(item.id).then(this.updateList);
    }

    @action.bound
    private closeModal(): void {
        this.isOpenModal = false;
    }

    @action.bound
    private openModal(): void {
        this.isOpenModal = true;
    }
}
