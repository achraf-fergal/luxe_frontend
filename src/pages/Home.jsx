import { PageTransition } from "@/components/layout/PageTransition";
import { Link } from "wouter";
import { useListFeaturedProducts, useListNewArrivals, useListBestSellers } from "@/lib/api-client";
import { ProductCard } from "@/components/store/ProductCard";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
function Home() {
  const { data: featuredProducts } = useListFeaturedProducts();
  const { data: newArrivals } = useListNewArrivals();
  const { data: bestSellers } = useListBestSellers();
  return <PageTransition>
      {
    /* Hero Section */
  }
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
    poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
  >
          <source src="https://cdn.coverr.co/videos/coverr-fashion-model-walking-in-slow-motion-2580/1080p.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-20 text-center text-white px-4 flex flex-col items-center">
          <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight max-w-4xl leading-none mb-6"
  >
            The Art of Elegance
          </motion.h1>
          <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto mb-10 text-white/80"
  >
            Discover our curated collection of extraordinary pieces designed for the modern aesthete.
          </motion.p>
          <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
  >
            <Link
    href="/shop"
    className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
  >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {
    /* Featured Categories Grid */
  }
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/shop?category=clothing" className="group relative aspect-[3/4] overflow-hidden bg-muted">
            <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop" alt="Clothing" className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-serif text-3xl mb-2">Ready to Wear</h3>
              <p className="text-sm tracking-widest uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">Shop Now</p>
            </div>
          </Link>
          <Link href="/shop?category=accessories" className="group relative aspect-[3/4] overflow-hidden bg-muted">
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop" alt="Accessories" className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-serif text-3xl mb-2">Accessories</h3>
              <p className="text-sm tracking-widest uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">Shop Now</p>
            </div>
          </Link>
          <Link href="/shop?category=jewelry" className="group relative aspect-[3/4] overflow-hidden bg-muted">
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop" alt="Jewelry" className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-serif text-3xl mb-2">Fine Jewelry</h3>
              <p className="text-sm tracking-widest uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">Shop Now</p>
            </div>
          </Link>
        </div>
      </section>

      {
    /* Featured Products */
  }
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-4xl mb-4">Curated Signatures</h2>
              <p className="text-muted-foreground text-sm tracking-widest uppercase">The season's most coveted pieces</p>
            </div>
            <Link href="/shop" className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase font-medium hover:text-muted-foreground transition-colors border-b border-foreground pb-1">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts?.slice(0, 4).map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
            {
    /* Fallback skeletons if no data yet */
  }
            {!featuredProducts && Array.from({ length: 4 }).map((_, i) => <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="aspect-[3/4] bg-muted w-full" />
                <div className="h-4 bg-muted w-2/3" />
                <div className="h-4 bg-muted w-1/3" />
              </div>)}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-medium border-b border-foreground pb-1">
              View All
            </Link>
          </div>
        </div>
      </section>

      {
    /* Brand Story Split */
  }
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 w-full relative aspect-[4/5] lg:aspect-square bg-muted">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop" alt="Brand Story" className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">Crafted for those who demand the extraordinary.</h2>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                Every piece in our collection is a testament to uncompromising quality and visionary design. We collaborate with master artisans globally to bring you garments and objects that transcend seasonal trends, creating a wardrobe that is timeless, confident, and deeply personal.
              </p>
              <div>
                <Link href="/about" className="inline-block border border-border px-8 py-4 uppercase tracking-widest text-sm font-medium hover:border-foreground transition-colors duration-300">
                  Read Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
    /* Newsletter */
  }
      <section className="py-32 bg-primary text-primary-foreground text-center px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-serif text-4xl">Join the Inner Circle</h2>
          <p className="text-primary-foreground/70 font-light tracking-wide">
            Subscribe to receive exclusive access to new collections, private events, and editorial content.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4" onSubmit={(e) => e.preventDefault()}>
            <input
    type="email"
    placeholder="Email Address"
    className="flex-1 bg-transparent border-b border-primary-foreground/30 px-0 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground transition-colors rounded-none"
    required
  />
            <button type="submit" className="uppercase tracking-widest text-sm font-medium px-6 py-3 border border-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </PageTransition>;
}
export {
  Home
};
