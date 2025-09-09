import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import {Navigation} from "@/components/ui/navigation";
import { Toaster } from "@/components/ui/toaster";
import {Toaster as Sonner} from '@/components/ui/sonner'

export const metadata = {
  title: "Hajj Guide",
  description: "Interactive Hajj guide with progress tracker and admin dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen font-sans antialiased mt-4">
        <TooltipProvider>
          <Toaster />
        <Navigation/>
        <Sonner />
        </TooltipProvider>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
