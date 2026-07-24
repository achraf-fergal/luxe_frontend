import { createContext, useContext, useEffect, useState } from "react";
const RecentlyViewedContext = createContext(void 0);
const MAX_ITEMS = 10;
const STORAGE_KEY = "luxe_recently_viewed";
function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recently viewed items", e);
      }
    }
  }, []);
  const addRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };
  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  };
  return <RecentlyViewedContext.Provider value={{ recentlyViewed, addRecentlyViewed, clearRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>;
}
function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === void 0) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  }
  return context;
}
export {
  RecentlyViewedProvider,
  useRecentlyViewed
};
