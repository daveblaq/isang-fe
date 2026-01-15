import { useState } from "react";
import { ChevronsLeft, ChevronsRight, SlidersHorizontal, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";

interface Checkpoint {
	id: number;
	title: string;
	type: string;
	icon: React.ReactNode;
	image: string;
	lat: number;
	lng: number;
	details: string;
	rating: string;
}

interface MapViewProps {
	isMapOpen: boolean;
	isMapFull: boolean;
	setIsMapFull: (value: boolean) => void;
	checkpoints: Checkpoint[];
}

const mapContainerStyle = {
	width: '100%',
	height: '100%'
};

const center = {
	lat: -33.9628,
	lng: 18.4098
};

const mapOptions = {
	disableDefaultUI: false,
	zoomControl: true,
	mapTypeControl: false,
	streetViewControl: false,
	fullscreenControl: false,
	styles: [
		{
			featureType: "all",
			elementType: "geometry",
			stylers: [{ saturation: -20 }]
		}
	]
};

export default function MapView({ isMapOpen, isMapFull, setIsMapFull, checkpoints }: MapViewProps) {
	const [hoveredCheckpointId, setHoveredCheckpointId] = useState<number | null>(null);
	const [cardPositions, setCardPositions] = useState<Record<number, { vertical: 'top' | 'bottom', horizontal: 'left' | 'center' | 'right' }>>({});

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
	});

	return (
		<div
			className={`h-full bg-white border-l border-gray-200 shadow-sm transition-all duration-500 ease-in-out relative ${isMapOpen ? (isMapFull ? 'w-full opacity-100' : 'w-1/2 opacity-100') : 'w-0 opacity-0 overflow-hidden'
				}`}
		>
			<div className="flex flex-col h-full w-full">
				{/* Map Controls Header - Floating */}
				<div className="absolute top-4 left-0 right-0 px-4 flex items-center justify-between z-40 pointer-events-none">
					<button
						onClick={() => setIsMapFull(!isMapFull)}
						className="pointer-events-auto w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
					>
						{isMapFull ? <ChevronsRight className="w-5 h-5 text-gray-900" /> : <ChevronsLeft className="w-5 h-5 text-gray-900" />}
					</button>

					<div className="pointer-events-auto h-10 px-6 bg-white rounded-full shadow-lg flex items-center justify-center gap-1.5">
						<div className="w-1.5 h-1.5 bg-black rounded-full" />
						<div className="w-1.5 h-1.5 bg-black rounded-full" />
						<div className="w-1.5 h-1.5 bg-black rounded-full" />
					</div>

					<button className="pointer-events-auto w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
						<SlidersHorizontal className="w-5 h-5 text-gray-900" />
					</button>
				</div>

				{/* Map Container - Real Google Maps with Accurate Coordinates */}
				<div className="flex-1 relative bg-[#E5E7EB] overflow-hidden border-[6px] border-white shadow-sm map-container-boundary">
					{!isLoaded ? (
						<div className="absolute inset-0 flex items-center justify-center bg-gray-100">
							<div className="text-gray-500 text-sm">Loading map...</div>
						</div>
					) : (
						<GoogleMap
							mapContainerStyle={mapContainerStyle}
							center={center}
							zoom={12}
							options={mapOptions}
						>
							{checkpoints.map((checkpoint) => (
								<OverlayView
									key={checkpoint.id}
									position={{ lat: checkpoint.lat, lng: checkpoint.lng }}
									mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
								>
									<div
										className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${hoveredCheckpointId === checkpoint.id ? 'z-[60]' : 'z-10'}`}
										onMouseEnter={() => setHoveredCheckpointId(checkpoint.id)}
										onMouseLeave={() => setHoveredCheckpointId(null)}
									>
										<div className="relative group cursor-pointer">
											{/* Marker Label - Active state styling */}
											<motion.div
												className={`flex items-center gap-1.5 shadow-lg rounded-full px-2.5 py-1 border whitespace-nowrap ${hoveredCheckpointId === checkpoint.id
													? 'bg-black border-black'
													: 'bg-white border-gray-100'
													}`}
												whileHover={{ scale: 1.05 }}
												transition={{ type: "spring", stiffness: 400, damping: 10 }}
											>
												<div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${hoveredCheckpointId === checkpoint.id
													? 'bg-white text-black'
													: 'bg-gray-100 text-gray-700'
													}`}>
													{checkpoint.icon}
												</div>
												<div className="w-4 h-4 rounded-full bg-[#FF5A1F] flex items-center justify-center text-white shrink-0">
													<Check className="w-2.5 h-2.5 stroke-[3]" />
												</div>
												<span className={`text-xs font-bold pr-1 ${hoveredCheckpointId === checkpoint.id
													? 'text-white'
													: 'text-gray-900'
													}`}>
													{checkpoint.title}
												</span>
											</motion.div>

											{/* Popup Card - Google Maps Standard Boundary Detection */}
											<AnimatePresence>
												{hoveredCheckpointId === checkpoint.id && (() => {
													const savedPosition = cardPositions[checkpoint.id];
													const position = savedPosition || { vertical: 'bottom', horizontal: 'center' };

													return (
														<motion.div
															initial={{ opacity: 0, y: position.vertical === 'bottom' ? -10 : 10, scale: 0.95 }}
															animate={{ opacity: 1, y: 0, scale: 1 }}
															exit={{ opacity: 0, y: position.vertical === 'bottom' ? -10 : 10, scale: 0.95 }}
															transition={{ duration: 0.2 }}
															className={`absolute w-[320px] bg-white rounded-[12px] shadow-xl overflow-hidden z-[70] pointer-events-none border border-gray-200 ${position.vertical === 'bottom' ? 'bottom-full mb-3' : 'top-full mt-3'
																} ${position.horizontal === 'left' ? 'left-0' :
																	position.horizontal === 'right' ? 'right-0' :
																		'left-1/2 -translate-x-1/2'
																}`}
															onAnimationComplete={() => {
																const cardElement = document.querySelector(`[data-card-id="${checkpoint.id}"]`) as HTMLElement;
																const mapContainer = document.querySelector('.map-container-boundary') as HTMLElement;

																if (!cardElement || !mapContainer) return;

																const cardRect = cardElement.getBoundingClientRect();
																const mapRect = mapContainer.getBoundingClientRect();

																const SAFE_ZONES = {
																	top: 90,
																	bottom: 90,
																	left: 24,
																	right: 24
																};

																const availableSpace = {
																	top: cardRect.top - (mapRect.top + SAFE_ZONES.top),
																	bottom: (mapRect.bottom - SAFE_ZONES.bottom) - cardRect.bottom,
																	left: cardRect.left - (mapRect.left + SAFE_ZONES.left),
																	right: (mapRect.right - SAFE_ZONES.right) - cardRect.right
																};

																let optimalVertical: 'top' | 'bottom' = position.vertical;
																let optimalHorizontal: 'left' | 'center' | 'right' = position.horizontal;

																if (availableSpace.top < 0 && availableSpace.bottom >= 0) {
																	optimalVertical = 'top';
																} else if (availableSpace.bottom < 0 && availableSpace.top >= 0) {
																	optimalVertical = 'bottom';
																} else if (availableSpace.top < 0 && availableSpace.bottom < 0) {
																	optimalVertical = Math.abs(availableSpace.top) < Math.abs(availableSpace.bottom) ? 'bottom' : 'top';
																}

																const centerWouldFit = availableSpace.left >= 0 && availableSpace.right >= 0;

																if (!centerWouldFit) {
																	if (availableSpace.left < 0) {
																		optimalHorizontal = 'left';
																	} else if (availableSpace.right < 0) {
																		optimalHorizontal = 'right';
																	}
																} else if (centerWouldFit && optimalHorizontal !== 'center') {
																	optimalHorizontal = 'center';
																}

																if (optimalVertical !== position.vertical || optimalHorizontal !== position.horizontal) {
																	setCardPositions(prev => ({
																		...prev,
																		[checkpoint.id]: {
																			vertical: optimalVertical,
																			horizontal: optimalHorizontal
																		}
																	}));
																}
															}}
															data-card-id={checkpoint.id}
														>
															{/* Image with floating action buttons */}
															<div className="relative h-[200px] w-full overflow-hidden">
																<img src={checkpoint.image} alt={checkpoint.title} className="w-full h-full object-cover" />

																<div className="absolute top-4 right-4 flex gap-2">
																	<div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
																		<svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
																		</svg>
																	</div>
																	<div className="w-7 h-7 rounded-full bg-[#FF5A1F] shadow-lg flex items-center justify-center">
																		<Check className="w-4 h-4 text-white stroke-[2.5]" />
																	</div>
																</div>
															</div>

															{/* Content */}
															<div className="p-3 rounded-tr-[12px] rounded-tl-[12px] overflow-hidden">
																<div className="flex items-start justify-between mb-3">
																	<h3 className="text-sm font-semibold text-gray-900 leading-tight flex-1">{checkpoint.title}</h3>
																	<div className="flex items-center gap-1 ml-3 shrink-0">
																		<span className="text-gray-500">★</span>
																		<span className="text-xs font-medium text-gray-500">{checkpoint.rating}</span>
																		<span className="text-xs text-gray-500">(637k)</span>
																	</div>
																</div>

																<div className="flex items-center gap-2 mb-2">
																	<div className="w-5 h-5 text-gray-600">
																		{checkpoint.icon}
																	</div>
																	<span className="text-xs font-regular text-gray-500">{checkpoint.type}</span>
																</div>

																<p className="text-xs text-gray-500 mb-3">Cape Town, South Africa</p>

																<p className="text-xs text-black leading-relaxed line-clamp-3">
																	{checkpoint.details}
																</p>
															</div>
														</motion.div>
													);
												})()}
											</AnimatePresence>
										</div>
									</div>
								</OverlayView>
							))}
						</GoogleMap>
					)}

					{/* Checkpoint Counter */}
					<div className="absolute bottom-4 left-4 bg-white rounded-full px-4 py-2 shadow-lg z-[100] pointer-events-none">
						<span className="text-sm font-medium text-gray-700">{checkpoints.length} checkpoints</span>
					</div>
				</div>
			</div>
		</div>
	);
}
