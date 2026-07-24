import { Link, useParams } from "wouter";
import { Package, Truck, CheckCircle, Clock, XCircle, ChevronRight, ArrowLeft } from "lucide-react";
import { useListOrders, useGetOrder } from "@/lib/api-client";
import { useAuth } from "@/lib/contexts/AuthContext";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatCurrency } from "@/lib/utils";
const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-amber-500" },
  processing: { icon: Package, label: "Processing", color: "text-blue-500" },
  shipped: { icon: Truck, label: "Shipped", color: "text-purple-500" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-green-500" },
  cancelled: { icon: XCircle, label: "Cancelled", color: "text-red-500" }
};
function OrderList() {
  const { user } = useAuth();
  const { data } = useListOrders({ userId: user?.id, limit: 20 });
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
          <h1 className="font-serif text-4xl mb-12">Order History</h1>

          {!data?.items.length ? <div className="text-center py-24">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-serif text-2xl mb-2">No orders yet</h2>
              <Link href="/shop" className="mt-4 inline-block bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest">Browse Collection</Link>
            </div> : <div className="space-y-4">
              {data.items.map((order) => {
    const status = statusConfig[order.status] || statusConfig.pending;
    const StatusIcon = status.icon;
    return <Link key={order.id} href={`/orders/${order.id}`} className="flex items-center justify-between p-6 border border-border hover:border-foreground transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full bg-muted ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Order #{order.id}</p>
                        <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                        <p className={`text-xs font-medium uppercase tracking-wider mt-0.5 ${status.color}`}>{status.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-sm">{formatCurrency(order.total)}</p>
                        <p className="text-xs text-muted-foreground">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </Link>;
  })}
            </div>}
        </div>
      </div>
    </PageTransition>;
}
function OrderDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0");
  const { data: order, isLoading } = useGetOrder(id, { query: { enabled: !!id } });
  if (isLoading) {
    return <div className="pt-24 min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading order...</div></div>;
  }
  if (!order) return null;
  const status = statusConfig[order.status] || statusConfig.pending;
  const StatusIcon = status.icon;
  const steps = ["pending", "processing", "shipped", "delivered"];
  const currentStep = steps.indexOf(order.status);
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
          <Link href="/orders" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> All Orders
          </Link>

          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl">Order #{order.id}</h1>
              <p className="text-sm text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
            <div className={`flex items-center gap-2 ${status.color}`}>
              <StatusIcon className="w-5 h-5" />
              <span className="font-medium text-sm uppercase tracking-widest">{status.label}</span>
            </div>
          </div>

          {
    /* Progress */
  }
          {order.status !== "cancelled" && <div className="flex items-center mb-12">
              {steps.map((step, i) => <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 transition-colors ${i <= currentStep ? "border-foreground bg-foreground text-background" : "border-muted-foreground text-muted-foreground"}`}>
                      {i + 1}
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider mt-1 ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
                  </div>
                  {i < steps.length - 1 && <div className={`flex-1 h-px mx-2 ${i < currentStep ? "bg-foreground" : "bg-muted"}`} />}
                </div>)}
            </div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {
    /* Shipping */
  }
            {order.shippingAddress && <div className="p-6 border border-border">
                <h3 className="text-xs font-medium uppercase tracking-widest mb-4">Shipping To</h3>
                <p className="text-sm">{order.shippingAddress.name}</p>
                <p className="text-sm text-muted-foreground">{order.shippingAddress.street}</p>
                <p className="text-sm text-muted-foreground">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              </div>}
            {
    /* Tracking */
  }
            {order.trackingNumber && <div className="p-6 border border-border">
                <h3 className="text-xs font-medium uppercase tracking-widest mb-4">Tracking</h3>
                <p className="text-sm font-mono">{order.trackingNumber}</p>
              </div>}
          </div>

          {
    /* Items */
  }
          <div className="border border-border divide-y divide-border mb-8">
            {order.items.map((item) => <div key={item.id} className="flex gap-4 p-6">
                {item.productImage && <div className="w-16 h-20 bg-muted overflow-hidden flex-shrink-0">
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  </div>}
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.productName}</p>
                  {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>)}
          </div>

          {
    /* Totals */
  }
          <div className="border border-border p-6 max-w-xs ml-auto">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatCurrency(order.discount)}</span></div>}
              <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{formatCurrency(order.shipping)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Tax</span><span>{formatCurrency(order.tax)}</span></div>
              <div className="flex justify-between font-medium text-base pt-2 border-t border-border"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>;
}
export {
  OrderDetail,
  OrderList
};
