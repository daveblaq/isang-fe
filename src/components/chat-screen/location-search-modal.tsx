import { useState } from "react";
import { X, Search } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface LocationSearchModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const TRENDING_SPOTS = [
	{
		city: "Cape Town",
		country: "South Africa",
		flag: "🇿🇦",
		image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b0?auto=format&fit=crop&w=100&q=80",
	},
	{
		city: "Bali",
		country: "Indonesia",
		flag: "🇮🇩",
		image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=100&q=80",
	},
	{
		city: "Tokyo",
		country: "Japan",
		flag: "🇯🇵",
		image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=100&q=80",
	},
	{
		city: "Santorini",
		country: "Greece",
		flag: "🇬🇷",
		image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=100&q=80",
	},
	{
		city: "Dubai",
		country: "United Arab Emirates",
		flag: "🇦🇪",
		image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=100&q=80",
	},
	{
		city: "Kyoto",
		country: "Japan",
		flag: "🇯🇵",
		image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=100&q=80",
	},
	{
		city: "Lagos",
		country: "Nigeria",
		flag: "🇳🇬",
		image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=100&q=80",
	},
];

export default function LocationSearchModal({
	isOpen,
	onOpenChange,
}: LocationSearchModalProps) {
	const [searchQuery, setSearchQuery] = useState("Ba");

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[699px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
				<DialogHeader className="p-6 pb-4 flex flex-row items-center justify-between border-b border-gray-100">
					<div className="flex items-center gap-2">
						<span className="text-xl">📍</span>
						<DialogTitle className="text-2xl font-medium font-ibm">Where are you going?</DialogTitle>
					</div>
				</DialogHeader>

				<div className="p-6 pt-4 space-y-6">
					<div className="relative flex items-center gap-2">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<Input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 pr-10 h-12 rounded-full border-gray-600 focus-visible:ring-[#FF5A1F]"
							/>
							{searchQuery && (
								<button
									onClick={() => setSearchQuery("")}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									<X className="w-4 h-4" />
								</button>
							)}
						</div>
						<button className="w-12 h-12 flex items-center justify-center bg-black rounded-full text-white">
							<Search className="w-5 h-5" />
						</button>
					</div>

					<div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3">
						<div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-300">
							<Search className="w-6 h-6" />
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium text-gray-900">No exact results for '{searchQuery}.'</p>
							<p className="text-sm text-gray-500">Try refining your search or explore trending spots below.</p>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-sm font-bold text-gray-900">Trending spots</h3>
						<div className="border border-gray-200 rounded-xl overflow-hidden">
							<div className="max-h-[300px] overflow-y-auto no-scrollbar">
								{TRENDING_SPOTS.map((spot, idx) => (
									<div
										key={idx}
										className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
									>
										<div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
											<img src={spot.image} alt={spot.city} className="w-full h-full object-cover" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-bold text-gray-900">{spot.city}</p>
											<p className="text-xs text-gray-500 flex items-center gap-1">
												<span>{spot.flag}</span>
												{spot.country}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
