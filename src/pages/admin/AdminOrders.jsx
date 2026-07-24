import { useState } from "react";
import { motion } from "framer-motion";
import { useListOrders, useUpdateOrderStatus } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./Dashboard";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const statusColors = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
};
function AdminOrders() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const { data } = useListOrders({ status: statusFilter === "all" ? void 0 : statusFilter, limit: 50 });
  const updateStatusMutation = useUpdateOrderStatus();
  const handleStatusChange = (orderId, status) => {
    updateStatusMutation.mutate(
      { id: orderId, data: { status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
          toast.success("Order status updated");
        }
      }
    );
  };
  return <AdminLayout>
      <PageTransition>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl">Orders</h1>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground">Order</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground hidden md:table-cell">Date</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground">Total</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data?.items.map((order, i) => <motion.tr
    key={order.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: i * 0.02 }}
    className="hover:bg-muted/20 transition-colors"
  >
                    <td className="px-4 py-3">
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(order.total)}</td>
                    <td className="px-4 py-3 text-right">
                      <Select value={order.status} onValueChange={(val) => handleStatusChange(order.id, val)}>
                        <SelectTrigger className={`h-7 w-32 text-xs ml-auto ${statusColors[order.status] || ""}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </td>
                  </motion.tr>)}
              </tbody>
            </table>
            {!data?.items.length && <div className="p-12 text-center text-muted-foreground text-sm">No orders found</div>}
          </div>
        </div>
      </PageTransition>
    </AdminLayout>;
}
export {
  AdminOrders
};
