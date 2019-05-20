import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { IUserParams } from "@services/transport/params";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { autobind } from "core-decorators";
import { toNumber } from "lodash";
import { redirectToUsersList } from "@utils/history";
import { EEmployeeFieldTypes } from "@app/components/employee-form";

@autobind
export class AddEmployeeFormStore extends Store {
    validateData(): IFieldError[] {
        return ([
            { type: EEmployeeFieldTypes.FIRST_NAME, codes: [] },
            { type: EEmployeeFieldTypes.LAST_NAME, codes: [] },
            { type: EEmployeeFieldTypes.EMAIL, codes: [15] },
            { type: EEmployeeFieldTypes.PASSWORD, codes: [] },
            { type: EEmployeeFieldTypes.CONFIRM_PASSWORD, codes: [] },
            { type: EEmployeeFieldTypes.STATUS, codes: [] },
            { type: EEmployeeFieldTypes.STATUS, codes: [] },
            { type: EEmployeeFieldTypes.ROLE, codes: [] },
            { type: EEmployeeFieldTypes.RESIDENCES_LIST, codes: [] },
        ]);
    }

    async createUser(data: IUserParams): Promise<void> {
        const { contactInfo, vehicle, ...rest } = data;
        const { residenceId, stateId } = contactInfo;
        const { makesId, modelId } = vehicle;
        return this.asyncCall(this.transport.createUser({
            ...rest,
            contactInfo: { ...contactInfo, residenceId: toNumber(residenceId), stateId: toNumber(stateId) },
            vehicle: { ...vehicle, modelId: toNumber(modelId), makesId: toNumber(makesId) },
        }), this.onError).then(this.onCreateUser);
    }

    private onCreateUser(response: TAxiosResponse<EApiRoutes.CREATE_USER>): void {
        console.info("[AddUserFormStore.onCreateUser]", response);
        redirectToUsersList();
    }
}
