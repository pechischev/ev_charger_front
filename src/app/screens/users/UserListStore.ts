import { action, observable } from "mobx";
import { EStatus } from "@entities/user";
import { Store } from "@components/store";

export class UserListStore extends Store {
    @observable private typeActivity: EStatus = EStatus.ALL;

    @action.bound
    setActivityType(type: EStatus) {
        this.typeActivity = type;
    }

    getActivityType() {
        return(this.typeActivity);
    }
}
