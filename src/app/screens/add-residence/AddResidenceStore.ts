import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { autobind } from "core-decorators";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { toNumber } from "lodash";
import { redirectToResidenceList } from "@utils/history";
import { EResidenceFieldTypes } from "@app/components/residence-form";

@autobind
export class AddResidenceStore extends Store {

    validateData(): IFieldError[] {
        return [
            { type: EResidenceFieldTypes.TITLE, codes: [] },
            { type: EResidenceFieldTypes.STATE, codes: [] },
            { type: EResidenceFieldTypes.CITY, codes: [] },
            { type: EResidenceFieldTypes.ADDRESS, codes: [] },
            { type: EResidenceFieldTypes.ZIP_CODE, codes: [] },
            { type: EResidenceFieldTypes.OPERATOR, codes: [] },
            { type: EResidenceFieldTypes.BILLING_RATE, codes: [] },
        ];
    }

    async createResidence(params: TApiParams<EApiRoutes.CREATE_RESIDENCE>): Promise<void> {
        const { stateId, operatorId, ...rest } = params;
        return this.asyncCall(this.transport.createResidence({
            ...rest,
            stateId: toNumber(stateId),
            operatorId: toNumber(operatorId),
        }), this.onError).then(this.onCreateResidence);
    }

    private onCreateResidence(response: TAxiosResponse<EApiRoutes.CREATE_RESIDENCE>): void {
        console.info("[AddResidenceStore.onCreateResidence]", response);
        redirectToResidenceList();
    }
}
