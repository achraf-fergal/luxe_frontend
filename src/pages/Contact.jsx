import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { toast } from "sonner";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message received. Our concierge will be in touch shortly.");
    setName("");
    setEmail("");
    setMessage("");
  };
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Get in touch</p>
            <h1 className="font-serif text-4xl md:text-5xl">Concierge</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-12">
                Our personal shopping concierge is available to assist with anything — from finding the perfect gift to answering product questions or managing an order. We aim to respond within 2 hours.
              </p>

              <div className="space-y-6">
                {[
    { icon: Mail, label: "Email", value: "concierge@luxe.com" },
    { icon: Phone, label: "Phone", value: "+1 (800) LUXE-001" },
    { icon: MapPin, label: "Maison", value: "450 Post St, San Francisco, CA 94102" }
  ].map((item) => <div key={item.label} className="flex items-start gap-4">
                    <div className="p-2 bg-muted">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  </div>)}
              </div>
            </div>

            <motion.form
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onSubmit={handleSubmit}
    className="space-y-6"
  >
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Name</label>
                <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
  />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Email</label>
                <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="w-full border-b border-border bg-transparent py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
  />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Message</label>
                <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    required
    rows={6}
    className="w-full border border-border bg-transparent p-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
  />
              </div>
              <button type="submit" className="w-full py-4 bg-foreground text-background text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </PageTransition>;
}
export {
  Contact
};
