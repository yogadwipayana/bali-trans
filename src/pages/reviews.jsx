import { Helmet } from "react-helmet-async";
import { Star } from "lucide-react";
import { Footer } from "@/components/Footer";

const REVIEWS = [
  {
    text: "Super easy booking and the car was in perfect condition. Delivery to our villa was seamless!",
    name: "Jason R.",
    country: "Australia",
    img: "https://i.pravatar.cc/100?img=11",
    rating: 5,
  },
  {
    text: "Best car rental experience in Bali. No hidden fees and great customer service.",
    name: "Sarah M.",
    country: "Singapore",
    img: "https://i.pravatar.cc/100?img=5",
    rating: 5,
  },
  {
    text: "The car was clean and fuel-efficient and perfect for our trip around the island.",
    name: "David L.",
    country: "United States",
    img: "https://i.pravatar.cc/100?img=12",
    rating: 5,
  },
  {
    text: "Highly recommend! They even helped us with local tips and route suggestions.",
    name: "Mila K.",
    country: "Indonesia",
    img: "https://i.pravatar.cc/100?img=9",
    rating: 5,
  },
  {
    text: "Picked us up right at the airport. Very professional and friendly driver.",
    name: "Tom W.",
    country: "United Kingdom",
    img: "https://i.pravatar.cc/100?img=15",
    rating: 4,
  },
  {
    text: "We rented a scooter and a car for two weeks. Both were in excellent condition.",
    name: "Anna P.",
    country: "Germany",
    img: "https://i.pravatar.cc/100?img=20",
    rating: 5,
  },
  {
    text: "Affordable prices and the booking process was straightforward. Will use again!",
    name: "Ravi S.",
    country: "India",
    img: "https://i.pravatar.cc/100?img=33",
    rating: 4,
  },
  {
    text: "Great communication via WhatsApp. They responded within minutes every time.",
    name: "Yuki T.",
    country: "Japan",
    img: "https://i.pravatar.cc/100?img=25",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <>
      <Helmet>
        <title>Reviews — Bali Trans</title>
        <meta name="description" content="Read what our customers say about Bali Trans car rental service." />
      </Helmet>

      <main className="min-h-screen" style={{ backgroundColor: "#f3f4f4" }}>
        <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {REVIEWS.map((r) => (
                <div key={r.name} className="rounded-[8px] border bg-white p-6 flex flex-col" style={{ borderColor: "#e6e6e6" }}>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        fill={i < r.rating ? "#0f0f0f" : "none"}
                        stroke={i < r.rating ? "#0f0f0f" : "#e6e6e6"}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#7c7c7c" }}>"{r.text}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <img src={r.img} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-semibold text-[#0f0f0f]">{r.name}</div>
                      <div className="text-xs" style={{ color: "#a4a4a4" }}>{r.country}</div>
                    </div>
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
