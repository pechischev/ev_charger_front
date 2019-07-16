import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { ICustomer } from "@entities/customer";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { autobind } from "core-decorators";
import { Nullable } from "@app/config";
import { get, isEmpty, toNumber } from "lodash";
import { redirectToUsersList } from "@utils/history";
import { EUserFieldTypes } from "@app/components/user-form";

@autobind
export class ProfileTabStore extends Store {
    validateData(): IFieldError[] {
        return ([
            { type: EUserFieldTypes.FIRST_NAME, codes: [] },
            { type: EUserFieldTypes.LAST_NAME, codes: [] },
            { type: EUserFieldTypes.EMAIL, codes: [0, 15] },
            { type: EUserFieldTypes.PHONE, codes: [0, 19] },
            { type: EUserFieldTypes.STATUS, codes: [] },
            { type: EUserFieldTypes.RESIDENCE, codes: [] },
            { type: EUserFieldTypes.ADDRESS, codes: [] },
            { type: EUserFieldTypes.ZIP_CODE, codes: [] },
            { type: EUserFieldTypes.STATE, codes: [] },
            { type: EUserFieldTypes.MAKES, codes: [] },
            { type: EUserFieldTypes.MODEL, codes: [] },
        ]);
    }

    transformUserData(data?: ICustomer): Nullable<TApiParams<EApiRoutes.USER_DATA>> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        const { userData, contactData, phone, vehicle, subscription } = data;
        const { email, firstName, lastName } = userData;
        const { state, residence, ...rest } = contactData;
        const { makes, model, ...vehicleRest } = vehicle;
        const { status } = subscription;
        return {
            userData: { email, firstName, lastName, phone },
            contactInfo: {
                ...rest,
                stateId: toNumber(get(state, "id")),
                residenceId: toNumber(get(residence, "id")),
            },
            vehicle: {
                ...vehicleRest,
                makesId: toNumber(get(makes, "id")),
                modelId: toNumber(get(model, "id")),
            },
            status,
        };
    }

    async updateUser(data: TApiParams<EApiRoutes.USER_DATA>, userId: string): Promise<void> {
        const { contactInfo, vehicle, status, ...rest } = data;
        const { residenceId, stateId } = contactInfo;
        const { makesId, modelId } = vehicle;
        return this.asyncCall(this.transport.updateUser({
            ...rest, status,
            contactInfo: { ...contactInfo, residenceId: toNumber(residenceId), stateId: toNumber(stateId) },
            vehicle: { ...vehicle, modelId: toNumber(modelId), makesId: toNumber(makesId) },
        }, userId)).then(this.onUpdateUser);
    }

    private onUpdateUser(response: TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.PUT>): void {
        console.info("[ProfileTabStore.onUpdateUser]", response);
        redirectToUsersList();
    }
}
