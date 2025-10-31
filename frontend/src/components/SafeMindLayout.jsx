import { useState } from "react";
import { 
  MessageCircle, 
  Heart, 
  Music, 
  BookOpen, 
  Phone, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";
import { Card } from "@/components/UI/card";

const sidebarItems = [
  { id: "chat", label: "Chat", icon: MessageCircle, color: "text-primary" },
  { id: "mood", label: "Mood Tracker", icon: Heart, color: "text-secondary-accent" },
  { id: "music", label: "Playlist", icon: Music, color: "text-accent-strong" },
  { id: "books", label: "Book Recommendations", icon: BookOpen, color: "text-primary" },
  { id: "emergency", label: "Emergency Contacts", icon: Phone, color: "text-destructive" },
  { id: "settings", label: "Settings", icon: Settings, color: "text-muted-foreground" },
];

export default function SafeMindLayout({ children, activeSection, onSectionChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gradient-calm">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-card shadow-soft"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed md:relative inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
      )}>
        <Card className="h-full rounded-none md:rounded-r-3xl border-0 shadow-soft bg-card/95 backdrop-blur-sm">
          <div className="p-6">
            {/* Logo/Title */}
            <div className={cn(
              "mb-8 transition-all duration-300",
              !sidebarOpen && "md:text-center"
            )}>
              <h1 className={cn(
                "font-bold text-primary transition-all duration-300",
                sidebarOpen ? "text-2xl" : "md:text-lg"
              )}>
                {sidebarOpen ? "SafeMind" : "SM"}
              </h1>
              {sidebarOpen && (
                <p className="text-sm text-muted-foreground mt-1">
                  Your personal wellness companion
                </p>
              )}
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-12 transition-all duration-300 hover:shadow-soft",
                      isActive && "bg-primary/10 text-primary shadow-glow border border-primary/20",
                      !sidebarOpen && "md:justify-center md:px-2"
                    )}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors duration-300",
                      isActive ? "text-primary" : item.color,
                      !sidebarOpen && "md:h-6 md:w-6"
                    )} />
                    {sidebarOpen && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar toggle for desktop */}
          <div className="absolute bottom-4 right-4 hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-4 w-4 text-primary" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 p-6 overflow-hidden">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}