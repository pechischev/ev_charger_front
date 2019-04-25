import { action, observable } from "mobx";
import { Observable } from "rxjs";

export class IndirectRouteStore {
    @observable private isValidRoute = true;
    @observable private validRouteSubject = new Observable<void>();

    getValidState(): boolean {
        return this.isValidRoute;
    }

    @action.bound
    setObservable(subject: Observable<void>): void {
        this.validRouteSubject = subject;
    }

    @action.bound
    setValidState(state: boolean): void {
        this.isValidRoute = state;
    }

    @action.bound
    checkRoute(): void {
        this.validRouteSubject.subscribe(
            () => this.setValidState(true),
            () => this.setValidState(process.env.NODE_ENV !== "production"),
        );
    }
}
