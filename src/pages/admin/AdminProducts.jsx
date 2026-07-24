import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useListProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./Dashboard";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
function AdminProducts() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", brand: "", stock: "0" });
  const { data } = useListProducts({ search: search || void 0, limit: 50 });
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["/api/products"] });
  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", description: "", price: "", category: "", brand: "", stock: "0" });
    setShowForm(true);
  };
  const openEdit = (product) => {
    setEditing(product);
    setForm({ name: product.name, description: product.description || "", price: String(product.price), category: product.category || "", brand: product.brand || "", stock: String(product.stock) });
    setShowForm(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data2 = { name: form.name, description: form.description, price: parseFloat(form.price), category: form.category, brand: form.brand, stock: parseInt(form.stock) };
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: data2 }, { onSuccess: () => {
        invalidate();
        setShowForm(false);
        toast.success("Product updated");
      } });
    } else {
      createMutation.mutate({ data: data2 }, { onSuccess: () => {
        invalidate();
        setShowForm(false);
        toast.success("Product created");
      } });
    }
  };
  const handleDelete = (id) => {
    if (!confirm("Delete this product?")) return;
    deleteMutation.mutate({ id }, { onSuccess: () => {
      invalidate();
      toast.success("Product deleted");
    } });
  };
  return <AdminLayout>
      <PageTransition>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl">Products</h1>
            <button onClick={openCreate} className="flex items-center gap-2 bg-foreground text-background px-4 py-2.5 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search products..."
    className="w-full border border-border pl-10 pr-4 py-2.5 text-sm bg-transparent focus:outline-none focus:border-foreground max-w-xs"
  />
          </div>

          <div className="border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground">Product</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground hidden md:table-cell">Category</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground">Price</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground hidden sm:table-cell">Stock</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data?.items.map((product, i) => <motion.tr
    key={product.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: i * 0.02 }}
    className="hover:bg-muted/20 transition-colors"
  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-muted overflow-hidden flex-shrink-0">
                          {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <p className="font-medium truncate max-w-[160px]">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{product.category}</td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(product.price)}</td>
                    <td className={`px-4 py-3 text-right hidden sm:table-cell ${product.stock < 10 ? "text-red-500" : "text-muted-foreground"}`}>{product.stock}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(product)} className="p-1.5 hover:bg-muted rounded transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>)}
              </tbody>
            </table>
          </div>

          {
    /* Edit/Create Modal */
  }
          {showForm && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-background border border-border p-8 w-full max-w-lg"
  >
                <h2 className="font-serif text-2xl mb-6">{editing ? "Edit Product" : "New Product"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
    { label: "Name", key: "name", required: true },
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Price", key: "price", type: "number" },
    { label: "Stock", key: "stock", type: "number" }
  ].map((f) => <div key={f.key}>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-1">{f.label}</label>
                      <input
    type={f.type || "text"}
    value={form[f.key]}
    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
    required={f.required}
    className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none focus:border-foreground"
  />
                    </div>)}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-1">Description</label>
                    <textarea
    value={form.description}
    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
    rows={3}
    className="w-full border border-border bg-transparent p-3 text-sm focus:outline-none focus:border-foreground resize-none"
  />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="flex-1 bg-foreground text-background py-3 text-sm uppercase tracking-widest hover:opacity-80">
                      {editing ? "Save" : "Create"}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-border text-sm uppercase tracking-widest hover:border-foreground">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>}
        </div>
      </PageTransition>
    </AdminLayout>;
}
export {
  AdminProducts
};
