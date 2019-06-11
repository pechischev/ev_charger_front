import { EStatus } from "@entities/user";
import "./PromoCodeList.scss";
import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { redirectToPromoCodeProfile } from "@utils/history";
import { Button } from "@components/button";
import { AppContext } from "@context";
import * as React from "react";
import { Fragment, ReactNode } from "react";
import { action, observable } from "mobx";
import { Modal } from "@components/modal";
import { IPromoCodeListItem } from "@entities/promo-code";

interface IPromoCodeListProps extends IList<IPromoCodeListItem> {
    onRemoveItem(promoCodeId: number): Promise<void>;
}

@observer
@autobind
export class PromoCodeList extends List<IPromoCodeListItem, IPromoCodeListProps> {
    @observable private isOpenModal = false;

    render(): ReactNode {
        return (
            <Fragment>
                {this.renderList()}
                <Modal
                    open={this.isOpenModal}
                    onClose={this.closeModal}
                    title={"Are you sure want to delete this promo code?"}
                    action={this.deletePromoCode}
                    actionOptions={{
                        title: "Delete",
                        type: !AppContext.getUserStore().isAdmin() ? "disabled" : "delete",
                    }}
                />
            </Fragment>
        );
    }

    protected getFilterItems(): IFilter[] {
        return [
            { text: "All", value: void 0 },
            { text: "Active", value: EStatus.ACTIVE },
            { text: "Inactive", value: EStatus.INACTIVE },
        ];
    }

    protected getColumns(): Array<IColumn<IPromoCodeListItem>> {
        return [
            { id: "a", label: "Promo Code" },
            { id: "b", label: "Value Discount Type" },
            { id: "c", label: "Discount Amount" },
            { id: "d", label: "Residences list" },
            { id: "e", label: "Status" },
            {
                id: "action", label: "", size: "150px",
                handler: (item: IPromoCodeListItem) => {
                    return (
                        <Button
                            type="delete"
                            onClick={this.onDeletePromoCode.bind(this, item)}
                            text="Delete"
                            disabled={!AppContext.getUserStore().isAdmin()}
                        />
                    );
                },
            },
        ];
    }

    protected onClickRow(item: IPromoCodeListItem): void {
        redirectToPromoCodeProfile(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_PROMO_CODES>> {
        return this.store.transport.getUsers(params); // TODO: getPromoCodes
    }

    private onDeletePromoCode(item: IPromoCodeListItem, event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.openModal();
    }

    private deletePromoCode(): void {
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
