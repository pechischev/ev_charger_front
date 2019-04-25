import { observer } from "mobx-react";
import * as React from "react";
import { FC, MouseEvent, ReactNode } from "react";
import { Subject } from "rxjs";
import { IDropdownContent, IDropdownOption } from "./IDropdownContent";

export const onMouseDownHandler = (onClick$: Subject<string> | undefined, value: string | ReactNode) => {
    return (event: MouseEvent<HTMLElement>): void => {
        if (!onClick$) {
            return;
        }
        onClick$.next();
    };
};

export const DropdownContent = observer<FC<IDropdownContent>>(
    ({ className = "", options = [], contentRef, onClick$ }) => {
        return (
            <div className={`dropdown-menu dropdown-menu-right dropdown-menu-arrow ${className}`} ref={contentRef}>
                {options.map((option: IDropdownOption, index: number) => {
                    if (option.divider) {
                        return <div className="dropdown-divider"/>;
                    }
                    return (
                        <a
                            className={"dropdown-item"}
                            key={index}
                            onMouseDown={onMouseDownHandler(onClick$, option.value)}
                            onClick={option.onClick}
                        >
                            {option.value}
                        </a>
                    );
                })}
            </div>
        );
    },
);
