// DatePickerWrapper.tsx
"use client";

import clsx from "clsx";
import { Popover } from "@base-ui/react";
import { Calendar } from "./calendar/ui";
import { useState, useEffect } from "react";
import { formatDate } from "./calendar/utils";
import { DatePickerProps } from "./calendar/types";

export function DatePicker({
    value,
    error,
    onChange,
    className,
    isDateDisabled,
    weekStartsOn = 1,
    placeholder = "Select date",
}: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [viewDate, setViewDate] = useState<Date>(value ?? new Date());

    // Sync viewDate with value
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
                <div
                    className={clsx(
                        "ui:w-full ui:border ui:flex ui:justify-between ui:items-center ui:lg:text-base ui:border-grey-100 ui:focus:outline-primary/30 ui:rounded-lg ui:px-3 ui:py-2.5 ui:h-12 ui:placeholder:text-grey-200 ui:text-sm ui:text-grey-500",
                        {
                            "ui:border-red-300": error?.message,
                        },
                        className?.control,
                    )}
                >
                    {value ? (
                        <span>{formatDate(value)}</span>
                    ) : (
                        <span className="ui:text-gray-400">{placeholder}</span>
                    )}
                    <span className="ui:ml-auto ui:text-gray-400">📅</span>
                </div>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Positioner sideOffset={8}>
                    <Popover.Popup className="ui:rounded-lg ui:bg-white ui:shadow-lg ui:shadow-gray-200 ui:border ui:z-50">
                        <Calendar.Root
                            date={viewDate}
                            weekStartsOn={weekStartsOn}
                            selectedDate={value}
                            onSelect={(date) => {
                                onChange(date);
                                setOpen(false);
                            }}
                            isDateDisabled={isDateDisabled}
                        >
                            <Calendar.Header>
                                <div className="ui:flex ui:items-center ui:justify-between">
                                    <Calendar.PrevMonthTrigger />
                                    <Calendar.HeaderTitle />
                                    <Calendar.NextMonthTrigger />
                                </div>
                                <Calendar.SelectorsContainer>
                                    <Calendar.MonthSelector />
                                    <Calendar.YearSelector />
                                </Calendar.SelectorsContainer>
                            </Calendar.Header>
                            <Calendar.Weekday />
                            <Calendar.DayGrid
                                selectedDate={value}
                                onSelect={(date) => {
                                    onChange(date);
                                    setOpen(false);
                                }}
                                isDateDisabled={isDateDisabled}
                            />
                            <Calendar.QuickActions>
                                <Calendar.PickTodayTrigger
                                    onSelect={(date) => {
                                        onChange(date);
                                        setOpen(false);
                                    }}
                                    setOpen={setOpen}
                                />
                                <Calendar.ClearDateSelectionTrigger
                                    onSelect={() => {
                                        onChange(null);
                                        setOpen(false);
                                    }}
                                    setOpen={setOpen}
                                />
                            </Calendar.QuickActions>
                        </Calendar.Root>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
}
