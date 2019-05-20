import { EStatus } from "@entities/user";
import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { redirectToCompanyEmployeeForm } from "@utils/history";
import { Button } from "@components/button";
import * as React from "react";
import { Fragment, ReactNode } from "react";
import { action, observable } from "mobx";
import { ICompanyUserListItem } from "@entities/company-users";
import { Modal } from "@components/modal";

interface ICompanyEmployeesListProps extends IList<ICompanyUserListItem> {
    onRemoveItem(chargerId: number): Promise<void>;

    onViewItem(chargerId: number): Promise<void>;
}

@observer
@autobind
export class CompanyEmployeesList extends List<ICompanyUserListItem, ICompanyEmployeesListProps> {
    @observable private isOpenModal = false;

    render(): ReactNode {
        return (
            <Fragment>
                {this.renderList()}
                <Modal
                    open={this.isOpenModal}
                    onClose={this.closeModal}
                    title={"Are you sure want to delete this user?"}
                    action={this.deleteUser}
                    actionOptions={{
                        title: "Delete",
                        type: "delete",
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

    protected getColumns(): IColumn[] {
        return [
            { id: "firstName", label: "First name" },
            { id: "lastName", label: "Last name" },
            { id: "email", label: "Email" },
            { id: "status", label: "Status" },
            { id: "role", label: "Role" },
            {
                id: "action", label: "", size: "120px",
                handler: () => <Button type="delete" onClick={this.onDeleteUser} text="Delete"/>,
            },
        ];
    }

    protected onClickRow(item: ICompanyUserListItem): void {
        redirectToCompanyEmployeeForm(item.id);
    }

    protected getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_COMPANY_EMPLOYEES>> {
        return this.store.transport.getUsers(params);
    }

    private onDeleteUser(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.openModal();
    }

    private deleteUser(): void {
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
