import { FieldError } from "react-hook-form";

export interface DatePickerProps {
    error?: FieldError;
    value?: Date | null;
    placeholder?: string;
    weekStartsOn?: 0 | 1;
    className?: { control: string };
    onChange(date: Date | null): void;
    isDateDisabled?: (date: Date) => boolean;
}

export interface CalendarProps {
    year: number;
    month: number;
    weekStartsOn?: 0 | 1;
    selectedDate?: Date | null;
    onSelect(date: Date): void;
    isDateDisabled?: (date: Date) => boolean;
    onMonthChange(year: number, month: number): void;
}

export interface DayState {
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    isOutsideMonth: boolean;
}

export interface CalendarDay {
    date: Date;
    day: number;
    year: number;
    month: number;
    isToday: boolean;
    isCurrentMonth: boolean;
}

export interface CalendarContextValue {
    year: number;
    month: number;
    open: boolean;
    viewDate: Date;
    monthOptions: {
        label: string;
        value: number;
    }[];
    focusedDate: Date;
    monthLabel: string;
    weekdays: string[];
    days: CalendarDay[];
    yearOptions: number[];
    selectedDate?: Date | null;
    handleNextMonth: () => void;
    handlePreviousMonth: () => void;
    onSelect?: (date: Date) => void;
    setOpen: (open: boolean) => void;
    setViewDate: (date: Date) => void;
    setFocusedDate: (date: Date) => void;
    isDateDisabled?: (date: Date) => boolean;
    handleYearChange: (newYear: number) => void;
    handleMonthChange: (newMonth: number) => void;
}

export interface CalendarSelectorProps {
    value: string;
    label: string;
    ariaLabel?: string;
    placeholder?: string;
    noItemsMessage: string;
    onValueChange: (value: string) => void;
    items: { label: string; value: string }[];
}

export interface CalendarDayGridProps {
    selectedDate?: Date | null;
    onSelect?: (date: Date) => void;
    isDateDisabled?: (date: Date) => boolean;
}

export interface UseCalendarProps {
    date?: Date;
    weekStartsOn?: 0 | 1;
    selectedDate?: Date | null;
    onSelect?: (date: Date) => void;
    isDateDisabled?: (date: Date) => boolean;
}
