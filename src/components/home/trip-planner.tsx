"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calender";
import Text from "@/components/ui/text";
import DestinationHero from "@/components/home/destination-hero";

type Destination = {
  id: string;
  name: string;
  country: string;
  flag: string;
  image: string;
};

const DESTINATIONS: Destination[] = [
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    flag: "🇿🇦",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cape-coast",
    name: "Cape Coast",
    country: "Ghana",
    flag: "🇬🇭",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cap-dail",
    name: "Cap-d'Ail",
    country: "France",
    flag: "🇫🇷",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "capannori",
    name: "Capannori",
    country: "Italy",
    flag: "🇮🇹",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "capao-bonito",
    name: "Capão Bonito",
    country: "Brazil",
    flag: "🇧🇷",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=80",
  },
];

export default function TripPlanner() {
  const [values, setValues] = useState({
    destination: "",
    budget: "",
    dates: "",
    days: "",
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const destinationWrapperRef = useRef<HTMLDivElement | null>(null);

  const filteredDestinations = useMemo(() => {
    const query = values.destination.trim().toLowerCase();
    if (!query) return DESTINATIONS;
    return DESTINATIONS.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.country.toLowerCase().includes(query)
    );
  }, [values.destination]);

  useEffect(() => {
    if (!destinationOpen) return;
    const handler = (event: MouseEvent) => {
      if (
        destinationWrapperRef.current &&
        !destinationWrapperRef.current.contains(event.target as Node)
      ) {
        setDestinationOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [destinationOpen]);

  // Calculate days from date range (derived value)
  const calculatedDays = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      const diffTime = Math.abs(
        dateRange.to.getTime() - dateRange.from.getTime()
      );
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
    }
    return "";
  }, [dateRange]);

  // Format date range for display (only start date)
  const formatDateRange = () => {
    if (!dateRange?.from) return "";
    return format(dateRange.from, "dd/MM");
  };

  // Format date range summary (e.g., "3 days - Aug 18 - 21")
  const formatDateRangeSummary = () => {
    if (!dateRange?.from || !dateRange?.to) return "";
    const diffTime = Math.abs(
      dateRange.to.getTime() - dateRange.from.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const fromStr = format(dateRange.from, "MMM d");
    const toStr = format(dateRange.to, "MMM d");
    return `${diffDays} days - ${fromStr} - ${toStr}`;
  };

  const handleSaveDate = () => {
    if (dateRange?.from && dateRange?.to) {
      setValues((prev) => ({
        ...prev,
        dates: formatDateRange(),
        days: calculatedDays.toString(),
      }));
      setDatePopoverOpen(false);
    }
  };

  const handleClearDate = () => {
    setDateRange(undefined);
    setValues((prev) => ({
      ...prev,
      dates: "",
      days: "",
    }));
  };

  return (
    <section className="grid gap-8 md:grid-cols-2 py-10">
      <div className="space-y-8">
        <div className="space-y-2 mt-8 text-3xl font-ibm font-medium text-black mb-5">
          <p className="flex flex-wrap items-center gap-2">
            I am going to{" "}
            <span
              ref={destinationWrapperRef}
              className="relative inline-block min-w-[160px] max-w-[160px] align-middle"
            >
              <Input
                placeholder="destination"
                value={values.destination}
                onFocus={() => setDestinationOpen(true)}
                onChange={(e) => {
                  const val = e.target.value;
                  setValues((prev) => ({
                    ...prev,
                    destination: val,
                  }));
                  setDestinationOpen(true);
                }}
                className="h-10 shadow-none border border-transparent bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-3xl font-medium leading-snug"
              />
              {destinationOpen && filteredDestinations.length > 0 && (
                <div className="absolute left-0 top-full z-20 mt-2 w-[300px] rounded-[8px] border border-slate-200 bg-white p-0 shadow-xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 ease-out">
                  <div className="max-h-80 overflow-y-auto py-2">
                    {filteredDestinations.map((dest) => (
                      <button
                        key={dest.id}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          setValues((prev) => ({
                            ...prev,
                            destination: dest.name,
                          }));
                          setDestinationOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-slate-50"
                      >
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="h-10 w-10 rounded-[8px] object-cover"
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-ibm font-medium text-slate-900">
                            {dest.name}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-ibm text-slate-500">
                            <span>{dest.flag}</span>
                            {dest.country}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </span>
            ,
          </p>
          <p className="flex flex-wrap items-center gap-2">
            with ₦{" "}
            <span className="inline-block  min-w-[140px] max-w-[140px] align-middle">
              <Input
                placeholder="budget"
                value={values.budget}
                onChange={(e) => {
                  const raw = e.target.value
                    .replace(/,/g, "")
                    .replace(/[^\d]/g, "");
                  if (!raw) {
                    setValues((prev) => ({ ...prev, budget: "" }));
                    return;
                  }
                  const formatted = Number(raw).toLocaleString("en-NG");
                  setValues((prev) => ({ ...prev, budget: formatted }));
                }}
                className="h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-3xl font-medium leading-snug "
              />
            </span>
           , starting
          </p>
          <p className="flex flex-wrap items-center gap-2">
            <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
              <PopoverTrigger asChild>
                <span className="inline-block min-w-[100px] max-w-[100px] align-middle">
                  <Input
                    placeholder="dd/mm"
                    value={values.dates}
                    readOnly
                    className="h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-3xl font-medium leading-snug cursor-pointer"
                  />
                </span>
              </PopoverTrigger>
              <PopoverContent className="w-[800px] p-0" align="start">
                <div className="p-4">
                  <RangeCalendar
                    dateRange={dateRange}
                    onSelect={setDateRange}
                    defaultMonth={dateRange?.from || new Date()}
                    className="rounded-lg border-0 w-full"
                  />
                  <div className="flex items-center justify-between border-t border-slate-200 px-4 pt-3">
                    <Text
                      variant="span"
                      className="text-sm font-medium text-slate-700"
                    >
                      {formatDateRangeSummary() || "Select date range"}
                    </Text>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleClearDate}
                        className="h-8 px-3 text-sm text-slate-600 hover:text-slate-900 font-ibm"
                      >
                        Clear
                      </Button>
                      <Button
                        type="button"
                        onClick={handleSaveDate}
                        disabled={!dateRange?.from || !dateRange?.to}
                        className="py-3.5 font-ibm rounded-md bg-[#FF5A1F] px-4 text-sm font-medium text-white hover:bg-[#ff7846] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Save date
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            , for{" "}
            <span className="inline-block w-10 align-middle">
              <Input
                placeholder="x"
                value={datePopoverOpen ? calculatedDays || "" : values.days}
                readOnly
                className="h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-3xl font-medium leading-snug cursor-default"
              />
            </span>{" "}
            days.
          </p>
        </div>

        <Button className="rounded-[8px] bg-[#FF5A1F] px-6 py-3 text-sm font-ibm font-semibold text-white">
          Let&apos;s go!
        </Button>

        <p className="text-sm text-gray-500 font-medium pt-6">
          Not sure where to go or begin?{" "}
          <button className="font-semibold text-[#FF5A1F]">
            Ask Isang AI ↗
          </button>
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full">
          {!values.destination ||
          !values.budget ||
          !values.dates ||
          !values.days ? (
            <iframe
              title="map-preview"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-2.308%2C46.5%2C-0.5%2C47.5&layer=mapnik"
              className="h-[400px] w-full rounded-[28px] border-0"
            />
          ) : (
            <DestinationHero
              destination={values.destination}
              country={
                DESTINATIONS.find(
                  (d) =>
                    d.name.toLowerCase() === values.destination.toLowerCase()
                )?.country
              }
              days={values.days}
              image={
                DESTINATIONS.find(
                  (d) =>
                    d.name.toLowerCase() === values.destination.toLowerCase()
                )?.image
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
