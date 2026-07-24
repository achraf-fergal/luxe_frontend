import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useLoginUser } from "@/lib/api-client";
import { useAuth } from "@/lib/contexts/AuthContext";
import { PageTransition } from "@/components/layout/PageTransition";
import { toast } from "sonner";
function Login() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const loginMutation = useLoginUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      { data: { email, password } },
      {
        onSuccess: (data) => {
          if (data.token) localStorage.setItem("auth-token", data.token);
          login(data.user);
          toast.success(`Welcome back, ${data.user.name}`);
          navigate("/account");
        },
        onError: () => toast.error("Invalid email or password")
      }
    );
  };
  return <PageTransition>
      <div className="min-h-screen flex">
        {
    /* Image Panel */
  }
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
    alt="Luxe"
    className="absolute inset-0 w-full h-full object-cover"
  />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-16 left-16 text-white">
            <p className="font-serif text-4xl mb-2">Welcome back.</p>
            <p className="text-white/70 text-sm">Your exclusive world awaits.</p>
          </div>
        </div>

        {
    /* Form Panel */
  }
        <div className="flex-1 flex items-center justify-center px-8 py-16">
          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-sm"
  >
            <Link href="/" className="block font-serif text-2xl font-bold tracking-widest uppercase mb-12">LUXE</Link>

            <h1 className="font-serif text-3xl mb-2">Sign In</h1>
            <p className="text-muted-foreground text-sm mb-10">Don't have an account?{" "}
              <Link href="/register" className="text-foreground underline underline-offset-4">Create one</Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Email</label>
                <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    autoComplete="email"
    className="w-full border-b border-border bg-transparent py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
    placeholder="your@email.com"
  />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Password</label>
                <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    autoComplete="current-password"
    className="w-full border-b border-border bg-transparent py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
    placeholder="••••••••"
  />
              </div>

              <button
    type="submit"
    disabled={loginMutation.isPending}
    className="w-full bg-foreground text-background py-4 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40"
  >
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-8">
              Demo: alex@example.com / password123
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>;
}
export {
  Login
};
