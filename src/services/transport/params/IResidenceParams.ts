export interface IResidenceParams {
    title: string;
    stateId: number;
    city: string;
    address: string;
    extraAddress?: string;
    zipCode: string;

    operatorId: number;
    billingRate?: string;
    serviceFee?: string;
}
