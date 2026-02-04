import { useState } from "react";
import { cn } from "@/lib/utils";

interface SuggestionCardProps {
	image: string;
	title: string;
	description?: string;
	className?: string;
	onClick?: () => void;
}

export default function SuggestionCard({ image, title, description, className, onClick }: SuggestionCardProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<div onClick={onClick} className={cn("group cursor-pointer space-y-2", className)}>
			<div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative">
				{!isLoaded && (
					<div className="absolute inset-0 blur-loading backdrop-blur-sm" />
				)}
				<img
					src={image}
					alt={title}
					className={cn(
						"w-full h-full object-cover transition-all duration-500",
						isLoaded ? "scale-100 blur-0" : "scale-110 blur-md",
						"group-hover:scale-105"
					)}
					onLoad={() => setIsLoaded(true)}
				/>
			</div>
			<div>
				<h4
					className="text-sm font-bold text-gray-900 line-clamp-1 leading-snug"
					title={title}
				>
					{title}
				</h4>
				{description && (
					<p className="text-[12px] text-gray-500 line-clamp-2 leading-normal mt-1">
						{description}
					</p>
				)}
			</div>
		</div>
	);
}
