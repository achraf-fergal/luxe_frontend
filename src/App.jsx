import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { RecentlyViewedProvider } from "@/lib/contexts/RecentlyViewedContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Home } from "@/pages/Home";
import { Shop } from "@/pages/Shop";
import { ProductDetail } from "@/pages/ProductDetail";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Account } from "@/pages/Account";
import { Wishlist } from "@/pages/Wishlist";
import { OrderList, OrderDetail } from "@/pages/Orders";
import { Categories } from "@/pages/Categories";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { FAQ } from "@/pages/FAQ";
import { PrivacyPolicy, TermsOfService } from "@/pages/Legal";
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { AdminProducts } from "@/pages/admin/AdminProducts";
import { AdminOrders } from "@/pages/admin/AdminOrders";
import { AdminUsers } from "@/pages/admin/AdminUsers";
import { AdminAnalytics } from "@/pages/admin/AdminAnalytics";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1e3 * 60
    }
  }
});
function MainLayout({ children }) {
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>;
}
function Router() {
  return <Switch>
      <Route path="/">
        <MainLayout><Home /></MainLayout>
      </Route>
      <Route path="/shop">
        <MainLayout><Shop /></MainLayout>
      </Route>
      <Route path="/shop/:id">
        <MainLayout><ProductDetail /></MainLayout>
      </Route>
      <Route path="/categories">
        <MainLayout><Categories /></MainLayout>
      </Route>
      <Route path="/cart">
        <MainLayout><Cart /></MainLayout>
      </Route>
      <Route path="/checkout">
        <MainLayout><Checkout /></MainLayout>
      </Route>
      <Route path="/wishlist">
        <MainLayout><Wishlist /></MainLayout>
      </Route>
      <Route path="/account">
        <MainLayout><Account /></MainLayout>
      </Route>
      <Route path="/orders">
        <MainLayout><OrderList /></MainLayout>
      </Route>
      <Route path="/orders/:id">
        <MainLayout><OrderDetail /></MainLayout>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/about">
        <MainLayout><About /></MainLayout>
      </Route>
      <Route path="/contact">
        <MainLayout><Contact /></MainLayout>
      </Route>
      <Route path="/faq">
        <MainLayout><FAQ /></MainLayout>
      </Route>
      <Route path="/privacy">
        <MainLayout><PrivacyPolicy /></MainLayout>
      </Route>
      <Route path="/terms">
        <MainLayout><TermsOfService /></MainLayout>
      </Route>
      <Route path="/admin">
        <AdminDashboard />
      </Route>
      <Route path="/admin/products">
        <AdminProducts />
      </Route>
      <Route path="/admin/orders">
        <AdminOrders />
      </Route>
      <Route path="/admin/users">
        <AdminUsers />
      </Route>
      <Route path="/admin/analytics">
        <AdminAnalytics />
      </Route>
      <Route>
        <MainLayout><NotFound /></MainLayout>
      </Route>
    </Switch>;
}
function App() {
  return <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RecentlyViewedProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster position="bottom-right" richColors />
          </TooltipProvider>
        </RecentlyViewedProvider>
      </AuthProvider>
    </QueryClientProvider>;
}
var stdin_default = App;
export {
  stdin_default as default
};
