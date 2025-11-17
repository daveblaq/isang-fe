import Text from "@/components/ui/text";
import DiscoverCard from "@/components/ui/discover-card";
import { discoverTrips } from "@/data/discover-data";

export default function TravelersChoice() {
  return (
    <div className="space-y-6 md:space-y-10">
      <section className="space-y-4 md:space-y-6 text-white">
        <div className="space-y-2">
          <Text
            variant="h4"
            className="text-xl md:text-2xl font-medium font-ibm text-black"
          >
            Start your journey today.
          </Text>
          <Text
            variant="p"
            className="text-xs md:text-sm font-ibm text-gray-500 font-regular"
          >
            Discover what travelers are planning now – start your journey today.
          </Text>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {discoverTrips.map((trip) => (
            <DiscoverCard
              key={trip.id}
              badge={trip.badge}
              title={trip.title}
              image={trip.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
