import { Calendar, MapPin, ChevronDown, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface Activity {
	id: number;
	title: string;
	image: string;
	time: string;
	cost?: string;
	distance: string;
	buttonText: string;
	buttonVariant: "outline" | "default";
}

// Day 1 Activities Data
const day1Activities: Activity[] = [
	{
		id: 1,
		title: "Landing in Cape Town",
		image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=80&q=80",
		time: "11:45 AM",
		distance: "0.41 mi",
		buttonText: "Details ↗",
		buttonVariant: "outline",
	},
	{
		id: 2,
		title: "Light Arrival Lunch at The Loading Bay",
		image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=80&q=80",
		time: "12:30 PM - 2:00 PM",
		cost: "Est: ₦24,000 / R300",
		distance: "0.41 mi",
		buttonText: "Reserve ↗",
		buttonVariant: "outline",
	},
	{
		id: 3,
		title: "Stay at Mount Nelson Hotel",
		image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=80&q=80",
		time: "Check-in 3:00 PM (3 nights)",
		cost: "Est: ₦850,000 / $7,150",
		distance: "0.41 mi",
		buttonText: "Book",
		buttonVariant: "default",
	},
	{
		id: 4,
		title: "Cultural Walk at Bo-Kaap Walk + Museum Tour",
		image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=80&q=80",
		time: "4:00 PM - 5:30 PM",
		cost: "Est: ₦36,000 / R450",
		distance: "0.41 mi",
		buttonText: "Link ↗",
		buttonVariant: "outline",
	},
	{
		id: 5,
		title: "Dinner at FYN Restaurant",
		image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=80&q=80",
		time: "7:00 PM - 9:30 PM",
		cost: "Est: ₦72,000 / R900",
		distance: "0.41 mi",
		buttonText: "Reserve ↗",
		buttonVariant: "outline",
	},
	{
		id: 6,
		title: "Optional Nightcap at GINO Gin Bar",
		image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=80&q=80",
		time: "9:30 PM",
		cost: "Est: ₦16,000 / R200",
		distance: "0.41 mi",
		buttonText: "Reserve ↗",
		buttonVariant: "outline",
	},
];

// Day 2 Activities Data
const day2Activities: Activity[] = [
	{
		id: 1,
		title: "Staying at Mount Nelson Hotel",
		image: "",
		time: "",
		distance: "0.41 mi",
		buttonText: "•••",
		buttonVariant: "outline",
	},
];

export default function ItineraryTab({ title }: { title: string }) {
	const [expandedDay, setExpandedDay] = useState<number | null>(1);
	const [distanceUnits, setDistanceUnits] = useState<Record<number, 'mi' | 'km'>>({});

	const toggleDay = (day: number) => {
		setExpandedDay(expandedDay === day ? null : day);
	};

	const getDistanceUnit = (activityId: number) => {
		return distanceUnits[activityId] || 'mi';
	};

	const setDistanceUnit = (activityId: number, unit: 'mi' | 'km') => {
		setDistanceUnits(prev => ({
			...prev,
			[activityId]: unit
		}));
	};

	const convertDistance = (distance: string, unit: 'mi' | 'km') => {
		const value = parseFloat(distance);
		if (isNaN(value)) return distance;

		if (unit === 'km') {
			// Convert miles to kilometers (1 mile = 1.60934 km)
			return `${(value * 1.60934).toFixed(2)} km`;
		}
		return `${value} mi`;
	};

	return (
		<div className="flex-1 overflow-y-auto p-6">
			<div className="mb-4">
				<h3 className="text-sm font-semibold text-gray-900">{title}</h3>
			</div>

			{/* Day 1 */}
			<div className="mb-6">
				<button
					onClick={() => toggleDay(1)}
					className="w-full flex items-center gap-2 p-0 mb-4"
				>
					<div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
						<ChevronDown className={`w-5 h-5 transition-transform text-gray-600 ${expandedDay === 1 ? 'rotate-180' : ''}`} />
					</div>
					<span className="text-sm font-semibold text-gray-900">Day 1 Arrival & Cultural Exploration</span>
					<span className="text-xs text-gray-500">Thu, Aug 18</span>
				</button>

				{expandedDay === 1 && (
					<div className="space-y-0">
						{day1Activities.map((activity, index) => (
							<div key={activity.id} className="relative ">
								<div className="flex gap-3 p-3 bg-white border border-gray-200 rounded-lg shadown-sm hover:shadow-md transition-shadow">
									{activity.image ? (
										<img
											src={activity.image}
											alt={activity.title}
											className="w-14 h-14 rounded-lg object-cover"
										/>
									) : (
										<div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
											<MapPin className="w-6 h-6 text-gray-400" />
										</div>
									)}
									<div className="flex items-center gap-2 w-full">
										<div className="flex flex-col gap-1 w-full">
											<h4 className="text-sm font-semibold text-gray-900 mb-1">{activity.title}</h4>
											{activity.time && (
												<div className="flex items-center gap-2 text-xs text-gray-500">
													<Clock className="w-3 h-3" />
													<span className="font-medium">{activity.time}</span>
													{activity.cost && <span className="bg-[#FFF9F5] px-2 py-0.5 rounded text-gray-600">{activity.cost}</span>}
												</div>
											)}
										</div>
										<Button
											variant={activity.buttonVariant}
											size="sm"
											className={`text-xs h-8 shrink-0 rounded-full border border-gray-300 ${activity.buttonVariant === "default"
												? "bg-black text-white hover:bg-gray-800"
												: ""
												}`}
										>
											{activity.buttonText}
										</Button>
									</div>
								</div>
								{/* Distance with dotted line - show for all except last item */}
								{index < day1Activities.length - 1 && (
									<div className="relative pl-6 py-3">
										<div className="absolute left-0 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-300 ml-4" />
										<Popover modal={false}>
											<PopoverTrigger asChild>
												<button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer">
													<span>{convertDistance(activity.distance, getDistanceUnit(activity.id))}</span>
													<ChevronDown className="w-3 h-3" />
												</button>
											</PopoverTrigger>
											<PopoverContent className="w-32 p-1 z-[10000]" align="start" sideOffset={8}>
												<div className="flex flex-col">
													<button
														onClick={() => setDistanceUnit(activity.id, 'mi')}
														className={`px-3 py-2 text-sm text-left rounded hover:bg-gray-100 transition-colors ${getDistanceUnit(activity.id) === 'mi' ? 'bg-gray-100 font-medium' : ''
															}`}
													>
														Miles
													</button>
													<button
														onClick={() => setDistanceUnit(activity.id, 'km')}
														className={`px-3 py-2 text-sm text-left rounded hover:bg-gray-100 transition-colors ${getDistanceUnit(activity.id) === 'km' ? 'bg-gray-100 font-medium' : ''
															}`}
													>
														Kilometers
													</button>
												</div>
											</PopoverContent>
										</Popover>
									</div>
								)}
							</div>
						))}

						{/* Add Button */}
						<div className="py-5">
							<Button
								variant="outline"
								className="flex items-center gap-1 px-2 py-1 h-auto rounded-full border-gray-200 hover:shadow-sm transition-all group"
							>
								<Plus className="w-4 h-4 text-[#FF5A1F] stroke-[3]" />
								<span className="text-[#FF5A1F] text-sm font-medium">Add</span>
							</Button>
						</div>
					</div>
				)}
			</div>

			{/* Day 2 */}
			<div className="mb-4">
				<button
					onClick={() => toggleDay(2)}
					className="w-full flex items-center gap-2 p-0 mb-4"
				>
					<div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
						<ChevronDown className={`w-5 h-5 transition-transform text-gray-600 ${expandedDay === 2 ? 'rotate-180' : ''}`} />
					</div>
					<span className="text-sm font-semibold text-gray-900">Day 2 Nature & Design</span>
					<span className="text-xs text-gray-500">Fri, Mar 20</span>
				</button>

				{expandedDay === 2 && (
					<div className="space-y-0">
						{day2Activities.map((activity, index) => (
							<div key={activity.id} className="relative">
								<div className="flex gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
									{activity.image ? (
										<img
											src={activity.image}
											alt={activity.title}
											className="w-14 h-14 rounded-lg object-cover"
										/>
									) : (
										<div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
											<MapPin className="w-6 h-6 text-gray-400" />
										</div>
									)}
									<div className="flex-1 min-w-0">
										<h4 className="text-sm font-semibold text-gray-900 mb-1">{activity.title}</h4>
										{activity.time && (
											<div className="flex items-center gap-2 text-xs text-gray-500">
												<Calendar className="w-3 h-3" />
												<span>{activity.time}</span>
												{activity.cost && <span>{activity.cost}</span>}
											</div>
										)}
									</div>
									<Button
										variant={activity.buttonVariant}
										size="sm"
										className="text-xs h-8 shrink-0 rounded-full border border-gray-300"
									>
										{activity.buttonText}
									</Button>
								</div>
								{index < day2Activities.length - 1 && (
									<div className="relative pl-6 py-3">
										<div className="absolute left-0 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-300 ml-4" />
										<div className="flex items-center gap-1 text-xs text-gray-500">
											<MapPin className="w-3 h-3" />
											<span>{activity.distance} ▼</span>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
