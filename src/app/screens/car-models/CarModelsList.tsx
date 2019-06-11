import "./CarModels.scss";
import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { Button } from "@components/button";
import * as React from "react";
import { Fragment, ReactNode } from "react";
import { AppContext } from "@context";
import { action, observable } from "mobx";
import { Modal } from "@components/modal";
import { toString } from "lodash";
import * as _ from "lodash";
import { IItem } from "@entities/_common";

enum ERemoveModelState {
    DENIED,
    ALLOWED,
    NONE,
}

interface ICarModelsListProps extends IList<IItem> {
    brandId?: number;

    onRemoveItem(modelId: number): Promise<void>;

    checkUsedModel(params: TApiParams<EApiRoutes.CHECK_VEHICLE_USED_DATA>):
        Promise<TAxiosResponse<EApiRoutes.CHECK_VEHICLE_USED_DATA>>;
}

@observer
@autobind
export class CarModelsList extends List<IItem, ICarModelsListProps> {
    @observable private removeModalState = ERemoveModelState.NONE;

    render(): ReactNode {
        return (
            <Fragment>
                {this.renderList()}
                <Modal
                    open={this.removeModalState === ERemoveModelState.ALLOWED}
                    onClose={this.resetModalState}
                    title={"Removing a car model"}
                    action={this.deleteCarModel}
                    actionOptions={{
                        title: "Delete",
                        type: !AppContext.getUserStore().isAdmin() ? "disabled" : "delete",
                    }}
                />
                <Modal
                    open={this.removeModalState === ERemoveModelState.DENIED}
                    onClose={this.resetModalState}
                    title={"Removing a car model"}
                >
                    <p>You cannot delete a car model because the user has selected it!</p>
                </Modal>
            </Fragment>
        );
    }

    protected getColumns(): Array<IColumn<IItem>> {
        return [
            { id: "title", label: "Car model", size: "1fr" },
            {
                id: "actions", label: "", size: "150px",
                handler: (item) => {
                    return (
                        <Button
                            type="delete"
                            onClick={this.onDeleteCarModel.bind(this, item)}
                            text="Delete"
                        />
                    );
                },
            },
        ];
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_VEHICLE_MODELS>> {
        const { brandId } = this.props;
        if (!brandId) {
            return new Promise((resolve) => resolve());
        }
        return this.store.transport.getVehicleModels(params, toString(brandId));
    }

    private onDeleteCarModel(item: IItem, event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.props.checkUsedModel({modelId: item.id as number}).then((response) => {
            const data = _.get<TAxiosResponse<EApiRoutes.CHECK_VEHICLE_USED_DATA, EApiMethods.GET>, "data">(
                response, "data"
            );
            const state = !!data.usedModelsCount ? ERemoveModelState.DENIED : ERemoveModelState.ALLOWED;
            this.setModalState(state);
        });
    }

    private deleteCarModel(): void {
        const item = this.store.getSelectedItem();
        if (!item) {
            return;
        }
        this.props.onRemoveItem(item.id as number).then(this.updateList);
    }

    private resetModalState(): void {
        this.setModalState(ERemoveModelState.NONE);
    }

    @action.bound
    private setModalState(state: ERemoveModelState): void {
        this.removeModalState = state;
    }
}
