import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Share2, Star, ChevronRight, Minus, Plus } from "lucide-react";
import { useGetProduct, useListRelatedProducts, useListReviews, useAddToCart, useAddToWishlist, useGetWishlist, useCreateReview, getGetCartQueryKey, getGetWishlistQueryKey, getListReviewsQueryKey } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { ProductCard } from "@/components/store/ProductCard";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
function StarRating({ rating, size = "sm" }) {
  return <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => <Star
    key={star}
    className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} ${star <= Math.round(rating) ? "fill-foreground text-foreground" : "text-muted-foreground"}`}
  />)}
    </div>;
}
function ProductDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0");
  const queryClient = useQueryClient();
  const { data: product, isLoading } = useGetProduct(id, { query: { enabled: !!id } });
  const { data: related } = useListRelatedProducts(id, { query: { enabled: !!id } });
  const { data: reviews } = useListReviews({ productId: id }, { query: { enabled: !!id } });
  const { data: wishlist } = useGetWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();
  const createReviewMutation = useCreateReview();
  const isWishlisted = wishlist?.some((item) => item.id === id);
  const variantTypes = product ? [...new Set((product.variants || []).map((v) => v.type))] : [];
  const discount = product?.compareAtPrice ? Math.round((product.compareAtPrice - product.price) / product.compareAtPrice * 100) : 0;
  const handleAddToCart = () => {
    if (!product) return;
    addToCartMutation.mutate(
      { data: { productId: product.id, quantity, variant: Object.values(selectedVariants).join(", ") || void 0 } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
          toast.success("Added to bag");
        },
        onError: () => toast.error("Failed to add to bag")
      }
    );
  };
  const handleWishlist = () => {
    if (!product) return;
    addToWishlistMutation.mutate(
      { productId: product.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetWishlistQueryKey() });
          toast.success("Saved to wishlist");
        }
      }
    );
  };
  const handleReview = (e) => {
    e.preventDefault();
    createReviewMutation.mutate(
      { data: { productId: id, rating: reviewRating, title: reviewTitle, comment: reviewComment } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListReviewsQueryKey({ productId: id }) });
          toast.success("Review submitted");
          setReviewTitle("");
          setReviewComment("");
        }
      }
    );
  };
  if (isLoading) {
    return <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-pulse">
            <div className="aspect-[3/4] bg-muted" />
            <div className="space-y-6">
              <div className="h-8 bg-muted w-2/3" />
              <div className="h-6 bg-muted w-1/4" />
              <div className="h-4 bg-muted w-full" />
              <div className="h-4 bg-muted w-3/4" />
            </div>
          </div>
        </div>
      </div>;
  }
  if (!product) return null;
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        {
    /* Breadcrumb */
  }
        <div className="container mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {
    /* Images */
  }
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                {(product.images || []).map((img, i) => <button
    key={i}
    onClick={() => setSelectedImage(i)}
    className={`w-16 h-20 overflow-hidden bg-muted border-2 transition-colors ${selectedImage === i ? "border-foreground" : "border-transparent"}`}
  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>)}
              </div>
              <div className="flex-1 aspect-[3/4] bg-muted overflow-hidden relative">
                <motion.img
    key={selectedImage}
    src={product.images?.[selectedImage] || product.images?.[0]}
    alt={product.name}
    className="w-full h-full object-cover"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  />
                {discount > 0 && <div className="absolute top-4 left-4 bg-foreground text-background text-xs px-2 py-1 uppercase tracking-wider">
                    -{discount}%
                  </div>}
                {product.isNew && <div className="absolute top-4 right-4 bg-background text-foreground text-xs px-2 py-1 uppercase tracking-wider">
                    New
                  </div>}
              </div>
            </div>

            {
    /* Product Info */
  }
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{product.brand} · {product.category}</p>
                <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <StarRating rating={product.rating} size="md" />
                  <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-medium">{formatCurrency(product.price)}</span>
                {product.compareAtPrice && <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {
    /* Variants */
  }
              {variantTypes.map((type) => <div key={type}>
                  <p className="text-xs font-medium uppercase tracking-widest mb-3">{type}</p>
                  <div className="flex flex-wrap gap-2">
                    {(product.variants || []).filter((v) => v.type === type).map((v) => <button
    key={v.id}
    onClick={() => setSelectedVariants((prev) => ({ ...prev, [type]: v.value }))}
    disabled={v.stock === 0}
    className={`px-4 py-2 text-sm border transition-colors disabled:opacity-40 disabled:line-through ${selectedVariants[type] === v.value ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
  >
                        {v.value}
                      </button>)}
                  </div>
                </div>)}

              {
    /* Stock */
  }
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
                <span className="text-muted-foreground">
                  {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
                </span>
              </div>

              {
    /* Quantity */
  }
              <div>
                <p className="text-xs font-medium uppercase tracking-widest mb-3">Quantity</p>
                <div className="flex items-center border border-border w-fit">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3 hover:bg-muted transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="p-3 hover:bg-muted transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {
    /* Actions */
  }
              <div className="flex gap-4">
                <button
    onClick={handleAddToCart}
    disabled={product.stock === 0 || addToCartMutation.isPending}
    className="flex-1 flex items-center justify-center gap-3 bg-foreground text-background py-4 text-sm uppercase tracking-widest font-medium hover:opacity-80 transition-opacity disabled:opacity-40"
  >
                  <ShoppingBag className="w-4 h-4" />
                  {addToCartMutation.isPending ? "Adding..." : "Add to Bag"}
                </button>
                <button
    onClick={handleWishlist}
    className={`p-4 border transition-colors ${isWishlisted ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
  >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
                <button className="p-4 border border-border hover:border-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {
    /* Tabs: Details, Specs, Reviews */
  }
          <div className="mt-24">
            <Tabs defaultValue="reviews">
              <TabsList className="border-b border-border bg-transparent rounded-none w-full justify-start gap-8 h-auto p-0">
                <TabsTrigger value="details" className="pb-4 text-sm uppercase tracking-widest font-medium border-b-2 border-transparent data-[state=active]:border-foreground rounded-none bg-transparent shadow-none">
                  Details
                </TabsTrigger>
                <TabsTrigger value="specs" className="pb-4 text-sm uppercase tracking-widest font-medium border-b-2 border-transparent data-[state=active]:border-foreground rounded-none bg-transparent shadow-none">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="pb-4 text-sm uppercase tracking-widest font-medium border-b-2 border-transparent data-[state=active]:border-foreground rounded-none bg-transparent shadow-none">
                  Reviews ({product.reviewCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="pt-8 max-w-2xl">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                {(product.tags || []).length > 0 && <div className="flex flex-wrap gap-2 mt-6">
                    {product.tags.map((tag) => <span key={tag} className="text-xs uppercase tracking-widest border border-border px-3 py-1 text-muted-foreground">{tag}</span>)}
                  </div>}
              </TabsContent>

              <TabsContent value="specs" className="pt-8 max-w-xl">
                {(product.specifications || []).length > 0 ? <dl className="divide-y divide-border">
                    {product.specifications.map((spec) => <div key={spec.name} className="py-4 flex justify-between text-sm">
                        <dt className="font-medium">{spec.name}</dt>
                        <dd className="text-muted-foreground">{spec.value}</dd>
                      </div>)}
                  </dl> : <p className="text-muted-foreground text-sm">No specifications available.</p>}
              </TabsContent>

              <TabsContent value="reviews" className="pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  <div className="lg:col-span-2 space-y-8">
                    {(reviews || []).length === 0 ? <p className="text-muted-foreground text-sm">No reviews yet. Be the first.</p> : reviews?.map((review) => <div key={review.id} className="border-b border-border pb-8 last:border-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-medium text-sm">{review.userName}</p>
                              <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                          {review.title && <p className="font-medium text-sm mb-2">{review.title}</p>}
                          {review.comment && <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>}
                        </div>)}
                  </div>

                  <div>
                    <h3 className="font-medium text-sm uppercase tracking-widest mb-6">Write a Review</h3>
                    <form onSubmit={handleReview} className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Rating</p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" onClick={() => setReviewRating(star)}>
                              <Star className={`w-5 h-5 transition-colors ${star <= reviewRating ? "fill-foreground text-foreground" : "text-muted-foreground"}`} />
                            </button>)}
                        </div>
                      </div>
                      <input
    value={reviewTitle}
    onChange={(e) => setReviewTitle(e.target.value)}
    placeholder="Review title"
    className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none focus:border-foreground"
  />
                      <textarea
    value={reviewComment}
    onChange={(e) => setReviewComment(e.target.value)}
    placeholder="Share your experience..."
    rows={4}
    className="w-full border border-border bg-transparent p-3 text-sm focus:outline-none focus:border-foreground resize-none"
  />
                      <button
    type="submit"
    disabled={createReviewMutation.isPending}
    className="w-full py-3 bg-foreground text-background text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
  >
                        {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
                      </button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {
    /* Related Products */
  }
          {(related || []).length > 0 && <div className="mt-24">
              <h2 className="font-serif text-2xl mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {related?.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>}
        </div>
      </div>
    </PageTransition>;
}
export {
  ProductDetail
};
