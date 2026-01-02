import { cn } from "@lms/utils/cn";
import { CalendarDay, DayState } from "./types.js";

export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

export function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function getWeekdays(weekStartsOn: 0 | 1 = 0): string[] {
    const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (weekStartsOn === 1) {
        // Move Sunday to the end
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    }

    // Default: Sunday first
    return WEEKDAYS;
}

// Generate year options (last 100 years to next 10 years)
export function generateYearOptions(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = currentYear - 100; i <= currentYear + 10; i++) {
        years.push(i);
    }
    return years;
}

export function formatDate(date: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function getDayState(
    day: CalendarDay,
    selectedDate?: Date | null,
    isDateDisabled?: (date: Date) => boolean,
): DayState {
    return {
        isSelected: !!selectedDate && isSameDay(day.date, selectedDate),
        isDisabled: isDateDisabled?.(day.date) ?? false,
        isToday: day.isToday,
        isOutsideMonth: !day.isCurrentMonth,
    };
}

export function getDayClass(state: DayState) {
    return cn(
        "ui:h-9 ui:w-9 ui:rounded-md ui:text-sm ui:flex ui:items-center ui:justify-center",
        "ui:transition-colors ui:duration-150",
        "ui:focus:outline-none ui:focus:ring-2 ui:focus:ring-primary",
        state.isOutsideMonth && "ui:text-gray-300",
        state.isDisabled && "ui:text-gray-300 ui:cursor-not-allowed",
        !state.isDisabled &&
            !state.isSelected &&
            !state.isOutsideMonth &&
            "ui:hover:bg-gray-100",
        state.isToday && !state.isSelected && "ui:border ui:border-primary",
        state.isSelected && "ui:bg-primary ui:text-white",
    );
}

export function generateCalendarDays(
    year: number,
    month: number,
    weekStartsOn: 0 | 1,
): CalendarDay[] {
    const days: CalendarDay[] = [];
    const today = new Date();

    let firstDay = getFirstDayOfMonth(year, month);
    // Adjust for week start day
    if (weekStartsOn === 1) {
        firstDay = firstDay === 0 ? 6 : firstDay - 1;
    }

    const daysInMonth = getDaysInMonth(year, month);

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const date = new Date(prevYear, prevMonth, day);

        days.push({
            date,
            day,
            month: prevMonth,
            year: prevYear,
            isToday: isSameDay(date, today),
            isCurrentMonth: false,
        });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);

        days.push({
            date,
            day,
            month,
            year,
            isToday: isSameDay(date, today),
            isCurrentMonth: true,
        });
    }

    // Next month padding
    const remaining = 42 - days.length; // 6 rows × 7 days

    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    for (let day = 1; day <= remaining; day++) {
        const date = new Date(nextYear, nextMonth, day);

        days.push({
            date,
            day,
            month: nextMonth,
            year: nextYear,
            isToday: isSameDay(date, today),
            isCurrentMonth: false,
        });
    }

    return days;
}
