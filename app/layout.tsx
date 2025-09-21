'use client';
import React, {useEffect, useState} from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import {Navigation, userProp} from "@/components/ui/navigation";
import { Toaster } from "@/components/ui/toaster";
import {Toaster as Sonner} from '@/components/ui/sonner'
import FloatingPrayerButton from "@/components/prayerButton";
import { toast } from "sonner";
import { Loader2, LoaderIcon } from "lucide-react";
import { AppProvider } from "@/state/StoreProvider";
// export const metadata = {
//   title: "Hajj Guide",
//   description: "Interactive Hajj guide with progress tracker and admin dashboard",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userProp | null>(null);

 const [loading, setLoading] = useState(false)
  const loadUSer = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/session');
    
      if(res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
      setLoading(false)
      
    } catch (err:any) {
      console.log(err)
      toast.error(err.statusText)
      setUser(null)
      setLoading(false)
    }
  }

  useEffect(() => {loadUSer()}, [])

  return loading? (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    ) : (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen font-sans antialiased mt-4">
        <main className="max-w-5xl mx-auto px-4 py-6">
                 
          <AppProvider>
        <TooltipProvider>
        <Navigation userProp={user}/>
          <Toaster />
        <Sonner />
        <FloatingPrayerButton />
         { children}
        </TooltipProvider>
        </AppProvider>

        </main>
      </body>
    </html>
  );
}
