"use client";

import { NavLink } from "react-router-dom";
import {
  TbRouteSquare,
  TbCloudBolt,
  TbWorldSearch,
  TbBell,
  TbHeart,
  TbSettings,
} from "react-icons/tb";

const navItems = [
  { label: "Discover", icon: TbWorldSearch, to: "/" },
  { label: "Inspiration", icon: TbCloudBolt, to: "/inspiration" },
  { label: "Favorites", icon: TbHeart, to: "/favorites" },
  { label: "Notification", icon: TbBell, to: "/notification" },
  { label: "Creator Space", icon: TbRouteSquare, to: "/creator-space" },
  { label: "Settings", icon: TbSettings, to: "/settings" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white px-1 py-2 shadow-lg lg:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-1.5 transition-colors min-w-0 flex-1 ${
              isActive
                ? "text-[#FF5A1F]"
                : "text-slate-500 hover:text-slate-900"
            }`
          }
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          <span className="text-[10px] md:text-xs font-medium font-ibm truncate w-full text-center">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
