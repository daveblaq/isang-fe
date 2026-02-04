import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import ChatInput from "@/components/common/chat-input";
import { useChat } from "@/hooks/use-chat";
import { useSignupModal } from "@/hooks/use-signup-modal";

const SUGGESTIONS = [
	{
		id: 1,
		title: "Explore hidden gems",
		description: "Discover secret waterfalls and local villages in Bali that aren't in the guidebooks.",
		color: "border-[#C7E3E5]",
		bg: "bg-white",
	},
	{
		id: 2,
		title: "Personalized hotel picks",
		description: "Find boutique stays in Paris that offer stunning Eiffel Tower views within my budget.",
		color: "border-[#FFE7CC]",
		bg: "bg-white",
	},
	{
		id: 3,
		title: "Cultural food tour",
		description: "Where can I find the most authentic street food in Tokyo, specifically for world-class ramen?",
		color: "border-[#D1D5DB]",
		bg: "bg-white",
	},
	{
		id: 4,
		title: "Oceanfront getaways",
		description: "Suggest the best secluded beaches in Greece for a peaceful summer vacation away from the crowds.",
		color: "border-[#C7E3E5]",
		bg: "bg-white",
	},
	{
		id: 5,
		title: "Mountain adventures",
		description: "Plan a 3-day hiking itinerary through the Swiss Alps with scenic overnight stop suggestions.",
		color: "border-[#FFE7CC]",
		bg: "bg-white",
	},
	{
		id: 6,
		title: "Art & Architecture",
		description: "Explore the best of Gaudí's architecture and hidden art galleries in the Gothic Quarter of Barcelona.",
		color: "border-[#D1D5DB]",
		bg: "bg-white",
	},
];

export default function Home() {
	const [activePage, setActivePage] = useState(0);
	const { sendMessage, isSending } = useChat();
	const { openModal } = useSignupModal();
	const navigate = useNavigate();

	const handleAskIsang = async (description: string) => {
		const remaining = localStorage.getItem("conversations_remaining");

		if (remaining === "0") {
			openModal();
			return;
		}

		try {
			const data = await sendMessage.mutateAsync({ message: description });
			if (data?.sessionId) {
				navigate(`/chat/${data.sessionId}`, { state: { fromHome: true } });
			}
		} catch (error) {
			console.error("Failed to start conversation:", error);
		}
	};

	return (
		<div className="flex flex-col h-full bg-white relative">
			<div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto py-10 w-full">
				<div className="text-center mb-12 w-full">
					<h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-12 font-ibm">
						What can I ask Isang?
					</h1>

					<div className="w-full max-w-4xl px-4 overflow-hidden mb-8">
						<motion.div
							className="flex gap-0"
							animate={{ x: `-${activePage * 100}%` }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
						>
							{[0, 1, 2].map((pageIndex) => (
								<div key={pageIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full shrink-0 px-2">
									{SUGGESTIONS.slice(pageIndex * 2, pageIndex * 2 + 2).map((suggestion) => (
										<div
											key={suggestion.id}
											className={`p-6 rounded-2xl border-b-2 border-r-2 border border-l-2 border-t-8 ${suggestion.color} ${suggestion.bg} text-left hover:shadow-md transition-shadow`}
										>
											<h3 className="text-base font-bold text-gray-900 mb-3 font-ibm">
												{suggestion.title}
											</h3>
											<p className="text-gray-500 text-sm leading-relaxed mb-6 font-ibm">
												{suggestion.description}
											</p>
											<button
												onClick={() => handleAskIsang(suggestion.description)}
												disabled={isSending}
												className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF4405] font-ibm hover:opacity-80 transition-opacity disabled:opacity-50"
											>
												Ask Isang
												{isSending ? (
													<Loader2 className="w-4 h-4 animate-spin" />
												) : (
													<Sparkles className="w-4 h-4" />
												)}
											</button>
										</div>
									))}
								</div>
							))}
						</motion.div>
					</div>

					<div className="flex flex-col items-center gap-6">
						<div className="flex gap-1.5">
							{[0, 1, 2].map((i) => (
								<button
									key={i}
									onClick={() => setActivePage(i)}
									className={`h-1.5 rounded-full transition-all ${i === activePage ? "w-8 bg-black" : "w-8 bg-gray-200"
										}`}
								/>
							))}
						</div>

						<div className="flex gap-4">
							<button
								onClick={() => setActivePage((prev) => (prev > 0 ? prev - 1 : 2))}
								className="p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
							>
								<ChevronLeft className="w-5 h-5" />
							</button>
							<button
								onClick={() => setActivePage((prev) => (prev < 2 ? prev + 1 : 0))}
								className="p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
							>
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full mt-auto pt-10 pb-6 px-4">
				<ChatInput
					onSend={(_data: any) => {
						// Navigation is now handled internally by ChatInput via sessionId
					}}
				/>
			</div>
		</div>
	);
}
