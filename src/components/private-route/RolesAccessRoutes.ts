import { EPaths } from "@app/config";

export const OperatorAccessRoute = new Map([
    [EPaths.LOGIN, true],
    [EPaths.DASHBOARD, true],
    [EPaths.RESIDENCE_LIST, true],
    [EPaths.RESIDENCE_PROFILE, true],
    [EPaths.RESIDENCE_CREATE_FORM, false],
    [EPaths.USER_LIST, true],
    [EPaths.USER_PROFILE, true],
    [EPaths.USER_CREATE_FORM, false],
    [EPaths.SETTINGS, false],
    [EPaths.WORKER_LIST, false],
    [EPaths.WORKER_PROFILE, false],
    [EPaths.WORKER_CREATE_FORM, false],
    [EPaths.COMPANY_INFO, false],
    [EPaths.BILLING_INFO, false],
    [EPaths.CAR_BRANDS, false],
    [EPaths.CAR_MODELS, false],
    [EPaths.TRANSACTIONS, false],
    [EPaths.TRANSACTION_PROFILE, false],
    [EPaths.TRANSACTION_CREATE_FORM, false],
    [EPaths.PROMO_CODE_INFO, false],
    [EPaths.PROMO_CODE_FORM, false],
    [EPaths.PROMO_CODE_PROFILE, false],
]);

export const OperatorAccessRoutes = [
    EPaths.DASHBOARD,
    EPaths.RESIDENCE_LIST,
    EPaths.RESIDENCE_PROFILE,
    EPaths.USER_LIST,
    EPaths.USER_PROFILE
];
