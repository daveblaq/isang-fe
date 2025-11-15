import { GuideCard } from "@/components/ui/guide-card";
import { creatorGuides } from "@/data/creatorGuides";

export default function Guides() {
  return (
    <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
      {creatorGuides.map((guide) => (
        <GuideCard
          key={guide.id}
          images={guide.images}
          badge={guide.badge.label}
          meta={guide.meta}
          title={guide.title}
          location={guide.location}
          author={guide.author}
          avatar={guide.avatar}
        />
      ))}
    </div>
  );
}
