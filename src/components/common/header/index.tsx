import type { FC } from "react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Text from "@/components/ui/text";

type HeaderProps = {
  sidebarOpen?: boolean | string;
  setSidebarOpen?: (open: boolean) => void;
  title?: string;
};

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { countryOptions, languageOptions } from "@/data/headerOptions";

const Header: FC<HeaderProps> = ({ title }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  return (
    <header className="sticky top-0 z-20 flex w-full flex-col gap-8 bg-white px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Text variant="h4" className="font-semibold text-black text-xl font-ibm">
          {title ?? "Plan a trip"}
        </Text>
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow">
                {selectedLanguage.code}
                <FiChevronDown className="text-slate-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-44 p-2">
              <div className="flex flex-col gap-1">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => setSelectedLanguage(option)}
                    className={`flex font-ibm items-center justify-between rounded-lg px-3 py-2 text-sm ${
                      selectedLanguage.code === option.code
                        ? "bg-slate-100 font-semibold text-slate-900"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-ibm">{option.label}</span>
                    <span className="text-xs text-slate-400 font-ibm">
                      {option.code}
                    </span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 rounded-full border border-[#D0D5DD] shadow bg-white px-2 py-2 text-sm font-medium text-slate-700">
                <span>{selectedCountry.flag}</span>
                {selectedCountry.code}
                <FiChevronDown className="text-slate-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="flex flex-col gap-1">
                {countryOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => setSelectedCountry(option)}
                    className={`flex font-ibm items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                      selectedCountry.code === option.code
                        ? "bg-slate-100 font-semibold text-slate-900"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-lg font-ibm">{option.flag}</span>
                    <div className="flex flex-col text-left">
                      <span className="font-ibm">{option.label}</span>
                      <span className="text-xs text-slate-400 font-ibm">
                        {option.code}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
