import { action, observable } from "mobx";
import { EStatus } from "@entities/user";
import { Store } from "@components/store";
import { Nullable } from "@app/config";
import { Subject } from "rxjs";

export class UserListStore extends Store {
    readonly updateList$ = new Subject<void>();

    @observable private typeActivity?: EStatus;
    @observable private search?: string;

    @action.bound
    setActivityType(type?: EStatus): void {
        this.typeActivity = type;
    }

    getActivityType(): Nullable<EStatus> {
        return this.typeActivity;
    }

    @action.bound
    setSearch(type?: string): void {
        this.search = type;
    }

    getSearch(): Nullable<string> {
        return this.search;
    }
}
