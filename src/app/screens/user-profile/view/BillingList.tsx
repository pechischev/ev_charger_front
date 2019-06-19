import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { IBillingInfoListItem } from "@entities/user";
import { formatDate } from "@utils";

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
        const milliseconds = 1000;
        return [
            {
                id: "payDate", label: "Date",
                handler: (item: IBillingInfoListItem) => formatDate(item.payDate * milliseconds),
            },
            { id: "amount", label: "Transaction value" },
            { id: "status", label: "Status" },
        ];
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_BILLING_DATA>> {
        const {userId} = this.props;
        if (!userId) {
            return new Promise((resolve) => resolve);
        }
        return this.store.transport.getUserBillingInfo(params, userId);
    }
}
