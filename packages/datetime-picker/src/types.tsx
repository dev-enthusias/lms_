export interface DatePickerProps {
    value?: Date | null;
    onChange(date: Date | null): void;
    placeholder?: string;
    isDateDisabled?: (date: Date) => boolean;
    weekStartsOn?: 0 | 1;
}

export interface CalendarProps {
    year: number;
    month: number;
    selectedDate?: Date | null;
    onSelect(date: Date): void;
    onMonthChange(year: number, month: number): void;
    isDateDisabled?: (date: Date) => boolean;
    weekStartsOn?: 0 | 1;
}

export interface DayState {
    isSelected: boolean;
    isDisabled: boolean;
    isToday: boolean;
    isOutsideMonth: boolean;
}

export interface CalendarDay {
    date: Date;
    day: number;
    month: number;
    year: number;
    isToday: boolean;
    isCurrentMonth: boolean;
}
