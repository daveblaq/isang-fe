"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InspirationCard from "@/components/inspiration/inspiration-card";
import { inspirationData } from "@/data/inspiration";

const tabItems = ["all", "duration", "places"];

export default function Inspiration() {
  const allInspirations = useMemo(() => inspirationData, []);

  const filteredInspirations = (category: string) => {
    if (category === "all") return allInspirations;
    return allInspirations.filter((item) => item.category === category);
  };

  return (
    <div className="min-h-screen bg-white -mx-4 -my-4 md:-mx-6 md:-my-6 p-4 md:p-6">
      <div className="space-y-6 md:space-y-8 pb-6 md:pb-8 pt-2 md:pt-4">
        <Tabs defaultValue="all" className="space-y-4 md:space-y-6">
          <TabsList className="flex flex-wrap w-full md:w-fit items-center gap-2 rounded-full bg-[#F5F6FB] border border-gray-200 p-1">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-full px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm font-medium font-ibm capitalize text-slate-500 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-none"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabItems.map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredInspirations(tab).map((inspiration) => (
                  <InspirationCard
                    key={inspiration.id}
                    images={inspiration.images}
                    title={inspiration.title}
                    badge={inspiration.badge}
                    location={inspiration.location}
                    author={inspiration.author}
                    avatar={inspiration.avatar}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
