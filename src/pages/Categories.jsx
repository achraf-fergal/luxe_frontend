import { Link } from "wouter";
import { motion } from "framer-motion";
import { useListCategories } from "@/lib/api-client";
import { PageTransition } from "@/components/layout/PageTransition";
function Categories() {
  const { data: categories, isLoading } = useListCategories();
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Browse by</p>
            <h1 className="font-serif text-4xl md:text-5xl">Collections</h1>
          </div>

          {isLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[4/3] bg-muted animate-pulse" />)}
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories?.map((cat, i) => <motion.div
    key={cat.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.06 }}
  >
                  <Link
    href={`/shop?category=${encodeURIComponent(cat.name)}`}
    className="group relative block aspect-[4/3] overflow-hidden bg-muted"
  >
                    {cat.image ? <img
    src={cat.image}
    alt={cat.name}
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  /> : <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10" />}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <h2 className="font-serif text-3xl mb-1">{cat.name}</h2>
                      <p className="text-sm text-white/70">{cat.productCount} pieces</p>
                      <p className="text-xs tracking-widest uppercase mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Explore →
                      </p>
                    </div>
                  </Link>
                </motion.div>)}
            </div>}
        </div>
      </div>
    </PageTransition>;
}
export {
  Categories
};
