import { useRef, useState } from "react";
import {useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Paperclip, Mic, ArrowUp, ChevronDown, Share2, MapPin, ChevronsLeft, ChevronsRight, SlidersHorizontal, Mountain, Palmtree, Utensils, Library, Bed, Footprints, Check} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {GoogleMap, useLoadScript, OverlayView} from "@react-google-maps/api";
import DashLayout from "@/components/layouts/sidebar-layout";

// Mock data based on the image
const STAYS = [
  {
    id: 1,
    title: "The Marly Boutique Hotel - beachfront luxury with oce...",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Kloof Street Hotel - urban charm in the heart of Cape...",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Cloud 9 Boutique Hotel - affordable & scenic, with Ta...",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=400&q=80",
  },
];

const FOOD = [
  {
    id: 1,
    title: "Kloof Street House - romantic, colonial-era dinin...",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "The Pot Luck Club - trendy tapas & cocktails at the Old...",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Codfather - Camps Bay seafood staple with fresh...",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
  },
];

const CHECKPOINTS = [
  {
    id: 1,
    title: "Table Mountain",
    type: "Nature & Hiking",
    icon: <Mountain className="w-3.5 h-3.5" />,
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80",
    lat: -33.9628,
    lng: 18.4098,
    details: "Iconic flat-topped mountain offering panoramic city views.",
    rating: "4.9"
  },
  {
    id: 2,
    title: "V&A Waterfront",
    type: "Shopping & Food",
    icon: <Utensils className="w-3.5 h-3.5" />,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80",
    lat: -33.9025,
    lng: 18.4187,
    details: "Bustling harbor with restaurants, shops, and entertainment.",
    rating: "4.7"
  },
  {
    id: 3,
    title: "Mount Nelson Hotel",
    type: "Stay",
    icon: <Bed className="w-3.5 h-3.5" />,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80",
    lat: -33.9352,
    lng: 18.4116,
    details: "Famous pink luxury hotel at the foot of Table Mountain.",
    rating: "4.8"
  },
  {
    id: 4,
    title: "Camps Bay Beach",
    type: "Beach",
    icon: <Palmtree className="w-3.5 h-3.5" />,
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=300&q=80",
    lat: -33.9512,
    lng: 18.3777,
    details: "Trendy beach known for its white sand and palm-lined strip.",
    rating: "4.6"
  },
  {
    id: 5,
    title: "Zeitz MOCAA",
    type: "Museum",
    icon: <Library className="w-3.5 h-3.5" />,
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=300&q=80",
    lat: -33.9070,
    lng: 18.4230,
    details: "Contemporary African art museum in a converted silo.",
    rating: "4.5"
  },
  {
    id: 6,
    title: "Boulders Beach",
    type: "Nature",
    icon: <Footprints className="w-3.5 h-3.5" />,
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=300&q=80",
    lat: -34.1975,
    lng: 18.4506,
    details: "Sheltered beach famous for its colony of African penguins.",
    rating: "4.8"
  },
  {
    id: 7,
    title: "Kirstenbosch Garden",
    type: "Nature & Park",
    icon: <Palmtree className="w-3.5 h-3.5" />,
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80",
    lat: -33.9884,
    lng: 18.4319,
    details: "Acclaimed botanical garden celebrating indigenous flora.",
    rating: "4.9"
  }
];

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

export default function TripChat() {
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isMapFull, setIsMapFull] = useState(false);
  const [hoveredCheckpointId, setHoveredCheckpointId] = useState<number | null>(null);
  const [cardPositions, setCardPositions] = useState<Record<number, {vertical: 'top' | 'bottom', horizontal: 'left' | 'center' | 'right'}>>({});
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });
  
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
          className={`flex flex-col h-full  transition-all duration-500 ease-in-out ${
            isMapOpen ? (isMapFull ? 'w-0 opacity-0 overflow-hidden' : 'w-1/2') : 'w-[75%] mx-auto'
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
                    <img src="/logo.svg" alt="AI" className="w-full h-full object-contain opacity-80" onError={(e) => e.currentTarget.src='https://placehold.co/20x20?text=AI'} /> 
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
                    <img src="/logo.svg" alt="AI" className="w-full h-full object-contain opacity-80" onError={(e) => e.currentTarget.src='https://placehold.co/20x20?text=AI'} /> 
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
                        </div>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Input Area - Fixed at bottom */}
          <div className="p-4 md:px-6 md:pb-6 shrink-0 border-t border-gray-50">
             <div className="max-w-4xl mx-auto relative group">
                <div 
                    onClick={() => inputRef.current?.focus()}
                    className="relative bg-white rounded-[16px] border border-gray-200 shadow-lg h-[116px] p-4 flex flex-col justify-between focus-within:ring-2 ring-gray-100 ring-offset-2 transition-all cursor-text"
                >
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Ask me anything! 🌍" 
                        className="w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder:text-gray-400 p-0 focus-visible:ring-0"
                    />
                    
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3">
                             <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                <Paperclip className="w-5 h-5" />
                             </button>
                              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                <Mic className="w-5 h-5" />
                             </button>
                        </div>
                        
                        <button className="w-10 h-10 rounded-lg bg-[#FF855F] hover:bg-[#FF5A1F] flex items-center justify-center text-white transition-colors">
                            <ArrowUp className="w-5 h-5" />
                        </button>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Map - Fixed sibling on right half */}
        <div 
          className={`h-full bg-white border-l border-gray-200 shadow-sm transition-all duration-500 ease-in-out relative ${
            isMapOpen ? (isMapFull ? 'w-full opacity-100' : 'w-1/2 opacity-100') : 'w-0 opacity-0 overflow-hidden'
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
                  {CHECKPOINTS.map((checkpoint) => (
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
                            className={`flex items-center gap-1.5 shadow-lg rounded-full px-2.5 py-1 border whitespace-nowrap ${
                              hoveredCheckpointId === checkpoint.id 
                                ? 'bg-black border-black' 
                                : 'bg-white border-gray-100'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                              hoveredCheckpointId === checkpoint.id 
                                ? 'bg-white text-black' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {checkpoint.icon}
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#FF5A1F] flex items-center justify-center text-white shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className={`text-xs font-bold pr-1 ${
                              hoveredCheckpointId === checkpoint.id 
                                ? 'text-white' 
                                : 'text-gray-900'
                            }`}>
                              {checkpoint.title}
                            </span>
                          </motion.div>

                          {/* Popup Card - Google Maps Standard Boundary Detection */}
                          <AnimatePresence>
                            {hoveredCheckpointId === checkpoint.id && (() => {
                              // Get or initialize position for this checkpoint
                              const savedPosition = cardPositions[checkpoint.id];
                              const position = savedPosition || { vertical: 'bottom', horizontal: 'center' };
                              
                              return (
                                <motion.div
                                  initial={{ opacity: 0, y: position.vertical === 'bottom' ? -10 : 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: position.vertical === 'bottom' ? -10 : 10, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className={`absolute w-[320px] bg-white rounded-[12px] shadow-xl overflow-hidden z-[70] pointer-events-none border border-gray-200 ${
                                    position.vertical === 'bottom' ? 'bottom-full mb-3' : 'top-full mt-3'
                                  } ${
                                    position.horizontal === 'left' ? 'left-0' : 
                                    position.horizontal === 'right' ? 'right-0' : 
                                    'left-1/2 -translate-x-1/2'
                                  }`}
                                  onAnimationComplete={() => {
                                    // Google Maps-style boundary detection
                                    const cardElement = document.querySelector(`[data-card-id="${checkpoint.id}"]`) as HTMLElement;
                                    const mapContainer = document.querySelector('.map-container-boundary') as HTMLElement;
                                    
                                    if (!cardElement || !mapContainer) return;
                                    
                                    const cardRect = cardElement.getBoundingClientRect();
                                    const mapRect = mapContainer.getBoundingClientRect();
                                    
                                    // Define strict safe zones for UI elements
                                    const SAFE_ZONES = {
                                      top: 90,      // Floating header controls
                                      bottom: 90,   // Checkpoint counter
                                      left: 24,     // Side margin
                                      right: 24     // Side margin
                                    };
                                    
                                    // Calculate available space in each direction
                                    const availableSpace = {
                                      top: cardRect.top - (mapRect.top + SAFE_ZONES.top),
                                      bottom: (mapRect.bottom - SAFE_ZONES.bottom) - cardRect.bottom,
                                      left: cardRect.left - (mapRect.left + SAFE_ZONES.left),
                                      right: (mapRect.right - SAFE_ZONES.right) - cardRect.right
                                    };
                                    
                                    // Determine optimal position
                                    let optimalVertical: 'top' | 'bottom' = position.vertical;
                                    let optimalHorizontal: 'left' | 'center' | 'right' = position.horizontal;
                                    
                                    // Vertical positioning: Choose side with more space
                                    if (availableSpace.top < 0 && availableSpace.bottom >= 0) {
                                      // Overflowing top, switch to bottom
                                      optimalVertical = 'top';
                                    } else if (availableSpace.bottom < 0 && availableSpace.top >= 0) {
                                      // Overflowing bottom, switch to top
                                      optimalVertical = 'bottom';
                                    } else if (availableSpace.top < 0 && availableSpace.bottom < 0) {
                                      // Overflowing both sides - choose side with less overflow
                                      optimalVertical = Math.abs(availableSpace.top) < Math.abs(availableSpace.bottom) ? 'bottom' : 'top';
                                    }
                                    
                                    // Horizontal positioning: Ensure card stays within bounds
                                    const centerWouldFit = availableSpace.left >= 0 && availableSpace.right >= 0;
                                    
                                    if (!centerWouldFit) {
                                      if (availableSpace.left < 0) {
                                        // Overflowing left, align to left edge
                                        optimalHorizontal = 'left';
                                      } else if (availableSpace.right < 0) {
                                        // Overflowing right, align to right edge
                                        optimalHorizontal = 'right';
                                      }
                                    } else if (centerWouldFit && optimalHorizontal !== 'center') {
                                      // Has space to center
                                      optimalHorizontal = 'center';
                                    }
                                    
                                    // Update position if changed
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
                                  
                                  {/* Floating action buttons */}
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
                                  {/* Title and Rating */}
                                  <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-gray-900 leading-tight flex-1">{checkpoint.title}</h3>
                                    <div className="flex items-center gap-1 ml-3 shrink-0">
                                      <span className="text-gray-500">★</span>
                                      <span className="text-xs font-medium text-gray-500">{checkpoint.rating}</span>
                                      <span className="text-xs text-gray-500">(637k)</span>
                                    </div>
                                  </div>
                                  
                                  {/* Category */}
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-5 h-5 text-gray-600">
                                      {checkpoint.icon}
                                    </div>
                                    <span className="text-xs font-regular text-gray-500">{checkpoint.type}</span>
                                  </div>
                                  
                                  {/* Location */}
                                  <p className="text-xs text-gray-500 mb-3">Cape Town, South Africa</p>
                                  
                                  {/* Description */}
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
                <span className="text-sm font-medium text-gray-700">{CHECKPOINTS.length} checkpoints</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
