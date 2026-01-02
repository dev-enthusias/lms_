// calendar.tsx
import { Label } from "../label";
import { Combobox } from "@base-ui/react";
import { MONTHS } from "./data";
import { UseCalendarProps, CalendarDayGridProps } from "./types";
import { useCalendar } from "./useCalendar";
import { getDayClass, getDayState, isSameDay } from "./utils";
import { CalendarContext, useCalendarContext } from "./useCalendarContext";
import { useCallback } from "react";

function CalendarRoot({
    children,
    ...props
}: React.PropsWithChildren<UseCalendarProps>) {
    const state = useCalendar(props);

    return (
        <CalendarContext.Provider value={state}>
            <div className="ui:sm:ui:w-[340px] ui:border ui:select-none ui:p-3">
                {children}
            </div>
        </CalendarContext.Provider>
    );
}

function CalendarHeader({ children }: { children: React.ReactNode }) {
    return <div className="ui:mb-4 ui:space-y-3">{children}</div>;
}

function CalendarPrevMonthTrigger() {
    const { handlePreviousMonth } = useCalendarContext();

    return (
        <button
            type="button"
            onClick={handlePreviousMonth}
            className="ui:h-8 ui:w-8 ui:flex ui:items-center ui:justify-center ui:rounded-md ui:hover:bg-gray-100"
            aria-label="Previous month"
        >
            <ChevronLeftIcon />
        </button>
    );
}

function CalendarNextMonthTrigger() {
    const { handleNextMonth } = useCalendarContext();

    return (
        <button
            type="button"
            onClick={handleNextMonth}
            className="ui:h-8 ui:w-8 ui:flex ui:items-center ui:justify-center ui:rounded-md ui:hover:bg-gray-100"
            aria-label="Next month"
        >
            <ChevronRightIcon />
        </button>
    );
}

function CalendarHeaderTitle({ label }: { label?: string }) {
    const { monthLabel } = useCalendarContext();

    return (
        <div className="ui:text-lg ui:font-semibold">{label || monthLabel}</div>
    );
}

function CalendarSelectorsContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="ui:grid ui:grid-cols-2 ui:gap-2">{children}</div>;
}

function CalendarWeekday() {
    const { weekdays } = useCalendarContext();

    return (
        <div className="ui:mb-2 ui:grid ui:grid-cols-7 ui:text-xs ui:text-gray-500">
            {weekdays.map((day) => (
                <div key={day} className="ui:text-center ui:font-medium">
                    {day}
                </div>
            ))}
        </div>
    );
}

function CalendarQuickActions({ children }: { children: React.ReactNode }) {
    return <div className="ui:mt-4 ui:flex ui:space-x-2">{children}</div>;
}

function CalendarDayGrid({
    selectedDate: externalSelectedDate,
    onSelect: externalOnSelect,
    isDateDisabled: externalIsDateDisabled,
}: CalendarDayGridProps) {
    const {
        focusedDate,
        setFocusedDate,
        month,
        year,
        setViewDate,
        days,
        isDateDisabled: contextIsDateDisabled,
        selectedDate: contextSelectedDate,
        onSelect: contextOnSelect,
    } = useCalendarContext();

    // Use props if provided, otherwise use context
    const isDateDisabled = externalIsDateDisabled || contextIsDateDisabled;
    const selectedDate = externalSelectedDate || contextSelectedDate;
    const onSelect = externalOnSelect || contextOnSelect;

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
                setViewDate(new Date(next.getFullYear(), next.getMonth()));
            }
        },
        [focusedDate, month, year, isDateDisabled, setFocusedDate, setViewDate],
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
                    if (!isDateDisabled?.(focusedDate) && onSelect) {
                        onSelect(focusedDate);
                    }
                    break;
            }
        },
        [moveFocusBy, focusedDate, onSelect, isDateDisabled],
    );

    const handleDateSelect = (date: Date) => {
        if (isDateDisabled?.(date)) return;
        setFocusedDate(date);
        onSelect?.(date);
    };

    return (
        <div
            role="grid"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="ui:grid ui:grid-cols-7 ui:gap-1 ui:focus:outline-none"
        >
            {days.map((day) => {
                const state = getDayState(day, selectedDate, isDateDisabled);
                const isFocused = isSameDay(day.date, focusedDate);

                return (
                    <button
                        key={day.date.toISOString()}
                        type="button"
                        tabIndex={isFocused ? 0 : -1}
                        onFocus={() => setFocusedDate(day.date)}
                        disabled={state.isDisabled}
                        onClick={() => handleDateSelect(day.date)}
                        className={getDayClass(state)}
                        aria-selected={state.isSelected}
                        aria-label={`${day.day} ${MONTHS[day.month]} ${day.year}`}
                    >
                        {day.day}
                    </button>
                );
            })}
        </div>
    );
}

interface CalendarPickTodayTriggerProps {
    onChange?: (date: Date) => void;
    onSelect?: (date: Date) => void;
    setOpen?: (open: boolean) => void;
}

function CalendarPickTodayTrigger({
    onChange,
    onSelect,
    setOpen,
}: CalendarPickTodayTriggerProps) {
    const {
        setViewDate,
        isDateDisabled,
        onSelect: contextOnSelect,
    } = useCalendarContext();

    const handleTodayClick = () => {
        const today = new Date();
        if (!isDateDisabled?.(today)) {
            onChange?.(today);
            onSelect?.(today);
            contextOnSelect?.(today);
            setOpen?.(false);
            setViewDate(new Date(today.getFullYear(), today.getMonth()));
        }
    };

    return (
        <button
            type="button"
            onClick={handleTodayClick}
            className="ui:flex-1 ui:py-2 ui:px-3 ui:text-sm ui:rounded-md ui:bg-gray-100 ui:hover:bg-gray-200"
        >
            Today
        </button>
    );
}

interface CalendarClearDateSelectionTriggerProps {
    onSelect?: (date: null) => void;
    setOpen?: (open: boolean) => void;
}

function CalendarClearDateSelectionTrigger({
    onSelect,
    setOpen,
}: CalendarClearDateSelectionTriggerProps) {
    return (
        <button
            type="button"
            onClick={() => {
                onSelect?.(null);
                setOpen?.(false);
            }}
            className="ui:flex-1 ui:py-2 ui:px-3 ui:text-sm ui:rounded-md ui:bg-gray-100 ui:hover:bg-gray-200"
        >
            Clear
        </button>
    );
}

function CalendarYearSelector() {
    const { handleYearChange, yearOptions, year } = useCalendarContext();

    return (
        <div className="ui:space-y-1">
            <Label className="ui:text-xs ui:text-gray-500">Year</Label>

            <Combobox.Root
                items={yearOptions}
                value={year.toString()}
                onValueChange={(v) => handleYearChange(Number(v))}
            >
                <Combobox.Trigger className="ui:flex ui:h-10 ui:w-full ui:cursor-default ui:items-center ui:justify-between ui:gap-3 ui:rounded-md ui:border ui:border-gray-200 ui:bg-white ui:pr-3 ui:pl-3.5 ui:text-sm ui:text-gray-900 ui:select-none ui:hover:bg-gray-100 ui:focus-visible:outline ui:focus-visible:-outline-offset-1 ui:focus-visible:outline-blue-800 ui:data-popup-open:bg-gray-100">
                    <Combobox.Value />
                    <Combobox.Icon className="ui:flex">
                        <ChevronUpDownIcon className="ui:size-4" />
                    </Combobox.Icon>
                </Combobox.Trigger>
                <Combobox.Portal>
                    <Combobox.Positioner align="start" sideOffset={4}>
                        <Combobox.Popup
                            className="ui:max-h-60 ui:w-[--available-width] ui:rounded-lg ui:bg-white ui:shadow-lg ui:border ui:border-gray-100"
                            aria-label="Select Year"
                        >
                            <div className="ui:p-2">
                                <Combobox.Input
                                    placeholder="Search for year..."
                                    className="ui:h-10 ui:w-full ui:rounded-md ui:border ui:border-gray-200 ui:pl-3.5 ui:text-sm ui:font-normal ui:text-gray-900 ui:focus:outline ui:focus:-outline-offset-1 ui:focus:outline-blue-800"
                                />
                            </div>
                            <Combobox.Empty className="ui:p-4 ui:text-sm ui:text-gray-600">
                                No years found.
                            </Combobox.Empty>
                            <Combobox.List className="ui:max-h-52 ui:overflow-y-auto ui:py-2">
                                {yearOptions.map((yearOption) => (
                                    <Combobox.Item
                                        key={yearOption}
                                        value={yearOption.toString()}
                                        className="ui:grid ui:cursor-default ui:grid-cols-[0.75rem_1fr] ui:items-center ui:gap-2 ui:py-2 ui:pr-8 ui:pl-4 ui:text-sm ui:outline-none ui:select-none ui:data-highlighted:bg-gray-100"
                                    >
                                        <Combobox.ItemIndicator className="ui:col-start-1">
                                            <CheckIcon className="ui:size-3" />
                                        </Combobox.ItemIndicator>
                                        <div className="ui:col-start-2">
                                            {yearOption}
                                        </div>
                                    </Combobox.Item>
                                ))}
                            </Combobox.List>
                        </Combobox.Popup>
                    </Combobox.Positioner>
                </Combobox.Portal>
            </Combobox.Root>
        </div>
    );
}

function CalendarMonthSelector() {
    const { handleMonthChange, monthOptions, month } = useCalendarContext();

    return (
        <div className="ui:space-y-1">
            <Label className="ui:text-xs ui:text-gray-500">Month</Label>

            <Combobox.Root
                items={monthOptions}
                value={month.toString()}
                onValueChange={(v) => handleMonthChange(Number(v))}
            >
                <Combobox.Trigger className="ui:flex ui:h-10 ui:w-full ui:cursor-default ui:items-center ui:justify-between ui:gap-3 ui:rounded-md ui:border ui:border-gray-200 ui:bg-white ui:pr-3 ui:pl-3.5 ui:text-sm ui:text-gray-900 ui:select-none ui:hover:bg-gray-100 ui:focus-visible:outline ui:focus-visible:-outline-offset-1 ui:focus-visible:outline-blue-800 ui:data-popup-open:bg-gray-100">
                    <Combobox.Value>
                        {({ selectedItem }) =>
                            selectedItem?.label || MONTHS[month]
                        }
                    </Combobox.Value>
                    <Combobox.Icon className="ui:flex">
                        <ChevronUpDownIcon className="ui:size-4" />
                    </Combobox.Icon>
                </Combobox.Trigger>
                <Combobox.Portal>
                    <Combobox.Positioner align="start" sideOffset={4}>
                        <Combobox.Popup
                            className="ui:max-h-60 ui:w-[--available-width] ui:rounded-lg ui:bg-white ui:shadow-lg ui:border ui:border-gray-100"
                            aria-label="Select Month"
                        >
                            <div className="ui:p-2">
                                <Combobox.Input
                                    placeholder="Search for month..."
                                    className="ui:h-10 ui:w-full ui:rounded-md ui:border ui:border-gray-200 ui:pl-3.5 ui:text-sm ui:font-normal ui:text-gray-900 ui:focus:outline ui:focus:-outline-offset-1 ui:focus:outline-blue-800"
                                />
                            </div>
                            <Combobox.Empty className="ui:p-4 ui:text-sm ui:text-gray-600">
                                No month found.
                            </Combobox.Empty>
                            <Combobox.List className="ui:max-h-52 ui:overflow-y-auto ui:py-2">
                                {monthOptions.map(({ label, value }) => (
                                    <Combobox.Item
                                        key={value}
                                        value={value.toString()}
                                        className="ui:grid ui:min-w-var(--anchor-width) ui:cursor-default ui:grid-cols-[0.75rem_1fr] ui:items-center ui:gap-2 ui:py-2 ui:pr-8 ui:pl-4 ui:text-base ui:leading-4 ui:outline-none ui:select-none ui:data-highlighted:relative ui:data-highlighted:z-0 ui:data-highlighted:text-gray-50 ui:data-highlighted:before:absolute ui:data-highlighted:before:inset-x-2 ui:data-highlighted:before:inset-y-0 ui:data-highlighted:before:z-[-1] ui:data-highlighted:before:rounded-sm ui:data-highlighted:before:bg-gray-900"
                                    >
                                        <Combobox.ItemIndicator className="ui:col-start-1">
                                            <CheckIcon className="ui:size-3" />
                                        </Combobox.ItemIndicator>
                                        <div className="ui:col-start-2">
                                            {label}
                                        </div>
                                    </Combobox.Item>
                                ))}
                            </Combobox.List>
                        </Combobox.Popup>
                    </Combobox.Positioner>
                </Combobox.Portal>
            </Combobox.Root>
        </div>
    );
}

export function ChevronLeftIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            {...props}
        >
            <path d="M7.5 0.5L4.5 4L7.5 7.5" />
        </svg>
    );
}

export function ChevronRightIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            {...props}
        >
            <path d="M4.5 0.5L7.5 4L4.5 7.5" />
        </svg>
    );
}

function ChevronUpDownIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.5"
            {...props}
        >
            <path d="M0.5 4.5L4 1.5L7.5 4.5" />
            <path d="M0.5 7.5L4 10.5L7.5 7.5" />
        </svg>
    );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            fill="currentcolor"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            {...props}
        >
            <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
        </svg>
    );
}

export const Calendar = {
    Root: CalendarRoot,
    Header: CalendarHeader,
    Weekday: CalendarWeekday,
    DayGrid: CalendarDayGrid,
    HeaderTitle: CalendarHeaderTitle,
    QuickActions: CalendarQuickActions,
    YearSelector: CalendarYearSelector,
    MonthSelector: CalendarMonthSelector,
    PrevMonthTrigger: CalendarPrevMonthTrigger,
    NextMonthTrigger: CalendarNextMonthTrigger,
    PickTodayTrigger: CalendarPickTodayTrigger,
    SelectorsContainer: CalendarSelectorsContainer,
    ClearDateSelectionTrigger: CalendarClearDateSelectionTrigger,
};
