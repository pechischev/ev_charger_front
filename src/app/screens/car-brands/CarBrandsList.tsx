import "./CarBrands.scss";
import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { redirectToBrandModels } from "@utils/history";
import { IBrandListItem } from "@entities/car-settings";
import { Button } from "@components/button";
import * as React from "react";
import { Fragment, ReactNode } from "react";
import { AppContext } from "@context";
import { action, observable } from "mobx";
import { Modal } from "@components/modal";
import * as _ from "lodash";

enum ERemoveBrandState {
    DENIED,
    ALLOWED,
    NONE,
}

interface ICarBrandsListProps extends IList<IBrandListItem> {
    onRemoveItem(chargerId: number): Promise<void>;

    checkUsedModel(params: TApiParams<EApiRoutes.CHECK_VEHICLE_USED_DATA>):
        Promise<TAxiosResponse<EApiRoutes.CHECK_VEHICLE_USED_DATA>>;
}

@observer
@autobind
export class CarBrandsList extends List<IBrandListItem, ICarBrandsListProps> {
    @observable private removeModalState = ERemoveBrandState.NONE;

    render(): ReactNode {
        return (
            <Fragment>
                {this.renderList()}
                <Modal
                    open={this.removeModalState === ERemoveBrandState.ALLOWED}
                    onClose={this.resetModalState}
                    title={"Removing a car brand"}
                    action={this.deleteCarBrand}
                    actionOptions={{
                        title: "Delete",
                        type: !AppContext.getUserStore().isAdmin() ? "disabled" : "delete",
                    }}
                />
                <Modal
                    open={this.removeModalState === ERemoveBrandState.DENIED}
                    onClose={this.resetModalState}
                    title={"Removing a car brand"}
                >
                    <p>You cannot delete a car brand because the user has selected it!</p>
                </Modal>
            </Fragment>
        );
    }

    protected getColumns(): Array<IColumn<IBrandListItem>> {
        return [
            { id: "title", label: "Car brand", size: "1fr" },
            { id: "numberModels", label: "Number of automaker models", size: "3fr" },
            {
                id: "actions", label: "", size: "150px",
                handler: (item) => {
                    return (
                        <Button
                            type="delete"
                            onClick={this.onDeleteCarBrand.bind(this, item)}
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

    private onDeleteCarBrand(item: IBrandListItem, event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.props.checkUsedModel({brandId: item.id})
            .then((response) => {
                const data = _.get<TAxiosResponse<EApiRoutes.CHECK_VEHICLE_USED_DATA, EApiMethods.GET>, "data">(
                    response, "data"
                );
                const state = !!data.usedBrandsCount ? ERemoveBrandState.DENIED : ERemoveBrandState.ALLOWED;
                this.setModalState(state);
            });
    }

    private deleteCarBrand(): void {
        const item = this.store.getSelectedItem();
        if (!item) {
            return;
        }
        this.props.onRemoveItem(item.id).then(this.updateList);
    }

    private resetModalState(): void {
        this.setModalState(ERemoveBrandState.NONE);
    }

    @action.bound
    private setModalState(state: ERemoveBrandState): void {
        this.removeModalState = state;
    }
}
