import * as React from "react";
import { Component, ReactNode } from "react";
import { Tab } from "@components/tab";
import { CustomForm } from "@components/custom-form";
import { DateField, InputField } from "@components/fields";
import { IListActions } from "@components/list/interfaces";
import { IListParams } from "@services/transport/params";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { Nullable } from "@app/config";
import { EListActionsFields } from "./EListActionsFields";
import * as moment from "moment";
import { get, isEmpty, isNil } from "lodash";
import { EMessages } from "@utils/EMessage";

type TSearchType = Pick<IListParams, "search">;
type TDateType = Pick<IListParams, "from" | "to">;

@observer
@autobind
export class ListActions<T> extends Component<IListActions<T>> {
    render(): React.ReactNode {
        return (
            <div className="list-actions">
                <div className="list-actions_row clearfix">
                    {this.renderFilters()}
                    {this.renderSearchField()}
                    {this.renderActionElement()}
                </div>
                <div className="list-actions_row clearfix">
                    {this.renderDataSearchFields()}
                </div>
            </div>
        );
    }

    private renderActionElement(): Nullable<ReactNode> {
        const { actionElement } = this.props;
        if (!actionElement) {
            return void 0;
        }
        return (
            <div className="list-actions__add-button float-right">
                {actionElement}
            </div>
        );
    }

    private renderSearchField(): Nullable<ReactNode> {
        const { canSearch } = this.props;
        if (!canSearch) {
            return void 0;
        }
        return (
            <div className="list-actions__search float-right">
                <CustomForm
                    submit={this.onSearch}
                    render={(api, submitting) => {
                        return (
                            <div className="search-field">
                                <InputField
                                    name={EListActionsFields.SEARCH}
                                    placeholder={"Search"}
                                />
                            </div>
                        );
                    }}
                />
            </div>
        );
    }

    private renderDataSearchFields(): Nullable<ReactNode> {
        const { canDateSearch } = this.props;
        if (!canDateSearch) {
            return void 0;
        }
        return (
            <div className="list-actions__data-search">
                <CustomForm
                    submit={this.onDateFilter}
                    render={(api, submitting) => {
                        return (
                            <div className="data-search clearfix">
                                <DateField
                                    name={EListActionsFields.DATE_FROM}
                                    placeholder={"Date from"}
                                    validate={
                                        (value, allValues) => this.validateDateField(
                                            value,
                                            allValues,
                                            EListActionsFields.DATE_TO,
                                        )
                                    }
                                />
                                <DateField
                                    name={EListActionsFields.DATE_TO}
                                    placeholder={"Date to"}
                                    validate={
                                        (value, allValues) => this.validateDateField(
                                            value,
                                            allValues,
                                            EListActionsFields.DATE_TO,
                                        )
                                    }
                                />
                            </div>
                        );
                    }}
                />
            </div>
        );
    }

    private renderFilters(): Nullable<ReactNode> {
        const { store, filters } = this.props;
        if (!filters.length) {
            return void 0;
        }
        return (
            <Tab
                items={filters.map(({ text, value }) => ({ text, handler: () => store.setFilter(value) }))}
                className="list-actions__tabs"
            />
        );
    }

    private onDateFilter(data: TDateType): void {
        const { store } = this.props;
        const start = get<TDateType, "from">(data, "from");
        const end = get<TDateType, "to">(data, "to");
        if (!start && !end) {
            return;
        }
        store.setDateRange({ start: moment(start).unix(), end: moment(end).unix() });
    }

    private onSearch(data: TSearchType): void {
        const { store } = this.props;
        const search = get<TSearchType, "search">(data, "search");
        store.setSearch(search);
    }

    private validateDateField(value: string, allValues: object, type: EListActionsFields): Nullable<string> {
        if (!value) {
            return void 0;
        }
        const initFrom = get(allValues, EListActionsFields.DATE_FROM);
        const initTo = get(allValues, EListActionsFields.DATE_TO);
        const from = !isEmpty(initFrom) ? moment(initFrom).unix() : undefined;
        const to = !isEmpty(initTo) ? moment(initTo).unix() : undefined;
        if (isNil(from) || isNil(to)) {
            return EMessages.LIST_ACTIONS_DATES;
        }
        if (from > to) {
            return EMessages.LIST_ACTIONS_DATE;
        }
        return void 0;
    }
}
