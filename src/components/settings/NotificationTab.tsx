import { useState } from "react";

import Text from "@/components/ui/text";
import { Switch } from "@/components/ui/switch";

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

const defaultSettings: NotificationSetting[] = [
  {
    id: "discount",
    title: "Discount Offers",
    description:
      "Get updates about programs, features and regulations via e-mail.",
    enabled: false,
  },
  {
    id: "news",
    title: "News and Updates",
    description:
      "Stay in the loop on product improvements and roadmap announcements.",
    enabled: false,
  },
  {
    id: "messages",
    title: "Guest and host messages",
    description:
      "Never miss messages from guests, collaborators, and co-hosts.",
    enabled: true,
  },
];

export default function NotificationTab() {
  const [settings, setSettings] =
    useState<NotificationSetting[]>(defaultSettings);

  const handleToggle = (id: string, value: boolean) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: value } : setting
      )
    );
    // eslint-disable-next-line no-console
    console.log("Notification preference changed:", id, value);
  };

  return (
    <div className="space-y-4 bg-white p-0 lg:max-w-3xl">
      <div className="pb-3 md:pb-5">
        <Text variant="h5" className="text-lg md:text-xl font-semibold text-slate-900">
          Notification
        </Text>
        <Text variant="span" className="text-xs md:text-sm text-slate-500">
          Manage your notification preferences.
        </Text>
      </div>
      {settings.map((setting, index) => (
        <div
          key={setting.id}
          className={`flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 md:gap-4 px-4 md:px-6 py-4 md:py-6 ${
            index !== settings.length - 1 ? "border-b border-slate-100" : ""
          }`}
        >
          <div className="flex-1 space-y-1 md:space-y-2 flex flex-col min-w-0">
            <Text
              variant="span"
              className="text-sm md:text-base font-medium font-ibm text-slate-900"
            >
              {setting.title}
            </Text>
            <Text variant="span" className="text-xs md:text-sm font-ibm text-slate-500">
              {setting.description}
            </Text>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <Text
              variant="span"
              className="text-xs md:text-sm font-semibold text-slate-900"
            >
              Enable
            </Text>
            <Switch
              checked={setting.enabled}
              onCheckedChange={(checked) => handleToggle(setting.id, checked)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
