import { useListUsers } from "@/lib/api-client";
import { AdminLayout } from "./Dashboard";
import { PageTransition } from "@/components/layout/PageTransition";
import { motion } from "framer-motion";
function AdminUsers() {
  const { data } = useListUsers({ limit: 50 });
  return <AdminLayout>
      <PageTransition>
        <div className="p-8">
          <h1 className="font-serif text-3xl mb-8">Customers</h1>

          <div className="border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground">Customer</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground hidden md:table-cell">Email</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground">Role</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data?.items?.map((user, i) => <motion.tr
    key={user.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: i * 0.03 }}
    className="hover:bg-muted/20 transition-colors"
  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted overflow-hidden flex-shrink-0 flex items-center justify-center text-xs font-medium">
                          {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user.name?.[0]}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider ${user.role === "admin" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "\u2014"}
                    </td>
                  </motion.tr>)}
              </tbody>
            </table>
            {!data?.items?.length && <div className="p-12 text-center text-muted-foreground text-sm">No customers found</div>}
          </div>
        </div>
      </PageTransition>
    </AdminLayout>;
}
export {
  AdminUsers
};
