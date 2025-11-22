import { Home, BookOpen, CheckSquare, MessageSquare, User } from "lucide-react";
import { cn } from "../../lib/utils";

interface MobileBottomNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function MobileBottomNav({ activePage, onNavigate }: MobileBottomNavProps) {
  const navItems = [
    { icon: Home, label: "Dashboard" },
    { icon: BookOpen, label: "Courses" },
    { icon: CheckSquare, label: "Tasks" },
    { icon: MessageSquare, label: "Chat" },
    { icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-2 pb-safe z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-[12px] transition-all min-w-[64px]",
              activePage === item.label ? "text-primary bg-primary/5" : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("w-5 h-5 transition-transform", activePage === item.label && "scale-110")} />
            <span className={cn("text-[10px]", activePage === item.label && "font-[600]")}>
              {item.label === "Dashboard" ? "Home" : item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}