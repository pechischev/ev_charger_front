export enum EApiRoutes {
    GET_STATES = "/v1.0/info/states",
    GET_MAKES = "/v1.0/info/makes",
    GET_RESIDENCES = "/v1.0/info/residences",
    GET_MODELS = "/v1.0/info/models/{makeId}",

    SIGN_IN = "/v1.0/cms/signIn",
    PROFILE = "/v1.0/cms/user",

    GET_USERS = "/v1.0/cms/customers",
    CREATE_USER = "/v1.0/cms/customer",
    USER_DATA = "/v1.0/cms/customer/{customerId}",

    GET_RESIDENCES_LIST = "/v1.0/cms/residences",
    GET_RESIDENCE_DATA = "/v1.0/cms/residence/{residenceId}"
}
