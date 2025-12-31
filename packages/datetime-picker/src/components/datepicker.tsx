import { Popover } from "@base-ui/react";
import { Calendar } from "./calendar.js";
import { formatDate } from "../date-utils.js";
import { useEffect, useState } from "react";
import { DatePickerProps } from "../types.js";

export function DatePicker({
    value,
    onChange,
    placeholder = "Select date",
    isDateDisabled,
    weekStartsOn = 0,
}: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [viewDate, setViewDate] = useState<Date>(value ?? new Date());

    // Sync view date with value
    useEffect(() => {
        if (value) {
            setViewDate(value);
        }
    }, [value]);

    // Reset to current date when opening
    useEffect(() => {
        if (open && !value) {
            setViewDate(new Date());
        }
    }, [open, value]);

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger>
                <button
                    type="button"
                    className="ui:h-12 ui:w-full ui:rounded-md ui:border ui:px-3 ui:text-left ui:flex ui:items-center"
                >
                    {value ? (
                        <span>{formatDate(value)}</span>
                    ) : (
                        <span className="ui:text-gray-400">{placeholder}</span>
                    )}
                    <span className="ui:ml-auto ui:text-gray-400">📅</span>
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Positioner sideOffset={8}>
                    <Popover.Popup className="ui:rounded-lg ui:bg-white ui:shadow-lg ui:shadow-gray-200 ui:border">
                        <Calendar
                            year={viewDate.getFullYear()}
                            month={viewDate.getMonth()}
                            selectedDate={value}
                            onSelect={(date) => {
                                onChange(date);
                                setOpen(false);
                            }}
                            onMonthChange={(year, month) => {
                                setViewDate(new Date(year, month, 1));
                            }}
                            isDateDisabled={isDateDisabled}
                            weekStartsOn={weekStartsOn}
                        />
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
}
