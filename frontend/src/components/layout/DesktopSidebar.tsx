import { Home, BookOpen, CheckSquare, MessageSquare, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/primitives";
import { cn } from "../../lib/utils";

interface DesktopSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function DesktopSidebar({ activePage, onNavigate }: DesktopSidebarProps) {
  const menuItems = [
    { icon: Home, label: "Dashboard" },
    { icon: BookOpen, label: "Courses" },
    { icon: CheckSquare, label: "Tasks" },
    { icon: MessageSquare, label: "Chat" },
    { icon: User, label: "Profile" },
  ];

  return (
    <aside className="sticky top-0 flex flex-col w-64 h-screen bg-white border-r border-border">
      <div className="p-6 border-b border-border">
        <h1 className="text-[24px] font-[600] tracking-tight">EduPlatform</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all duration-200",
              activePage === item.label
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-foreground/70 hover:bg-muted hover:translate-x-1"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[15px]">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-[12px] hover:bg-muted cursor-pointer transition-colors">
          <Avatar>
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-[14px] font-[500] truncate">Muhammad Daffa Ramdhani</p>
            <p className="text-[13px] text-muted-foreground truncate">Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
}