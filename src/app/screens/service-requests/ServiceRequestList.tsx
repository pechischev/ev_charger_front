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
import { ReactText } from "react";

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
                handler: (item: IServiceRequestListItem) => this.formatedDataTime(item.sendingDate),
            },
        ];
    }

    protected onClickRow(item: IServiceRequestListItem): void {
        redirectToServiceRequestProfile(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_SERVICE_REQUESTS>> {
        return this.store.transport.getServiceRequestsList(params);
    }

    private formatedDataTime(value: number): string {
        const newDate = new Date(value * 1000);

        const sMonth = this.padValue(newDate.getMonth() + 1);
        const sDay = this.padValue(newDate.getDate());
        const sYear = newDate.getFullYear();
        let sHour = newDate.getHours();
        const sMinute = this.padValue(newDate.getMinutes());
        let sAMPM = "AM";

        const iHourCheck = parseInt(sHour);

        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
            sHour = "12";
        }

        sHour = this.padValue(sHour);

        return `${sMonth}.${sDay}.${sYear} / ${sHour}:${sMinute} ${sAMPM}`;
    }

    private padValue(value: number): ReactText {
        return (value < 10) ? "0" + value : value;
    }
}
