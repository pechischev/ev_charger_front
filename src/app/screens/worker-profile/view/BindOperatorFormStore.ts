import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EBindOperatorFieldTypes } from "./EBindOperatorFieldTypes";
import { toNumber, get } from "lodash";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { action, computed, observable } from "mobx";
import { IItem } from "@entities/_common";
import { autobind } from "core-decorators";

export interface IOperatorFormData {
    [EBindOperatorFieldTypes.OPERATOR]: number;
}

@autobind
export class BindOperatorFormStore extends Store {
    @observable private _operators: IItem[] = [];
    private currentWorkerId?: number;

    validateData(): IFieldError[] {
        return [
            { type: EBindOperatorFieldTypes.OPERATOR, codes: [] },
        ];
    }

    async bindOperator(data: IOperatorFormData, workerId?: number): Promise<void> {
        if (!workerId) {
            return;
        }
        const { operator } = data;
        return this.asyncCall(this.transport.bindOperator({
            operatorId: toNumber(workerId),
            newOperatorId: toNumber(operator),
        })).then(this.onBindOperator);
    }

    @computed
    get operators(): IItem[] {
        return this._operators;
    }

    async getOperators(currentWorkerId?: number): Promise<void> {
        this.currentWorkerId = currentWorkerId;
        return this.asyncCall(this.transport.getOperators())
            .then(this.onGetOperators);
    }

    private onBindOperator(response: TAxiosResponse<EApiRoutes.BIND_WORKER>): void {
        console.info("[BindOperatorFormStore.onBindOperator]", response);
    }

    @action.bound
    private onGetOperators(response: TAxiosResponse<EApiRoutes.OPERATORS>): void {
        console.info("[BindOperatorFormStore.onGetOperators]", response);
        const operators = get<TAxiosResponse<EApiRoutes.OPERATORS>, "data">(response, "data");
        this._operators = operators
            .filter(({id}) => toNumber(id) !== this.currentWorkerId)
            .map(({id, firstName, lastName}) => ({id, title: `${firstName} ${lastName}`}));
    }
}
