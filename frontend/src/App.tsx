import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import { DesktopSidebar } from "./components/layout/DesktopSidebar";
import { TopNavbar } from "./components/layout/TopNavbar";
import { MobileBottomNav } from "./components/layout/MobileBottomNav";

// Pages
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Tasks from "./pages/Tasks";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

// --- GLOBAL STYLES (Untuk inject CSS variable) ---
const GlobalStyles = () => (
  <style>{`
    :root {
      --background: #ffffff;
      --foreground: #030213;
      --card: #ffffff;
      --card-foreground: #030213;
      --popover: #ffffff;
      --popover-foreground: #030213;
      --primary: #030213;
      --primary-foreground: #ffffff;
      --secondary: #f4f4f5;
      --secondary-foreground: #18181b;
      --muted: #ececf0;
      --muted-foreground: #717182;
      --accent: #f4f4f5;
      --accent-foreground: #18181b;
      --destructive: #ef4444;
      --destructive-foreground: #ffffff;
      --border: rgba(0, 0, 0, 0.1);
      --input: #e4e4e7;
      --ring: #030213;
      --radius: 0.75rem;
    }
    body {
      font-family: "Inter", sans-serif;
      background-color: #f8f9fc;
      color: var(--foreground);
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard": return <Dashboard isMobile={isMobile} />;
      case "Courses": return <Courses isMobile={isMobile} />;
      case "Tasks": return <Tasks isMobile={isMobile} />;
      case "Chat": return <Chat isMobile={isMobile} />;
      case "Profile": return <Profile isMobile={isMobile} />;
      default: return <Dashboard isMobile={isMobile} />;
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 text-foreground">
        <GlobalStyles />
        <TopNavbar isMobile={true} activePage={activePage} />
        <AnimatePresence mode="wait">
          <motion.div 
            key={activePage} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.2 }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
        <MobileBottomNav activePage={activePage} onNavigate={setActivePage} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-foreground">
      <GlobalStyles />
      <DesktopSidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <TopNavbar />
        <AnimatePresence mode="wait">
          <motion.div 
             key={activePage}
             className="flex flex-col flex-1 overflow-hidden"
             initial={{ opacity: 0, x: 10 }} 
             animate={{ opacity: 1, x: 0 }} 
             exit={{ opacity: 0, x: -10 }}
             transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}