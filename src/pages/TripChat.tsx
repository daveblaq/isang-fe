
import { useRef } from "react";
import {useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Paperclip, Mic, ArrowUp, ChevronDown, Share2, MapPin} from "lucide-react";
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

export default function TripChat() {
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  
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
            <Button variant="outline" className="rounded-full gap-2 h-9 text-sm border border-gray-300">
                <MapPin className="w-4 h-4" />
                Checkpoints 
                <span className="bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">0</span>
            </Button>
        </div>
    </div>
  );

  return (
    <DashLayout headerContent={headerContent}>
      <div className="flex flex-col h-full w-full max-w-5xl mx-auto font-ibm relative">
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 pb-32">
        {/* User Message */}
        <div className="flex justify-end">
            <div className="bg-[#FFF9F5] text-gray-900 px-5 py-3 rounded-[20px] rounded-tr-sm max-w-[80%] md:max-w-[70%] text-sm leading-relaxed">
                I am going to {destination}, with ₦ {budget}, starting {dates}, for {days} days
            </div>
        </div>
        
        {/* AI Response */}
        <div className="flex gap-4 items-start max-w-full">
            <div className="w-[32px] h-[32px] rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/logo.svg" alt="AI" className="w-full h-full object-contain opacity-80" onError={(e) => e.currentTarget.src='https://placehold.co/20x20?text=AI'} /> 
            </div>
            
            <div className="flex-1 bg-[#F9FAFB] p-4 md:p-6 rounded-[20px] rounded-tl-sm space-y-8">
                <div className="prose text-gray-800 text-sm leading-relaxed max-w-none">
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
      </div>
      
      {/* Input Area */}
      <div className="sticky bottom-4 left-0 right-0 p-0">
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
    </DashLayout>
  );
}
