import * as React from "react";
import { Component, ReactNode } from "react";
import { InputField } from "@components/fields";
import { EChargerFieldTypes } from "./EChargerFieldTypes";
import { AppContext } from "@context";

export class ChargerForm extends Component {
    render(): ReactNode {
        return (
            <div className="charger-form_fields">
                <InputField
                    name={EChargerFieldTypes.BRAND}
                    label={"Brand"}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <InputField
                    name={EChargerFieldTypes.MODEL}
                    label={"Model #"}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <InputField
                    name={EChargerFieldTypes.SERIAL_NUMBER}
                    label={"Serial Number"}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
                <InputField
                    name={EChargerFieldTypes.LOCATION}
                    label={"Location"}
                    disabled={!AppContext.getUserStore().isAdmin()}
                />
            </div>
        );
    }
}
