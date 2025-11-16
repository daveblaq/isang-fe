"use client";

import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

type RangeCalendarProps = {
  dateRange?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  defaultMonth?: Date;
  className?: string;
};

export function RangeCalendar({
  dateRange,
  onSelect,
  defaultMonth,
  className,
}: RangeCalendarProps) {
  return (
    <Calendar
      mode="range"
      defaultMonth={defaultMonth || dateRange?.from || new Date()}
      selected={dateRange}
      onSelect={onSelect}
      numberOfMonths={2}
      className={className || "rounded-lg border shadow-sm"}
    />
  );
}
