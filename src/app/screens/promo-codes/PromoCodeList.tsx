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
import { EDiscountCharacter, EDiscountType, TPromoCodeListItem } from "@entities/promo-code";
import * as _ from "lodash";
import { StatusMap } from "@entities/user/EStatus";

interface IPromoCodeListProps extends IList<TPromoCodeListItem> {
    onRemoveItem(promoCodeId: number): Promise<void>;
}

@observer
@autobind
export class PromoCodeList extends List<TPromoCodeListItem, IPromoCodeListProps> {
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

    protected getColumns(): Array<IColumn<TPromoCodeListItem>> {
        return [
            { id: "code", label: "Promo Code" },
            { id: "discount", label: "Discount Amount", handler: this.getDiscountValue },
            { id: "residences", label: "Sites list", handler: this.renderResidences },
            {
                id: "status", label: "Status",
                handler: (item: TPromoCodeListItem) => StatusMap.get(item.status),
            },
            {
                id: "action", label: "", size: "150px",
                handler: (item: TPromoCodeListItem) => {
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

    protected onClickRow(item: TPromoCodeListItem): void {
        redirectToPromoCodeProfile(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_PROMO_CODES>> {
        return this.store.transport.getPromoCodesList(params);
    }

    private onDeletePromoCode(item: TPromoCodeListItem, event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.openModal();
    }

    private deletePromoCode(): void {
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

    private getDiscountValue(item: TPromoCodeListItem): ReactNode {
        return item.discountType === EDiscountType.PERCENTAGE
            ? `${EDiscountCharacter.PERCENTAGE} ${item.discount}` : `${item.discount}${EDiscountCharacter.CURRENCY}`;
    }

    private renderResidences(item: TPromoCodeListItem): ReactNode {
        const residence = _.head(item.residences);
        const canTruncate = item.residences.length > 1;
        if (!_.isObject(residence)) {
            return void 0;
        }
        return `${residence.title}${canTruncate ? ", ..." : ""}`;
    }
}
