"use client";

import Text from "@/components/ui/text";

type DestinationHeroProps = {
  destination: string;
  country?: string;
  days: string;
  image?: string;
};

export default function DestinationHero({
  destination,
  country,
  days,
  image,
}: DestinationHeroProps) {
  if (!destination || !days) {
    return null;
  }

  const heroImage =
    image ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="group relative h-[250px] md:h-[400px] w-full overflow-hidden rounded-[16px] order-first md:order-last cursor-pointer">
      <img
        src={heroImage}
        alt={destination}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09212600]/90 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-3xl">
          📍
          <Text
            variant="h3"
            className="text-3xl font-semibold font-ibm text-white drop-shadow-md"
          >
            {destination} {country && country}
          </Text>
        </div>
        <div className="flex items-center gap-2 text-2xl">
          ⏳
          <Text
            variant="h5"
            className="text-2xl font-medium font-ibm text-white drop-shadow-md"
          >
            {days}
            {parseInt(days) === 1 ? "day" : "days"}
          </Text>
        </div>
      </div>
    </div>
  );
}
