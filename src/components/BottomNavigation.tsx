import { useLocation, useNavigate } from "react-router-dom";
import { Home, Clock, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: "home",
      label: "Início",
      icon: Home,
      path: "/home"
    },
    {
      id: "history",
      label: "Histórico",
      icon: Clock,
      path: "/history"
    },
    {
      id: "donations",
      label: "Doações",
      icon: Heart,
      path: "/donations"
    },
    {
      id: "profile",
      label: "Perfil",
      icon: User,
      path: "/profile"
    }
  ];

  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 flex-1",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;