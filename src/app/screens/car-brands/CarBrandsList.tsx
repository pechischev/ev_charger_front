import "./CarBrands.scss";
import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { redirectToBrandModels } from "@utils/history";
import { IBrandListItem } from "@entities/car-settings";
import { Button } from "@components/button";
import * as React from "react";
import { Fragment, ReactNode } from "react";
import { AppContext } from "@context";
import { action, observable } from "mobx";
import { Modal } from "@components/modal";

interface ICarBrandsListProps extends IList<IBrandListItem> {
    onRemoveItem(chargerId: number): Promise<void>;
}

@observer
@autobind
export class CarBrandsList extends List<IBrandListItem, ICarBrandsListProps> {
    @observable private isOpenModal = false;

    render(): ReactNode {
        return (
            <Fragment>
                {this.renderList()}
                <Modal
                    open={this.isOpenModal}
                    onClose={this.closeModal}
                    title={"Removing a car brand"}
                    action={this.deleteCarBrand}
                    actionOptions={{
                        title: "Delete",
                        type: !AppContext.getUserStore().isAdmin() ? "disabled" : "delete",
                    }}
                />
            </Fragment>
        );
    }

    protected getColumns(): Array<IColumn<IBrandListItem>> {
        return [
            { id: "title", label: "Car brand", size: "1fr" },
            { id: "numberModels", label: "Number of automaker models", size: "3fr" },
            {
                id: "actions", label: "", size: "150px",
                handler: () => {
                    return (
                        <Button
                            type="delete"
                            onClick={this.onDeleteCarBrand}
                            text="Delete"
                        />
                    );
                },
            },
        ];
    }

    protected onClickRow(item: IBrandListItem): void {
        redirectToBrandModels(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_VEHICLE_BRANDS>> {
        return this.store.transport.getVehicleBrands(params);
    }

    private onDeleteCarBrand(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.openModal();
    }

    private deleteCarBrand(): void {
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
