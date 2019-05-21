import { autobind } from "core-decorators";
import { Store } from "@components/store";
import { action, observable } from "mobx";
import { IItem } from "@entities/_common";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { get } from "lodash";

@autobind
export class ResidenceFormStore extends Store {
    @observable private _operators: IItem[] = [];

    get operators(): IItem[] {
        return this._operators;
    }

    getOperators(): void {
        this.call(this.transport.getOperators(), this.onGetOperators, this.onError);
    }

    @action.bound
    private onGetOperators(response: TAxiosResponse<EApiRoutes.OPERATORS>): void {
        console.info("[AddResidenceStore.onGetOperators]", response);
        const operators = get<TAxiosResponse<EApiRoutes.OPERATORS>, "data">(response, "data");
        this._operators = operators.map(({id, firstName, lastName}) => ({id, title: `${firstName} ${lastName}`}));
    }
}
