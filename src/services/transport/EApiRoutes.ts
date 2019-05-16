export enum EApiRoutes {
    GET_STATES = "/v1.0/info/states",
    GET_MAKES = "/v1.0/info/makes",
    GET_RESIDENCES = "/v1.0/info/residences",
    GET_MODELS = "/v1.0/info/models/{makeId}",

    OPERATORS = "/v1.0/cms/operators",

    SIGN_IN = "/v1.0/cms/signIn",

    GET_USERS = "/v1.0/cms/customers",
    CREATE_USER = "/v1.0/cms/customer",
    USER_DATA = "/v1.0/cms/customer/{customerId}",

    GET_RESIDENCES_LIST = "/v1.0/cms/residences",
    CREATE_RESIDENCE = "/v1.0/cms/residence",
    GET_RESIDENCE_DATA = "/v1.0/cms/residence/{residenceId}",
    GET_RESIDENCE_CHARGES = "/v1.0/cms/residence/{residenceId}/chargers",
    GET_RESIDENCE_USERS = "/v1.0/cms/residence/{residenceId}/users",
}
