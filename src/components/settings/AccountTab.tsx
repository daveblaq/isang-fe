import Text from "@/components/ui/text";

const preferences = [
  {
    label: "First and last name",
    value: "Nsikan Etukudoh",
    verified: false,
    showAction: false,
  },
  {
    label: "Email address",
    value: "nsikan@lawyer.up",
    verified: true,
    showAction: false,
  },
  {
    label: "City, Country",
    value: "🇳🇬 Lagos, Nigeria",
    showAction: true,
  },
  {
    label: "Preferred Language",
    value: "English",
    showAction: true,
  },
  {
    label: "Preferred Currency",
    value: "Pound Sterling",
    showAction: true,
  },
  {
    label: "Timezone",
    value: "GMT (Greenwich Mean Time)",
    showAction: true,
  },
];

export default function AccountTab() {
  return (
    <div className="space-y-4 bg-white p-0 lg:max-w-3xl">
      <div className="pb-4 md:pb-5 border-b border-slate-100">
        <Text
          variant="h5"
          className="text-lg md:text-xl font-ibm font-semibold text-slate-900"
        >
          Account
        </Text>
      </div>
      {preferences.map((pref, index) => (
        <div
          key={pref.label}
          className={`flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 ${
            index !== preferences.length - 1 ? "border-b border-slate-100" : ""
          }`}
        >
          <div className="flex-1 space-y-1 min-w-0">
            <Text
              variant="span"
              className="text-xs md:text-sm font-regular text-gray-600"
            >
              {pref.label}
            </Text>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-[8px] bg-[#F0F2F5] px-2 md:px-3 py-1 text-xs md:text-sm font-ibm font-medium text-gray-900 break-words">
                {pref.value}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            {pref.showAction && (
              <button className="text-xs md:text-sm font-semibold text-[#0D7F88] underline-offset-2 font-ibm underline whitespace-nowrap">
                Change
              </button>
            )}
            {pref.verified && (
              <span className="text-[10px] md:text-xs font-semibold text-gray-500 whitespace-nowrap">
                Verified
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 px-4 md:px-6 py-4 md:py-5 text-red-500">
        <div className="flex-1 min-w-0">
          <Text variant="span" className="text-sm md:text-base font-semibold text-red-500">
            Delete your account
          </Text>
          <Text variant="span" className="block text-xs md:text-sm text-red-400 mt-1">
            Permanently remove your profile and data from Isang.
          </Text>
        </div>
        <button className="w-full sm:w-auto rounded-full border border-red-200 px-3 md:px-4 py-1.5 md:py-1 text-xs md:text-sm font-semibold text-red-500 hover:bg-red-50 whitespace-nowrap">
          Delete
        </button>
      </div>
    </div>
  );
}
