import {
  BookOpen,
  Settings,
  Receipt,
  Languages,
  HelpCircle,
  Sparkles,
  MessageSquare,
  FileText,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type UserMenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  to?: string;
};

export const primaryUserMenu: UserMenuItem[] = [
  { id: "quiz", label: "Take travel quiz", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings, to: "/settings" },
  { id: "receipts", label: "Receipts", icon: Receipt },
  { id: "language", label: "Language", icon: Languages },
  { id: "help", label: "Get help", icon: HelpCircle },
];

export const secondaryUserMenu: UserMenuItem[] = [
  { id: "plan", label: "Upgrade plan", icon: Sparkles },
  { id: "feedback", label: "Give feedback", icon: MessageSquare },
  { id: "terms", label: "Terms of service", icon: FileText },
];

export const logoutMenu: UserMenuItem = {
  id: "logout",
  label: "Log out",
  icon: LogOut,
};
