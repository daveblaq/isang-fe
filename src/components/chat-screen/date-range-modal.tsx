import { useState, useMemo } from "react";
import { format } from "date-fns";
import { type DateRange } from "react-day-picker";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RangeCalendar } from "@/components/ui/range-calender";

interface DateRangeModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	initialDateRange?: DateRange;
	onSave: (range: DateRange | undefined) => void;
}

export default function DateRangeModal({
	isOpen,
	onOpenChange,
	initialDateRange,
	onSave,
}: DateRangeModalProps) {
	const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);

	const calculatedDays = useMemo(() => {
		if (dateRange?.from && dateRange?.to) {
			const diffTime = Math.abs(
				dateRange.to.getTime() - dateRange.from.getTime()
			);
			return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
		}
		return 0;
	}, [dateRange]);

	const formatDateRangeSummary = () => {
		if (!dateRange?.from || !dateRange?.to) return "";
		const fromStr = format(dateRange.from, "MMM d");
		const toStr = format(dateRange.to, "MMM d");
		return `${calculatedDays} days - ${fromStr} - ${toStr}`;
	};

	const handleClear = () => {
		setDateRange(undefined);
	};

	const handleSave = () => {
		onSave(dateRange);
		onOpenChange(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[850px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
				<DialogHeader className="p-6 pb-4 flex flex-row items-center justify-between border-b border-gray-100">
					<div className="flex items-center gap-2">
						<span className="text-xl">⏳</span>
						<DialogTitle className="text-2xl font-medium font-ibm">When are you going?</DialogTitle>
					</div>
				</DialogHeader>

				<div className="p-6 md:p-8">
					<div className="flex justify-center">
						<RangeCalendar
							dateRange={dateRange}
							onSelect={setDateRange}
							numberOfMonths={2}
							className="border-0 shadow-none w-full"
						/>
					</div>
				</div>

				<div className="flex items-center justify-between p-6 border-t border-gray-100">
					<div className="text-sm font-medium text-gray-900">
						{formatDateRangeSummary() || "Select your trip dates"}
					</div>
					<div className="flex items-center gap-3">
						<Button
							variant="ghost"
							onClick={handleClear}
							className="text-gray-500 hover:text-gray-900 font-medium"
						>
							Clear
						</Button>
						<Button
							onClick={handleSave}
							disabled={!dateRange?.from || !dateRange?.to}
							className="bg-[#FF5A1F] hover:bg-[#ff7846] text-white px-6 rounded-xl font-medium h-12"
						>
							Save date
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
