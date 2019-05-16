import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EFieldTypes } from "./constants";
import { IUserParams } from "@services/transport/params";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { autobind } from "core-decorators";
import { toNumber } from "lodash";
import { redirectToUsersList } from "@utils/history";

@autobind
export class AddUserFormStore extends Store {
    validateData(): IFieldError[] {
        return ([
            { type: EFieldTypes.FIRST_NAME, codes: [] },
            { type: EFieldTypes.LAST_NAME, codes: [] },
            { type: EFieldTypes.EMAIL, codes: [15] },
            { type: EFieldTypes.PHONE, codes: [19] },
            { type: EFieldTypes.RESIDENCE, codes: [] },
            { type: EFieldTypes.ADDRESS, codes: [] },
            { type: EFieldTypes.APT_UNIT, codes: [] },
            { type: EFieldTypes.CITY, codes: [] },
            { type: EFieldTypes.ZIP_CODE, codes: [] },
            { type: EFieldTypes.STATE, codes: [] },
            { type: EFieldTypes.MAKES, codes: [] },
            { type: EFieldTypes.MODEL, codes: [] },
            { type: EFieldTypes.YEAR, codes: [] },
            { type: EFieldTypes.LICENSE_PLATE, codes: [] },
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
