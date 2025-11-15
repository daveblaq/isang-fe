"use client";

import { useState } from "react";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TripPlanner() {
  const [values, setValues] = useState({
    destination: "",
    budget: "",
    dates: "",
    days: "",
  });

  return (
    <section className="grid gap-8 md:grid-cols-2 py-10">
      <div className="space-y-8">
        <div className="space-y-2 text-3xl font-ibm font-medium text-black mb-5">
          <p className="flex flex-wrap items-center gap-2">
            I am going to{" "}
            <span className="inline-block min-w-[160px] max-w-[160px] align-middle">
              <Input
                placeholder="destination"
                value={values.destination}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    destination: e.target.value,
                  }))
                }
                className="h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-3xl font-medium leading-snug "
              />
            </span>
            ,
          </p>
          <p className="flex flex-wrap items-center gap-2">
            with ₦{" "}
            <span className="inline-block  min-w-[140px] max-w-[140px] align-middle">
              <Input
                placeholder="budget"
                value={values.budget}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, budget: e.target.value }))
                }
                className="h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-3xl font-medium leading-snug "
              />
            </span>
            budget, starting
          </p>
          <p className="flex flex-wrap items-center gap-2">
            <span className="inline-block min-w-[100px] max-w-[100px] align-middle">
              <Input
                placeholder="dd/mm"
                value={values.dates}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, dates: e.target.value }))
                }
                className="h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-3xl font-medium leading-snug "
              />
            </span>
            , for{" "}
            <span className="inline-block w-14 align-middle">
              <Input
                placeholder="x"
                value={values.days}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, days: e.target.value }))
                }
                className="h-10 shadow-none border-none bg-transparent px-0 text-orange-500 placeholder:text-gray-300 focus:border-none focus-visible:ring-0 w-auto text-3xl font-medium leading-snug "
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
          <iframe
            title="map-preview"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-2.308%2C46.5%2C-0.5%2C47.5&layer=mapnik"
            className="h-[400px] w-full rounded-[28px] border-0"
          />
        </div>
      </div>
    </section>
  );
}
