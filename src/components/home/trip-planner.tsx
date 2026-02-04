"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useChat } from "@/hooks/use-chat";
import { useSignupModal } from "@/hooks/use-signup-modal";
import { Loader2 } from "lucide-react";

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
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { sendMessage, isSending } = useChat();
  const { openModal } = useSignupModal();
  const destinationWrapperRef = useRef<HTMLDivElement | null>(null);
  const destinationDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        !destinationWrapperRef.current.contains(event.target as Node) &&
        destinationDropdownRef.current &&
        !destinationDropdownRef.current.contains(event.target as Node)
      ) {
        setDestinationOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [destinationOpen]);

  // Adjust destination dropdown position to stay within viewport
  useEffect(() => {
    if (
      !destinationOpen ||
      !destinationDropdownRef.current ||
      !destinationWrapperRef.current
    )
      return;

    const dropdown = destinationDropdownRef.current;
    const wrapper = destinationWrapperRef.current;
    const rect = wrapper.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();

    // Check if dropdown goes beyond viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Reset transform
    dropdown.style.transform = "none";
    dropdown.style.left = "0";
    dropdown.style.right = "auto";

    // Check right edge
    if (dropdownRect.right > viewportWidth - 8) {
      const overflow = dropdownRect.right - (viewportWidth - 8);
      dropdown.style.transform = `translateX(-${overflow}px)`;
    }

    // Check bottom edge (flip to top if needed)
    if (
      dropdownRect.bottom > viewportHeight - 8 &&
      rect.top > dropdownRect.height
    ) {
      dropdown.style.top = "auto";
      dropdown.style.bottom = "100%";
      dropdown.style.marginTop = "0";
      dropdown.style.marginBottom = "8px";
    }
  }, [destinationOpen, filteredDestinations.length]);

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

  const handleLetsGo = async () => {
    if (!values.destination || isSending) return;

    const remaining = localStorage.getItem("conversations_remaining");
    if (remaining === "0") {
      openModal();
      return;
    }

    const parts = [`I am going to ${values.destination}`];
    if (values.budget) parts.push(`with ₦ ${values.budget}`);
    if (values.dates) parts.push(`starting ${values.dates}`);
    if (values.days) parts.push(`for ${values.days} days`);

    const prompt = `${parts.join(", ")}. Can you help me plan this trip?`;

    try {
      const data = await sendMessage.mutateAsync({ message: prompt });
      if (data?.sessionId) {
        // Scroll to top before navigating
        window.scrollTo(0, 0);
        navigate(`/chat/${data.sessionId}`, { state: { ...values, fromHome: true } });
      }
    } catch (error) {
      console.error("Failed to start trip planning:", error);
    }
  };

  return (
    <section className="grid gap-6 md:gap-8 md:grid-cols-2 py-6 md:py-10">
      <div className="space-y-6 md:space-y-8">
        <div className="space-y-2 mt-4 md:mt-8 text-xl md:text-3xl font-ibm font-medium text-black mb-3 md:mb-5">
          <p className="flex flex-wrap items-center gap-1 md:gap-2">
            I am going to{" "}
            <span
              ref={destinationWrapperRef}
              className="relative inline-block min-w-[120px] max-w-[120px] align-middle md:min-w-[150px] md:max-w-[150px]"
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
                className="h-8 md:h-10 shadow-none border border-transparent bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-xl md:text-3xl font-medium leading-snug"
              />
              {destinationOpen && filteredDestinations.length > 0 && (
                <div
                  ref={destinationDropdownRef}
                  className="absolute left-0 top-full z-20 mt-2 w-[calc(100vw-1rem)] max-w-[300px] rounded-[8px] border border-slate-200 bg-white p-0 shadow-xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 ease-out md:left-0"
                  style={{
                    maxWidth: "min(calc(100vw - 1rem), 300px)",
                    left: "0",
                    right: "auto",
                  }}
                >
                  <div className="max-h-[calc(100vh-220px)] md:max-h-80 overflow-y-auto py-2">
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
          <p className="flex flex-wrap items-center gap-1 md:gap-2">
            with ₦{" "}
            <span className="inline-grid items-center align-middle relative max-w-[9ch] overflow-hidden">
              <span className="col-start-1 row-start-1 opacity-0 whitespace-pre px-0 text-xl md:text-3xl font-medium leading-snug invisible font-ibm">
                {values.budget || "budget"}
              </span>
              <input
                placeholder="budget"
                value={values.budget}
                size={1}
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
                className="col-start-1 row-start-1 w-full min-w-0 h-8 md:h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:outline-none focus:border-none focus:ring-0 text-xl md:text-3xl font-medium leading-snug font-ibm"
              />
            </span>
            , starting
          </p>
          <p className="flex flex-wrap items-center gap-1 md:gap-2">
            <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
              <PopoverTrigger asChild>
                <span className="inline-block min-w-[80px] max-w-[80px] align-middle md:min-w-[100px] md:max-w-[100px]">
                  <Input
                    placeholder="dd/mm"
                    value={values.dates}
                    readOnly
                    className="h-8 md:h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-xl md:text-3xl font-medium leading-snug cursor-pointer"
                  />
                </span>
              </PopoverTrigger>
              <PopoverContent
                className="w-[calc(100vw-0.5rem)] max-w-[800px] p-0 md:w-[calc(100vw-2rem)]"
                align="start"
                side="bottom"
                sideOffset={4}
                collisionPadding={16}
                avoidCollisions={true}
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <div className="p-2 md:p-4 max-h-[calc(100vh-100px)] md:max-h-none overflow-y-auto">
                  <RangeCalendar
                    dateRange={dateRange}
                    onSelect={setDateRange}
                    defaultMonth={dateRange?.from || new Date()}
                    numberOfMonths={isMobile ? 1 : 2}
                    className="rounded-lg border-0 w-full"
                  />
                  <div className="flex flex-col gap-2 md:gap-3 items-stretch md:flex-row md:items-center md:justify-between border-t border-slate-200 px-2 md:px-4 pt-2 md:pt-3 pb-2 md:pb-0">
                    <Text
                      variant="span"
                      className="text-xs md:text-sm font-medium text-slate-700 break-words"
                    >
                      {formatDateRangeSummary() || "Select date range"}
                    </Text>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleClearDate}
                        className="flex-1 md:flex-none h-8 px-3 text-xs md:text-sm text-slate-600 hover:text-slate-900 font-ibm"
                      >
                        Clear
                      </Button>
                      <Button
                        type="button"
                        onClick={handleSaveDate}
                        disabled={!dateRange?.from || !dateRange?.to}
                        className="flex-1 md:flex-none py-2 md:py-2.5 font-ibm rounded-md bg-[#FF5A1F] px-3 md:px-4 text-xs md:text-sm font-medium text-white hover:bg-[#ff7846] disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="h-8 md:h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-xl md:text-3xl font-medium leading-snug cursor-default"
              />
            </span>{" "}
            days.
          </p>
        </div>

        <Button
          onClick={handleLetsGo}
          disabled={!values.destination || isSending}
          className="w-full md:w-auto rounded-[8px] bg-[#FF5A1F] px-6 py-3 text-sm font-ibm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
          ) : (
            "Let's go!"
          )}
        </Button>

        <p className="text-xs md:text-sm text-gray-500 font-medium pt-4 md:pt-6">
          Not sure where to go or begin?{" "}
          <button className="font-semibold text-[#FF5A1F]">
            Ask Isang AI ↗
          </button>
        </p>
      </div>

      <div className="md:flex hidden items-center justify-center order-first md:order-last">
        <div className="w-full">
          {!values.destination ||
            !values.budget ||
            !values.dates ||
            !values.days ? (
            <iframe
              title="map-preview"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-2.308%2C46.5%2C-0.5%2C47.5&layer=mapnik"
              className="h-[250px] md:h-[400px] w-full rounded-[16px] md:rounded-[28px] border-0"
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
