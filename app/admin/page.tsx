import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminTable from "@/components/AdminTable";

async function requireAdmin() {
  const session = await getSession();
  if (!session.user) redirect('/login');
  if (session.user.role !== 'admin') redirect('/dashboard');
  return session.user;
}

export default async function AdminPage() {
  await requireAdmin();
  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-300">Monitor online users and manage accounts.</p>
      </div>
      <AdminTable />
    </div>
  )
}
