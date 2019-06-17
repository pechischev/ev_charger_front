import * as React from "react";
import { Component, ReactNode } from "react";
import { InputField } from "@components/fields";
import { EChargerFieldTypes } from "./EChargerFieldTypes";
import { AppContext } from "@context";

export class ChargerForm extends Component {
    render(): ReactNode {
        const readonly = !AppContext.getUserStore().isAdmin();
        return (
            <div className="charger-form_fields">
                <InputField
                    name={EChargerFieldTypes.BRAND}
                    label={"Brand"}
                    disabled={readonly}
                />
                <InputField
                    name={EChargerFieldTypes.MODEL}
                    label={"Model #"}
                    disabled={readonly}
                />
                <InputField
                    name={EChargerFieldTypes.SERIAL_NUMBER}
                    label={"Serial Number"}
                    disabled={readonly}
                />
                <InputField
                    name={EChargerFieldTypes.LOCATION}
                    label={"Location"}
                    disabled={readonly}
                />
            </div>
        );
    }
}
