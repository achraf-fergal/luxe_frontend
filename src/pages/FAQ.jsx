import { PageTransition } from "@/components/layout/PageTransition";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqs = [
  { q: "What is your return policy?", a: "We offer free returns within 30 days of delivery. Items must be in their original condition with tags attached. Simply contact our concierge team and we'll arrange a pickup." },
  { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. Overnight delivery is available on most items for next business day arrival." },
  { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. International shipping times and costs vary by destination. All customs duties are the responsibility of the recipient." },
  { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can also track your order in real-time by logging into your account and visiting Order History." },
  { q: "Are all products authentic?", a: "Absolutely. We source directly from brands and authorized distributors only. Every item comes with its original packaging, certificates of authenticity (where applicable), and warranty documentation." },
  { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 2 hours of placement. After that, please contact our concierge team and we'll do our best to accommodate your request." },
  { q: "Do you offer gift wrapping?", a: "Yes, luxury gift wrapping is complimentary on all orders. You can request this at checkout and include a personal message. Our packaging is designed to create a memorable unboxing experience." },
  { q: "How do I use a promo code?", a: "Enter your promo code in the designated field during checkout, before placing your order. Codes are case-sensitive and can only be used once per account unless otherwise stated." },
  { q: "Is my payment information secure?", a: "All transactions are protected with 256-bit SSL encryption. We never store credit card information on our servers. Payment processing is handled by industry-standard secure processors." },
  { q: "How do I contact customer support?", a: "Our concierge team is available 24/7 via email at concierge@luxe.com, by phone at +1 (800) LUXE-001, or through our contact form. We aim to respond within 2 hours." }
];
function FAQ() {
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Support</p>
            <h1 className="font-serif text-4xl">Frequently Asked Questions</h1>
          </div>

          <Accordion type="single" collapsible className="divide-y divide-border">
            {faqs.map((faq, i) => <AccordionItem key={i} value={`faq-${i}`} className="border-none">
                <AccordionTrigger className="py-6 text-left font-medium text-sm hover:no-underline hover:text-muted-foreground transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </div>
    </PageTransition>;
}
export {
  FAQ
};
