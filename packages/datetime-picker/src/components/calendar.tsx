import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarProps } from "../types.js";
import {
    generateCalendarDays,
    generateYearOptions,
    getWeekdays,
} from "../date-utils.js";
import { MONTHS } from "../data.js";
import { getDayState } from "../date-utils.js";
import { isSameDay } from "../date-utils.js";
import { getDayClass } from "../date-utils.js";
import { Label } from "@lms/ui/label";
import { Combobox } from "@base-ui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

export function Calendar({
    year,
    month,
    selectedDate,
    onSelect,
    onMonthChange,
    isDateDisabled,
    weekStartsOn = 0,
}: CalendarProps) {
    const [focusedDate, setFocusedDate] = useState<Date>(
        selectedDate ?? new Date(year, month, 1),
    );

    // Memoize calendar data
    const { monthLabel, days } = useMemo(() => {
        const days = generateCalendarDays(year, month, weekStartsOn);
        const label = `${MONTHS[month]} ${year}`;
        return { monthLabel: label, days };
    }, [year, month, weekStartsOn]);

    const weekdays = useMemo(() => getWeekdays(weekStartsOn), [weekStartsOn]);
    const yearOptions = useMemo(() => generateYearOptions(), []);
    const monthOptions = useMemo(
        () => MONTHS.map((name, index) => ({ label: name, value: index })),
        [],
    );

    // Navigation handlers
    const handlePreviousMonth = useCallback(() => {
        const newMonth = month === 0 ? 11 : month - 1;
        const newYear = month === 0 ? year - 1 : year;
        onMonthChange(newYear, newMonth);
    }, [month, year, onMonthChange]);

    const handleNextMonth = useCallback(() => {
        const newMonth = month === 11 ? 0 : month + 1;
        const newYear = month === 11 ? year + 1 : year;
        onMonthChange(newYear, newMonth);
    }, [month, year, onMonthChange]);

    const handleYearChange = useCallback(
        (newYear: number) => {
            onMonthChange(newYear, month);
        },
        [month, onMonthChange],
    );

    const handleMonthChange = useCallback(
        (newMonth: number) => {
            onMonthChange(year, newMonth);
        },
        [year, onMonthChange],
    );

    // Focus management
    useEffect(() => {
        if (selectedDate) {
            setFocusedDate(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        setFocusedDate(new Date(year, month, 1));
    }, [year, month]);

    // Keyboard navigation
    const moveFocusBy = useCallback(
        (days: number) => {
            let next = new Date(focusedDate);
            next.setDate(next.getDate() + days);

            // Skip disabled dates
            while (isDateDisabled?.(next)) {
                next.setDate(next.getDate() + (days > 0 ? 1 : -1));
            }

            setFocusedDate(next);

            // If focus moves to different month, update view
            if (next.getMonth() !== month || next.getFullYear() !== year) {
                onMonthChange(next.getFullYear(), next.getMonth());
            }
        },
        [focusedDate, month, year, isDateDisabled, onMonthChange],
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            switch (e.key) {
                case "ArrowRight":
                    e.preventDefault();
                    moveFocusBy(1);
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    moveFocusBy(-1);
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    moveFocusBy(7);
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    moveFocusBy(-7);
                    break;
                case "Enter":
                case " ":
                    e.preventDefault();
                    if (!isDateDisabled?.(focusedDate)) {
                        onSelect(focusedDate);
                    }
                    break;
            }
        },
        [moveFocusBy, focusedDate, onSelect, isDateDisabled],
    );

    return (
        <div className="sm:ui:w-[340px] ui:w-[280px] ui:border ui:select-none ui:p-3">
            {/* Improved Header with Quick Navigation */}
            <div className="ui:mb-4 ui:space-y-3">
                <div className="ui:flex ui:items-center ui:justify-between">
                    <button
                        type="button"
                        onClick={handlePreviousMonth}
                        className="ui:h-8 ui:w-8 ui:flex ui:items-center ui:justify-center ui:rounded-md ui:hover:bg-gray-100"
                        aria-label="Previous month"
                    >
                        ‹
                    </button>

                    <div className="ui:text-sm ui:font-medium">
                        {monthLabel}
                    </div>

                    <button
                        type="button"
                        onClick={handleNextMonth}
                        className="ui:h-8 ui:w-8 ui:flex ui:items-center ui:justify-center ui:rounded-md ui:hover:bg-gray-100"
                        aria-label="Next month"
                    >
                        ›
                    </button>
                </div>

                {/* Quick Selectors for Year and Month */}
                <div className="ui:grid ui:grid-cols-2 ui:gap-2">
                    <div className="ui:space-y-1">
                        <Label className="ui:text-xs ui:text-gray-500">
                            Year
                        </Label>

                        <Combobox.Root
                            items={yearOptions}
                            value={+new Date().getFullYear()}
                            onValueChange={(v) => handleYearChange(Number(v))}
                        >
                            <Combobox.Trigger className="ui:flex ui:h-10 ui:min-w-[12rem] ui:cursor-default ui:items-center ui:justify-between ui:gap-3 ui:rounded-md ui:border ui:border-gray-200 ui:bg-[canvas] ui:pr-3 ui:pl-3.5 ui:text-base ui:text-gray-900 ui:select-none ui:hover:bg-gray-100 ui:focus-visible:outline ui:focus-visible:outline-2 ui:focus-visible:-outline-offset-1 ui:focus-visible:outline-blue-800 ui:data-[popup-open]:bg-gray-100">
                                <Combobox.Value />
                                <Combobox.Icon className="ui:flex">
                                    <ChevronsUpDownIcon />
                                </Combobox.Icon>
                            </Combobox.Trigger>
                            <Combobox.Portal>
                                <Combobox.Positioner
                                    align="start"
                                    sideOffset={4}
                                >
                                    <Combobox.Popup
                                        className="ui:max-h-[24rem] ui:max-w-[var(--available-width)] ui:origin-[var(--transform-origin)] ui:rounded-lg ui:bg-[canvas] ui:text-gray-900 ui:shadow-lg ui:shadow-gray-200 ui:outline-1 ui:outline-gray-200 ui:transition-[transform,scale,opacity] ui:--input-container-height:3rem ui:data-[ending-style]:scale-90 ui:data-[ending-style]:opacity-0 ui:data-[starting-style]:scale-90 ui:data-[starting-style]:opacity-0 dark:ui:shadow-none dark:ui:-outline-offset-1 dark:ui:outline-gray-300"
                                        aria-label="Select country"
                                    >
                                        <div className="ui:h-[var(--input-container-height)] ui:w-80 ui:p-2 ui:text-center">
                                            <Combobox.Input
                                                placeholder="e.g. United Kingdom"
                                                className="ui:h-10 ui:w-full ui:rounded-md ui:border ui:border-gray-200 ui:pl-3.5 ui:text-base ui:font-normal ui:text-gray-900 ui:focus:outline ui:focus:outline-2 ui:focus:-outline-offset-1 ui:focus:outline-blue-800"
                                            />
                                        </div>
                                        <Combobox.Empty className="ui:p-4 ui:text-[0.925rem] ui:leading-4 ui:text-gray-600 ui:empty:m-0 ui:empty:p-0">
                                            No years found.
                                        </Combobox.Empty>
                                        <Combobox.List className="ui:max-h-[min(calc(24rem-var(--input-container-height)),calc(var(--available-height)-var(--input-container-height)))] ui:scroll-py-2 ui:overflow-y-auto ui:overscroll-contain ui:py-2 ui:empty:p-0">
                                            {(year) => (
                                                <Combobox.Item
                                                    key={year}
                                                    value={year}
                                                    className="ui:grid ui:min-w-[var(--anchor-width)] ui:cursor-default ui:grid-cols-[0.75rem_1fr] ui:items-center ui:gap-2 ui:py-2 ui:pr-8 ui:pl-4 ui:text-base ui:leading-4 ui:outline-none ui:select-none ui:data-[highlighted]:relative ui:data-[highlighted]:z-0 ui:data-[highlighted]:text-gray-50 ui:data-[highlighted]:before:absolute ui:data-[highlighted]:before:inset-x-2 ui:data-[highlighted]:before:inset-y-0 ui:data-[highlighted]:before:z-[-1] ui:data-[highlighted]:before:rounded-sm ui:data-[highlighted]:before:bg-gray-900"
                                                >
                                                    <Combobox.ItemIndicator className="ui:col-start-1">
                                                        <CheckIcon className="ui:size-3" />
                                                    </Combobox.ItemIndicator>
                                                    <div className="ui:col-start-2">
                                                        {year}
                                                    </div>
                                                </Combobox.Item>
                                            )}
                                        </Combobox.List>
                                    </Combobox.Popup>
                                </Combobox.Positioner>
                            </Combobox.Portal>
                        </Combobox.Root>
                    </div>

                    <div className="ui:space-y-1">
                        <Label className="ui:text-xs ui:text-gray-500">
                            Month
                        </Label>

                        <Combobox.Root
                            items={monthOptions}
                            value={MONTHS[month]}
                            onValueChange={(v) => handleMonthChange(Number(v))}
                        >
                            <Combobox.Trigger className="ui:flex ui:h-10 ui:min-w-[12rem] ui:cursor-default ui:items-center ui:justify-between ui:gap-3 ui:rounded-md ui:border ui:border-gray-200 ui:bg-[canvas] ui:pr-3 ui:pl-3.5 ui:text-base ui:text-gray-900 ui:select-none ui:hover:bg-gray-100 ui:focus-visible:outline ui:focus-visible:outline-2 ui:focus-visible:-outline-offset-1 ui:focus-visible:outline-blue-800 ui:data-[popup-open]:bg-gray-100">
                                <Combobox.Value />
                                <Combobox.Icon className="ui:flex">
                                    <ChevronsUpDownIcon />
                                </Combobox.Icon>
                            </Combobox.Trigger>
                            <Combobox.Portal>
                                <Combobox.Positioner
                                    align="start"
                                    sideOffset={4}
                                >
                                    <Combobox.Popup
                                        className="ui:max-h-[24rem] ui:max-w-[var(--available-width)] ui:origin-[var(--transform-origin)] ui:rounded-lg ui:bg-[canvas] ui:text-gray-900 ui:shadow-lg ui:shadow-gray-200 ui:outline-1 ui:outline-gray-200 ui:transition-[transform,scale,opacity] ui:--input-container-height:3rem ui:data-[ending-style]:scale-90 ui:data-[ending-style]:opacity-0 ui:data-[starting-style]:scale-90 ui:data-[starting-style]:opacity-0 dark:ui:shadow-none dark:ui:-outline-offset-1 dark:ui:outline-gray-300"
                                        aria-label="Select country"
                                    >
                                        <div className="ui:h-[var(--input-container-height)] ui:w-80 ui:p-2 ui:text-center">
                                            <Combobox.Input
                                                placeholder="e.g. United Kingdom"
                                                className="ui:h-10 ui:w-full ui:rounded-md ui:border ui:border-gray-200 ui:pl-3.5 ui:text-base ui:font-normal ui:text-gray-900 ui:focus:outline ui:focus:outline-2 ui:focus:-outline-offset-1 ui:focus:outline-blue-800"
                                            />
                                        </div>
                                        <Combobox.Empty className="ui:p-4 ui:text-[0.925rem] ui:leading-4 ui:text-gray-600 ui:empty:m-0 ui:empty:p-0">
                                            No months found.
                                        </Combobox.Empty>
                                        <Combobox.List className="ui:max-h-[min(calc(24rem-var(--input-container-height)),calc(var(--available-height)-var(--input-container-height)))] ui:scroll-py-2 ui:overflow-y-auto ui:overscroll-contain ui:py-2 ui:empty:p-0">
                                            {({ label, value }) => (
                                                <Combobox.Item
                                                    key={value}
                                                    value={value.toString()}
                                                    className="ui:grid ui:min-w-[var(--anchor-width)] ui:cursor-default ui:grid-cols-[0.75rem_1fr] ui:items-center ui:gap-2 ui:py-2 ui:pr-8 ui:pl-4 ui:text-base ui:leading-4 ui:outline-none ui:select-none ui:data-[highlighted]:relative ui:data-[highlighted]:z-0 ui:data-[highlighted]:text-gray-50 ui:data-[highlighted]:before:absolute ui:data-[highlighted]:before:inset-x-2 ui:data-[highlighted]:before:inset-y-0 ui:data-[highlighted]:before:z-[-1] ui:data-[highlighted]:before:rounded-sm ui:data-[highlighted]:before:bg-gray-900"
                                                >
                                                    <Combobox.ItemIndicator className="ui:col-start-1">
                                                        <CheckIcon className="ui:size-3" />
                                                    </Combobox.ItemIndicator>
                                                    <div className="ui:col-start-2">
                                                        {label}
                                                    </div>
                                                </Combobox.Item>
                                            )}
                                        </Combobox.List>
                                    </Combobox.Popup>
                                </Combobox.Positioner>
                            </Combobox.Portal>
                        </Combobox.Root>
                    </div>
                </div>
            </div>

            {/* Weekdays */}
            <div className="ui:mb-2 ui:grid ui:grid-cols-7 ui:text-xs ui:text-gray-500">
                {weekdays.map((day) => (
                    <div key={day} className="ui:text-center ui:font-medium">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div
                role="grid"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="ui:grid ui:grid-cols-7 ui:gap-1 ui:focus:outline-none"
            >
                {days.map((day) => {
                    const state = getDayState(
                        day,
                        selectedDate,
                        isDateDisabled,
                    );
                    const isFocused = isSameDay(day.date, focusedDate);

                    return (
                        <button
                            key={day.date.toISOString()}
                            type="button"
                            tabIndex={isFocused ? 0 : -1}
                            onFocus={() => setFocusedDate(day.date)}
                            disabled={state.isDisabled}
                            onClick={() => onSelect(day.date)}
                            className={getDayClass(state)}
                            aria-selected={state.isSelected}
                            aria-label={`${day.day} ${MONTHS[day.month]} ${day.year}`}
                        >
                            {day.day}
                        </button>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="ui:mt-4 ui:flex ui:gap-2">
                <button
                    type="button"
                    onClick={() => {
                        const today = new Date();
                        if (!isDateDisabled?.(today)) {
                            onSelect(today);
                            onMonthChange(
                                today.getFullYear(),
                                today.getMonth(),
                            );
                        }
                    }}
                    className="ui:flex-1 ui:py-2 ui:px-3 ui:text-sm ui:rounded-md ui:bg-gray-100 ui:hover:bg-gray-200"
                >
                    Today
                </button>
                <button
                    type="button"
                    onClick={() => onSelect(null as any)}
                    className="ui:flex-1 ui:py-2 ui:px-3 ui:text-sm ui:rounded-md ui:bg-gray-100 ui:hover:bg-gray-200"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
