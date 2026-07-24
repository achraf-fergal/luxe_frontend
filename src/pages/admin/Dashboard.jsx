import { Link } from "wouter";
import { motion } from "framer-motion";
import { Package, ShoppingBag, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useGetAnalyticsSummary, useListOrders, useListProducts } from "@/lib/api-client";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatCurrency } from "@/lib/utils";
const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Customers" },
  { href: "/admin/analytics", label: "Analytics" }
];
function AdminLayout({ children }) {
  return <div className="pt-16 min-h-screen flex">
      <div className="hidden md:flex w-56 border-r border-border flex-col pt-8 gap-1 bg-muted/20 shrink-0">
        <div className="px-6 mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Admin</p>
          <p className="font-serif text-xl mt-1">LUXE</p>
        </div>
        {ADMIN_NAV.map((link) => <Link
    key={link.href}
    href={link.href}
    className="px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
  >
            {link.label}
          </Link>)}
        <div className="mt-auto px-6 pb-8 pt-4 border-t border-border">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Back to Store</Link>
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>;
}
function StatCard({ title, value, icon: Icon, change, color = "bg-muted" }) {
  const isPositive = change >= 0;
  return <div className="border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change !== void 0 && <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>}
      </div>
      <p className="text-2xl font-medium mb-1">{value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-widest">{title}</p>
    </div>;
}
function AdminDashboard() {
  const { data: analytics } = useGetAnalyticsSummary();
  const { data: recentOrders } = useListOrders({ limit: 5 });
  const { data: products } = useListProducts({ limit: 5 });
  const statusColors = {
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700"
  };
  return <AdminLayout>
      <PageTransition>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin</p>
          </div>

          {
    /* Stats */
  }
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
              <StatCard title="Total Revenue" value={formatCurrency(analytics?.totalRevenue || 0)} icon={DollarSign} change={12} color="bg-green-100 text-green-700" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <StatCard title="Total Orders" value={analytics?.totalOrders || 0} icon={ShoppingBag} change={8} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <StatCard title="Customers" value={analytics?.totalCustomers || 0} icon={Users} change={5} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <StatCard title="Products" value={analytics?.totalProducts || 0} icon={Package} change={void 0} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {
    /* Recent Orders */
  }
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-sm uppercase tracking-widest">Recent Orders</h2>
                <Link href="/admin/orders" className="text-xs text-muted-foreground hover:text-foreground transition-colors">View All →</Link>
              </div>
              <div className="border border-border divide-y divide-border">
                {recentOrders?.items.map((order) => <div key={order.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div>
                      <p className="text-sm font-medium">Order #{order.id}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[order.status] || "bg-muted"}`}>{order.status}</span>
                      <span className="text-sm font-medium">{formatCurrency(order.total)}</span>
                    </div>
                  </div>)}
                {!recentOrders?.items.length && <div className="p-8 text-center text-muted-foreground text-sm">No orders yet</div>}
              </div>
            </div>

            {
    /* Top Products */
  }
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-sm uppercase tracking-widest">Products</h2>
                <Link href="/admin/products" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Manage →</Link>
              </div>
              <div className="border border-border divide-y divide-border">
                {products?.items.map((product) => <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                    <div className="w-10 h-12 bg-muted overflow-hidden flex-shrink-0">
                      <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(product.price)}</p>
                      <p className={`text-xs ${product.stock < 10 ? "text-red-500" : "text-muted-foreground"}`}>Stock: {product.stock}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </AdminLayout>;
}
export {
  AdminDashboard,
  AdminLayout
};
