import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { autobind } from "core-decorators";
import { redirectToWorkerList } from "@utils/history";
import { EWorkerFieldTypes, IWorkerData } from "@app/components/worker-form";
import { toNumber } from "lodash";
import { ERole } from "@app/config";

@autobind
export class AddWorkerFormStore extends Store {
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
        const { residences = [], role, password, confirmPassword, ...rest } = data;
        const params: TApiParams<EApiRoutes.CREATE_WORKER> = {
            ...rest,
            password,
            role: toNumber(role),
            residences: residences.map(({id}) => toNumber(id))
        };
        return this.asyncCall(this.transport.createWorker(params)).then(this.onCreateWorker);
    }

    private onCreateWorker(response: TAxiosResponse<EApiRoutes.CREATE_USER>): void {
        console.info("[AddUserFormStore.onCreateWorker]", response);
        redirectToWorkerList();
    }
}
