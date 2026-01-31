import { Plane, Ticket, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Booking {
	id: number;
	type: 'flight' | 'hotel' | 'tour';
	title: string;
	image?: string;
	details: string;
	meta: string;
}

const bookings: Booking[] = [
	{
		id: 1,
		type: 'flight',
		title: "Delta Airlines Flight 1234",
		details: "Departure: Mar 18, 2025 - JFK → BCN",
		meta: "$550 - Booking Ref: XYZ123 | Booked via Expedia",
	},
	{
		id: 2,
		type: 'hotel',
		title: "Majestic Hotel & Spa",
		image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=80&q=80",
		details: "Check-in: Mar 18 - Check-out: Mar 21",
		meta: "$750 - Booking.com",
	},
	{
		id: 3,
		type: 'tour',
		title: "Park Güell Guided Tour",
		details: "Mar 19, 2PM",
		meta: "$190 - GetYourGuide",
	},
];

export default function BookingsTab() {
	return (
		<div className="flex-1 overflow-y-auto p-6">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-base font-bold text-gray-900 font-ibm">Bookings</h3>
				<Button size="sm" className="bg-black text-white hover:bg-gray-800 rounded-full flex items-center gap-2 h-9 px-4">
					<FilePlus className="w-4 h-4" />
					<span className="text-sm font-medium">Add receipts</span>
				</Button>
			</div>

			<div className="space-y-3">
				{bookings.map((booking) => (
					<div key={booking.id} className="flex gap-4 p-4 bg-white border border-gray-300 rounded-xl hover:shadow-md transition-shadow">
						<div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
							{booking.image ? (
								<img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
							) : booking.type === 'flight' ? (
								<Plane className="w-6 h-6 text-gray-700" />
							) : (
								<Ticket className="w-6 h-6 text-gray-700" />
							)}
						</div>
						<div className="flex-1 min-w-0">
							<div className="flex items-start justify-between gap-4">
								<div>
									<h4 className="text-sm font-bold text-gray-900 mb-1 font-ibm">{booking.title}</h4>
									<p className="text-xs text-gray-500 mb-1">{booking.details}</p>
									<p className="text-xs text-black font-medium">{booking.meta}</p>
								</div>
								<Button variant="outline" size="sm" className="text-[11px] px-3 rounded-full border-gray-300 text-black hover:bg-gray-50 shrink-0 font-medium shadow-xs">
									View receipt
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
