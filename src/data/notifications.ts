import type { LucideIcon } from "lucide-react";
import { Plane, MapPin } from "lucide-react";

export type NotificationIcon = {
  type: "icon" | "image";
  value: string | LucideIcon;
};

export type Notification = {
  id: string;
  icon: NotificationIcon;
  title: string;
  subtitle: string;
  timestamp: string;
};

export const notifications: Notification[] = [
  {
    id: "1",
    icon: {
      type: "icon",
      value: Plane,
    },
    title: "Flight reminder",
    subtitle: "Your departure for Togo is in 2 days",
    timestamp: "Just now",
  },
  {
    id: "2",
    icon: {
      type: "image",
      value:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=100&q=80",
    },
    title: "Your trip to Togo has been confirmed!",
    subtitle: "You'll receive your itinerary and hotel details shortly.",
    timestamp: "Just now",
  },
  {
    id: "3",
    icon: {
      type: "icon",
      value: MapPin,
    },
    title: "See new itineraries from pathfinders",
    subtitle: "Check out this unique experience crafted by a local explorer.C...",
    timestamp: "Just now",
  },
  {
    id: "4",
    icon: {
      type: "image",
      value:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=100&q=80",
    },
    title: "La Rambla added to your checkpoint",
    subtitle: "La Rambla added to your checkpoint",
    timestamp: "Just now",
  },
  {
    id: "5",
    icon: {
      type: "image",
      value:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=100&q=80",
    },
    title: "La Rambla added to your checkpoint",
    subtitle: "La Rambla added to your checkpoint",
    timestamp: "Just now",
  },
];

