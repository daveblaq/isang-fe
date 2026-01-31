import { X, Edit, MapPin, RotateCcw, RotateCw, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ItineraryTab from "./itinerary-tab";
import BookingsTab from "./bookings-tab";

interface ItineraryDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ItineraryDrawer({ isOpen, onClose }: ItineraryDrawerProps) {
	const [isFullWidth, setIsFullWidth] = useState(false);

	return (
		<Drawer open={isOpen} onOpenChange={onClose}>
			<DrawerContent
				className="transition-all duration-500 ease-in-out"
				style={{ width: isFullWidth ? '100%' : '43%' }}
			>
				<div className="flex flex-col h-full overflow-hidden">
					{/* Header Section (Static) */}
					<div className="p-6 pb-0 flex-none">
						{/* Top Actions */}
						<div className="flex items-center justify-between mb-6">
							<button
								onClick={() => setIsFullWidth(!isFullWidth)}
								className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
							>
								{isFullWidth ? (
									<ChevronsRight className="w-5 h-5 text-gray-700" />
								) : (
									<ChevronsLeft className="w-5 h-5 text-gray-700" />
								)}
							</button>
							<div className="flex items-center gap-2">
								<Button variant="outline" className="rounded-full h-10 px-4 border border-gray-300 text-black">
									Invite
								</Button>
								<button className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors">
									<span className="text-black">•••</span>
								</button>
								<DrawerClose asChild>
									<button className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors">
										<X className="w-5 h-5 text-black" />
									</button>
								</DrawerClose>
							</div>
						</div>

						{/* Title */}
						<div className="flex items-center gap-2 mb-4">
							<h2 className="text-3xl font-bold text-gray-900">Cape Town Escape</h2>
							<button className="text-gray-400 hover:text-gray-600">
								<Edit className="w-5 h-5" />
							</button>
						</div>

						{/* Trip Info Pill */}
						<div className="flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm whitespace-nowrap w-fit mb-6">
							<span>Cape Town</span>
							<span className="mx-2 text-gray-300">|</span>
							<span>Aug 18-21</span>
							<span className="mx-2 text-gray-300">|</span>
							<span>Travellers</span>
							<span className="mx-2 text-gray-300">|</span>
							<span>₦ 6,500,000</span>
						</div>
					</div>

					{/* Content Section (with Tabs and Scrolling) */}
					<Tabs defaultValue="itinerary" className="flex-1 flex flex-col overflow-hidden">
						<div className="px-6 flex items-center border-b border-gray-200 flex-none">
							<TabsList className="bg-transparent h-auto p-0 gap-6">
								<TabsTrigger
									value="itinerary"
									className="pb-3 px-1 text-sm font-semibold rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 data-[state=inactive]:text-gray-500 data-[state=inactive]:border-b-0"
								>
									Itinerary
								</TabsTrigger>
								<TabsTrigger
									value="calendar"
									className="pb-3 px-1 text-sm font-medium rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 data-[state=inactive]:text-gray-500 data-[state=inactive]:border-b-0 hover:text-gray-900"
								>
									Calendar
								</TabsTrigger>
								<TabsTrigger
									value="bookings"
									className="pb-3 px-1 text-sm font-medium rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 data-[state=inactive]:text-gray-500 data-[state=inactive]:border-b-0 hover:text-gray-900"
								>
									Bookings
								</TabsTrigger>
							</TabsList>
							<div className="ml-auto flex items-center gap-2 pb-3">
								<button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border border-gray-300">
									<RotateCcw className="w-4 h-4 text-gray-600" />
								</button>
								<button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors border border-gray-300">
									<RotateCw className="w-4 h-4 text-gray-600" />
								</button>
								<Button variant="outline" className="rounded-full h-8 px-3 text-xs border border-gray-300">
									<MapPin className="w-3 h-3 mr-1" />
									Map
								</Button>
							</div>
						</div>

						<TabsContent
							value="itinerary"
							className="flex-1 overflow-hidden focus-visible:outline-none data-[state=active]:flex data-[state=active]:flex-col m-0 p-0"
						>
							<ItineraryTab title="4 days itinerary · Aug 18 - 21" />
						</TabsContent>

						<TabsContent value="calendar" className="flex-1 overflow-y-auto p-6">
							<div className="flex items-center justify-center h-full text-gray-500">
								Calendar View Coming Soon
							</div>
						</TabsContent>

						<TabsContent value="bookings" className="flex-1 overflow-hidden focus-visible:outline-none data-[state=active]:flex data-[state=active]:flex-col m-0 p-0">
							<BookingsTab />
						</TabsContent>
					</Tabs>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
