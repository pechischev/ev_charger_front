import { Component, ReactNode } from "react";
import { Tab } from "@components/tab";
import { CustomForm } from "@components/custom-form";
import { InputField } from "@components/fields";
import * as React from "react";
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
            <div className="users-actions clearfix">
                {this.renderFilters()}
                <div className="users-actions__search float-right">
                    <CustomForm
                        submit={this.onSearch}
                        render={(api, submitting) => {
                            return (
                                <div className="search-field">
                                    <InputField
                                        label={"Search"}
                                        name={"search"}
                                        placeholder={"Search"}
                                    />
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        );
    }

    private renderFilters(): Nullable<ReactNode> {
        const {store, filters} = this.props;
        if (!filters.length) {
            return void 0;
        }
        return <Tab
            items={filters.map(({text, value}) => ({text, handler: () => store.setFilter(value)}))}
        />
    }

    private onSearch(data: TSearchType): void {
        const {store} = this.props;
        const search = _.get<TSearchType, "search">(data, "search");
        store.setSearch(search);
    }
}
