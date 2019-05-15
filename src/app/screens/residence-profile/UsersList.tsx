import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IUsersListItem } from "@entities/residence";
import { toString } from "lodash";

interface IUsersListProps extends IList<IUsersListItem> {
    residenceId: number;
}

@observer
@autobind
export class UsersList extends List<IUsersListItem, IUsersListProps> {

    protected getColumns(): IColumn[] {
        return [
            {id: "userId", label: "Id"},
            {id: "user.firstName", label: "First name", handler: (item: IUsersListItem) => this.getFullUserName(item)},
            {id: "status", label: "Status"},
        ];
    }

    protected getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCE_USERS>> {
        const {residenceId} = this.props;
        return this.store.transport.getResidenceUsersData(params, toString(residenceId));
    }

    private getFullUserName(item: IUsersListItem): string {
        const {firstName, lastName} = item.user;
        return `${firstName} ${lastName}`.trim();
    }
}
