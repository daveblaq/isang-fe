"use client";

import { MapPin } from "lucide-react";
import type { FC } from "react";
import { FiChevronDown } from "react-icons/fi";
import { PiChatDotsBold } from "react-icons/pi";
import {
  TbRouteSquare,
  TbCloudBolt,
  TbWorldSearch,
  TbBell,
  TbHeart,
} from "react-icons/tb";
import Text from "@/components/ui/text";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { chatSections, tripSections } from "@/data/sidebarChats";
import {
  logoutMenu,
  primaryUserMenu,
  secondaryUserMenu,
} from "@/data/sidebarUserMenu";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const primaryNav = [
  { label: "Discover", icon: TbWorldSearch, to: "/" },
  { label: "Inspiration", icon: TbCloudBolt, to: "/inspiration" },
  { label: "Favorites", icon: TbHeart, to: "/favorites" },
  { label: "Notification", icon: TbBell, to: "/notification" },
  { label: "Creator Space", icon: TbRouteSquare, to: "/creator-space" },
];

const Sidebar: FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[240px] flex-col border-r border-[#CFD9E8] bg-white transition-transform duration-300 md:w-[260px] lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 pt-4 md:px-5 md:pt-6">
          <div className="flex items-center gap-3">
             <div className="w-[32px] h-[32px] rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/logo.svg" alt="AI" className="w-full h-full object-contain opacity-80" onError={(e) => e.currentTarget.src='https://placehold.co/20x20?text=AI'} /> 
            </div>
            <Text variant="h5" className="font-semibold text-slate-900">
              Isang
            </Text>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-full border border-slate-200 px-2 py-1 text-sm text-slate-500 lg:hidden"
          >
            ×
          </button>
        </div>

        <div className="px-4 pt-4 md:px-5 md:pt-6">
          <Button className="flex w-full items-center justify-center rounded-[8px] border border-[#FFE6D5] bg-[#FFF9F5] px-3 py-2.5 text-sm font-semibold text-[#E62E05] font-ibm shadow-none md:px-4 md:py-3 md:text-base">
            <span className="flex items-center gap-2">
              <TbRouteSquare className="h-4 w-4 text-[#E62E05] md:h-5 md:w-5" />
              <span className="hidden sm:inline">Plan a trip</span>
              <span className="sm:hidden">Plan</span>
            </span>
          </Button>
        </div>

        <nav className="hidden lg:flex mt-4 flex-col gap-1 px-2 md:mt-6 md:px-3">
          {primaryNav.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 rounded-[8px] border px-2.5 py-2 text-xs font-medium font-ibm transition md:gap-3 md:px-3 md:py-3 md:text-sm",
                  isActive
                    ? "border-slate-200 bg-slate-50 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-slate-200 hover:bg-slate-50 hover:text-gray-900",
                ].join(" ")
              }
            >
              <item.icon className="h-4 w-4 text-gray-500 md:h-5 md:w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 px-4 md:mt-8 md:px-6">
          <Text
            variant="h6"
            className="font-semibold text-xs text-slate-900 font-ibm md:text-sm"
          >
            Recents
          </Text>
          <Tabs defaultValue="chats" className="mt-1 h-[300px] md:h-[400px]">
            <TabsList className="w-full justify-between rounded-none border-b border-slate-200 bg-transparent p-0 m-0">
              <TabsTrigger
                value="chats"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent font-ibm text-xs font-medium text-slate-400 data-[state=active]:border-slate-900 data-[state=active]:text-slate-900 md:text-sm"
              >
                All chats
              </TabsTrigger>
              <TabsTrigger
                value="trips"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent font-ibm text-xs font-medium text-slate-400 data-[state=active]:border-slate-900 data-[state=active]:text-slate-900 md:text-sm"
              >
                Trips
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="chats"
              className="h-[250px] overflow-hidden md:h-[340px]"
            >
              <div className="mt-2 space-y-2 overflow-y-auto pr-1 h-full">
                {chatSections.map((section) => (
                  <div key={section.date}>
                    <Text
                      variant="span"
                      className="text-xs text-black font-ibm font-semibold"
                    >
                      {section.date}
                    </Text>
                    <div className="mt-2 space-y-2">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          className="flex w-full items-center gap-3 rounded-2x px-2 py-2 text-left transition"
                        >
                          <PiChatDotsBold className="h-5 w-5 text-gray-500" />
                          <div>
                            <Text
                              variant="p"
                              className="text-sm font-regular text-gray-500 font-ibm"
                            >
                              {item.title}
                            </Text>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent
              value="trips"
              className="h-[250px] overflow-hidden md:h-[280px]"
            >
              <div className="mt-2 space-y-2 overflow-y-auto pr-1 h-full">
                {tripSections.map((section) => (
                  <div key={section.date}>
                    <Text variant="span" className="text-xs text-slate-500">
                      {section.date}
                    </Text>
                    <div className="mt-2 space-y-2">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          className="flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-2 text-left transition hover:border-slate-200 hover:bg-slate-50"
                        >
                          <MapPin className="h-5 w-5 rounded-xl border border-slate-200 p-1 text-slate-500" />
                          <div>
                            <Text
                              variant="p"
                              className="text-sm font-semibold text-slate-900"
                            >
                              {item.title}
                            </Text>
                            <Text
                              variant="span"
                              className="text-xs text-slate-400"
                            >
                              {item.subtitle}
                            </Text>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-auto px-4 pb-4 md:px-5 md:pb-6">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex w-full items-center gap-2 rounded-[8px] bg-[#F9FAFB] border border-slate-100 px-3 py-2 shadow-sm md:gap-3 md:px-4">
                <Avatar className="h-8 w-8 border border-[#DDD6FE]">
                  <AvatarFallback className="bg-purple-500 text-white">
                    S
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Text
                    variant="p"
                    className="text-sm font-semibold text-slate-900"
                  >
                    Traveler
                  </Text>
                  <Text variant="span" className="text-xs text-slate-500">
                    Free
                  </Text>
                </div>
                <FiChevronDown className="ml-auto text-slate-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="start"
              sideOffset={12}
              collisionPadding={8}
              className="w-64 rounded-2xl border border-slate-100 bg-white p-0 shadow-xl"
            >
              <div className="flex items-center gap-3 px-4 py-4">
                <Avatar className="h-[36px] w-[36px] border border-[#DDD6FE]">
                  <AvatarFallback className="bg-purple-500 text-white">
                    S
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Text
                    variant="p"
                    className="text-sm font-semibold font-ibm text-slate-900"
                  >
                    scvkett@isang.ai
                  </Text>
                  <Text
                    variant="span"
                    className="text-xs text-[#8F9BB3] font-ibm font-regular"
                  >
                    View profile
                  </Text>
                </div>
              </div>
              <div className="border-t border-gray-300 px-4 py-3 space-y-1">
                {primaryUserMenu.map((item) =>
                  item.to ? (
                    <NavLink
                      key={item.id}
                      to={item.to}
                      className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left text-sm text-black font-ibm font-regular hover:bg-slate-50"
                    >
                      <item.icon className="h-4 w-4 text-black" />
                      {item.label}
                    </NavLink>
                  ) : (
                    <button
                      key={item.id}
                      className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left text-sm text-black font-ibm font-regular hover:bg-slate-50"
                    >
                      <item.icon className="h-4 w-4 text-black" />
                      {item.label}
                    </button>
                  )
                )}
              </div>
              <div className="border-t border-gray-300 px-4 py-3 space-y-1">
                {secondaryUserMenu.map((item) => (
                  <button
                    key={item.id}
                    className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left text-sm text-black font-ibm font-regular hover:bg-slate-50"
                  >
                    <item.icon className="h-4 w-4 text-black" />
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-300 px-4 py-3">
                <button className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left text-sm font-semibold text-red-500 hover:bg-red-50">
                  <logoutMenu.icon className="h-4 w-4" />
                  {logoutMenu.label}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </aside>

      <div
        className={`fixed inset-0 z-30 bg-black/30 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default Sidebar;
