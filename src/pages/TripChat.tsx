import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Share2, MapPin } from "lucide-react";
import DashLayout from "@/components/layouts/sidebar-layout";
import InputArea from "@/components/chat-screen/input-area";
import MapView from "@/components/chat-screen/map-view";
import { STAYS, FOOD, CHECKPOINTS } from "@/data/trip-data";


export default function TripChat() {
	const location = useLocation();
	const [isMapOpen, setIsMapOpen] = useState(false);
	const [isMapFull, setIsMapFull] = useState(false);

	// Extract state. Default to Cape Town if accessed directly for demo purposes
	const { destination = "Cape Town", budget = "46.5M", dates = "Aug 18-21", days = "3" } = location.state || {};

	const headerContent = (
		<div className="flex flex-1 items-center justify-between gap-4 relative w-full">
			{/* Left Side - Title */}
			<div className="flex items-center gap-2">
				<h1 className="text-xl font-bold text-gray-900">{destination} Escape</h1>
				<ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
			</div>

			{/* Center - Pill Info */}
			<div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm whitespace-nowrap">
				<span>{destination}</span>
				<span className="mx-2 text-gray-300">|</span>
				<span>{dates}</span>
				<span className="mx-2 text-gray-300">|</span>
				<span>Travellers</span>
				<span className="mx-2 text-gray-300">|</span>
				<span>₦ {budget}</span>
			</div>

			{/* Right Side - Actions */}
			<div className="flex items-center gap-2">
				<Button variant="outline" className="rounded-full gap-2 h-9 text-sm border border-gray-300">
					<Share2 className="w-4 h-4" />
					Share
				</Button>
				<Button
					variant="outline"
					className="rounded-full gap-2 h-9 text-sm border border-gray-300"
					onClick={() => {
						if (isMapOpen) setIsMapFull(false);
						setIsMapOpen(!isMapOpen);
					}}
				>
					<MapPin className="w-4 h-4" />
					Checkpoints
					<span className="bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">{CHECKPOINTS.length}</span>
				</Button>
			</div>
		</div>
	);

	return (
		<DashLayout
			headerContent={headerContent}
			mainClassName="flex-1 flex flex-col overflow-hidden bg-white"
		>
			<div className="flex flex-1 w-full overflow-hidden relative">
				{/* Chat Area - Left side */}
				<div
					className={`flex flex-col h-full  transition-all duration-500 ease-in-out ${isMapOpen ? (isMapFull ? 'w-0 opacity-0 overflow-hidden' : 'w-1/2') : 'w-[75%] mx-auto'
						}`}
				>
					{/* Messages - Scrollable */}
					<div className="flex-1 overflow-y-auto no-scrollbar space-y-8 p-4 md:p-6 pb-4">
						{/* User Message */}
						<div className="flex justify-end pt-4">
							<div className="bg-[#FFF9F5] text-gray-900 px-5 py-3 rounded-[20px] rounded-tr-sm max-w-[80%] md:max-w-[70%] text-sm md:text-base leading-relaxed">
								I am going to {destination}, with ₦ {budget}, starting {dates}, for {days} days
							</div>
						</div>

						{/* AI Response */}
						<div className="flex gap-4 items-start max-w-full">
							<div className="w-[32px] h-[32px] flex items-center justify-center flex-shrink-0 mt-1">
								<img src="/logo.svg" alt="AI" className="w-full h-full object-contain opacity-80" onError={(e) => e.currentTarget.src = 'https://placehold.co/20x20?text=AI'} />
							</div>

							<div className="flex-1 bg-[#F9FAFB] p-4 md:p-6 rounded-[20px] rounded-tl-sm space-y-8 border border-[#EDF0F6]">
								<div className="prose text-gray-800 text-sm md:text-base leading-relaxed max-w-none">
									You're heading to {destination} from {dates} for {days} days, with a budget of ₦{budget} (roughly R140,000). That's more than enough for a stylish city-meets-nature getaway. Here's what fits your vibe 👇🏾
								</div>

								{/* Stays Section */}
								<div className="space-y-4 bg-white border border-[#EDF0F6] p-4 rounded-[12px]">
									<div className="flex items-center justify-between">
										<h3 className="text-base font-bold flex items-center gap-2">
											🏨 Stays
										</h3>
										<Button variant="outline" className="text-[#FF5A1F] border-[#FF5A1F] hover:bg-[#FFF5F1] hover:text-[#FF5A1F] rounded-full h-8 text-xs font-medium">
											See more stays
										</Button>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										{STAYS.map((stay) => (
											<div key={stay.id} className="group cursor-pointer space-y-2">
												<div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
													<img src={stay.image} alt={stay.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
												</div>
												<h4 className="text-sm font-medium text-gray-500 line-clamp-2 leading-snug">
													{stay.title}
												</h4>
											</div>
										))}
									</div>

									<div className="text-right">
										<span className="text-xs text-blue-500 underline cursor-pointer hover:text-blue-600 italic">
											Sources ~ Booking.com, agoda, Reddit
										</span>
									</div>
								</div>

								{/* Food Section */}
								<div className="space-y-4 bg-white border border-[#EDF0F6] p-4 rounded-[12px]">
									<div className="flex items-center justify-between">
										<h3 className="text-base font-bold flex items-center gap-2">
											🥘 Food & Restaurants
										</h3>
										<Button variant="outline" className="text-[#FF5A1F] border-[#FF5A1F] hover:bg-[#FFF5F1] hover:text-[#FF5A1F] rounded-full h-8 text-xs font-medium">
											Explore food spots
										</Button>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										{FOOD.map((item) => (
											<div key={item.id} className="group cursor-pointer space-y-2">
												<div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
													<img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
												</div>
												<h4 className="text-sm font-medium text-gray-500 line-clamp-2 leading-snug">
													{item.title}
												</h4>
											</div>
										))}
									</div>

									<div className="text-right">
										<span className="text-xs text-blue-500 underline cursor-pointer hover:text-blue-600 italic">
											Sources ~ Booking.com, agoda, Reddit
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* User Message - Requesting Itinerary */}
						<div className="flex justify-end">
							<div className="bg-[#FFF9F5] text-gray-900 px-5 py-3 rounded-[20px] rounded-tr-sm max-w-[80%] md:max-w-[70%] text-sm md:text-base leading-relaxed">
								Yes please, draft an itinerary for me
							</div>
						</div>

						{/* AI Response - Draft Itinerary */}
						<div className="flex gap-4 items-start max-w-full">
							<div className="w-[32px] h-[32px] flex items-center justify-center flex-shrink-0 mt-1">
								<img src="/logo.svg" alt="AI" className="w-full h-full object-contain opacity-80" onError={(e) => e.currentTarget.src = 'https://placehold.co/20x20?text=AI'} />
							</div>

							<div className="flex-1 space-y-6">
								{/* Day 1 */}
								<div className="space-y-3">
									<div className="bg-[#E8EAED] px-4 py-2 rounded-lg">
										<h3 className="font-semibold text-sm text-gray-900">Day 1: Arrival & Oceanfront Welcome</h3>
									</div>

									<div className="bg-[#F9FAFB] p-4 rounded-lg border border-[#EDF0F6] space-y-3 text-sm text-gray-700 leading-relaxed">
										<p>Welcome to Cape Town — where mountains meet the sea.</p>
										<p>Arrive at Cape Town International Airport, and head to your boutique accommodation at The Marly Boutique Hotel & Spa, perched above Camps Bay Beach with sweeping views of the Atlantic.</p>
										<p>After settling in, take a sunset walk along Camps Bay Promenade and grab dinner at Paranga — a stylish beachfront restaurant serving local seafood with a touch of glam.</p>

										{/* Relaxation Tip */}
										<div className="bg-[#E8F4FD] border border-[#B3D9F2] rounded-lg p-3 mt-3">
											<div className="flex items-start gap-2">
												<span className="text-xs font-medium text-[#404040] bg-white px-2 py-0.5 rounded-full border border-gray-300">Relaxation Tip</span>
											</div>
											<p className="text-sm text-gray-700 mt-2">Order a glass of South African Sauvignon Blanc while watching the sun dip behind the Twelve Apostles</p>
										</div>

										{/* Cost Estimate */}
										<div className="bg-[#FCE8F3] border border-[#F8BBD0] rounded-lg p-3 mt-3">
											<div className="flex items-start gap-2">
												<span className="text-xs font-medium text-[#404040] bg-white px-2 py-0.5 rounded-full border border-gray-300">Estimated Spend as of 1st 12.2025</span>
											</div>
											<p className="text-sm font-semibold text-gray-900 mt-2">₦1.8M <span className="font-normal text-gray-600">— mostly on hotel stay, airport transfer, and dinner.</span></p>
										</div>
									</div>
								</div>

								{/* Day 2 */}
								<div className="space-y-3">
									<div className="bg-[#E8EAED] px-4 py-2 rounded-lg">
										<h3 className="font-semibold text-sm text-gray-900">Day 2: Table Mountain, Culture & Local Flavours</h3>
									</div>

									<div className="bg-[#F9FAFB] p-4 rounded-lg border border-[#EDF0F6] space-y-3 text-sm text-gray-700 leading-relaxed">
										<p>Rise early for a cable car ride up Table Mountain — weather permitting. The views are iconic, and it's a must-do.</p>
										<p>By noon, head to the Bo-Kaap neighborhood to explore its colorful streets and learn about Cape Malay culture. Join a cooking class to try your hand at making traditional bobotie or samoosas</p>

										{/* Relaxation Tip */}
										<div className="bg-[#E8F4FD] border border-[#B3D9F2] rounded-lg p-3 mt-3">
											<div className="flex items-start gap-2">
												<span className="text-xs font-medium text-[#404040] bg-white px-2 py-0.5 rounded-full border border-gray-300">Relaxation Tip</span>
											</div>
											<p className="text-sm text-gray-700 mt-2">Take a leisurely stroll through the Company's Garden before heading back</p>
										</div>
									</div>
								</div>

								{/* Day 3 */}
								<div className="space-y-3">
									<div className="bg-[#E8EAED] px-4 py-2 rounded-lg">
										<h3 className="font-semibold text-sm text-gray-900">Day 3: Penguins, Wine & Departure Prep</h3>
									</div>

									<div className="bg-[#F9FAFB] p-4 rounded-lg border border-[#EDF0F6] space-y-3 text-sm text-gray-700 leading-relaxed">
										<p>Start your day with a visit to Boulders Beach to see the African penguins — they're adorable and surprisingly chill.</p>
										<p>On your way back, stop at a Constantia wine estate (Klein Constantia or Groot Constantia) for a tasting session. Pair your wine with a cheese platter and soak in the vineyard views.</p>
										<p>Return to your hotel, freshen up, and enjoy a final dinner at The Pot Luck Club — a trendy spot with tapas-style dishes and panoramic city views.</p>

										{/* Relaxation Tip */}
										<div className="bg-[#E8F4FD] border border-[#B3D9F2] rounded-lg p-3 mt-3">
											<div className="flex items-start gap-2">
												<span className="text-xs font-medium text-[#404040] bg-white px-2 py-0.5 rounded-full border border-gray-300">Relaxation Tip</span>
											</div>
											<p className="text-sm text-gray-700 mt-2">Book a sunset spa session at your hotel before dinner</p>
										</div>

										{/* Cost Estimate */}
										<div className="bg-[#FCE8F3] border border-[#F8BBD0] rounded-lg p-3 mt-3">
											<div className="flex items-start gap-2">
												<span className="text-xs font-medium text-[#404040] bg-white px-2 py-0.5 rounded-full border border-gray-300">Total Trip Estimate</span>
											</div>
											<p className="text-sm font-semibold text-gray-900 mt-2">₦6.5M <span className="font-normal text-gray-600">— including accommodation, activities, dining, and transport.</span></p>
										</div>
										{/* Show or Edit Itinerary Button */}
										<div className="mt-10">
											<Button variant="outline" className="py-1.5 rounded-full text-xs text-black px-2 font-medium border border-gray-300">
												Show or edit itinerary
											</Button>
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>

					{/* Input Area - Fixed at bottom */}
					<InputArea />
				</div>

				{/* Map - Fixed sibling on right half */}
				<MapView
					isMapOpen={isMapOpen}
					isMapFull={isMapFull}
					setIsMapFull={setIsMapFull}
					checkpoints={CHECKPOINTS}
				/>
			</div>
		</DashLayout>
	);
}
