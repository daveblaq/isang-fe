import Text from "@/components/ui/text";

export default function AccountTab() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <Text variant="h5" className="text-xl font-semibold text-slate-900">
        Account
      </Text>
      <Text variant="span" className="text-sm text-slate-500">
        Update email, phone number, and secure account credentials.
      </Text>
    </div>
  );
}
