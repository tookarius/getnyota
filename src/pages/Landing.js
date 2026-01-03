import React, { useState } from 'react';
import {
  Star,
  Sparkles,
  Heart,
  Shield,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../index.css';
import CoverImage from '../assets/cover.png';

export default function Landing() {
  const [mobileMenuOpen] = useState(false);

  const testimonials = [
    {
      name: "Aisha Mohamed",
      county: "Mombasa",
      quote: "Nyota ilinipa KSh 350K seed funding. Sasa brand yangu inauzwa Dubai!",
    },
    {
      name: "Brian Kiprotich",
      county: "Kericho",
      quote: "From jobless to drone business owner. Nyota mentorship changed my life.",
    },
    {
      name: "Fatuma Hassan",
      county: "Garissa",
      quote: "Solar business yangu inawasha maisha ya 500+ families thanks to Nyota training.",
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-kenya-black/95 backdrop-blur-xl border-b border-kenya-red">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              NYOTA
            </h1>
            <p className="text-[10px] text-kenya-green font-bold -mt-1">
              YOUTH PLATFORM
            </p>
          </div>

          <Link to="/apply">
            <button className="bg-kenya-red text-white px-4 py-2 rounded-full text-sm font-bold shadow hover:bg-kenya-green transition">
              Apply
            </button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-24 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 kenya-gradient opacity-75" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${CoverImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-5 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Empower Your Future
            <br />
            <span className="text-kenya-green text-5xl md:text-7xl">
              With Nyota
            </span>
          </h1>

          <p className="mt-5 text-xl font-semibold text-white">
            Get funded up to{' '}
            <span className="text-kenya-green">KES 100,000</span> — fast and secure
          </p>

          <p className="mt-3 text-sm text-white/90">
            Training • Funding • Mentorship • Jobs
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 max-w-sm mx-auto">
            <Link to="/apply">
              <button className="w-full bg-kenya-green text-white py-4 px-8 rounded-full font-bold text-lg shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-3">
                Apply Sasa
                <Sparkles className="w-6 h-6" />
              </button>
            </Link>

            <div className="flex justify-center gap-4 text-xs text-white/90">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-kenya-green" />
                Secure
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-kenya-green" />
                Fast Approval
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-kenya-green" />
                No Collateral
              </span>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-16 grid grid-cols-3 gap-4 text-white text-center">
            {[
              { value: '250K+', label: 'Youth Supported' },
              { value: 'KES 12B+', label: 'Funds Disbursed' },
              { value: '47', label: 'Counties' },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-md rounded-2xl py-4 px-3 shadow"
              >
                <p className="text-3xl font-black">{s.value}</p>
                <p className="text-xs mt-1 opacity-90">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white">
        <div className="px-5 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-kenya-black">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              'Apply Online',
              'Get Approved',
              'Receive Funds',
            ].map((step, i) => (
              <div
                key={step}
                className="p-6 rounded-2xl shadow border bg-gray-50"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-kenya-green text-white rounded-full flex items-center justify-center font-black text-xl">
                  {i + 1}
                </div>
                <p className="font-bold text-lg">{step}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Simple, transparent, and fully digital
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <div className="px-5 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-kenya-black">
            Success Stories
          </h2>

          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-kenya-red"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-kenya-green rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{t.name}</p>
                    <p className="text-kenya-red text-sm font-semibold">
                      {t.county} County
                    </p>
                  </div>
                </div>

                <span className="inline-block mb-3 text-xs bg-kenya-green/10 text-kenya-green px-3 py-1 rounded-full font-semibold">
                  Verified Beneficiary
                </span>

                <p className="text-gray-700 italic">“{t.quote}”</p>

                <div className="mt-4 flex justify-end">
                  {i === 0 && <Heart className="text-kenya-red" />}
                  {i === 1 && <Shield className="text-kenya-green" />}
                  {i === 2 && <Sparkles className="text-kenya-red" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-kenya-black py-12">
        <div className="px-5 text-center text-white">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 kenya-gradient rounded-full flex items-center justify-center">
              <Star />
            </div>
            <h3 className="text-2xl font-black">NYOTA</h3>
          </div>

          <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
            General Youth Opportunities Towards Advancement
            <br />
            Regulated digital funding platform
          </p>

          <p className="text-white/50 text-xs">
            © 2025 Nyota Funds • info@funds.digital
          </p>
        </div>
      </footer>

      {/* FLOATING APPLY CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link to="/apply">
          <button className="bg-kenya-red text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-bold animate-bounce hover:scale-105 transition">
            Apply
            <ChevronRight />
          </button>
        </Link>
      </div>
    </>
  );
}
