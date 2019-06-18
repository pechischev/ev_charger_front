export enum ERequestType {
    LOST_CARD = "lost_card",
    BROKEN_CHARGER = "broken_charger",
    CANCEL_SUBSCRIPTION = "cancel_subscription",
    OTHER = "other"
}

export const RequestTypeMap = new Map([
    [ERequestType.LOST_CARD, "Lost card"],
    [ERequestType.BROKEN_CHARGER, "Broken Charger"],
    [ERequestType.CANCEL_SUBSCRIPTION, "Cancel Subscription"],
    [ERequestType.OTHER, "Other"],
]);
