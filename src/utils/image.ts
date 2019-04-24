import { Nullable } from "@app/config";

export function onImageLoadErrorFun(placeholder: string): (event: React.SyntheticEvent<HTMLImageElement>) => void {
    return (event: React.SyntheticEvent<HTMLImageElement>) => {
        const target = event.target as Nullable<HTMLImageElement>;
        if (!target) {
            return;
        }
        target.setAttribute("src", placeholder);
    };
}
