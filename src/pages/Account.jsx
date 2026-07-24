import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { User, Package, Heart, Settings, LogOut, ChevronRight } from "lucide-react";
import { useUpdateMe, useListOrders, useLogoutUser } from "@/lib/api-client";
import { useAuth } from "@/lib/contexts/AuthContext";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
function Account() {
  const [, navigate] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [tab, setTab] = useState("profile");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const { data: orders } = useListOrders({ userId: user?.id }, { query: { enabled: !!user?.id } });
  const updateMeMutation = useUpdateMe();
  const logoutMutation = useLogoutUser();
  if (!isAuthenticated) {
    return <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-serif text-2xl">Please sign in to access your account</p>
        <Link href="/login" className="bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
          Sign In
        </Link>
      </div>;
  }
  const handleLogout = () => {
    logoutMutation.mutate({});
    logout();
    localStorage.removeItem("auth-token");
    toast.success("Signed out");
    navigate("/");
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateMeMutation.mutate(
      { data: { name, phone } },
      { onSuccess: () => toast.success("Profile updated") }
    );
  };
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "settings", label: "Settings", icon: Settings }
  ];
  const statusColors = {
    pending: "text-amber-500",
    processing: "text-blue-500",
    shipped: "text-purple-500",
    delivered: "text-green-500",
    cancelled: "text-red-500"
  };
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12">
          {
    /* Header */
  }
          <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
                {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl font-serif">{user?.name?.[0]}</div>}
              </div>
              <div>
                <h1 className="font-serif text-2xl">{user?.name}</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {
    /* Sidebar */
  }
            <div className="flex flex-col gap-1">
              {tabs.map((t) => <button
    key={t.id}
    onClick={() => setTab(t.id)}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${tab === t.id ? "bg-foreground text-background" : "hover:bg-muted"}`}
  >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>)}
              <Link
    href="/wishlist"
    className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
  >
                <Heart className="w-4 h-4" /> Wishlist
              </Link>
            </div>

            {
    /* Content */
  }
            <div className="md:col-span-3">
              {tab === "profile" && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-2xl mb-8">Profile</h2>
                  <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Full Name</label>
                      <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
  />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Email</label>
                      <input
    value={user?.email}
    disabled
    className="w-full border-b border-border bg-transparent py-2 text-sm text-muted-foreground cursor-not-allowed"
  />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Phone</label>
                      <input
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
  />
                    </div>
                    <button
    type="submit"
    disabled={updateMeMutation.isPending}
    className="px-8 py-3 bg-foreground text-background text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
  >
                      {updateMeMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </motion.div>}

              {tab === "orders" && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-2xl mb-8">Order History</h2>
                  {!orders?.items.length ? <div className="text-center py-16">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No orders yet</p>
                      <Link href="/shop" className="mt-4 inline-block text-sm underline underline-offset-4">Browse Collection</Link>
                    </div> : <div className="space-y-4">
                      {orders.items.map((order) => <Link key={order.id} href={`/orders/${order.id}`} className="flex items-center justify-between p-6 border border-border hover:border-foreground transition-colors group">
                          <div>
                            <p className="font-medium text-sm">Order #{order.id}</p>
                            <p className="text-xs text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className={`text-xs mt-1 uppercase tracking-wider font-medium ${statusColors[order.status] || "text-muted-foreground"}`}>{order.status}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">{formatCurrency(order.total)}</span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                        </Link>)}
                    </div>}
                </motion.div>}

              {tab === "settings" && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-2xl mb-8">Settings</h2>
                  <div className="space-y-6 max-w-md">
                    <div className="p-6 border border-border">
                      <h3 className="font-medium text-sm mb-1">Account Role</h3>
                      <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                    </div>
                    <div className="p-6 border border-border">
                      <h3 className="font-medium text-sm mb-1">Member Since</h3>
                      <p className="text-xs text-muted-foreground">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "\u2014"}</p>
                    </div>
                    {user?.role === "admin" && <Link href="/admin" className="block p-6 border border-foreground bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity">
                        Go to Admin Dashboard →
                      </Link>}
                    <button
    onClick={handleLogout}
    className="w-full p-4 border border-red-200 text-red-500 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
  >
                      Sign Out
                    </button>
                  </div>
                </motion.div>}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>;
}
export {
  Account
};
