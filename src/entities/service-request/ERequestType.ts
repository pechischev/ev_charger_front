export enum ERequestType {
    LOST_ACCESS = "lost_access",
    BROKEN_CHARGER = "broken_charger",
    CANCEL_SUBSCRIPTION = "cancel_subscription",
    OTHER = "other"
}

export const RequestTypeMap = new Map([
    [ERequestType.LOST_ACCESS, "Lost access card"],
    [ERequestType.BROKEN_CHARGER, "Broken EV charger"],
    [ERequestType.CANCEL_SUBSCRIPTION, "Cancel Loop Subscription "],
    [ERequestType.OTHER, "Other"],
]);
