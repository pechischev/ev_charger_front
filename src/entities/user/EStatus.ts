export enum EStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PAST_DUE = "past_due"
}

export const StatusLabels = new Map([
    [EStatus.ACTIVE, "Active"],
    [EStatus.INACTIVE, "Inactive"],
    [EStatus.PAST_DUE, "Past due"],
]);
