import { PageTransition } from "@/components/layout/PageTransition";
function PrivacyPolicy() {
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
          <h1 className="font-serif text-4xl mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm mb-12">Last updated: January 1, 2025</p>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-8">
            {[
    { title: "1. Information We Collect", body: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, billing and shipping addresses, payment information, and phone number. We also collect information automatically when you use our services, including log data, device information, and usage statistics." },
    { title: "2. How We Use Your Information", body: "We use the information we collect to process and fulfill your orders, communicate with you about your account and orders, send marketing communications (with your consent), improve and personalize our services, and comply with legal obligations. We never sell your personal information to third parties." },
    { title: "3. Information Sharing", body: "We share your information with trusted service providers who assist us in operating our business, including payment processors, shipping carriers, and email service providers. All third parties are bound by confidentiality agreements and are prohibited from using your information for any purpose other than to serve us." },
    { title: "4. Data Security", body: "We implement industry-standard security measures including 256-bit SSL encryption, secure data centers, and regular security audits to protect your personal information. However, no method of transmission over the internet is 100% secure." },
    { title: "5. Your Rights", body: "You have the right to access, correct, or delete your personal information at any time. You may also opt out of marketing communications by clicking the unsubscribe link in any email or contacting us directly. To exercise your rights, please contact our concierge team." },
    { title: "6. Cookies", body: "We use cookies and similar tracking technologies to improve your browsing experience, analyze usage patterns, and deliver relevant content. You can control cookie settings through your browser preferences, though disabling cookies may affect some features of our website." },
    { title: "7. Contact Us", body: "If you have questions about this Privacy Policy or our data practices, please contact us at privacy@luxe.com or write to us at 450 Post St, San Francisco, CA 94102." }
  ].map((section) => <div key={section.title}>
                <h2 className="font-medium text-foreground mb-3">{section.title}</h2>
                <p>{section.body}</p>
              </div>)}
          </div>
        </div>
      </div>
    </PageTransition>;
}
function TermsOfService() {
  return <PageTransition>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
          <h1 className="font-serif text-4xl mb-2">Terms of Service</h1>
          <p className="text-muted-foreground text-sm mb-12">Last updated: January 1, 2025</p>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-8">
            {[
    { title: "1. Acceptance of Terms", body: "By accessing or using the LUXE website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
    { title: "2. Products and Orders", body: "All products are subject to availability. We reserve the right to limit quantities and refuse orders at our discretion. Prices are listed in USD and are subject to change without notice. We strive to display accurate product information, but errors may occur." },
    { title: "3. Payment", body: "Payment is due at the time of order placement. We accept major credit cards, PayPal, and Apple Pay. All transactions are processed through secure payment gateways. Your payment information is never stored on our servers." },
    { title: "4. Shipping and Returns", body: "We ship to over 50 countries. Delivery times are estimates and not guaranteed. Returns are accepted within 30 days of delivery for items in original condition. Certain items may be final sale as noted on the product page." },
    { title: "5. Intellectual Property", body: "All content on the LUXE website, including images, text, logos, and design, is the property of LUXE or its licensors. You may not reproduce, distribute, or create derivative works without express written permission." },
    { title: "6. Limitation of Liability", body: "LUXE's liability for any claim arising from the use of our services is limited to the amount paid for the relevant order. We are not liable for indirect, incidental, or consequential damages." },
    { title: "7. Governing Law", body: "These Terms are governed by the laws of the State of California, United States. Any disputes shall be resolved in the courts of San Francisco County, California." }
  ].map((section) => <div key={section.title}>
                <h2 className="font-medium text-foreground mb-3">{section.title}</h2>
                <p>{section.body}</p>
              </div>)}
          </div>
        </div>
      </div>
    </PageTransition>;
}
export {
  PrivacyPolicy,
  TermsOfService
};
