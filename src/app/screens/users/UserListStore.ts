import { action, observable } from "mobx";
import { EStatus } from "@entities/user";

export class UserListStore {
    @observable private typeActivity: EStatus = EStatus.ACTIVE;

    @action.bound
    setActivityType(type: EStatus) {
        this.typeActivity = type;
    }

    getActivityType() {
        return(this.typeActivity);
    }
}
