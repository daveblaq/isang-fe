import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BudgetOption {
	id: string;
	label: string;
	icon: string;
}

const BUDGET_OPTIONS: BudgetOption[] = [
	{ id: "any", label: "Any budget", icon: "🌍" },
	{ id: "on-a-budget", label: "On a budget", icon: "💰" },
	{ id: "sensibly-priced", label: "Sensibly priced", icon: "💵" },
	{ id: "upscale", label: "Upscale", icon: "💳" },
	{ id: "luxury", label: "Luxury", icon: "💎" },
];

interface BudgetModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	initialBudget?: string;
	onSave: (budget: string) => void;
}

export default function BudgetModal({
	isOpen,
	onOpenChange,
	initialBudget,
	onSave,
}: BudgetModalProps) {
	const [selectedId, setSelectedId] = useState(() => {
		const found = BUDGET_OPTIONS.find((opt) => opt.label === initialBudget);
		return found ? found.id : "any";
	});

	const selectedOption = BUDGET_OPTIONS.find((opt) => opt.id === selectedId);

	const handleSave = () => {
		if (selectedOption) {
			onSave(selectedOption.label);
		}
		onOpenChange(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
				<DialogHeader className="p-6 pb-4 flex flex-row items-center justify-between border-b border-gray-100">
					<div className="flex items-center gap-2">
						<span className="text-xl">💰</span>
						<DialogTitle className="text-2xl font-medium font-ibm">What's your budget?</DialogTitle>
					</div>
				</DialogHeader>

				<div className="p-6 space-y-3">
					{BUDGET_OPTIONS.map((option) => (
						<div
							key={option.id}
							onClick={() => setSelectedId(option.id)}
							className={cn(
								"flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
								selectedId === option.id
									? "border-[#FF5A1F] bg-[#FFF9F5]"
									: "border-gray-100 hover:border-gray-200 bg-white"
							)}
						>
							<div className="flex items-center gap-4">
								<span className="text-2xl">{option.icon}</span>
								<span className="text-base font-medium text-gray-900">{option.label}</span>
							</div>
							<div
								className={cn(
									"w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
									selectedId === option.id
										? "border-[#FF5A1F]"
										: "border-gray-300"
								)}
							>
								{selectedId === option.id && (
									<div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]" />
								)}
							</div>
						</div>
					))}
				</div>

				<div className="flex items-center justify-between p-6 border-t border-gray-100 mt-2">
					<div className="flex items-center gap-2 text-sm font-medium text-gray-900">
						{selectedOption && (
							<>
								<span>{selectedOption.icon}</span>
								{selectedOption.label}
							</>
						)}
					</div>
					<Button
						onClick={handleSave}
						className="bg-[#FF5A1F] hover:bg-[#ff7846] text-white px-8 rounded-xl font-medium h-12"
					>
						Save budget
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
