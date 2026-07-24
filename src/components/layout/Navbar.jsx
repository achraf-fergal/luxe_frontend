import { Link } from "wouter";
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useGetCart, useGetWishlist } from "@/lib/api-client";
import { motion, AnimatePresence } from "framer-motion";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { data: cart } = useGetCart({ query: { enabled: isAuthenticated } });
  const { data: wishlist } = useGetWishlist({ query: { enabled: isAuthenticated } });
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const cartItemCount = cart?.itemCount || 0;
  const wishlistItemCount = wishlist?.length || 0;
  return <header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-4" : "bg-transparent py-6"}`}
  >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {
    /* Mobile Menu Toggle */
  }
          <button
    className="md:hidden p-2 -ml-2 text-foreground"
    onClick={() => setMobileMenuOpen(true)}
  >
            <Menu className="w-5 h-5" />
          </button>

          {
    /* Desktop Navigation */
  }
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
              SHOP
            </Link>
            <Link href="/categories" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
              COLLECTIONS
            </Link>
            <Link href="/about" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
              MAISON
            </Link>
          </nav>

          {
    /* Logo */
  }
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl font-serif font-bold tracking-widest uppercase">
            LUXE
          </Link>

          {
    /* Actions */
  }
          <div className="flex items-center gap-4 md:gap-6">
            <button className="hidden md:block p-1 text-foreground hover:text-muted-foreground transition-colors">
              <Search className="w-4 h-4" />
            </button>
            
            <Link href={isAuthenticated ? "/account" : "/login"} className="hidden md:block p-1 text-foreground hover:text-muted-foreground transition-colors">
              <User className="w-4 h-4" />
            </Link>

            <Link href="/wishlist" className="relative p-1 text-foreground hover:text-muted-foreground transition-colors hidden md:block">
              <Heart className="w-4 h-4" />
              {wishlistItemCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-medium">
                  {wishlistItemCount}
                </span>}
            </Link>

            <Link href="/cart" className="relative p-1 text-foreground hover:text-muted-foreground transition-colors">
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-medium">
                  {cartItemCount}
                </span>}
            </Link>
          </div>
        </div>
      </div>

      {
    /* Mobile Menu */
  }
      <AnimatePresence>
        {mobileMenuOpen && <>
            <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
    onClick={() => setMobileMenuOpen(false)}
  />
            <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: 0 }}
    exit={{ x: "-100%" }}
    transition={{ type: "spring", damping: 25, stiffness: 200 }}
    className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-background border-r border-border z-50 p-6 flex flex-col md:hidden"
  >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-serif font-bold tracking-widest uppercase">LUXE</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 flex-1">
                <Link href="/shop" className="text-xl font-medium tracking-wide" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                <Link href="/categories" className="text-xl font-medium tracking-wide" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
                <Link href="/about" className="text-xl font-medium tracking-wide" onClick={() => setMobileMenuOpen(false)}>Maison</Link>
                <div className="h-px bg-border my-4 w-full" />
                <Link href={isAuthenticated ? "/account" : "/login"} className="text-lg font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                  {isAuthenticated ? "My Account" : "Sign In"}
                </Link>
                <Link href="/wishlist" className="text-lg font-medium text-muted-foreground flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
                  Wishlist
                  {wishlistItemCount > 0 && <span className="text-xs bg-muted px-2 py-1 rounded-full">{wishlistItemCount}</span>}
                </Link>
              </nav>

              <div className="mt-auto pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Need assistance?</p>
                <Link href="/contact" className="text-sm font-medium underline underline-offset-4" onClick={() => setMobileMenuOpen(false)}>Contact Concierge</Link>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </header>;
}
export {
  Navbar
};
