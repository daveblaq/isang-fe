"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FavoriteCard from "@/components/favorites/favorite-card";
import { favoritesData } from "@/data/favorites";
import Text from "@/components/ui/text";

const tabItems = [
  "all",
  "stays",
  "restaurants",
  "attractions",
  "activities",
  "guides",
];

export default function Favorites() {
  const allFavorites = useMemo(() => favoritesData, []);

  const filteredFavorites = (category: string) => {
    if (category === "all") return allFavorites;
    return allFavorites.filter((item) => item.category === category);
  };

  const favoritesCount = allFavorites.length;
  const pathfindersCount = 0;

  return (
    <div className="min-h-screen bg-white -mx-4 -my-4 md:-mx-6 md:-my-6 p-6">
      <div className="space-y-8 pb-8 pt-4">
        <div className="flex items-center justify-between">
          <Text
            variant="span"
            className="text-base font-medium font-ibm text-slate-600"
          >
            {favoritesCount} places • {pathfindersCount} pathfinders
          </Text>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="flex w-fit items-center gap-2 rounded-full bg-[#F5F6FB] border border-gray-200">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-full px-4 py-2 text-sm font-medium font-ibm capitalize text-slate-500 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-none"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabItems.map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6 w-max">
                  {filteredFavorites(tab).map((favorite) => (
                    <FavoriteCard
                      key={favorite.id}
                      images={favorite.images}
                      title={favorite.title}
                      location={favorite.location}
                      rating={favorite.rating}
                      reviewCount={favorite.reviewCount}
                      author={favorite.author}
                      avatar={favorite.avatar}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
