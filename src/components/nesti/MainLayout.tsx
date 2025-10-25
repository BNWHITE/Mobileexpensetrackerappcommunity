import { ReactNode, useState } from "react";
import { Home, Calendar, Users, Compass, Settings, Bell, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import nestiLogo from "figma:asset/bc152d65360f7c7224736e313603b3d66553bb79.png";

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  nestName?: string;
  userName?: string;
  userRole?: "admin" | "parent" | "adult" | "teen" | "grandparent" | "guest";
}

export function MainLayout({
  children,
  currentPage,
  onNavigate,
  nestName = "Famille Martin",
  userName = "Sophie",
  userRole = "admin",
}: MainLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationCount] = useState(3);

  const navItems = [
    { id: "feed", label: "Accueil", icon: Home },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "nest", label: "Mon Nest", icon: Users },
    { id: "discoveries", label: "Découvertes", icon: Compass },
    { id: "settings", label: "Réglages", icon: Settings },
  ];

  const getRoleBadgeClass = (role: string) => {
    const classes = {
      admin: "role-badge-admin",
      parent: "role-badge-parent",
      adult: "role-badge-adult",
      teen: "role-badge-teen",
      grandparent: "role-badge-grandparent",
      guest: "role-badge-guest",
    };
    return classes[role as keyof typeof classes] || "role-badge-guest";
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`mobile-container min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Nest Name */}
            <div className="flex items-center gap-3">
              <img 
                src={nestiLogo} 
                alt="Nesti" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-base font-semibold text-foreground">NESTI</h1>
                <p className="text-xs text-muted-foreground">{nestName}</p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-warning" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* User Avatar */}
              <Avatar className="w-9 h-9 border-2 border-primary/20">
                <AvatarFallback className={`${getRoleBadgeClass(userRole)} text-white text-sm`}>
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 z-50 bg-card border-t border-border backdrop-blur-lg">
        <div className="px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="text-xs font-medium">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
