import { Mountain, Palmtree, Utensils, Library, Bed, Footprints } from "lucide-react";

export const STAYS = [
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

export const FOOD = [
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

export const CHECKPOINTS = [
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
