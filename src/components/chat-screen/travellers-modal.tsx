import { useState, useMemo } from "react";
import { Plus, Minus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TravellersModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	initialCounts?: {
		adults: number;
		children: number;
		infants: number;
		pets: number;
	};
	onSave: (counts: { adults: number; children: number; infants: number; pets: number }) => void;
}

export default function TravellersModal({
	isOpen,
	onOpenChange,
	initialCounts = { adults: 1, children: 0, infants: 0, pets: 0 },
	onSave,
}: TravellersModalProps) {
	const [counts, setCounts] = useState(initialCounts);

	const updateCount = (key: keyof typeof counts, delta: number) => {
		setCounts((prev) => ({
			...prev,
			[key]: Math.max(0, prev[key] + delta),
		}));
	};

	const totalTravellers = counts.adults + counts.children;

	const summary = useMemo(() => {
		const parts = [];
		if (counts.adults > 0) parts.push("Adult");
		if (counts.children > 0) parts.push("Child");

		let text = `${totalTravellers} traveller${totalTravellers !== 1 ? 's' : ''}`;
		if (parts.length > 0) {
			text += ` - ${parts.join(" & ")}`;
		}
		return text;
	}, [counts, totalTravellers]);

	const handleClear = () => {
		setCounts({ adults: 1, children: 0, infants: 0, pets: 0 });
	};

	const handleSave = () => {
		onSave(counts);
		onOpenChange(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
				<DialogHeader className="p-6 pb-4 flex flex-row items-center justify-between border-b border-gray-100">
					<div className="flex items-center gap-2">
						<span className="text-xl">👥</span>
						<DialogTitle className="text-2xl font-medium font-ibm">Who is travelling?</DialogTitle>
					</div>
				</DialogHeader>

				<div className="p-6 space-y-6">
					{/* Adults */}
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="text-sm font-bold text-gray-900">Adults</p>
							<p className="text-xs text-gray-500">Ages 13 and above</p>
						</div>
						<div className="flex items-center gap-4">
							<button
								onClick={() => updateCount("adults", -1)}
								className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
								disabled={counts.adults <= 1}
							>
								<Minus className="w-4 h-4" />
							</button>
							<span className="text-sm font-medium w-4 text-center">{counts.adults}</span>
							<button
								onClick={() => updateCount("adults", 1)}
								className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Children */}
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="text-sm font-bold text-gray-900">Children</p>
							<p className="text-xs text-gray-500">Ages 2 -12</p>
						</div>
						<div className="flex items-center gap-4">
							<button
								onClick={() => updateCount("children", -1)}
								className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
								disabled={counts.children <= 0}
							>
								<Minus className="w-4 h-4" />
							</button>
							<span className="text-sm font-medium w-4 text-center">{counts.children}</span>
							<button
								onClick={() => updateCount("children", 1)}
								className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Infants */}
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="text-sm font-bold text-gray-900">Infants</p>
							<p className="text-xs text-gray-500">Under 2</p>
						</div>
						<div className="flex items-center gap-4">
							<button
								onClick={() => updateCount("infants", -1)}
								className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
								disabled={counts.infants <= 0}
							>
								<Minus className="w-4 h-4" />
							</button>
							<span className="text-sm font-medium w-4 text-center">{counts.infants}</span>
							<button
								onClick={() => updateCount("infants", 1)}
								className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Pets */}
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="text-sm font-bold text-gray-900">Pets</p>
							<p className="text-xs text-gray-500 underline decoration-gray-300">Bringing a service animal</p>
						</div>
						<div className="flex items-center gap-4">
							<button
								onClick={() => updateCount("pets", -1)}
								className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
								disabled={counts.pets <= 0}
							>
								<Minus className="w-4 h-4" />
							</button>
							<span className="text-sm font-medium w-4 text-center">{counts.pets}</span>
							<button
								onClick={() => updateCount("pets", 1)}
								className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between p-6 border-t border-gray-100 mt-2">
					<div className="text-sm font-medium text-gray-900">
						{summary}
					</div>
					<div className="flex items-center gap-3">
						<Button
							variant="ghost"
							onClick={handleClear}
							className="text-gray-500 hover:text-gray-900 font-medium h-auto p-0"
						>
							Clear
						</Button>
						<Button
							onClick={handleSave}
							className="bg-[#FF5A1F] hover:bg-[#ff7846] text-white px-6 rounded-xl font-medium h-12"
						>
							Save travellers
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
