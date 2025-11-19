import { useState } from "react";

import Text from "@/components/ui/text";

type PrivacySection = {
  id: string;
  heading: string;
  options: {
    id: string;
    label: string;
    description?: string;
  }[];
  selection: string;
};

const defaultSections: PrivacySection[] = [
  {
    id: "visibility",
    heading: "Profile Visibility",
    options: [
      {
        id: "public",
        label: "Public",
        description: "For community features like Q&A upvotes",
      },
      {
        id: "private",
        label: "Private (Default)",
      },
    ],
    selection: "private",
  },
  {
    id: "activity",
    heading: "Q&A Activity",
    options: [
      {
        id: "questions",
        label: "Allow others to see the questions I've asked",
      },
      {
        id: "display",
        label: "Show my display name on public answers I’ve tipped",
      },
    ],
    selection: "questions",
  },
  {
    id: "communication",
    heading: "Communication Preferences",
    options: [
      { id: "tips", label: "Receive updates about session tips & reminders" },
      {
        id: "product",
        label: "Receive occasional product news and platform updates",
      },
    ],
    selection: "tips",
  },
];

export default function PrivacyTab() {
  const [sections, setSections] = useState<PrivacySection[]>(defaultSections);

  const handleSelect = (sectionId: string, optionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, selection: optionId } : section
      )
    );
    // eslint-disable-next-line no-console
    console.log("privacy preference", sectionId, optionId);
  };

  return (
    <div className="space-y-4 md:space-y-6 bg-white p-0 lg:max-w-3xl">
      <div className="pb-3 md:pb-5">
        <Text variant="h5" className="text-lg md:text-xl font-semibold text-slate-900">
          Privacy
        </Text>
        <Text variant="span" className="text-xs md:text-sm text-slate-500">
          Manage profile visibility, Q&A activity, and communication preferences.
        </Text>
      </div>
      {sections.map((section) => (
        <div key={section.id} className="space-y-2 px-4 md:px-6 py-2">
          <Text
            variant="span"
            className="text-xs md:text-sm font-semibold capitalize tracking-wide text-[#771A0D]"
          >
            {section.heading}
          </Text>
          <div className="overflow-hidden rounded-xl md:rounded-2xl border border-slate-100">
            {section.options.map((option, optionIndex) => (
              <button
                key={option.id}
                onClick={() => handleSelect(section.id, option.id)}
                className={`flex w-full items-start justify-between gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 text-left transition ${
                  optionIndex !== section.options.length - 1
                    ? "border-b border-slate-100"
                    : ""
                } ${
                  section.selection === option.id
                    ? ""
                    : "bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <Text
                    variant="span"
                    className="text-sm md:text-base font-medium text-slate-900 break-words"
                  >
                    {option.label}
                  </Text>
                  {option.description && (
                    <Text
                      variant="span"
                      className="block text-xs md:text-sm text-slate-500 mt-1"
                    >
                      {option.description}
                    </Text>
                  )}
                </div>
                <span
                  className={`flex h-5 w-5 md:h-6 md:w-6 flex-shrink-0 items-center justify-center rounded-full border ${
                    section.selection === option.id
                      ? "border-[#FF5400] bg-[#FF5400]"
                      : "border-slate-300"
                  }`}
                >
                  {section.selection === option.id && (
                    <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
