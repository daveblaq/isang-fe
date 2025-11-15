import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { FiMoreHorizontal } from "react-icons/fi";
import { ArrowUpFromLine, Eye, Link2, PencilLine, Trash2 } from "lucide-react";

import Text from "@/components/ui/text";

type GuideCardProps = {
  images: string[];
  badge: string;
  meta?: string;
  title: string;
  location: string;
  author: string;
  avatar?: string;
};

const badgeStyles = {
  primary: "bg-white text-slate-900 border border-[#E4E7EC] shadow-sm",
};

const statusStyles: Record<string, string> = {
  Published: "bg-[#FF5A1F] text-white border border-[#FF5A1F]/80",
  Drafts: "bg-[#111827] text-white border border-[#111827]",
};

export function GuideCard({
  images,
  badge,
  meta = "",
  title,
  location,
  author,
  avatar,
}: GuideCardProps) {
  const gallery = useMemo(() => (images.length ? images : []), [images]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gallery.length <= 1 || !isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [gallery.length, isHovered]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <div className="space-y-3" ref={cardRef}>
      <div
        className="relative overflow-hidden rounded-[12px] border border-slate-200 "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[287px] w-full">
          {gallery.length > 0 ? (
            gallery.map((image, imgIndex) => (
              <img
                key={`${image}-${imgIndex}`}
                src={image}
                alt={`${title}-${imgIndex}`}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                  imgIndex === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              />
            ))
          ) : (
            <div className="h-full w-full bg-slate-200" />
          )}
        </div>
        <div className="absolute inset-x-4 top-4 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles.primary}`}
          >
            {badge}
          </span>
          {meta && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyles[meta] ?? "bg-slate-900 text-white"
              }`}
            >
              {meta}
            </span>
          )}
        </div>
        <button
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-slate-600 shadow-sm hover:bg-white"
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
        >
          <FiMoreHorizontal />
        </button>
        {menuOpen && (
          <div className="absolute right-3 top-14 z-10 w-32 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl">
            <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
              <ArrowUpFromLine className="h-4 w-4" />
              Publish
            </button>
            <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
              <PencilLine className="h-4 w-4" />
              Edit
            </button>
            <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
              <Link2 className="h-4 w-4" />
              Copy link
            </button>
            <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        )}
        {gallery.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1">
            {gallery.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`h-2 w-2 rounded-full ${
                  dotIndex === currentIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <Text
          variant="span"
          className="text-base font-medium font-ibm text-slate-900"
        >
          {title}
        </Text>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <MapPin className="h-4 w-4 text-gray-500" />
        <Text variant="span" className="text-sm font-regular text-gray-500">
          {location}
        </Text>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-400">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-white text-xs">
            {author.charAt(0).toUpperCase()}
          </span>
        )}
        <Text variant="span" className="text-sm text-gray-500">
          {author}
        </Text>
      </div>
    </div>
  );
}
