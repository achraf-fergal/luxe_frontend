import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useRegisterUser } from "@/lib/api-client";
import { useAuth } from "@/lib/contexts/AuthContext";
import { PageTransition } from "@/components/layout/PageTransition";
import { toast } from "sonner";
function Register() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const registerMutation = useRegisterUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(
      { data: { name, email, password } },
      {
        onSuccess: (data) => {
          if (data.token) localStorage.setItem("auth-token", data.token);
          login(data.user);
          toast.success(`Welcome to LUXE, ${data.user.name}`);
          navigate("/account");
        },
        onError: () => toast.error("Registration failed. Email may already be in use.")
      }
    );
  };
  return <PageTransition>
      <div className="min-h-screen flex">
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop"
    alt="Luxe"
    className="absolute inset-0 w-full h-full object-cover"
  />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-16 left-16 text-white">
            <p className="font-serif text-4xl mb-2">Join the circle.</p>
            <p className="text-white/70 text-sm">Exclusive access, exceptional pieces.</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
            <Link href="/" className="block font-serif text-2xl font-bold tracking-widest uppercase mb-12">LUXE</Link>

            <h1 className="font-serif text-3xl mb-2">Create Account</h1>
            <p className="text-muted-foreground text-sm mb-10">
              Already a member?{" "}
              <Link href="/login" className="text-foreground underline underline-offset-4">Sign in</Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
    { label: "Full Name", value: name, setter: setName, type: "text", placeholder: "Your name" },
    { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "your@email.com" },
    { label: "Password", value: password, setter: setPassword, type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }
  ].map((field) => <div key={field.label}>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">{field.label}</label>
                  <input
    type={field.type}
    value={field.value}
    onChange={(e) => field.setter(e.target.value)}
    required
    className="w-full border-b border-border bg-transparent py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
    placeholder={field.placeholder}
  />
                </div>)}

              <button
    type="submit"
    disabled={registerMutation.isPending}
    className="w-full bg-foreground text-background py-4 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40"
  >
                {registerMutation.isPending ? "Creating..." : "Create Account"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </PageTransition>;
}
export {
  Register
};
