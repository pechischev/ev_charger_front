import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { ICustomer } from "@entities/customer";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { autobind } from "core-decorators";
import { EFieldTypes } from "@app/screens/add-user-form/constants";
import { EPaths, Nullable } from "@app/config";
import { toNumber, isEmpty } from "lodash";
import { AppContext } from "@context";

@autobind
export class ProfileTabStore extends Store {
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

    transformUserData(data?: ICustomer): Nullable<TApiParams<EApiRoutes.USER_DATA>> {
        if (!data || isEmpty(data)) {
            return void 0;
        }

        const { userData, contactData, phone, vehicle} = data;
        const { email, firstName, lastName } = userData;
        const { state, residence, ...rest } = contactData;
        const { makes, model, ...vehicleRest } = vehicle;

        return {
            userData: { email, firstName, lastName, phone },
            contactInfo: {
                ...rest,
                stateId: toNumber(state.id),
                residenceId: toNumber(residence.id),
            },
            vehicle: {
                ...vehicleRest,
                makesId: toNumber(makes.id),
                modelId: toNumber(model.id),
            },
        };
    }

    async updateUser(data: TApiParams<EApiRoutes.USER_DATA>, userId: string): Promise<void> {
        return this.asyncCall(this.transport.updateUser(data, userId), this.onError).then(this.onUpdateUser)
    }

    private onUpdateUser(response: TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.PUT>): void {
        console.info("[ProfileTabStore.onUpdateUser]", response);
        AppContext.getHistory().push(`/${EPaths.USER_LIST}`);
    }
}
