import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useListProducts, useListCategories } from "@/lib/api-client";
import { ProductCard } from "@/components/store/ProductCard";
import { PageTransition } from "@/components/layout/PageTransition";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
function Shop() {
  const [location] = useLocation();
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 2e3]);
  const [inStock, setInStock] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { data: categories } = useListCategories();
  const { data, isLoading } = useListProducts({
    page,
    limit: 20,
    category: category || void 0,
    search: search || void 0,
    minPrice: priceRange[0] > 0 ? priceRange[0] : void 0,
    maxPrice: priceRange[1] < 2e3 ? priceRange[1] : void 0,
    sortBy,
    inStock: inStock || void 0
  });
  const totalPages = data ? Math.ceil(data.total / 20) : 1;
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        {
    /* Header */
  }
        <div className="container mx-auto px-4 md:px-6 py-12 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Browse</p>
              <h1 className="font-serif text-4xl md:text-5xl">The Collection</h1>
              {data && <p className="text-sm text-muted-foreground mt-2">{data.total} pieces</p>}
            </div>
            <div className="flex items-center gap-4">
              <button
    onClick={() => setShowFilters(!showFilters)}
    className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest border border-border px-4 py-2 hover:border-foreground transition-colors"
  >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 rounded-none border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {
    /* Filters Panel */
  }
          {showFilters && <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    className="mt-8 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-8"
  >
              {
    /* Search */
  }
              <div>
                <p className="text-xs font-medium uppercase tracking-widest mb-4">Search</p>
                <input
    type="text"
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    placeholder="Search products..."
    className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
  />
              </div>

              {
    /* Category */
  }
              <div>
                <p className="text-xs font-medium uppercase tracking-widest mb-4">Category</p>
                <div className="flex flex-col gap-2">
                  <button
    onClick={() => {
      setCategory("");
      setPage(1);
    }}
    className={`text-left text-sm py-1 transition-colors ${!category ? "font-medium" : "text-muted-foreground hover:text-foreground"}`}
  >
                    All Categories
                  </button>
                  {categories?.map((cat) => <button
    key={cat.id}
    onClick={() => {
      setCategory(cat.name);
      setPage(1);
    }}
    className={`text-left text-sm py-1 transition-colors ${category === cat.name ? "font-medium" : "text-muted-foreground hover:text-foreground"}`}
  >
                      {cat.name}
                      <span className="text-xs text-muted-foreground ml-1">({cat.productCount})</span>
                    </button>)}
                </div>
              </div>

              {
    /* Price Range */
  }
              <div>
                <p className="text-xs font-medium uppercase tracking-widest mb-4">
                  Price: ${priceRange[0]} — ${priceRange[1] >= 2e3 ? "2000+" : priceRange[1]}
                </p>
                <Slider
    min={0}
    max={2e3}
    step={10}
    value={priceRange}
    onValueChange={(v) => {
      setPriceRange(v);
      setPage(1);
    }}
    className="mt-4"
  />
              </div>

              {
    /* Stock */
  }
              <div>
                <p className="text-xs font-medium uppercase tracking-widest mb-4">Availability</p>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
    onClick={() => {
      setInStock(!inStock);
      setPage(1);
    }}
    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${inStock ? "bg-foreground" : "bg-muted"}`}
  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform ${inStock ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm">In Stock Only</span>
                </label>
              </div>
            </motion.div>}

          {
    /* Active Filters */
  }
          {(category || search || inStock) && <div className="mt-4 flex items-center gap-2 flex-wrap">
              {category && <button onClick={() => setCategory("")} className="flex items-center gap-1 text-xs border border-border px-3 py-1 hover:border-foreground">
                  {category} <X className="w-3 h-3" />
                </button>}
              {search && <button onClick={() => setSearch("")} className="flex items-center gap-1 text-xs border border-border px-3 py-1 hover:border-foreground">
                  "{search}" <X className="w-3 h-3" />
                </button>}
              {inStock && <button onClick={() => setInStock(false)} className="flex items-center gap-1 text-xs border border-border px-3 py-1 hover:border-foreground">
                  In Stock <X className="w-3 h-3" />
                </button>}
            </div>}
        </div>

        {
    /* Products Grid */
  }
        <div className="container mx-auto px-4 md:px-6 py-12">
          {isLoading ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted mb-4" />
                  <div className="h-4 bg-muted w-2/3 mb-2" />
                  <div className="h-4 bg-muted w-1/3" />
                </div>)}
            </div> : data?.items.length === 0 ? <div className="text-center py-24">
              <p className="font-serif text-2xl mb-4">No pieces found</p>
              <p className="text-muted-foreground text-sm">Try adjusting your filters</p>
            </div> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {data?.items.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
            </div>}

          {
    /* Pagination */
  }
          {totalPages > 1 && <div className="flex items-center justify-center gap-2 mt-16">
              <button
    onClick={() => setPage((p) => Math.max(1, p - 1))}
    disabled={page === 1}
    className="px-4 py-2 text-sm border border-border hover:border-foreground transition-colors disabled:opacity-40"
  >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <button
    key={p}
    onClick={() => setPage(p)}
    className={`w-9 h-9 text-sm border transition-colors ${p === page ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
  >
                  {p}
                </button>)}
              <button
    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
    disabled={page === totalPages}
    className="px-4 py-2 text-sm border border-border hover:border-foreground transition-colors disabled:opacity-40"
  >
                Next
              </button>
            </div>}
        </div>
      </div>
    </PageTransition>;
}
export {
  Shop
};
