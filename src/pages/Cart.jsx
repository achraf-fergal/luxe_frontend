import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Minus, Plus, X, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import { useGetCart, useUpdateCartItem, useRemoveCartItem, useApplyCoupon, getGetCartQueryKey } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
function Cart() {
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useGetCart();
  const updateItemMutation = useUpdateCartItem();
  const removeItemMutation = useRemoveCartItem();
  const applyCouponMutation = useApplyCoupon();
  const [couponCode, setCouponCode] = useState("");
  const invalidateCart = () => queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
  const updateQty = (itemId, quantity) => {
    updateItemMutation.mutate({ itemId, data: { quantity } }, { onSuccess: invalidateCart });
  };
  const removeItem = (itemId) => {
    removeItemMutation.mutate({ itemId }, { onSuccess: invalidateCart, onSettled: invalidateCart });
  };
  const applyCoupon = (e) => {
    e.preventDefault();
    applyCouponMutation.mutate(
      { data: { code: couponCode } },
      {
        onSuccess: () => {
          invalidateCart();
          toast.success("Coupon applied!");
        },
        onError: () => toast.error("Invalid or expired coupon")
      }
    );
  };
  if (isLoading) {
    return <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading your bag...</div>
      </div>;
  }
  if (!cart || cart.items.length === 0) {
    return <PageTransition>
        <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
          <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          <div>
            <h1 className="font-serif text-3xl mb-2">Your bag is empty</h1>
            <p className="text-muted-foreground text-sm">Discover something exceptional</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </PageTransition>;
  }
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="font-serif text-4xl mb-12">Your Bag <span className="text-muted-foreground text-2xl">({cart.itemCount})</span></h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {
    /* Cart Items */
  }
            <div className="lg:col-span-2 space-y-8">
              {cart.items.map((item, i) => <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.05 }}
    className="flex gap-6 border-b border-border pb-8"
  >
                  <Link href={`/shop/${item.product.id}`} className="w-24 h-32 bg-muted overflow-hidden flex-shrink-0 block">
                    <img
    src={item.product.images?.[0]}
    alt={item.product.name}
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
  />
                  </Link>

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div>
                        <Link href={`/shop/${item.product.id}`} className="font-medium text-sm hover:text-muted-foreground transition-colors">{item.product.name}</Link>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.product.brand}</p>
                        {item.variant && <p className="text-xs text-muted-foreground mt-1">{item.variant}</p>}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-2 hover:bg-muted transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-2 hover:bg-muted transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium text-sm">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </motion.div>)}

              {
    /* Coupon */
  }
              <form onSubmit={applyCoupon} className="flex gap-4">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
    value={couponCode}
    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
    placeholder={cart.couponCode ? `Applied: ${cart.couponCode}` : "Promo code"}
    className="w-full border border-border pl-10 pr-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors"
  />
                </div>
                <button type="submit" disabled={applyCouponMutation.isPending} className="px-6 py-3 border border-border text-sm uppercase tracking-widest hover:border-foreground transition-colors">
                  Apply
                </button>
              </form>
            </div>

            {
    /* Order Summary */
  }
            <div>
              <div className="border border-border p-8 sticky top-28">
                <h2 className="font-serif text-xl mb-8">Order Summary</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(cart.subtotal)}</span>
                  </div>
                  {cart.discount > 0 && <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatCurrency(cart.discount)}</span>
                    </div>}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{cart.shipping === 0 ? "Free" : formatCurrency(cart.shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>{formatCurrency(cart.tax)}</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between font-medium text-base">
                    <span>Total</span>
                    <span>{formatCurrency(cart.total)}</span>
                  </div>
                </div>

                {cart.shipping === 0 && <p className="text-xs text-green-600 mt-4">Free shipping on orders over $100</p>}

                <Link
    href="/checkout"
    className="mt-8 w-full flex items-center justify-center gap-3 bg-foreground text-background py-4 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
  >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <Link href="/shop" className="mt-4 w-full flex items-center justify-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>;
}
export {
  Cart
};
