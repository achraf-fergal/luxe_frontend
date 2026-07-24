import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useAddToCart, useAddToWishlist, useRemoveFromWishlist, useGetWishlist } from "@/lib/api-client";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
function ProductCard({ product, index = 0 }) {
  const { isAuthenticated } = useAuth();
  const { data: wishlist } = useGetWishlist({ query: { enabled: isAuthenticated } });
  const isWishlisted = wishlist?.some((item) => item.id === product.id);
  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please sign in to add to cart");
      return;
    }
    addToCartMutation.mutate(
      { data: { productId: product.id, quantity: 1 } },
      {
        onSuccess: () => toast.success("Added to cart"),
        onError: () => toast.error("Failed to add to cart")
      }
    );
  };
  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please sign in to save items");
      return;
    }
    if (isWishlisted) {
      removeFromWishlistMutation.mutate(
        { productId: product.id },
        { onSuccess: () => toast.success("Removed from wishlist") }
      );
    } else {
      addToWishlistMutation.mutate(
        { productId: product.id },
        { onSuccess: () => toast.success("Saved to wishlist") }
      );
    }
  };
  const discount = product.compareAtPrice ? Math.round((product.compareAtPrice - product.price) / product.compareAtPrice * 100) : 0;
  return <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="group relative flex flex-col cursor-pointer"
  >
      <Link href={`/shop/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-muted mb-4">
        <img
    src={product.images?.[0] || "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop"}
    alt={product.name}
    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
    loading="lazy"
  />
        {product.images?.[1] && <img
    src={product.images[1]}
    alt={`${product.name} alternate`}
    className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
    loading="lazy"
  />}

        {
    /* Badges */
  }
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="bg-background text-foreground text-[10px] uppercase tracking-wider px-2 py-1 font-medium">New</span>}
          {discount > 0 && <span className="bg-foreground text-background text-[10px] uppercase tracking-wider px-2 py-1 font-medium">
              -{discount}%
            </span>}
        </div>

        {
    /* Wishlist Button */
  }
        <button
    onClick={toggleWishlist}
    className="absolute top-3 right-3 p-2 rounded-full bg-background/0 hover:bg-background/20 backdrop-blur-sm transition-all duration-300 z-10"
  >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-foreground text-foreground" : "text-foreground"}`} />
        </button>

        {
    /* Quick Add overlay */
  }
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-t from-black/50 to-transparent">
          <button
    onClick={handleAddToCart}
    disabled={product.stock === 0 || addToCartMutation.isPending}
    className="w-full bg-background text-foreground uppercase tracking-widest text-xs py-3 font-medium hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
            {product.stock === 0 ? "Out of Stock" : addToCartMutation.isPending ? "Adding..." : "Quick Add"}
          </button>
        </div>
      </Link>

      <Link href={`/shop/${product.id}`} className="flex flex-col flex-1 space-y-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-medium leading-snug line-clamp-2">{product.name}</h3>
          <div className="flex flex-col items-end text-sm">
            <span className="font-medium whitespace-nowrap">{formatCurrency(product.price)}</span>
            {product.compareAtPrice && <span className="text-muted-foreground line-through text-xs">{formatCurrency(product.compareAtPrice)}</span>}
          </div>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.brand}</p>
      </Link>
    </motion.div>;
}
export {
  ProductCard
};
