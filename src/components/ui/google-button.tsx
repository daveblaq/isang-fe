"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

interface GoogleButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export default function GoogleButton({
  onClick,
  isLoading = false,
}: GoogleButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <Button
        onClick={onClick}
        disabled={isLoading}
        variant="outline"
        className="h-[52px] w-full rounded-[12px] border border-[#E6E8EC] bg-white text-[16px] font-normal hover:bg-gray-50"
      >
        <div className="flex items-center justify-center gap-3">
          <img
            src="https://ik.imagekit.io/yo7dfxczb/workbuddy/google.png?updatedAt=1739016005899"
            alt="Google logo"
            className="h-5 w-5 object-contain"
            loading="lazy"
          />

          <span className="font-inter text-base font-medium text-slate-900">
            Continue with Google
          </span>
        </div>
      </Button>
    </motion.div>
  );
}
