export enum EStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PAST_DUE = "past_due",
    RESOLVED = "resolved",
    PAID = "paid",
    OVERDUE = "overdue",
}

export const StatusMap = new Map([
    [EStatus.ACTIVE, "Active"],
    [EStatus.INACTIVE, "Inactive"],
    [EStatus.PAST_DUE, "Past due"],
    [EStatus.RESOLVED, "Resolved"],
    [EStatus.PAID, "Paid"],
    [EStatus.OVERDUE, "Overdue"],
]);
