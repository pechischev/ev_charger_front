export enum ETabsType {
    CUSTOMER_PROFILE = 0,
    BILLING_INFO,
}

export const TabLabels = new Map([
    [ETabsType.CUSTOMER_PROFILE, "Profile"],
    [ETabsType.BILLING_INFO, "Billing Info"],
]);
