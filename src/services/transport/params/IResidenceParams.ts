export interface IResidenceParams {
    title: string;
    stateId: number;
    city: string;
    address: string;
    zipCode: string;

    operatorId: number;
    billingRate?: number;
    serviceFee?: string;
}
