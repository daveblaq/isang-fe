import type { FC } from "react";
import { useState } from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import Text from "@/components/ui/text";

type HeaderProps = {
  sidebarOpen?: boolean | string;
  setSidebarOpen?: (open: boolean) => void;
  title?: string;
  customContent?: React.ReactNode;
};

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { countryOptions, languageOptions } from "@/data/headerOptions";

const Header: FC<HeaderProps> = ({ title, sidebarOpen, setSidebarOpen, customContent }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  return (
    <header className="sticky top-0 z-20 flex w-full flex-col gap-4 bg-white px-4 py-3 shadow-sm md:gap-8 md:px-8 md:py-4 h-[72px] justify-center">
      <div className="flex flex-row items-center justify-between gap-3 w-full">
        {customContent ? (
            <>
             <div className="flex items-center gap-3 w-full">
                <button
                    onClick={() => setSidebarOpen?.(!sidebarOpen)}
                    className="lg:hidden flex items-center justify-center h-8 w-8 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
                    aria-label="Toggle sidebar"
                >
                    <FiMenu className="h-5 w-5" />
                </button>
                {customContent}
             </div>
            </>
        ) : (
            <>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen?.(!sidebarOpen)}
            className="lg:hidden flex items-center justify-center h-8 w-8 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            aria-label="Toggle sidebar"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <Text
            variant="h4"
            className="font-semibold text-black text-lg font-ibm md:text-xl"
          >
            {title}
          </Text>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow md:px-4 md:py-2 md:text-sm">
                {selectedLanguage.code}
                <FiChevronDown className="text-slate-400 h-3 w-3 md:h-4 md:w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-44 p-2"
              side="bottom"
              align="end"
              collisionPadding={8}
            >
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
              <button className="flex items-center gap-1.5 rounded-full border border-[#D0D5DD] shadow bg-white px-2 py-1.5 text-xs font-medium text-slate-700 md:gap-2 md:px-2 md:py-2 md:text-sm">
                <span className="text-sm md:text-base">
                  {selectedCountry.flag}
                </span>
                {selectedCountry.code}
                <FiChevronDown className="text-slate-400 h-3 w-3 md:h-4 md:w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-48 p-2"
              side="bottom"
              align="end"
              collisionPadding={8}
            >
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
        </>
        )}
      </div>
    </header>
  );
};

export default Header;
