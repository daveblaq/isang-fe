"use client";

import { type DateRange } from "react-day-picker";
import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";

type RangeCalendarProps = {
  dateRange?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  defaultMonth?: Date;
  className?: string;
  numberOfMonths?: number;
};

export function RangeCalendar({
  dateRange,
  onSelect,
  defaultMonth,
  className,
  numberOfMonths = 2,
}: RangeCalendarProps) {
  const [months, setMonths] = useState(numberOfMonths);

  useEffect(() => {
    const handleResize = () => {
      setMonths(window.innerWidth >= 768 ? numberOfMonths : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [numberOfMonths]);

  return (
    <Calendar
      mode="range"
      defaultMonth={defaultMonth || dateRange?.from || new Date()}
      selected={dateRange}
      onSelect={onSelect}
      numberOfMonths={months}
      className={className || "rounded-lg border shadow-sm"}
    />
  );
}
