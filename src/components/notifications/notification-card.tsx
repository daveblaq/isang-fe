"use client";

import { type LucideIcon } from "lucide-react";
import Text from "@/components/ui/text";

type NotificationIcon = {
  type: "icon" | "image";
  value: string | LucideIcon;
};

type NotificationCardProps = {
  icon: NotificationIcon;
  title: string;
  subtitle: string;
  timestamp: string;
};

export default function NotificationCard({
  icon,
  title,
  subtitle,
  timestamp,
}: NotificationCardProps) {
  const IconComponent =
    icon.type === "icon" ? (icon.value as LucideIcon) : null;

  return (
    <div className="flex items-start gap-4 rounded-lg bg-gray-50 border border-gray-100 hover:bg-white transition-colors duration-200 p-4 hover:shadow-md">
      <div className="flex-shrink-0">
        {icon.type === "image" ? (
          <img
            src={icon.value as string}
            alt={title}
            className="h-12 w-12 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          IconComponent && (
            <div className="flex h-12 w-12 items-center justify-center">
              <IconComponent className="h-6 w-6 text-black" strokeWidth={1.5} />
            </div>
          )
        )}
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 min-w-0">
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <Text
            variant="span"
            className="text-base font-medium font-ibm text-black"
          >
            {title}
          </Text>
          <Text
            variant="span"
            className="text-sm font-regular font-ibm text-slate-500 truncate"
          >
            {subtitle}
          </Text>
        </div>
        <Text
          variant="span"
          className="flex-shrink-0 text-sm font-medium font-ibm text-slate-500 whitespace-nowrap ml-2"
        >
          {timestamp}
        </Text>
      </div>
    </div>
  );
}
