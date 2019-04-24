import { textAlignment } from "./text-alignment";
import { fontFamily } from "./font";
import { fontSize } from "./font-size";
import { cloneDeep, keys } from "lodash";
import { ECustomStylesKeys } from "./ECustomStylesKeys";
import { Nullable } from "@app/config";

const CUSTOM_STYLE_MAP = {
    ...textAlignment,
    ...fontFamily,
    ...fontSize,
};
const KEYS_MAP = {
    [ECustomStylesKeys.FONT_FAMILY]: keys(fontFamily),
    [ECustomStylesKeys.FONT_SIZE]: keys(fontSize),
    [ECustomStylesKeys.TEXT_ALIGNMENT]: keys(textAlignment),
};
type TKeysMap = keyof (typeof KEYS_MAP);
const NON_OVERLAPPING_STYLES = { ...KEYS_MAP };

export const getCustomStyleMap = getCustomStyleMapFun();
export const getCustomStyleKeys = getCustomStyleKeysFun();

/** Making a deep clone of `CUSTOM_STYLE_MAP` to keep immutability */
function getCustomStyleMapFun(): () => typeof CUSTOM_STYLE_MAP {
    const clone = cloneDeep(CUSTOM_STYLE_MAP);
    return () => clone;
}

function getCustomStyleKeysFun(): (type: TKeysMap) => string[] {
    const clone = cloneDeep(KEYS_MAP);
    return (type: TKeysMap) => clone[type];
}

export function pretty(type: TKeysMap, keysMap: string[]): string[] {
    return keysMap.map((key) => CUSTOM_STYLE_MAP[key][type]);
}

export function getNonOverlappingStyles(): typeof NON_OVERLAPPING_STYLES {
    return NON_OVERLAPPING_STYLES;
}

function sanitize(value: string): string {
    return value.toLowerCase().replace(/[^a-zA-Z1-9]+/g, "");
}

export function getOriginalKeyFromSanitized(key: ECustomStylesKeys, value: string): Nullable<string> {
    return getCustomStyleKeys(key).reduce(
        (prev, current) => (sanitize(current).includes(sanitize(value)) ? current : prev),
        undefined,
    );
}

type TGetStylesMapFromInlineStyles = { [K in keyof (typeof KEYS_MAP)]?: string };

export function getStylesMapFromInlineStyles(inlineStyles: string[]): TGetStylesMapFromInlineStyles {
    return inlineStyles.reduce((prev, curr) => {
        for (const key of Object.keys(KEYS_MAP)) {
            if (!KEYS_MAP[key].includes(curr)) {
                continue;
            }
            return { ...prev, [key]: CUSTOM_STYLE_MAP[curr][key] };
        }
        return prev;
    }, {});
}

export { ECustomStylesKeys } from "./ECustomStylesKeys";
