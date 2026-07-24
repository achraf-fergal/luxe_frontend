import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CreditCard, Truck, CheckCircle } from "lucide-react";
import { useGetCart, useCreateOrder, getGetCartQueryKey } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
function Checkout() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { data: cart } = useGetCart();
  const createOrderMutation = useCreateOrder();
  const [step, setStep] = useState("shipping");
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { shippingOption: "standard", paymentMethod: "card", country: "US" }
  });
  const shippingOption = watch("shippingOption");
  const shippingCost = shippingOption === "express" ? 19.99 : shippingOption === "overnight" ? 39.99 : 9.99;
  const onSubmit = (data) => {
    createOrderMutation.mutate(
      {
        data: {
          shippingAddress: { name: data.name, street: data.street, city: data.city, state: data.state, zip: data.zip, country: data.country, phone: data.phone },
          paymentMethod: data.paymentMethod,
          shippingOption: data.shippingOption
        }
      },
      {
        onSuccess: (order) => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
          toast.success("Order placed successfully!");
          navigate(`/orders/${order.id}`);
        },
        onError: () => toast.error("Failed to place order")
      }
    );
  };
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
          <h1 className="font-serif text-4xl mb-12">Checkout</h1>

          {
    /* Steps */
  }
          <div className="flex items-center gap-4 mb-12">
            {["shipping", "payment", "review"].map((s, i) => <div key={s} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-colors ${step === s || step === "payment" && s === "shipping" || step === "review" ? "border-foreground bg-foreground text-background" : "border-muted-foreground text-muted-foreground"}`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm uppercase tracking-widest ${step === s ? "font-medium" : "text-muted-foreground"}`}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </span>
                </div>
                {i < 2 && <div className="h-px w-8 bg-border" />}
              </div>)}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-8">
                {
    /* Shipping */
  }
                <div>
                  <h2 className="font-medium text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
    { label: "Full Name", name: "name", colSpan: "md:col-span-2" },
    { label: "Street Address", name: "street", colSpan: "md:col-span-2" },
    { label: "City", name: "city" },
    { label: "State", name: "state" },
    { label: "ZIP Code", name: "zip" },
    { label: "Country", name: "country" },
    { label: "Phone", name: "phone" }
  ].map((field) => <div key={field.name} className={field.colSpan || ""}>
                        <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">{field.label}</label>
                        <input
    {...register(field.name, { required: "Required" })}
    className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
  />
                      </div>)}
                  </div>

                  {
    /* Shipping Options */
  }
                  <div className="mt-8">
                    <h3 className="text-xs font-medium uppercase tracking-widest mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      {[
    { value: "standard", label: "Standard", desc: "5-7 business days", price: "$9.99" },
    { value: "express", label: "Express", desc: "2-3 business days", price: "$19.99" },
    { value: "overnight", label: "Overnight", desc: "Next business day", price: "$39.99" }
  ].map((opt) => <label key={opt.value} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingOption === opt.value ? "border-foreground" : "border-border hover:border-foreground"}`}>
                          <div className="flex items-center gap-3">
                            <input type="radio" {...register("shippingOption")} value={opt.value} className="w-4 h-4" />
                            <div>
                              <p className="text-sm font-medium">{opt.label}</p>
                              <p className="text-xs text-muted-foreground">{opt.desc}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium">{opt.price}</span>
                        </label>)}
                    </div>
                  </div>
                </div>

                {
    /* Payment */
  }
                <div>
                  <h2 className="font-medium text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Payment
                  </h2>

                  <div className="space-y-3 mb-6">
                    {[
    { value: "card", label: "Credit / Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "apple_pay", label: "Apple Pay" }
  ].map((opt) => <label key={opt.value} className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${watch("paymentMethod") === opt.value ? "border-foreground" : "border-border hover:border-foreground"}`}>
                        <input type="radio" {...register("paymentMethod")} value={opt.value} className="w-4 h-4" />
                        <span className="text-sm">{opt.label}</span>
                      </label>)}
                  </div>

                  {watch("paymentMethod") === "card" && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 border border-border bg-muted/30">
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Card Number</label>
                        <input {...register("cardNumber")} placeholder="4242 4242 4242 4242" className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Expiry</label>
                          <input {...register("cardExpiry")} placeholder="MM / YY" className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">CVC</label>
                          <input {...register("cardCvc")} placeholder="123" className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Payment is simulated — no real charges will occur.</p>
                    </motion.div>}
                </div>
              </div>

              {
    /* Order Summary */
  }
              <div>
                <div className="border border-border p-6 sticky top-28">
                  <h2 className="font-serif text-lg mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    {cart?.items.map((item) => <div key={item.id} className="flex gap-3">
                        <div className="w-12 h-14 bg-muted overflow-hidden flex-shrink-0">
                          <img src={item.product.images?.[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-sm">
                          <p className="font-medium line-clamp-1">{item.product.name}</p>
                          <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm">{formatCurrency(item.price * item.quantity)}</span>
                      </div>)}
                  </div>

                  <div className="space-y-2 text-sm pt-4 border-t border-border">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span><span>{formatCurrency(cart?.subtotal || 0)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span><span>{formatCurrency(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span><span>{formatCurrency((cart?.subtotal || 0) * 0.08)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-base pt-2 border-t border-border">
                      <span>Total</span>
                      <span>{formatCurrency((cart?.subtotal || 0) + shippingCost + (cart?.subtotal || 0) * 0.08 - (cart?.discount || 0))}</span>
                    </div>
                  </div>

                  <button
    type="submit"
    disabled={createOrderMutation.isPending}
    className="mt-6 w-full flex items-center justify-center gap-2 bg-foreground text-background py-4 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40"
  >
                    <CheckCircle className="w-4 h-4" />
                    {createOrderMutation.isPending ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>;
}
export {
  Checkout
};
