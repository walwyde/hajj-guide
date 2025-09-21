'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import cn from "@/lib/utils/cn";
import { Toast } from "./toast";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { logOut } from "@/state/authSlice";
// import { Form } from "radix-ui";

export type userProp = {name: string; role: string, id: string}

export interface NavigationProps {
    className?: string;
    userProp: userProp | null;
}

export function Navigation({ className, userProp }: NavigationProps) {
  const dispatch = useDispatch();
  
  const {isAuthenticated, loading} = useSelector((state: RootState) => state.auth)


  const LogOut = async () => {

  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });
    if (!res.ok) { 
      <Toast content="Logout Failed" /> 
      return; 
    }
    dispatch(logOut())
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");

    window.location.href = '/register';
  } catch (error) {
    console.error('An unexpected error occurred during logout', error);
  }
}

  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Scholar", href: "/scholar/login" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 bg-glass-bg backdrop-blur-md border-b border-glass-border",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              <a href="/">Hajj-Guide</a>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
           {!isAuthenticated && ( <Button variant="ghost" size="sm">
              <a href="/login">Sign In</a>
            </Button>)}
              {isAuthenticated && (<Button variant="ghost" size="sm" onClick={LogOut}>
                Sign Out
              </Button>)}
            <Button variant="hero" size="sm" asChild>
              <a href="/guide">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-glass-border animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" size="sm" className="justify-start">
                  Sign In
                </Button>
                <Button variant="hero" size="sm" className="justify-start" asChild>
                  <a href="/register">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}