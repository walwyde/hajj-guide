// 'use client';
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [fields, setFields] = useState<{ name: string; email: string; password: string; error: string | null }>({
//     name: '',
//     email: '',
//     password: '',
//     error: null,
//   });
//   const [loading, setLoading] = useState<boolean>(false);

//   const setField = (key: 'name' | 'email' | 'password', value: string) => {
//     setFields(prev => ({ ...prev, [key]: value }));
//   };
//   const setError = (error: string | null) => {
//     setFields(prev => ({ ...prev, error }));
//   };
//   const { name, email, password, error } = fields;

//   async function submit(e: React.FormEvent) {
//     try {

//       e.preventDefault();
//       setLoading(true);
//       setError(null);
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify({ name, email, password })
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (!res.ok) { setError(data.error || 'Registration failed'); return; }
//       router.push('/dashboard');
//     } catch {
//       setLoading(false);
//       setError('An unexpected error occurred');
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto card">
//       <h1 className="text-2xl font-bold mb-4">Create Account</h1>
//       <form className="space-y-3" onSubmit={submit}>
//         <input className="input" placeholder="Name" value={name} onChange={e => setField('name', e.target.value)} />
//         <input className="input" placeholder="Email" value={email} onChange={e => setField('email', e.target.value)} />
//         <input className="input" placeholder="Password" type="password" value={password} onChange={e => setField('password', e.target.value)} />
//         {error && <div className="text-red-400 text-sm">{error}</div>}
//         <button className="btn w-full" disabled={loading}>{loading ? '...' : 'Register'}</button>
//       </form>
//     </div>
//   )
// }
'use client';
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, UserPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const navigate = useRouter();
  const [fields, setFields] = useState<{ name: string; email: string; password: string; error: string | null }>({
    name: '',
    email: '',
    password: '',
    error: null,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const setField = (key: 'name' | 'email' | 'password', value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };
  const setError = (error: string | null) => {
    setFields(prev => ({ ...prev, error }));
  };
  const { name, email, password, error } = fields;

  async function submit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) { setError(data.error || 'Registration failed'); return; }
      navigate.push('/dashboard');
    } catch {
      setLoading(false);
      setError('An unexpected error occurred');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-hero opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-primary opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link  href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Registration Card */}
        <Card className="shadow-large border-card-border animate-scale-in">
          <CardHeader className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-2">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join us today and start your journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={submit}>
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setField('name', e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setField('email', e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={e => setField('password', e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive" className="animate-fade-in">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full h-11" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-accent hover:text-accent-light transition-colors font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-accent hover:text-accent-light transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-accent hover:text-accent-light transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}