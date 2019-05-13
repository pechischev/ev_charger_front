import {action, observable} from "mobx";
import { ETabsType } from "@components/tab";

export class CustomerProfileStore {
    @observable private typeTab = ETabsType.CUSTOMER_PROFILE;

    @action.bound
    setTypeTab(type: ETabsType) {
        this.typeTab = type;
    }

    getTypeTab(): ETabsType {
        return this.typeTab;
    }
}
