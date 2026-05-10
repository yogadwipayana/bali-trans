import { Helmet } from "react-helmet-async";
import { Footer } from "@/components/Footer";

const DESTINATIONS = [
  {
    name: "Ubud",
    desc: "Rice terraces, culture & peaceful nature",
    highlights: ["Tegallalang Rice Terrace", "Monkey Forest", "Art Market"],
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Seminyak",
    desc: "Beach clubs, shopping & nightlife",
    highlights: ["Double Six Beach", "Eat Street", "Potato Head"],
    img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Uluwatu",
    desc: "Cliffs, temples & stunning sunsets",
    highlights: ["Uluwatu Temple", "Padang Padang Beach", "Kecak Dance"],
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Nusa Penida",
    desc: "Crystal waters & iconic views",
    highlights: ["Kelingking Beach", "Angel's Billabong", "Broken Beach"],
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Canggu",
    desc: "Surf spots, cafés & laid-back vibes",
    highlights: ["Batu Bolong Beach", "Tanah Lot Temple", "La Brisa"],
    img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sanur",
    desc: "Calm beaches & sunrise views",
    highlights: ["Sanur Boardwalk", "Le Mayeur Museum", "Sunrise Beach"],
    img: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kintamani",
    desc: "Volcanic landscapes & lake views",
    highlights: ["Mount Batur", "Lake Batur", "Hot Springs"],
    img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Jimbaran",
    desc: "Seafood dining & golden sunsets",
    highlights: ["Jimbaran Bay", "Seafood Cafés", "Garuda Wisnu Kencana"],
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Destinations() {
  return (
    <>
      <Helmet>
        <title>Destinations — Bali Trans</title>
        <meta name="description" content="Explore the best destinations in Bali with Bali Trans car rental. From Ubud's rice terraces to Uluwatu's cliffs." />
      </Helmet>

      <main className="min-h-screen" style={{ backgroundColor: "#f3f4f4" }}>
        {/* Destinations Grid */}
        <section id="destinations-grid" className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {DESTINATIONS.map((dest) => (
                <div key={dest.name} className="group rounded-[8px] border bg-white overflow-hidden hover:shadow-lg transition-shadow" style={{ borderColor: "#e6e6e6" }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-[#0f0f0f]">{dest.name}</h3>
                    <p className="mt-1 text-sm" style={{ color: "#7c7c7c" }}>{dest.desc}</p>
                    <ul className="mt-3 space-y-1">
                      {dest.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs" style={{ color: "#7c7c7c" }}>
                          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#a4a4a4" }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
