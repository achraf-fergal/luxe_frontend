import { Link } from "wouter";
import { Heart } from "lucide-react";
import { useGetWishlist } from "@/lib/api-client";
import { ProductCard } from "@/components/store/ProductCard";
import { PageTransition } from "@/components/layout/PageTransition";
function Wishlist() {
  const { data: wishlist, isLoading } = useGetWishlist();
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="font-serif text-4xl mb-2">Wishlist</h1>
          {wishlist && <p className="text-muted-foreground text-sm mb-12">{wishlist.length} saved piece{wishlist.length !== 1 ? "s" : ""}</p>}

          {isLoading ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted mb-4" />
                  <div className="h-4 bg-muted w-2/3 mb-2" />
                  <div className="h-4 bg-muted w-1/3" />
                </div>)}
            </div> : !wishlist?.length ? <div className="text-center py-24">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-serif text-2xl mb-2">Nothing saved yet</h2>
              <p className="text-muted-foreground text-sm mb-8">Pieces you save will appear here</p>
              <Link href="/shop" className="bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
                Explore Collection
              </Link>
            </div> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {wishlist.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
            </div>}
        </div>
      </div>
    </PageTransition>;
}
export {
  Wishlist
};
