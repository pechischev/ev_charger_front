export interface IUserParams {
    userData: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        password?: string;
    };
    contactInfo: {
        address: string;
        city: string;
        stateId: number;
        zipCode: string;
        residenceId: number;
        aptUnit: string;
    };
    vehicle: {
        makesId: number,
        modelId: number,
        year: string,
        licensePlate: string
    }
}
