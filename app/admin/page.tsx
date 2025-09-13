'use client';
import { redirect } from "next/navigation";
import AdminTable from "@/components/AdminTable";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/useToast";


export default function AdminPage() {
  const [user, setUser] = useState<{role: string;} | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  async function requireAdmin() {

  try {
    setLoading(true);
    const res = await fetch("/api/session");
    if(res?.ok) {
      const data = await res.json();
      if(data.user.role !== "admin") {
        toast({title: "unauthorized", variant: "destructive"})
        redirect("/dashboard");
      };
      setUser(s => ({...s, ...data.user}));
      setLoading(false);
    }
    setLoading(false);

  } catch (error) {
    console.log(error)
    setLoading(false)
    return null;
  }
}

  useEffect(() => {
   requireAdmin();
  },[])
  
  return loading ? (<div>Loading ..... </div>) : (
    <div className="space-y-4">
      <AdminTable />
    </div>
  )
}
