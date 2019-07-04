import { ReactNode } from "react";

export interface ICardProps {
    title?: string;
    content?: ReactNode;
    className?: string;
    isPrint?: boolean;

    onClick?(): void;
}
