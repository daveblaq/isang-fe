import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "@/components/settings/ProfileTab";
import AccountTab from "@/components/settings/AccountTab";
import PreferencesTab from "@/components/settings/PreferencesTab";
import BillingPayoutTab from "@/components/settings/BillingPayoutTab";
import NotificationTab from "@/components/settings/NotificationTab";
import PrivacyTab from "@/components/settings/PrivacyTab";

const tabItems = [
  { value: "profile", label: "Profile" },
  { value: "account", label: "Account" },
  { value: "preferences", label: "Preferences" },
  { value: "billing", label: "Billing & Payout" },
  { value: "notification", label: "Notification" },
  { value: "privacy", label: "Privacy" },
];

export default function Settings() {
  return (
    <Tabs defaultValue="profile" className="space-y-4 md:space-y-8">
      <TabsList className="flex flex-nowrap w-full md:w-fit items-center gap-1 md:gap-2 rounded-full bg-[#F5F6FB] border border-gray-200 p-1 overflow-x-auto">
        {tabItems.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-full px-2.5 py-1.5 text-xs md:px-4 md:py-2 md:text-sm font-medium text-slate-500 data-[state=active]:bg-black data-[state=active]:border-none data-[state=active]:text-white whitespace-nowrap flex-shrink-0"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="profile">
        <ProfileTab />
      </TabsContent>
      <TabsContent value="account">
        <AccountTab />
      </TabsContent>
      <TabsContent value="preferences">
        <PreferencesTab />
      </TabsContent>
      <TabsContent value="billing">
        <BillingPayoutTab />
      </TabsContent>
      <TabsContent value="notification">
        <NotificationTab />
      </TabsContent>
      <TabsContent value="privacy">
        <PrivacyTab />
      </TabsContent>
    </Tabs>
  );
}
