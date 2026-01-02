export interface CalendarDay {
    date: Date;
    day: number;
    month: number;
    year: number;
    isToday: boolean;
    isCurrentMonth: boolean;
}

export interface DayState {
    isSelected: boolean;
    isDisabled: boolean;
    isToday: boolean;
    isOutsideMonth: boolean;
}

export interface UseCalendarProps {
    date?: Date;
    weekStartsOn?: 0 | 1;

    // selectedDate?: Date | null;
    // onSelect(date: Date): void;
    // onMonthChange(year: number, month: number): void;
    // isDateDisabled?: (date: Date) => boolean;
}
