"use client";

import { FiHeart } from "react-icons/fi";
import { MapPin } from "lucide-react";
import Text from "@/components/ui/text";

type DiscoverCardProps = {
  image: string;
  badge: string;
  title: string;
};

export default function DiscoverCard({
  image,
  badge,
  title,
}: DiscoverCardProps) {
  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-[12px] cursor-pointer">
        <img
          src={image}
          alt={title}
          className="h-[220px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
            {badge}
          </span>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow">
            <FiHeart className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-[#4A5D95]">
          <Text
            variant="span"
            className="text-sm font-medium font-ibm text-slate-900"
          >
            {title}
          </Text>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <MapPin className="h-4 w-4 text-gray-500" />
          <Text variant="span" className="text-sm font-regular text-gray-500">
            Lagos, Nigeria
          </Text>
        </div>
        <div>
          <a
            href="#"
            className="text-sm font-medium underline font-ibm text-slate-900"
          >
            Plan a trip
          </a>
        </div>
      </div>
    </div>
  );
}
