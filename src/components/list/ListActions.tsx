import * as React from "react";
import { Component, ReactNode } from "react";
import { Tab } from "@components/tab";
import { CustomForm } from "@components/custom-form";
import { InputField, DataField } from "@components/fields";
import { IListActions } from "@components/list/interfaces";
import * as _ from "lodash";
import { IListParams } from "@services/transport/params";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { Nullable } from "@app/config";

type TSearchType = Pick<IListParams, "search">;

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
                                    name={"search"}
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
        const { canDataSearch } = this.props;
        if (!canDataSearch) {
            return void 0;
        }
        return (
            <div className="list-actions__data-search">
                <CustomForm
                    submit={this.onSearch}
                    render={(api, submitting) => {
                        return (
                            <div className="data-search clearfix">
                                <div className="float-right">
                                    <DataField
                                        name={"data_to"}
                                        placeholder={"Date to"}
                                    />
                                </div>
                                <div className="float-right">
                                    <DataField
                                        name={"data_from"}
                                        placeholder={"Date from"}
                                    />
                                </div>
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
            />
        );
    }

    private onSearch(data: TSearchType): void {
        const { store } = this.props;
        const search = _.get<TSearchType, "search">(data, "search");
        store.setSearch(search);
    }
}
