import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import * as React from "react";
import { Fragment, ReactNode } from "react";
import { IChargersListItem } from "@entities/residence";
import { Button } from "@components/button";
import { Modal } from "@components/modal";
import { action, observable } from "mobx";
import { AppContext } from "@context";

interface IChargersListProps extends IList<IChargersListItem> {
    residenceId?: string;

    onRemoveItem(chargerId: number): Promise<void>;

    onViewItem(chargerId: number): Promise<void>;
}

@observer
@autobind
export class ChargersList extends List<IChargersListItem, IChargersListProps> {
    @observable private isOpenModal = false;

    render(): ReactNode {
        return (
            <Fragment>
                {this.renderList()}
                <Modal
                    open={this.isOpenModal}
                    onClose={this.closeModal}
                    title={"Are you sure want to delete this charger?"}
                    action={this.deleteCharges}
                    actionOptions={{
                        title: "Delete",
                        type: !AppContext.getUserStore().isAdmin() ? "disabled" : "delete",
                    }}
                />
            </Fragment>
        );
    }

    protected getColumns(): Array<IColumn<IChargersListItem>> {
        return [
            { id: "id", label: "Id" },
            { id: "model", label: "Model" },
            { id: "location", label: "Location" },
            {
                id: "action", label: "", size: "120px",
                handler: () => {
                    return (
                        <Button
                            type="delete"
                            onClick={this.onDeleteCharges}
                            text="Delete"
                            disabled={!AppContext.getUserStore().isAdmin()}
                        />
                    );
                },
            },
        ];
    }

    protected onClickRow(item: IChargersListItem): void {
        const { residenceId } = this.props;
        if (!residenceId) {
            return;
        }
        this.props.onViewItem(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.RESIDENCE_CHARGES>> {
        const { residenceId } = this.props;
        if (!residenceId) {
            return new Promise((resolve) => resolve());
        }
        return this.store.transport.getResidenceChargesData(params, residenceId);
    }

    private onDeleteCharges(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.openModal();
    }

    private deleteCharges(): void {
        console.log(this.store.getSelectedItem());
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
