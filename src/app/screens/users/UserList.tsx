import { EStatus, IUserListItem } from "@entities/user";
import "./UserList.scss";
import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { redirectOnUserProfile } from "@utils/history";

@observer
@autobind
export class UserList extends List<IUserListItem> {

    protected getFilterItems(): IFilter[] {
        return [
            { text: "All", value: void 0 },
            { text: "Active", value: EStatus.ACTIVE },
            { text: "Inactive", value: EStatus.INACTIVE },
        ];
    }

    protected getColumns(): Array<IColumn<IUserListItem>> {
        return [
            { id: "user.id", label: "Id" },
            { id: "user.firstName", label: "First name" },
            { id: "user.lastName", label: "Last name" },
            { id: "residence.title", label: "Residence" },
            { id: "subscription.status", label: "Status" },
        ];
    }

    protected onClickRow(item: IUserListItem): void {
        redirectOnUserProfile(item.user.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_USERS>> {
        return this.store.transport.getUsers(params);
    }
}
