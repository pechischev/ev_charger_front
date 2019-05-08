import * as React from "react";
import { ChangeEvent, Component } from "react";
import { TabStore } from "./TabStore";
import { observer } from "mobx-react";
import * as classnames from "classnames";
import * as _ from "lodash";
import "./tabs.scss";
import { ETabsType, ITab } from "@components/tab";

export interface ICustomTabProps {
    items: ITab.IItem[];
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
        const {className = "", children} = this.props;
        const items = this.store.getItems();
        const classes = classnames({
            ["tabs-container"]: true,
            [className]: true
        });
        return (
            <div className={classes}>
                <div className="tabs">
                    {
                        items.map((item: ITab.IItem, index) => {
                            const {text} = item;
                            return (
                                <div key={index} className="tab-item_selected tab-item__label" onClick={this.onChange.bind(this, index)}>
                                    {text}
                                </div>
                            );
                        })
                    }
                </div>
                <div className="tabs-item">
                    {children}
                </div>
            </div>
        );
    }

    private onChange(event: ChangeEvent<HTMLElement>, value: number) {
        this.store.setActiveTab(value);
    }

}
