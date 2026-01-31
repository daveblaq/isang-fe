import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

interface SignupModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function SignupModal({ open, onOpenChange }: SignupModalProps) {
	const navigate = useNavigate();

	const handleEmailClick = () => {
		onOpenChange(false);
		navigate("/auth");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[440px] p-10 rounded-xl bg-white">
				<DialogHeader className="items-center text-center space-y-4">
					<DialogTitle className="text-3xl font-semibold text-gray-900 font-ibm">
						Welcome to Isang
					</DialogTitle>
					<DialogDescription className="text-gray-500 text-sm leading-relaxed text-center max-w-[280px] font-ibm">
						Create an account or sign in to continue planning your journey.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4 mt-6">
					<Button
						variant="outline"
						className="w-full h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium flex items-center justify-center gap-3 shadow-none"
						onClick={() => console.log("Google Login")}
					>
						<img
							src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
							alt="Google"
							className="w-5 h-5"
						/>
						Continue with Google
					</Button>

					<Button
						className="w-full h-12 rounded-xl bg-[#FF4405] hover:bg-[#E62E05] text-white font-medium shadow-none"
						onClick={handleEmailClick}
					>
						Continue with email
					</Button>
				</div>

				<div className="mt-8 text-center px-4">
					<p className="text-[#0D7B32] text-sm font-medium leading-relaxed font-ibm underline cursor-pointer hover:opacity-80 decoration-1 underline-offset-4">
						Access personalized itineraries, smart recommendations, and trip details built for you
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
