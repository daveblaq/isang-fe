import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Guides from "@/components/creator-space/Guides";
import Links from "@/components/creator-space/Links";
import Earnings from "@/components/creator-space/Earnings";
import Commissions from "@/components/creator-space/Commissions";

export default function CreatorSpace() {
  return (
    <Tabs defaultValue="guides" className="space-y-8">
      <TabsList className="flex w-fit items-center gap-2 rounded-full bg-[#F5F6FB]">
        {["guides", "links", "earnings", "commissions"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="rounded-full px-4 py-2 text-sm capitalize data-[state=active]:bg-black data-[state=active]:border-none data-[state=active]:text-white"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="guides">
        <Guides />
      </TabsContent>
      <TabsContent value="links">
        <Links />
      </TabsContent>
      <TabsContent value="earnings">
        <Earnings />
      </TabsContent>
      <TabsContent value="commissions">
        <Commissions />
      </TabsContent>
    </Tabs>
  );
}
