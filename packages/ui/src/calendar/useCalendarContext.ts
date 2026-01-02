import { createContext, useContext } from "react";
import { CalendarContextValue, UseCalendarProps } from "./types";

export const CalendarContext = createContext<null | CalendarContextValue>(null);

export function useCalendarContext() {
    const ctx = useContext(CalendarContext);

    if (!ctx) {
        throw new Error(
            "Calendar components must be used inside <Calendar.Root>",
        );
    }

    return ctx;
}
