export type FavoriteItem = {
  id: string;
  images: string[];
  title: string;
  location: string;
  rating: string;
  reviewCount: string;
  author: string;
  avatar?: string;
  category:
    | "all"
    | "stays"
    | "restaurants"
    | "attractions"
    | "activities"
    | "guides";
};

export const favoritesData: FavoriteItem[] = [
  {
    id: "1",
    title: "Park Güell",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80",
    ],
    location: "Barcelona, Spain",
    rating: "4.8",
    reviewCount: "637k",
    author: "Rachael Khan",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    category: "all",
  },
  {
    id: "2",
    title: "Sagrada Familia",
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505739775417-85f24b7e1d8c?auto=format&fit=crop&w=800&q=80",
    ],
    location: "Barcelona, Spain",
    rating: "4.8",
    reviewCount: "637k",
    author: "Jamal Phellen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    category: "all",
  },
  {
    id: "3",
    title: "Restaurant El Nacional",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=800&q=80",
    ],
    location: "Barcelona, Spain",
    rating: "4.8",
    reviewCount: "637k",
    author: "Rachael Khan",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    category: "all",
  },
  {
    id: "4",
    title: "Casa Milà",
    images: [
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    ],
    location: "Barcelona, Spain",
    rating: "4.8",
    reviewCount: "637k",
    author: "Rachael Khan",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    category: "all",
  },
];
