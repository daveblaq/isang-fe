import { useState, useEffect, useRef } from "react";

interface TypingEffectProps {
	text: string;
	speed?: number;
	onComplete?: () => void;
	className?: string;
	shouldType?: boolean;
}

export default function TypingEffect({ text, speed = 30, onComplete, className, shouldType = true }: TypingEffectProps) {
	const [displayedText, setDisplayedText] = useState(shouldType ? "" : text);
	const onCompleteRef = useRef(onComplete);
	const hasCalledComplete = useRef(false);

	// Reset state if shouldType changes
	useEffect(() => {
		if (!shouldType) {
			setDisplayedText(text);
		}
	}, [shouldType, text]);

	// Sync the ref with the latest onComplete callback
	useEffect(() => {
		onCompleteRef.current = onComplete;
	}, [onComplete]);

	useEffect(() => {
		if (!shouldType) return;

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
	}, [text, speed, shouldType]);

	return <div className={className}>{displayedText}</div>;
}
