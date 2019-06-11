export enum EApiRoutes {
    GET_STATES = "/v1.0/info/states",
    GET_MAKES = "/v1.0/info/makes",
    GET_RESIDENCES = "/v1.0/info/residences",
    GET_MODELS = "/v1.0/info/models/{makeId}",

    OPERATORS = "/v1.0/cms/operators",

    SIGN_IN = "/v1.0/cms/signIn",
    PROFILE = "/v1.0/cms/user",

    GET_USERS = "/v1.0/cms/customers",
    CREATE_USER = "/v1.0/cms/customer",
    USER_DATA = "/v1.0/cms/customer/{customerId}",

    GET_RESIDENCES_LIST = "/v1.0/cms/residences",
    CREATE_RESIDENCE = "/v1.0/cms/residence",
    RESIDENCE_DATA = "/v1.0/cms/residence/{residenceId}",
    GET_RESIDENCE_USERS = "/v1.0/cms/residence/{residenceId}/users",

    RESIDENCE_CHARGES = "/v1.0/cms/residence/{residenceId}/chargers",
    CREATE_CHARGER = "/v1.0/cms/residence/{residenceId}/charger",
    CHARGER = "/v1.0/cms/residence/{residenceId}/charger/{chargerId}",

    COMPANY_SETTINGS = "/v1.0/cms/settings/companyInfo",

    GET_WORKERS = "/v1.0/cms/workers",
    CREATE_WORKER = "/v1.0/cms/worker",
    WORKER_DATA = "/v1.0/cms/worker/{workerId}",
    BIND_WORKER = "/v1.0/cms/workers/bindOperator",
    GET_BOUND_RESIDENCES = "/v1.0/cms/workers/boundResidences",

    BILLING_SETTINGS = "/v1.0/cms/settings/assumptions",
}
