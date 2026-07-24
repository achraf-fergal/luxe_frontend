import { useGetAnalyticsSummary } from "@/lib/api-client";
import { AdminLayout } from "./Dashboard";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, ShoppingBag, Users, Package, Star, DollarSign } from "lucide-react";
function AdminAnalytics() {
  const { data: analytics } = useGetAnalyticsSummary();
  const stats = [
    { label: "Total Revenue", value: formatCurrency(analytics?.totalRevenue || 0), icon: DollarSign, sub: "All time" },
    { label: "Total Orders", value: analytics?.totalOrders || 0, icon: ShoppingBag, sub: "All time" },
    { label: "Total Customers", value: analytics?.totalCustomers || 0, icon: Users, sub: "Registered" },
    { label: "Total Products", value: analytics?.totalProducts || 0, icon: Package, sub: "Active" },
    { label: "Avg Order Value", value: formatCurrency(analytics?.avgOrderValue || 0), icon: TrendingUp, sub: "Per order" },
    { label: "Pending Orders", value: analytics?.pendingOrders || 0, icon: Star, sub: "Awaiting action" }
  ];
  return <AdminLayout>
      <PageTransition>
        <div className="p-8">
          <h1 className="font-serif text-3xl mb-8">Analytics</h1>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {stats.map((stat, i) => <div key={stat.label} className="border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-muted">
                    <stat.icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-medium mb-1">{stat.value}</p>
                <p className="text-xs font-medium uppercase tracking-widest">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
              </div>)}
          </div>

          {
    /* Revenue Growth */
  }
          <div className="border border-border p-6 max-w-lg">
            <h2 className="font-medium text-sm uppercase tracking-widest mb-6">Growth Metrics</h2>
            <div className="space-y-4">
              {[
    { label: "Revenue Growth", value: analytics?.revenueGrowth || 0 },
    { label: "Orders Growth", value: analytics?.ordersGrowth || 0 }
  ].map((metric) => <div key={metric.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{metric.label}</span>
                    <span className={metric.value >= 0 ? "text-green-500" : "text-red-500"}>
                      {metric.value >= 0 ? "+" : ""}{metric.value.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
    className={`h-full rounded-full ${metric.value >= 0 ? "bg-green-400" : "bg-red-400"}`}
    style={{ width: `${Math.min(Math.abs(metric.value), 100)}%` }}
  />
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </PageTransition>
    </AdminLayout>;
}
export {
  AdminAnalytics
};
