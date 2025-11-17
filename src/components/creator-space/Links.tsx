import { TbBook, TbCoins, TbReceipt } from "react-icons/tb";

import Text from "@/components/ui/text";

const stats = [
  {
    label: "Views",
    value: "45,823",
    delta: "+213",
    deltaLabel: "10%",
    icon: TbBook,
  },
  {
    label: "Registered",
    value: "3,890",
    delta: "+839",
    deltaLabel: "8%",
    icon: TbReceipt,
  },
  {
    label: "Link Earnings",
    value: "₦863,940",
    delta: "+839",
    deltaLabel: "73%",
    icon: TbCoins,
  },
];

const guides = [
  "Landlord vs. Tenant: Know Your L...",
  "Ethical Dilemmas in Law & How to...",
  "Contracts 101: How to Avoid Legal...",
  "Courtroom Advocacy & Litigation...",
  "Immigration & Visa Assistance",
  "Mastering Legal Research & Writing",
  "Networking & Personal Branding f...",
  "Transitioning from Law School to...",
  "Personal Injury & Medical Malprac...",
];

export default function Links() {
  return (
    <div className="space-y-5">
      <div className="grid rounded-xl border border-gray-200 bg-white divide-x divide-gray-200 shadow-md grid-cols-2 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-3 p-5 ">
            <div className="flex items-center justify-between">
              <Text
                variant="span"
                className="text-sm font-medium text-[#7A7A9D]"
              >
                {stat.label}
              </Text>
              <div className="flex items-center rounded-full border border-gray-200 p-1.5">
                <stat.icon className="h-4 w-4 text-[#F56630]" />
              </div>
            </div>
            <div className="flex items-center w-full justify-between pt-3">
              <Text
                variant="h4"
                className="text-2xl font-semibold text-[#27272E]"
              >
                {stat.value}
              </Text>
              <div className="flex items-center gap-1">
                <Text variant="span" className="text-xs text-[#7A7A9D]">
                  {stat.delta}
                </Text>
                <Text
                  variant="span"
                  className="rounded-full bg-green-50 px-2 text-xs font-medium text-emerald-700"
                >
                  +{stat.deltaLabel}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-2 overflow-x-auto">
        <div className="mt-4 md:mt-6 grid grid-cols-6 gap-2 md:gap-4 text-xs font-ibm font-medium text-gray-700 bg-gray-50 p-3 md:p-5 border-b border-gray-200 min-w-[600px]">
          <Text variant="span" className="text-gray-700">
            Link name
          </Text>
          <Text variant="span" className="text-gray-700">
            Date Published
          </Text>
          <Text variant="span" className="text-gray-700">
            Type
          </Text>
          <Text variant="span" className="text-gray-700">
            Views
          </Text>
          <Text variant="span" className="text-gray-700">
            Registered
          </Text>
          <Text variant="span" className="text-gray-700">
            Earnings
          </Text>
        </div>
        <div className="divide-y divide-gray-200">
          {guides.map((guide) => (
            <div
              key={guide}
              className="grid grid-cols-6 gap-2 md:gap-4 px-2 py-4 md:py-6 text-xs md:text-sm hover:border-slate-100 hover:bg-slate-50 min-w-[600px]"
            >
              <Text
                variant="span"
                className="truncate text-sm font-medium text-slate-900"
              >
                {guide}
              </Text>
              <Text variant="span" className="text-sm text-slate-500">
                2/11/12
              </Text>
              <Text variant="span" className="text-sm text-slate-500">
                Itinerary
              </Text>
              <Text variant="span" className="text-sm text-slate-500">
                167.6K
              </Text>
              <Text variant="span" className="text-sm text-slate-500">
                10.7k
              </Text>
              <Text variant="span" className="text-sm text-slate-500">
                60 mins
              </Text>
            </div>
          ))}
        </div>
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-3 md:gap-4 font-ibm text-xs text-[#2E384D]">
              <Text variant="span" className="order-3 md:order-1">Page 1 of 30</Text>

              <div className="flex flex-1 items-center justify-center gap-1.5 md:gap-2.5 text-[#8A97B5] order-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`h-6 w-6 md:h-7 md:w-7 rounded-md border text-xs md:text-sm ${
                      page === 3
                        ? "border-[#A6CFAF] bg-[#E3F5E5] text-[#0C7D45]"
                        : "border-transparent text-[#8A97B5]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <Text variant="span" className="text-[#8A97B5]">
                  …
                </Text>
                <Text variant="span" className="text-[#8A97B5] hidden md:inline">
                  10 11 12
                </Text>
              </div>

              <div className="flex items-center gap-2 order-1 md:order-3">
                <button className="flex items-center gap-1 md:gap-2 rounded-md border border-[#CFD9E8] px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium text-[#2E384D] shadow-sm">
                  ← Prev
                </button>
                <button className="flex items-center gap-1 md:gap-2 rounded-md border border-[#CFD9E8] px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium text-[#2E384D] shadow-sm">
                  Next →
                </button>
              </div>
            </div>
      </div>
    </div>
  );
}
