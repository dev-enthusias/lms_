import {
    getWeekdays,
    generateYearOptions,
    generateCalendarDays,
} from "./utils";
import { MONTHS } from "./data";
import { useState } from "react";
import { UseCalendarProps } from "./types";

export function useCalendar(props: UseCalendarProps = {}) {
    const {
        date,
        weekStartsOn = 1,
        isDateDisabled,
        selectedDate,
        onSelect,
    } = props;

    const [open, setOpen] = useState(false);
    const [focusedDate, setFocusedDate] = useState<Date>(
        selectedDate ?? new Date(),
    );
    const [viewDate, setViewDate] = useState<Date>(date ?? new Date());

    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();

    const yearOptions = generateYearOptions();
    const weekdays = getWeekdays(weekStartsOn);
    const monthLabel = `${MONTHS[month]} ${year}`;
    const monthOptions = MONTHS.map((name, index) => ({
        label: name,
        value: index,
    }));
    const days = generateCalendarDays(year, month, weekStartsOn);

    const handlePreviousMonth = () => {
        const newMonth = month === 0 ? 11 : month - 1;
        const newYear = month === 0 ? year - 1 : year;
        setViewDate(new Date(newYear, newMonth, 1));
    };

    const handleNextMonth = () => {
        const newMonth = month === 11 ? 0 : month + 1;
        const newYear = month === 11 ? year + 1 : year;
        setViewDate(new Date(newYear, newMonth));
    };

    const handleYearChange = (newYear: number) => {
        setViewDate(new Date(newYear, month));
    };

    const handleMonthChange = (newMonth: number) => {
        setViewDate(new Date(year, newMonth));
    };

    const handleSetOpen = (open: boolean) => {
        setOpen(open);
    };

    return {
        year,
        open,
        days,
        month,
        viewDate,
        weekdays,
        onSelect,
        monthLabel,
        focusedDate,
        yearOptions,
        setViewDate,
        monthOptions,
        selectedDate,
        setFocusedDate,
        isDateDisabled,
        handleNextMonth,
        handleYearChange,
        handleMonthChange,
        handlePreviousMonth,
        setOpen: handleSetOpen,
    };
}
