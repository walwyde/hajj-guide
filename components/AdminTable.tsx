
// 'use client';
// import { useEffect, useMemo, useState } from "react";
// import { Search, Users, UserCheck, UserX, Trash2, Shield, User } from "lucide-react";

// export default function AdminTable() {
//   const [users, setUsers] = useState<any[]>([]);
//   const [q, setQ] = useState("");

//   async function load() {
//     const res = await fetch('/api/users');
//     const data = await res.json();
//     setUsers(data.users || []);
//   }

//   useEffect(() => { 
//     load(); 
//     const t = setInterval(load, 15000); 
//     return () => clearInterval(t); 
//   }, []);

//   const filtered = useMemo(() => {
//     const s = q.toLowerCase();
//     return users.filter(u => 
//       (u.email || '').toLowerCase().includes(s) || 
//       (u.name || '').toLowerCase().includes(s)
//     );
//   }, [users, q]);

//   async function setRole(id: string, role: string) {
//     await fetch(`/api/users/${id}`, { 
//       method: 'PATCH', 
//       headers: {'Content-Type':'application/json'}, 
//       body: JSON.stringify({ role })
//     });
//     load();
//   }

//   async function remove(id: string) {
//     if (!confirm('Delete user?')) return;
//     await fetch(`/api/users/${id}`, { method: 'DELETE' });
//     load();
//   }

//   const formatLastSeen = (lastSeen: string) => {
//     if (!lastSeen) return '—';
//     const date = new Date(lastSeen);
//     const now = new Date();
//     const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${diffInHours}h ago`;
//     if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="min-h-screen bg-subtle-gradient p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <div className="flex items-center justify-center gap-3">
//             <div className="p-3 bg-primary/10 rounded-xl">
//               <Users className="w-8 h-8 text-primary" />
//             </div>
//             <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
//           </div>
//           <p className="text-muted-foreground text-lg">Manage users, roles, and monitor activity</p>
//         </div>

//         {/* Search & Stats */}
//         <div className="admin-card p-6">
//           <div className="flex flex-col md:flex-row gap-6 items-center">
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//               <input 
//                 className="admin-input pl-10 w-full" 
//                 placeholder="Search users by name or email..." 
//                 value={q} 
//                 onChange={e => setQ(e.target.value)} 
//               />
//             </div>
            
//             <div className="flex items-center gap-6 text-sm">
//               <div className="flex items-center gap-2">
//                 <div className="status-dot status-dot-online"></div>
//                 <span className="text-success font-medium">
//                   {users.filter(u => u.online).length} Online
//                 </span>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <Users className="w-4 h-4 text-muted-foreground" />
//                 <span className="text-muted-foreground">
//                   {users.length} Total Users
//                 </span>
//               </div>
              
//               <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full">
//                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
//                 <span className="text-primary font-medium text-xs">
//                   Live Updates
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Table */}
//         <div className="admin-card overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>User</th>
//                   <th>Role</th>
//                   <th>Progress</th>
//                   <th>Status</th>
//                   <th>Last Activity</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="text-center py-12">
//                       <div className="flex flex-col items-center gap-3">
//                         <UserX className="w-12 h-12 text-muted-foreground/50" />
//                         <p className="text-muted-foreground">No users found</p>
//                         {q && (
//                           <button 
//                             onClick={() => setQ('')}
//                             className="text-primary hover:text-primary-light text-sm underline"
//                           >
//                             Clear search
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filtered.map(u => (
//                     <tr key={u._id}>
//                       <td>
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
//                             <User className="w-5 h-5 text-primary" />
//                           </div>
//                           <div>
//                             <div className="font-medium text-foreground">
//                               {u.name || 'Unnamed User'}
//                             </div>
//                             <div className="text-sm text-muted-foreground">
//                               {u.email}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
                      
//                       <td>
//                         <select 
//                           className="admin-select w-auto min-w-[100px]" 
//                           value={u.role} 
//                           onChange={e => setRole(u._id, e.target.value)}
//                         >
//                           <option value="user">
//                             👤 User
//                           </option>
//                           <option value="admin">
//                             🛡️ Admin
//                           </option>
//                         </select>
//                       </td>
                      
//                       <td>
//                         <div className="flex items-center gap-3">
//                           <div className="flex-1 bg-muted rounded-full h-2 w-20">
//                             <div 
//                               className="bg-primary h-2 rounded-full transition-all duration-300"
//                               style={{ 
//                                 width: `${u.totalSteps > 0 ? (u.completedCount / u.totalSteps) * 100 : 0}%` 
//                               }}
//                             ></div>
//                           </div>
//                           <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
//                             {u.completedCount || 0} / {u.totalSteps || 0}
//                           </span>
//                         </div>
//                       </td>
                      
//                       <td>
//                         {u.online ? (
//                           <div className="status-online">
//                             <div className="status-dot status-dot-online"></div>
//                             Online
//                           </div>
//                         ) : (
//                           <div className="status-offline">
//                             <div className="status-dot status-dot-offline"></div>
//                             Offline
//                           </div>
//                         )}
//                       </td>
                      
//                       <td className="text-muted-foreground">
//                         {formatLastSeen(u.lastSeen)}
//                       </td>
                      
//                       <td>
//                         <button 
//                           className="admin-button-destructive flex items-center gap-1.5"
//                           onClick={() => remove(u._id)}
//                         >
//                           <Trash2 className="w-3 h-3" />
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {filtered.length > 0 && (
//           <div className="text-center text-muted-foreground text-sm">
//             Showing {filtered.length} of {users.length} users
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { Search, Users, UserCheck, UserX, Trash2, Shield, User, Activity, Calendar, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/useToast";

type Mockuser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  online: boolean;
  lastSeen: string;
  completedCount: number;
  totalSteps: number;
  joinedDate: string;
}
export default function AdminDashboard() {
  const [users, setUsers] = useState<Mockuser[]>([]);
  const [q, setQ] = useState("");
  var [loadAttempt, setLoadAttempt] = useState(0)
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Mock data for demonstration
  const mockUsers = [
    {
      _id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      role: 'admin',
      online: true,
      lastSeen: new Date().toISOString(),
      completedCount: 8,
      totalSteps: 10,
      joinedDate: '2024-01-15'
    },
    {
      _id: '2', 
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'user',
      online: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      completedCount: 5,
      totalSteps: 12,
      joinedDate: '2024-02-20'
    },
    {
      _id: '3',
      name: 'Mohammed Ali',
      email: 'mohammed.ali@email.com', 
      role: 'user',
      online: true,
      lastSeen: new Date().toISOString(),
      completedCount: 12,
      totalSteps: 15,
      joinedDate: '2024-01-08'
    },
    {
      _id: '4',
      name: 'Fatima Al-Zahra',
      email: 'fatima.alzahra@email.com',
      role: 'user', 
      online: false,
      lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      completedCount: 3,
      totalSteps: 8,
      joinedDate: '2024-03-10'
    },
    {
      _id: '5',
      name: 'Omar Abdullah',
      email: 'omar.abdullah@email.com',
      role: 'user',
      online: true,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      completedCount: 7,
      totalSteps: 9,
      joinedDate: '2024-02-28'
    }
  ];

 const MAX_RETRIES = 3;
const POLL_INTERVAL = 15000; // 15 seconds

  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      // Always show loading state for better UX
      if(loadAttempt < 3) setLoading(true);
      setError(null); // Clear previous errors

      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();

      setUsers(data.users || []);
      setLoadAttempt(prev => {
        const newAttempt = prev + 1;
        console.log('Load attempt:', newAttempt); // Log updated value
        return newAttempt;
      });
    } catch (error) {
      console.error('Failed to load users:', error);
      setError('Failed to load users. Using fallback data.');
      setUsers(mockUsers); // Fallback to mock data
      // Optional: Stop polling after too many failures
      if (loadAttempt >= MAX_RETRIES) {
        console.warn('Max retries reached. Stopping polling.');
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(); // Initial load
    const intervalId = setInterval(load, POLL_INTERVAL);
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return users.filter(u => 
      (u.email || '').toLowerCase().includes(s) || 
      (u.name || '').toLowerCase().includes(s)
    );
  }, [users, q]);

  async function setRole(id: string, role: string) {
    try {

      setUsers(prev => prev.map(u => u._id === id ? {...u, role} : u));
       const res = await fetch(`/api/users/${id}`, { 
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({ role })
      });
      if(!res.ok) return toast.toast({title: "user role not updated", variant: "destructive"})
      load();
    return toast.toast({title: "user role updated", content: `user has ${role} privileges`, variant: "success"})
    } catch (error) {
      console.log(error)
    }
  }

  async function remove(id:string) {
    try {
      const res =  await fetch(`/api/users/${id}`, { method: 'DELETE' });

      if(!res.ok) return toast.toast({"title": "something went wrong", variant: "destructive"})
      if (!confirm('Delete user?')) return;
      setUsers(prev => prev.filter(u => u._id !== id));
      if (!confirm('Delete user?')) return;

      load();
      toast.toast({"title": "User removed!", variant: 'default'})
      
    } catch (error) {
      console.log(error)
      toast.toast({title: "user could not be deleted", variant: "destructive"})
      return setLoading(false)
    }
  }

  const formatLastSeen = (lastSeen: string) => {
    if (!lastSeen) return '—';
    const date = new Date(lastSeen);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const stats = useMemo(() => ({
    total: users.length,
    online: users.filter(u => u.online).length,
    admins: users.filter(u => u.role === 'admin').length,
    activeToday: users.filter(u => {
      if (!u.lastSeen) return false;
      const lastSeen = new Date(u.lastSeen);
      const today = new Date();
      return lastSeen.toDateString() === today.toDateString();
    }).length
  }), [users]);

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden bg-gradient-hero rounded-2xl p-8 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-white/80 text-lg">Manage users and monitor system activity</p>
              </div>
            </div>
            
            {/* Live indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Dashboard</span>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-card-border rounded-xl p-6 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            </div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-6 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.online}</div>
            </div>
            <div className="text-sm text-muted-foreground">Online Now</div>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-6 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.admins}</div>
            </div>
            <div className="text-sm text-muted-foreground">Administrators</div>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-6 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.activeToday}</div>
            </div>
            <div className="text-sm text-muted-foreground">Active Today</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-card-border rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" 
                placeholder="Search users by name or email..." 
                value={q} 
                onChange={e => setQ(e.target.value)} 
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-green-600">{stats.online} Online</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {filtered.length} of {users.length} users
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                Loading users...
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Progress</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Last Activity</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                          <UserX className="w-16 h-16 text-muted-foreground/50" />
                          <div>
                            <p className="text-lg font-medium text-foreground mb-1">No users found</p>
                            <p className="text-muted-foreground">
                              {q ? 'Try adjusting your search terms' : 'No users available'}
                            </p>
                          </div>
                          {q && (
                            <button 
                              onClick={() => setQ('')}
                              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            >
                              Clear search
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map(u => (
                      <tr key={u._id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">
                                {u.name || 'Unnamed User'}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {u.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="p-4">
                          <select 
                            className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" 
                            value={u.role} 
                            onChange={e => setRole(u._id, e.target.value)}
                          >
                            <option value="user">👤 User</option>
                            <option value="admin">🛡️ Admin</option>
                          </select>
                        </td>
                        
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-muted rounded-full h-2 w-24">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full transition-all duration-500 shadow-glow"
                                style={{ 
                                  width: `${u.totalSteps > 0 ? (u.completedCount / u.totalSteps) * 100 : 0}%` 
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                              {u.completedCount || 0} / {u.totalSteps || 0}
                            </span>
                          </div>
                        </td>
                        
                        <td className="p-4">
                          {u.online ? (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              Online
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              Offline
                            </div>
                          )}
                        </td>
                        
                        <td className="p-4 text-muted-foreground text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {formatLastSeen(u.lastSeen)}
                          </div>
                        </td>
                        
                        <td className="p-4">
                          <button 
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                            onClick={() => remove(u._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {filtered.length > 0 && (
          <div className="bg-card border border-card-border rounded-xl p-4">
            <div className="text-center text-muted-foreground text-sm">
              Showing {filtered.length} of {users.length} users • Last updated {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}