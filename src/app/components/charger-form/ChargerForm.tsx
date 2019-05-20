import * as React from "react";
import { Component, Fragment, ReactNode } from "react";
import { InputField } from "@components/fields";
import { EChargerFieldTypes } from "./EChargerFieldTypes";

export class ChargerForm extends Component {
    render(): ReactNode {
        return (
            <div className="charger-form_fields">
                <Fragment>
                    <InputField
                        name={EChargerFieldTypes.BRAND}
                        label={"Brand"}
                    />
                    <InputField
                        name={EChargerFieldTypes.MODEL}
                        label={"Model #"}
                    />
                    <InputField
                        name={EChargerFieldTypes.SERIAL_NUMBER}
                        label={"Serial Number"}
                    />
                    <InputField
                        name={EChargerFieldTypes.LOCATION}
                        label={"Location"}
                    />
                </Fragment>
            </div>
        );
    }
}
