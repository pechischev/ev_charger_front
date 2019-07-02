import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { get, isEmpty, isEqual, stubObject, toNumber } from "lodash";
import { autobind } from "core-decorators";
import { IFieldError } from "@app/config/IFieldError";
import { ERole, Nullable } from "@app/config";
import { EWorkerFieldTypes, IWorkerData } from "@app/components/worker-form";
import { IWorker } from "@entities/worker";
import { redirectToWorkerList } from "@utils/history";

@autobind
export class WorkerProfileStore extends Store {
    @observable private data: IWorker = stubObject();
    @observable private formData: IWorkerData = stubObject();
    @observable private isShowModal = false;
    @observable private isShowBindOperatorModal = false;
    private workerId?: string;

    showBindOperatorModal(): boolean {
        return this.isShowBindOperatorModal;
    }

    @action.bound
    closeBindOperatorModal(): void {
        this.isShowBindOperatorModal = false;
    }

    showModal(): boolean {
        return this.isShowModal;
    }

    @action.bound
    closeModal(): void {
        this.isShowModal = false;
    }

    @action.bound
    setData(data: IWorker): void {
        this.data = data;
    }

    getData(): IWorker {
        return this.data;
    }

    @action.bound
    setWorkerId(id: string): void {
        this.workerId = id;
    }

    getWorkerId(): Nullable<number> {
        return get(this.data, "workerId");
    }

    transformData(data?: IWorker): Nullable<IWorkerData> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        const { user, role, status, residences = [] } = data;
        const { id, password, ...rest } = user;
        return { ...rest, status, role: toNumber(role.id), residences: residences.length ? residences : void 0 };
    }

    validateData(values: TApiParams<EApiRoutes.CREATE_WORKER>): IFieldError[] {
        const fields = [
            { type: EWorkerFieldTypes.FIRST_NAME, codes: [] },
            { type: EWorkerFieldTypes.LAST_NAME, codes: [] },
            { type: EWorkerFieldTypes.EMAIL, codes: [0, 15, 101] },
            { type: EWorkerFieldTypes.STATUS, codes: [] },
            { type: EWorkerFieldTypes.ROLE, codes: [] },
        ];
        const { password, confirmPassword } = values;
        if (!!password || !!confirmPassword) {
            fields.push(...[
                { type: EWorkerFieldTypes.PASSWORD, codes: [] },
                { type: EWorkerFieldTypes.CONFIRM_PASSWORD, codes: [] },
            ]);
        }
        return fields;
    }

    getEmployee(): void {
        if (!this.workerId) {
            return;
        }
        this.call(this.transport.getWorkerData(this.workerId), this.onGetWorkerData, this.onError);
    }

    @action.bound
    async onSubmit(data: IWorkerData): Promise<void> {
        const { role, residences = [] } = data;
        this.formData = data;
        if (toNumber(role) === ERole.ADMIN && toNumber(role) !== this.data.role.id && !isEmpty(this.data.residences)) {
            this.isShowBindOperatorModal = true;
            return new Promise((resolve) => resolve());
        }
        const ids = residences.map(({ id }) => toNumber(id));
        return this.asyncCall(this.transport.getBoundResidences({ ids }))
            .then(this.onGetBoundResidences);
    }

    async onUpdateWorker(): Promise<void> {
        return this.updateWorker(this.formData);
    }

    async updateWorker(data: IWorkerData): Promise<void> {
        if (!this.workerId) {
            return;
        }
        const { residences = [], role, password, confirmPassword, ...rest } = data;
        const params: TApiParams<EApiRoutes.WORKER_DATA> = {
            ...rest,
            password,
            role: toNumber(role),
            residences: residences.map(({ id }) => toNumber(id)),
        };
        return this.asyncCall(this.transport.updateWorker(params, this.workerId))
            .then(redirectToWorkerList);
    }

    private onGetWorkerData(response: TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.GET>): void {
        console.info("[WorkerProfileStore.onGetWorkerData]: ", response);
        const data = get<TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }

    @action.bound
    private onGetBoundResidences(response: TAxiosResponse<EApiRoutes.GET_BOUND_RESIDENCES>): void {
        const ids = get<TAxiosResponse<EApiRoutes.GET_BOUND_RESIDENCES>, "data">(response, "data");
        const residences = get<TAxiosResponse<EApiRoutes.GET_BOUND_RESIDENCES>, "data">(response, "data");
        if (isEmpty(ids)) {
            this.updateWorker(this.formData);
            return;
        }
        const residencesIds = (this.data.residences || []).map(({ id }) => toNumber(id));
        if (!isEqual(residences, residencesIds)) {
            this.isShowModal = true;
        } else {
            this.updateWorker(this.formData);
        }
    }
}
