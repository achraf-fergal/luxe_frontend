import { Link } from "wouter";
function Footer() {
  return <footer className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif tracking-widest uppercase">LUXE</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
              Elegance is elimination. Discover our curated collection of extraordinary pieces designed for the modern aesthete.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium tracking-wider text-sm uppercase mb-6">Boutique</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link href="/shop" className="hover:text-primary-foreground transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-primary-foreground transition-colors">Collections</Link></li>
              <li><Link href="/shop?sortBy=newest" className="hover:text-primary-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?sortBy=popular" className="hover:text-primary-foreground transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium tracking-wider text-sm uppercase mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link href="/account" className="hover:text-primary-foreground transition-colors">My Account</Link></li>
              <li><Link href="/orders" className="hover:text-primary-foreground transition-colors">Track Order</Link></li>
              <li><Link href="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium tracking-wider text-sm uppercase mb-6">Maison</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link href="/about" className="hover:text-primary-foreground transition-colors">Our Story</Link></li>
              <li><Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>&copy; {(/* @__PURE__ */ new Date()).getFullYear()} LUXE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-primary-foreground cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-primary-foreground cursor-pointer transition-colors">Pinterest</span>
            <span className="hover:text-primary-foreground cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>
      </div>
    </footer>;
}
export {
  Footer
};
