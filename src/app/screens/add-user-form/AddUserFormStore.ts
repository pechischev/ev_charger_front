import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { IUserParams } from "@services/transport/params";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { autobind } from "core-decorators";
import { toNumber } from "lodash";
import { redirectToUsersList } from "@utils/history";
import { EUserFieldTypes } from "@app/components/user-form";

@autobind
export class AddUserFormStore extends Store {
    validateData(): IFieldError[] {
        return ([
            { type: EUserFieldTypes.FIRST_NAME, codes: [] },
            { type: EUserFieldTypes.LAST_NAME, codes: [] },
            { type: EUserFieldTypes.EMAIL, codes: [15] },
            { type: EUserFieldTypes.PHONE, codes: [19] },
            { type: EUserFieldTypes.RESIDENCE, codes: [] },
            { type: EUserFieldTypes.ADDRESS, codes: [] },
            { type: EUserFieldTypes.APT_UNIT, codes: [] },
            { type: EUserFieldTypes.CITY, codes: [] },
            { type: EUserFieldTypes.ZIP_CODE, codes: [] },
            { type: EUserFieldTypes.STATE, codes: [] },
            { type: EUserFieldTypes.MAKES, codes: [] },
            { type: EUserFieldTypes.MODEL, codes: [] },
            { type: EUserFieldTypes.YEAR, codes: [] },
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
