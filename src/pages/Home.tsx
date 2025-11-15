import Text from "@/components/ui/text";
import TravelersChoice from "@/components/home/travelers-choice";

export default function Home() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <section className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <Text variant="h3" className="font-semibold text-slate-900">
          Hello world
        </Text>
        <Text variant="p" className="mt-4 text-slate-500">
          Welcome to Isang. Choose an option from the sidebar to get started.
        </Text>
      </section>

      <TravelersChoice />
    </div>
  );
}
