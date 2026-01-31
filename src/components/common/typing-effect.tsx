import { useState, useEffect, useRef } from "react";

interface TypingEffectProps {
	text: string;
	speed?: number;
	onComplete?: () => void;
	className?: string;
}

export default function TypingEffect({ text, speed = 30, onComplete, className }: TypingEffectProps) {
	const [displayedText, setDisplayedText] = useState("");
	const onCompleteRef = useRef(onComplete);
	const hasCalledComplete = useRef(false);

	// Sync the ref with the latest onComplete callback
	useEffect(() => {
		onCompleteRef.current = onComplete;
	}, [onComplete]);

	useEffect(() => {
		// Reset state when text changes
		setDisplayedText("");
		hasCalledComplete.current = false;

		let index = 0;
		const timer = setInterval(() => {
			if (index < text.length) {
				setDisplayedText(text.slice(0, index + 1));
				index++;
			} else {
				clearInterval(timer);
				if (!hasCalledComplete.current) {
					hasCalledComplete.current = true;
					onCompleteRef.current?.();
				}
			}
		}, speed);

		return () => clearInterval(timer);
	}, [text, speed]);

	return <div className={className}>{displayedText}</div>;
}
