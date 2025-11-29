import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/primitives";

interface TopNavbarProps {
  isMobile?: boolean;
  activePage?: string;
}

export function TopNavbar({ isMobile = false, activePage = "Dashboard" }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        {!isMobile ? (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses, tasks..."
              className="w-full pl-10 pr-4 py-2.5 bg-muted/50 rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        ) : (
          <h1 className="text-[20px] font-[600]">EduPlatform</h1>
        )}

        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-muted rounded-[12px] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {!isMobile && (
            <div className="flex items-center gap-3 pl-3 border-l border-border">
              <Avatar className="w-9 h-9">
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <div className="hidden xl:block">
                <p className="text-[14px] font-[500]">Muhammad Daffa Ramdhani</p>
                <p className="text-[12px] text-muted-foreground">Student</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobile && activePage !== "Chat" && (
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-muted/50 rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      )}
    </header>
  );
}