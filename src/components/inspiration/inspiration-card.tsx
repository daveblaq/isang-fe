"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { FiHeart } from "react-icons/fi";
import Text from "@/components/ui/text";

type InspirationCardProps = {
  images: string[];
  title: string;
  badge: string;
  location: string;
  author: string;
  avatar?: string;
};

export default function InspirationCard({
  images,
  title,
  badge,
  location,
  author,
  avatar,
}: InspirationCardProps) {
  const gallery = useMemo(() => (images.length ? images : []), [images]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (gallery.length <= 1 || !isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [gallery.length, isHovered]);

  return (
    <div className="space-y-3">
      <div
        className="relative overflow-hidden rounded-[12px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[287px] w-full">
          {gallery.length > 0 ? (
            gallery.map((image, imgIndex) => (
              <img
                key={`${image}-${imgIndex}`}
                src={image}
                alt={`${location}-${imgIndex}`}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                  imgIndex === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
                loading="lazy"
              />
            ))
          ) : (
            <div className="h-full w-full bg-slate-200" />
          )}
        </div>
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
            {badge}
          </span>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <FiHeart
              className={`h-4 w-4 ${
                isLiked ? "fill-pink-500 text-pink-500" : "text-black"
              }`}
            />
          </button>
        </div>
        {gallery.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5">
            {gallery.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`h-2 w-2 rounded-full transition-all ${
                  dotIndex === currentIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Text
          variant="span"
          className="text-base font-medium font-ibm text-slate-900"
        >
          {title}
        </Text>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-900" />
          <Text
            variant="span"
            className="text-sm font-regular font-ibm text-gray-500"
          >
            {location}
          </Text>
        </div>
        <div className="flex items-center gap-2">
          {avatar ? (
            <img
              src={avatar}
              alt={author}
              className="h-7 w-7 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-medium">
              {author.charAt(0).toUpperCase()}
            </span>
          )}
          <Text variant="span" className="text-sm font-regular font-ibm text-gray-500">
            {author}
          </Text>
        </div>
      </div>
    </div>
  );
}

