import { EStatus } from "@entities/user";
import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { redirectToServiceRequestProfile } from "@utils/history";
import { IServiceRequestListItem, RequestTypeMap } from "@entities/service-request";
import { formattedDataTime } from "@utils";

@observer
@autobind
export class ServiceRequestList extends List<IServiceRequestListItem> {

    protected getFilterItems(): IFilter[] {
        return [
            { text: "All", value: void 0 },
            { text: "Active", value: EStatus.ACTIVE },
            { text: "Resolved", value: EStatus.RESOLVED },
        ];
    }

    protected getColumns(): Array<IColumn<IServiceRequestListItem>> {
        return [
            { id: "id", label: "Id" },
            { id: "customer.firstName", label: "First name" },
            { id: "customer.lastName", label: "Last name" },
            {
                id: "type", label: "Request Type",
                handler: (item: IServiceRequestListItem) => RequestTypeMap.get(item.type),
            },
            {
                id: "data", label: "Data/Time",
                handler: (item: IServiceRequestListItem) => formattedDataTime(item.sendingDate),
            },
        ];
    }

    protected onClickRow(item: IServiceRequestListItem): void {
        redirectToServiceRequestProfile(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_SERVICE_REQUESTS>> {
        return this.store.transport.getServiceRequestsList(params);
    }

}
