import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { autobind } from "core-decorators";
import { redirectToWorkerList } from "@utils/history";
import { EWorkerFieldTypes, IWorkerData } from "@app/components/worker-form";
import { get, isEmpty, stubObject, toNumber } from "lodash";
import { ERole } from "@app/config";
import { action, observable } from "mobx";

@autobind
export class AddWorkerFormStore extends Store {
    private data: IWorkerData = stubObject();
    @observable private isShowModal = false;

    showModal(): boolean {
        return this.isShowModal;
    }

    @action.bound
    closeModal(): void {
        this.isShowModal = false
    }

    validateData(values: TApiParams<EApiRoutes.CREATE_WORKER>): IFieldError[] {
        const fields = [
            { type: EWorkerFieldTypes.FIRST_NAME, codes: [] },
            { type: EWorkerFieldTypes.LAST_NAME, codes: [] },
            { type: EWorkerFieldTypes.EMAIL, codes: [15] },
            { type: EWorkerFieldTypes.PASSWORD, codes: [] },
            { type: EWorkerFieldTypes.CONFIRM_PASSWORD, codes: [] },
            { type: EWorkerFieldTypes.STATUS, codes: [] },
            { type: EWorkerFieldTypes.ROLE, codes: [] },
        ];
        const { role } = values;
        if (toNumber(role) === ERole.OPERATOR) {
            fields.push({ type: EWorkerFieldTypes.RESIDENCES_LIST, codes: [] });
        }
        return fields;
    }

    async createWorker(data: IWorkerData): Promise<void> {
        const { residences = [], role, password, confirmPassword, ...rest } = this.data;
        const params: TApiParams<EApiRoutes.CREATE_WORKER> = {
            ...rest,
            password,
            role: toNumber(role),
            residences: residences.map(({ id }) => toNumber(id)),
        };
        return this.asyncCall(this.transport.createWorker(params)).then(this.onSuccessCreateWorker);
    }

    async onCreateWorker(): Promise<void> {
        return this.createWorker(this.data);
    }

    async onSubmit(data: IWorkerData): Promise<void> {
        const { residences = [] } = data;
        this.data = data;
        const ids = residences.map(({ id }) => toNumber(id));
        return this.asyncCall(this.transport.getBoundResidences({ ids })).then(this.onGetBoundResidences);
    }

    private onSuccessCreateWorker(response: TAxiosResponse<EApiRoutes.CREATE_USER>): void {
        console.info("[AddUserFormStore.onSuccessCreateWorker]", response);
        redirectToWorkerList();
    }

    @action.bound
    private onGetBoundResidences(response: TAxiosResponse<EApiRoutes.GET_BOUND_RESIDENCES>): void {
        const ids = get<TAxiosResponse<EApiRoutes.GET_BOUND_RESIDENCES>, "data">(response, "data");
        if (isEmpty(ids)) {
            this.createWorker(this.data);
            return;
        }
        this.isShowModal = true;
    }
}
