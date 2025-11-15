export type Guide = {
  id: string;
  title: string;
  location: string;
  author: string;
  avatar?: string;
  images: string[];
  badge: {
    label: string;
    variant: "published" | "draft";
  };
  meta: string;
};

export const creatorGuides: Guide[] = [
  {
    id: "guide-1",
    title: "Barcelona Food & Architecture",
    location: "Barcelona, Spain",
    author: "svckett",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=900&q=80",
    ],
    badge: { label: "10 places", variant: "published" },
    meta: "Published",
  },
  {
    id: "guide-2",
    title: "Gaudi Landmarks Weekend",
    location: "Barcelona, Spain",
    author: "svckett",
    images: [
      "https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505739775417-85f24b7e1d8c?auto=format&fit=crop&w=900&q=80",
    ],
    badge: { label: "6 days", variant: "draft" },
    meta: "Drafts",
  },
  {
    id: "guide-3",
    title: "Barcelona Fine Dining",
    location: "Barcelona, Spain",
    author: "svckett",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=120&q=80",
    images: [
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=900&q=80",
    ],
    badge: { label: "10 places", variant: "draft" },
    meta: "Drafts",
  },
  {
    id: "guide-4",
    title: "Modernist Icons Walk",
    location: "Barcelona, Spain",
    author: "svckett",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=900&q=80",
    ],
    badge: { label: "10 places", variant: "published" },
    meta: "Published",
  },
];
