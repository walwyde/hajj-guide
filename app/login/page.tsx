// 'use client';
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function submit(e: React.FormEvent) {
//     try {

//       e.preventDefault();
//       setLoading(true);
//       setError(null);
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify({ email, password })
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (!res.ok) { setError(data.error || 'Login failed'); return; }
//       router.push('/dashboard');
//     } catch {
//       setLoading(false);
//       setError('An unexpected error occurred');
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto card">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form className="space-y-3" onSubmit={submit}>
//         <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
//         <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
//         {error && <div className="text-red-400 text-sm">{error}</div>}
//         <button className="btn w-full" disabled={loading}>{loading ? '...' : 'Login'}</button>
//       </form>
//     </div>
//   )
// }
 'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const navigate = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      setLoading(false);
      
      if (!res.ok) { 
        setError(data.error || 'Login failed'); 
        return; 
      }
      
      navigate.replace('/dashboard');
    } catch {
      setLoading(false);
      setError('An unexpected error occurred');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link 
                    href="/register" 
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}