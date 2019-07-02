export interface IResidenceForm {
    title: string;
    stateId: number;
    city: string;
    address: string;
    extraAddress?: string;
    zipCode: string;

    operatorId?: number;
    billingRate: string;
    serviceFee: string;
}
