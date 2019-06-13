import { EStatus } from "@entities/user";
import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { redirectToServiceRequestProfile } from "@utils/history";
import { IServiceRequestListItem } from "@entities/service-request";

@observer
@autobind
export class ServiceRequestList extends List<IServiceRequestListItem> {

    constructor(props: IServiceRequestListItem) {
        super(props);

        this.store.setData([]);
    }

    protected getFilterItems(): IFilter[] {
        return [
            { text: "All", value: void 0 },
            { text: "Active", value: EStatus.ACTIVE },
            { text: "Resolved", value: EStatus.INACTIVE },
        ];
    }

    protected getColumns(): Array<IColumn<IServiceRequestListItem>> {
        return [
            { id: "id", label: "Id" },
            { id: "user.firstName", label: "First name" },
            { id: "user.lastName", label: "Last name" },
            { id: "requestType", label: "Request Type" },
            {
                id: "data", label: "Data/Time",
                handler: (item: IServiceRequestListItem) => {
                    return item.data; // TODO; reforming to format (MM.DD.YYYY / HH:MM PM/AM)
                },
            },
        ];
    }

    protected onClickRow(item: IServiceRequestListItem): void {
        redirectToServiceRequestProfile(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_SERVICE_REQUESTS>> {
        return new Promise(resolve => resolve());
    }
}
