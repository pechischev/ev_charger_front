import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { IBillingInfoListItem } from "@entities/user";

interface IBillingList extends IList<IBillingInfoListItem> {
    userId?: string;
}

@observer
@autobind
export class BillingList extends List<IBillingInfoListItem, IBillingList> {

    protected getFilterItems(): IFilter[] {
        return [];
    }

    protected getColumns(): Array<IColumn<IBillingInfoListItem>> {
        return [
            { id: "payDate", label: "Date",
                handler: (item: IBillingInfoListItem) => this.formatingDate(item.payDate * 1000),
            },
            { id: "amount", label: "Transaction value" },
            { id: "status", label: "Status" },
        ];
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_BILLING_DATA>> {
        if (this.props.userId) {
            return this.store.transport.getUserBillingInfo(params, this.props.userId);
        }
        return new Promise((resolve) => resolve);
    }

    private formatingDate(value: number): string {
        const dateValue = new Date(value);
        return `${dateValue.getMonth()}/${dateValue.getDate()}/${dateValue.getFullYear()}`;
    }
}
