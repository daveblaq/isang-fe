import TravelersChoice from "@/components/home/travelers-choice";
import TripPlanner from "@/components/home/trip-planner";

export default function Home() {
  return (
    <div className="space-y-6 md:space-y-10 max-w-7xl mx-auto">
      <TripPlanner />

      <TravelersChoice />
    </div>
  );
}
