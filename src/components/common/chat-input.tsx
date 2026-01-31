import { useRef, useState } from "react";
import { Paperclip, Mic, ArrowUp, Loader2 } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import { useNavigate } from "react-router-dom";

interface ChatInputProps {
	onSend?: (response: any) => void;
	placeholder?: string;
	className?: string;
}

export default function ChatInput({
	onSend,
	placeholder = "Ask me anything! 🌍",
	className = ""
}: ChatInputProps) {
	const [value, setValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const { sendMessage, isLoading } = useChat();
	const navigate = useNavigate();

	const handleSend = async () => {
		if (value.trim() && !isLoading) {
			const currentMessage = value;
			// Clear input immediately for better UX
			setValue("");

			try {
				// Wait for 200 OK
				const data = await sendMessage.mutateAsync({ message: currentMessage });

				// If we have a sessionId, navigate to the specific route
				if (data?.sessionId) {
					navigate(`/chat/${data.sessionId}`);
				}

				// Call optional callback with results
				if (onSend) {
					onSend(data);
				}
			} catch (error) {
				// Error is already handled by useChat hook's onError
				console.error("Failed to send message:", error);
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className={`w-full max-w-4xl mx-auto relative group ${className}`}>
			<div
				onClick={() => inputRef.current?.focus()}
				className="relative bg-white rounded-[24px] border border-gray-200 shadow-xl h-[120px] p-4 flex flex-col justify-between focus-within:ring-2 ring-gray-100 transition-all cursor-text"
			>
				<input
					ref={inputRef}
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					className="w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder:text-gray-400 p-0 focus-visible:ring-0 font-ibm"
				/>

				<div className="flex justify-between items-end">
					<div className="flex items-center gap-4">
						<button className="text-gray-400 hover:text-gray-600 transition-colors">
							<Paperclip className="w-5 h-5" />
						</button>
						<button className="text-gray-400 hover:text-gray-600 transition-colors">
							<Mic className="w-5 h-5" />
						</button>
					</div>

					<button
						onClick={(e) => {
							e.stopPropagation();
							handleSend();
						}}
						disabled={isLoading}
						className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-colors ${value.trim() ? "bg-[#FF855F] hover:bg-[#FF5A1F]" : "bg-[#FFBDAD]"
							} ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
					>
						{isLoading ? (
							<Loader2 className="w-5 h-5 animate-spin" />
						) : (
							<ArrowUp className="w-5 h-5" />
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
