import { useRef } from "react";
import { Paperclip, Mic, ArrowUp } from "lucide-react";

export default function InputArea() {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="p-4 md:px-6 md:pb-6 shrink-0 border-t border-gray-50">
			<div className="max-w-4xl mx-auto relative group">
				<div
					onClick={() => inputRef.current?.focus()}
					className="relative bg-white rounded-[16px] border border-gray-200 shadow-lg h-[116px] p-4 flex flex-col justify-between focus-within:ring-2 ring-gray-100 ring-offset-2 transition-all cursor-text"
				>
					<input
						ref={inputRef}
						type="text"
						placeholder="Ask me anything! 🌍"
						className="w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder:text-gray-400 p-0 focus-visible:ring-0"
					/>

					<div className="flex justify-between items-end">
						<div className="flex items-center gap-3">
							<button className="text-gray-400 hover:text-gray-600 transition-colors">
								<Paperclip className="w-5 h-5" />
							</button>
							<button className="text-gray-400 hover:text-gray-600 transition-colors">
								<Mic className="w-5 h-5" />
							</button>
						</div>

						<button className="w-10 h-10 rounded-lg bg-[#FF855F] hover:bg-[#FF5A1F] flex items-center justify-center text-white transition-colors">
							<ArrowUp className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
