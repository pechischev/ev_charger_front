import { action, observable } from "mobx";
import { ITabItem } from "./ITab";

export class TabStore {
    @observable private activeTab = 0;
    private items: ITabItem[] = [];

    setItems(items: ITabItem[]) {
        this.items = items;
    }

    getItems(): ITabItem[] {
        return this.items;
    }

    @action.bound
    setActiveTab(value: number) {
        this.activeTab = value;
        const item = this.items[value];
        if (item) {
            item.handler();
        }
    }

    getActiveTab(): number {
        return this.activeTab;
    }
}
