export enum EApiRoutes {
    SIGN_IN = "/v1.0/cms/signIn",

    GET_USERS = "/v1.0/cms/customers",
    GET_USER_DATA = "/v1.0/cms/customer/{customerId}",

    GET_RESIDENCES = "/v1.0/cms/residences",
    GET_RESIDENCE_DATA = "/v1.0/cms/residence/{residenceId}",
    GET_RESIDENCE_CHARGES = "/v1.0/cms/residence/{residenceId}/chargers",
    GET_RESIDENCE_USERS = "/v1.0/cms/residence/{residenceId}/users",
}
