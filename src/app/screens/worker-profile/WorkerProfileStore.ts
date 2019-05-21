import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { isEmpty, toNumber } from "lodash";
import { autobind } from "core-decorators";
import { IFieldError } from "@app/config/IFieldError";
import { ERole, Nullable } from "@app/config";
import { EWorkerFieldTypes } from "@app/components/worker-form";
import { IWorker } from "@entities/worker";
import { redirectToWorkerList } from "@utils/history";

@autobind
export class WorkerProfileStore extends Store {
    @observable private data: IWorker = _.stubObject();
    private workerId?: string;

    @action.bound
    setData(data: IWorker): void {
        this.data = data;
    }

    getData(): IWorker {
        return this.data;
    }

    @action.bound
    setWorkerId(data: string): void {
        this.workerId = data;
    }

    transformData(data?: IWorker): Nullable<TApiParams<EApiRoutes.WORKER_DATA>> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        const { user, role, status, residences = []} = data;
        const { id, ...rest } = user;
        const ids: number[] = residences.map((residence) => toNumber(residence.id));
        return { ...rest, status, role: toNumber(role.id), residences: ids };
    }

    validateData(values: TApiParams<EApiRoutes.CREATE_WORKER>): IFieldError[] {
        const fields = [
            { type: EWorkerFieldTypes.FIRST_NAME, codes: [] },
            { type: EWorkerFieldTypes.LAST_NAME, codes: [] },
            { type: EWorkerFieldTypes.EMAIL, codes: [15] },
            { type: EWorkerFieldTypes.PASSWORD, codes: [] },
            { type: EWorkerFieldTypes.CONFIRM_PASSWORD, codes: [] },
            { type: EWorkerFieldTypes.STATUS, codes: [] },
            { type: EWorkerFieldTypes.STATUS, codes: [] },
            { type: EWorkerFieldTypes.ROLE, codes: [] },
        ];
        const { role } = values;
        if (toNumber(role) === ERole.OPERATOR) {
            fields.push({ type: EWorkerFieldTypes.RESIDENCES_LIST, codes: [] });
        }
        return fields;
    }

    getEmployee(): void {
        if (!this.workerId) {
            return;
        }
        this.call(this.transport.getWorkerData(this.workerId), this.onGetWorkerData, this.onError);
    }

    async updateWorker(params: TApiParams<EApiRoutes.WORKER_DATA>): Promise<void> {
        const { residences = [], role, ...rest } = params;
        return this.asyncCall(this.transport.createWorker({
            ...rest,
            role: toNumber(role),
            residences: residences.map(toNumber)
        })).then(redirectToWorkerList);
    }

    private onGetWorkerData(response: TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.GET>): void {
        console.info("[WorkerProfileStore.onGetWorkerData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }
}
