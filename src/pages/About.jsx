import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
function About() {
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        {
    /* Hero */
  }
        <div className="relative h-[60vh] overflow-hidden">
          <img
    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000&auto=format&fit=crop"
    alt="Our Story"
    className="w-full h-full object-cover"
  />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4">
            <div>
              <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-xs tracking-widest uppercase mb-4 text-white/70"
  >
                Our Maison
              </motion.p>
              <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="font-serif text-5xl md:text-7xl"
  >
                The LUXE Story
              </motion.h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-24 max-w-4xl">
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-3xl mb-6">Elegance is elimination.</h2>
                <p className="text-muted-foreground leading-relaxed">
                  LUXE was founded on a single principle: that true luxury is not about excess, but about precision. About knowing exactly what you need, and finding the finest possible version of it. Every piece in our collection is chosen with intention.
                </p>
              </div>
              <div className="aspect-square bg-muted overflow-hidden">
                <img
    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
    alt="Craftsmanship"
    className="w-full h-full object-cover"
  />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
    { title: "Curation", desc: "Every product is personally selected by our team of experts, held to an uncompromising standard of quality and design." },
    { title: "Authenticity", desc: "We partner exclusively with brands and artisans who share our values: transparency, craft, and enduring quality over trend." },
    { title: "Service", desc: "Our concierge team is available around the clock to assist with any aspect of your experience \u2014 from selection to delivery." }
  ].map((item) => <div key={item.title} className="border-t border-border pt-8">
                  <h3 className="font-serif text-xl mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>)}
            </div>

            <div className="bg-muted/30 p-12 text-center">
              <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed max-w-2xl mx-auto">
                "We don't sell products. We offer access to the things that make life more beautiful."
              </blockquote>
              <p className="text-sm text-muted-foreground mt-6 uppercase tracking-widest">— Founder, LUXE</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>;
}
export {
  About
};
