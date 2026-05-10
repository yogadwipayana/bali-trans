import { Helmet } from "react-helmet-async";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";

const CONTACT_INFO = [
  { icon: Phone, label: "Phone", value: "+62 812 3456 7890", href: "tel:+6281234567890" },
  { icon: Mail, label: "Email", value: "hello@balitrans.com", href: "mailto:hello@balitrans.com" },
  { icon: MapPin, label: "Location", value: "Jl. Sunset Road No. 88, Seminyak, Bali" },
  { icon: Clock, label: "Hours", value: "Open 24/7 — We never close" },
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — Bali Trans</title>
        <meta name="description" content="Get in touch with Bali Trans. Reach us by phone, email, or visit our office in Seminyak." />
      </Helmet>

      <main className="min-h-screen" style={{ backgroundColor: "#f3f4f4" }}>
        <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Contact info */}
              <div className="rounded-[8px] border bg-white p-8" style={{ borderColor: "#e6e6e6" }}>
                <h1 className="text-xl font-bold text-[#0f0f0f]">Get in Touch</h1>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#7c7c7c" }}>
                  Have a question or ready to book? Reach out and we'll get back to you quickly.
                </p>
                <div className="mt-6 space-y-5">
                  {CONTACT_INFO.map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg border grid place-items-center shrink-0 text-[#0f0f0f]" style={{ borderColor: "#e6e6e6" }}>
                          <Icon className="w-4 h-4" strokeWidth={1.8} />
                        </div>
                        <div>
                          <div className="text-xs font-medium" style={{ color: "#a4a4a4" }}>{c.label}</div>
                          {c.href ? (
                            <a href={c.href} className="text-sm font-medium text-[#0f0f0f] hover:underline">{c.value}</a>
                          ) : (
                            <div className="text-sm font-medium text-[#0f0f0f]">{c.value}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-2 rounded-[8px] border bg-white p-8" style={{ borderColor: "#e6e6e6" }}>
                <h2 className="text-lg font-bold text-[#0f0f0f]">Send us a message</h2>
                <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#7c7c7c" }}>Name</label>
                    <input type="text" placeholder="Your name" className="w-full h-11 px-4 rounded-lg border text-sm outline-none focus:ring-1 focus:ring-[#0f0f0f]" style={{ borderColor: "#e6e6e6" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#7c7c7c" }}>Email</label>
                    <input type="email" placeholder="you@example.com" className="w-full h-11 px-4 rounded-lg border text-sm outline-none focus:ring-1 focus:ring-[#0f0f0f]" style={{ borderColor: "#e6e6e6" }} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#7c7c7c" }}>Subject</label>
                    <input type="text" placeholder="How can we help?" className="w-full h-11 px-4 rounded-lg border text-sm outline-none focus:ring-1 focus:ring-[#0f0f0f]" style={{ borderColor: "#e6e6e6" }} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#7c7c7c" }}>Message</label>
                    <textarea rows={5} placeholder="Tell us more..." className="w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none focus:ring-1 focus:ring-[#0f0f0f]" style={{ borderColor: "#e6e6e6" }} />
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" className="inline-flex items-center justify-center h-[44px] rounded-lg px-6 text-[13px] font-bold text-white bg-[#0f0f0f] hover:bg-[#1f1f1f] transition-colors">
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
