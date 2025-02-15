import { EStatus } from "@entities/user";
import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { Button } from "@components/button";
import * as React from "react";
import { Fragment, ReactNode } from "react";
import { action, observable } from "mobx";
import { Modal } from "@components/modal";
import { IWorker } from "@entities/worker";

interface ICompanyWorkerListProps extends IList<IWorker> {
    onRemoveItem(workerId: number): Promise<void>;

    onViewItem(workerId: number): void;
}

@observer
@autobind
export class WorkersList extends List<IWorker, ICompanyWorkerListProps> {
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

    protected getColumns(): Array<IColumn<IWorker>> {
        return [
            { id: "user.firstName", label: "First name" },
            { id: "user.lastName", label: "Last name" },
            { id: "user.email", label: "Email" },
            { id: "status", label: "Status" },
            { id: "role.title", label: "Role" },
            {
                id: "action", label: "", size: "120px",
                handler: () => <Button type="delete" onClick={this.onDeleteUser} text="Delete"/>,
            },
        ];
    }

    protected onClickRow(item: IWorker): void {
        const { onViewItem } = this.props;
        onViewItem(item.user.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_WORKERS>> {
        return this.store.transport.getWorkers(params);
    }

    private onDeleteUser(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.openModal();
    }

    private deleteUser(): void {
        const item = this.store.getSelectedItem();
        if (!item) {
            return;
        }
        this.props.onRemoveItem(item.user.id).then(this.updateList);
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
