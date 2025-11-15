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
      <div className=" pb-5 border-b border-slate-100">
        <Text
          variant="h5"
          className="text-xl font-ibm font-semibold text-slate-900"
        >
          Account
        </Text>
      </div>
      {preferences.map((pref, index) => (
        <div
          key={pref.label}
          className={`flex flex-wrap items-center justify-between gap-4 px-6 py-4 ${
            index !== preferences.length - 1 ? "border-b border-slate-100" : ""
          }`}
        >
          <div className="space-y-1">
            <Text
              variant="span"
              className="text-sm font-regular text-gray-600"
            >
              {pref.label}
            </Text>
            <div className="flex items-center gap-2">
              <span className="rounded-[8px] bg-[#F0F2F5] px-3 py-1 text-sm font-ibm font-medium text-gray-900">
                {pref.value}
              </span>
            </div>
          </div>
          {pref.showAction && (
            <button className="text-sm font-semibold text-[#0D7F88] underline-offset-2 font-ibm underline">
              Change
            </button>
          )}
          {pref.verified && (
            <span className="text-xs font-semibold text-gray-500">
              Verified
            </span>
          )}
        </div>
      ))}

      <div className="flex items-center justify-between px-6 py-5 text-red-500">
        <div>
          <Text variant="span" className="text-base font-semibold text-red-500">
            Delete your account
          </Text>
          <Text variant="span" className="block text-xs text-red-400">
            Permanently remove your profile and data from Isang.
          </Text>
        </div>
        <button className="rounded-full border border-red-200 px-4 py-1 text-sm font-semibold text-red-500 hover:bg-red-50">
          Delete
        </button>
      </div>
    </div>
  );
}
