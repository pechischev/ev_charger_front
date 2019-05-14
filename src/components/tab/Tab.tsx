import * as React from "react";
import { ChangeEvent, Component } from "react";
import { TabStore } from "./TabStore";
import { observer } from "mobx-react";
import * as classnames from "classnames";
import * as _ from "lodash";
import "./tabs.scss";
import { ETabsType, ITabItem } from "@components/tab";

export interface ICustomTabProps {
    items: ITabItem[];
    className?: string;
    type?: ETabsType;
}

@observer
export class Tab extends Component<ICustomTabProps> {
    private readonly store = new TabStore();

    constructor(props: ICustomTabProps) {
        super(props);
        this.store.setItems(props.items);
    }

    componentWillUpdate(nextProps: ICustomTabProps) {
        if (_.difference(this.props.items, nextProps.items).length) {
            this.store.setItems(nextProps.items);
        }
    }

    render() {
        const { children, className = "" } = this.props;
        const items = this.store.getItems();
        const classes = classnames({
            ["tabs-container"]: true,
            [className]: true,
            ["float-left"]: true,
        });
        return (
            <div className={classes}>
                <div className="tabs">
                    {
                        items.map((item: ITabItem, index) => {
                            const { text } = item;
                            return (
                                <div key={index} className="tab-item__label" data-active={this.store.getActiveTab() === index} onClick={this.onChange.bind(this, index)}>
                                    {text}
                                </div>
                            );
                        })
                    }
                </div>
                <div className="tabs-item tab-content">
                    {children}
                </div>
            </div>
        );
    }

    private onChange(value: number, event: ChangeEvent<HTMLElement>) {
        this.store.setActiveTab(value);
    }

}
