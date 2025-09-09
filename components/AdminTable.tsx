'use client';
import { useEffect, useMemo, useState } from "react";

export default function AdminTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [q, setQ] = useState("");

  async function load() {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data.users || []);
  }

  useEffect(() => { load(); const t=setInterval(load, 15000); return ()=>clearInterval(t); }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return users.filter(u => (u.email||'').toLowerCase().includes(s) || (u.name||'').toLowerCase().includes(s));
  }, [users, q]);

  async function setRole(id: string, role: string) {
    await fetch(`/api/users/${id}`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ role })});
    load();
  }

  async function remove(id: string) {
    if (!confirm('Delete user?')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-4">
      <div className="card flex items-center gap-3">
        <input className="input" placeholder="Search name or email..." value={q} onChange={e=>setQ(e.target.value)} />
        <div className="text-sm text-slate-400 ml-auto">Online now updates live</div>
      </div>
      <div className="card overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Progress</th>
              <th>Last Seen</th>
              <th>Online</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select className="input" value={u.role} onChange={e=>setRole(u._id, e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>{u.completedCount} / {u.totalSteps}</td>
                <td>{u.lastSeen ? new Date(u.lastSeen).toLocaleString() : '—'}</td>
                <td>{u.online ? '✅' : '—'}</td>
                <td>
                  <button className="btn" onClick={()=>remove(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
