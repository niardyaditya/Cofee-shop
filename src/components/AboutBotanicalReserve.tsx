import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AboutBotanicalReserveProps {
  onExploreMenu: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'star') => void;
}

export const AboutBotanicalReserve: React.FC<AboutBotanicalReserveProps> = ({
  onExploreMenu,
  onShowToast,
}) => {
  const [selectedLocation, setSelectedLocation] = useState('Pike Place Reserve & Roastery');
  const [searchCity, setSearchCity] = useState('Seattle, Washington');

  const locations = [
    {
      id: 'pike-place',
      name: 'Pike Place Reserve & Roastery',
      address: '1124 Pike St • Botanical Tasting Bar Available',
      status: 'Open Now',
      hours: '6:30 AM – 10:00 PM',
      nitroAvailable: true,
    },
    {
      id: 'uvillage',
      name: 'University Village Reserve',
      address: '2643 NE 46th St • Nitro & Cold Foam Spec',
      status: 'Open Now',
      hours: '7:00 AM – 9:00 PM',
      nitroAvailable: true,
    },
    {
      id: 'soodo',
      name: 'SoDo Starbucks Center Reserve',
      address: '2401 Utah Ave S • Masterclass Tasting Lab',
      status: 'Opens 8:00 AM',
      hours: '8:00 AM – 7:00 PM',
      nitroAvailable: true,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-16">
      {/* 1. Hero Section: Rooted in Craft, Elevated by Botanical Reserve */}
      <section className="relative rounded-[2.5rem] sm:rounded-[3.2rem] bg-white/80 backdrop-blur-2xl border border-white/80 p-6 sm:p-12 lg:p-16 shadow-[0_16px_50px_rgba(30,57,50,0.06)] overflow-hidden">
        {/* Soft Ambient Radiance */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E8F2EA]/80 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F2EA] text-[#006c47] text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">spa</span>
              Heritage &amp; Craft Reserve
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-[#07231d] tracking-tight leading-tight">
              Rooted in Craft, <br />
              <span className="font-light italic text-[#006c47]">
                Elevated by Botanical Reserve
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#64746B] leading-relaxed max-w-xl">
              Discover the story behind our masterfully sourced Matcha and ethical coffee craft. From centuries-old misty tea hills in Uji to volcanic shade-grown Arabica estates, experience coffee and tea redefined.
            </p>

            {/* Proof Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#07231d] block">100%</span>
                <span className="text-xs text-gray-500 font-medium">C.A.F.E. Practices</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#07231d] block">1200m</span>
                <span className="text-xs text-gray-500 font-medium">High Elevation Tea</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#07231d] block">Zero</span>
                <span className="text-xs text-gray-500 font-medium">Artificial Additives</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="bg-[#1e3932] text-white hover:bg-[#006c47] px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore the Journey</span>
                <span className="material-symbols-outlined text-base">arrow_downward</span>
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('reserve-bars');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#07231d] hover:text-[#006c47] transition-colors"
              >
                Find Sourcing Roasteries →
              </button>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
                alt="Botanical Matcha Tea Ritual"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#006c47] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-sm">energy_savings_leaf</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Single-Estate Uji</span>
                    <span className="text-[10px] text-white/80">Spring Harvest 2026</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold">
                  Verified Origin
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sacred Roots: Journey of Japanese Uji Matcha & Arabica Harmony */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#006c47]">
            Sacred Roots
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#07231d]">
            The Journey of Japanese Uji Matcha &amp; Arabica Harmony
          </h2>
          <p className="text-sm text-gray-600">
            Our botanical creations are born from a fusion of centuries-old eastern tea rituals and sustainable Latin American coffee farming, culminating in sensory perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Kyoto, Japan */}
          <div className="group relative rounded-3xl overflow-hidden shadow-lg h-80 flex flex-col justify-end p-6 border border-white">
            <img
              src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
              alt="Kyoto Japan Shade Grown Matcha"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07231d]/90 via-[#07231d]/30 to-transparent"></div>
            <div className="relative z-10 text-white space-y-1">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-300">
                Kyoto, Japan
              </span>
              <h3 className="text-xl font-bold">Shade-Grown Tencha Cultivation</h3>
              <p className="text-xs text-white/80 leading-relaxed max-w-md">
                Shielded from sunlight for 21 days to concentrate chlorophyll and theanine, unlocking deep umami sweetness and vivid natural jade hue.
              </p>
            </div>
          </div>

          {/* Card 2: Costa Rica */}
          <div className="group relative rounded-3xl overflow-hidden shadow-lg h-80 flex flex-col justify-end p-6 border border-white">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
              alt="Hacienda Alsacia Costa Rica Agronomy Hub"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07231d]/90 via-[#07231d]/30 to-transparent"></div>
            <div className="relative z-10 text-white space-y-1">
              <span className="text-xs font-bold tracking-wider uppercase text-amber-300">
                Hacienda Alsacia, Costa Rica
              </span>
              <h3 className="text-xl font-bold">The Agronomy Global Hub</h3>
              <p className="text-xs text-white/80 leading-relaxed max-w-md">
                Developing resilient, sustainable Arabica tree varieties freely shared with smallholder farmers worldwide to protect biodiversity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Three Botanical Pillars */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#006c47]">
              Core Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07231d]">
              The Three Botanical Pillars
            </h2>
          </div>
          <span className="text-xs text-gray-500 max-w-xs">
            How our dedication to ethical craft shapes every handcrafted cup poured across our stores.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white/80 border border-white/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F2EA] flex items-center justify-center text-[#006c47]">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </div>
            <h3 className="text-lg font-bold text-[#07231d]">Ethically Sourced</h3>
            <p className="text-xs text-[#64746B] leading-relaxed">
              100% C.A.F.E. Practices certified coffee verified alongside Conservation International, ensuring fair compensation and single-origin shade-grown matcha traceability.
            </p>
            <span className="text-xs font-bold text-[#006c47] flex items-center gap-1">
              Ethical Protocol →
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 border border-white/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F2EA] flex items-center justify-center text-[#006c47]">
              <span className="material-symbols-outlined text-2xl">blender</span>
            </div>
            <h3 className="text-lg font-bold text-[#07231d]">Artisan Blending</h3>
            <p className="text-xs text-[#64746B] leading-relaxed">
              Velvety matcha micro-milled on traditional stone granite wheels, paired seamlessly with signature slow-roasted espresso notes to achieve harmonious botanical fusion.
            </p>
            <span className="text-xs font-bold text-[#006c47] flex items-center gap-1">
              Micro-Milling Process →
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 border border-white/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F2EA] flex items-center justify-center text-[#006c47]">
              <span className="material-symbols-outlined text-2xl">nest_eco_leaf</span>
            </div>
            <h3 className="text-lg font-bold text-[#07231d]">Sustainable Future</h3>
            <p className="text-xs text-[#64746B] leading-relaxed">
              Reusable cup commitments, carbon-neutral regenerative farming investments, and sustainably certified Greener Stores built with 100% renewable energy grids.
            </p>
            <span className="text-xs font-bold text-[#006c47] flex items-center gap-1">
              2030 Eco Roadmap →
            </span>
          </div>
        </div>
      </section>

      {/* 4. Craft in Person: Visit a Botanical Reserve Bar (Store Locator) */}
      <section id="reserve-bars" className="p-6 sm:p-8 rounded-3xl bg-white/85 border border-white/90 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006c47]">
              Craft in Person
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07231d]">
              Visit a Botanical Reserve Bar
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Experience the pour-over bars, customized stone-ground matcha teas, and single-origin flights crafted by our Master Baristas.
            </p>

            {/* City search input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                location_on
              </span>
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Search city or zip code"
                className="w-full bg-[#F2F8F4] border border-gray-200 rounded-full pl-9 pr-4 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#006c47]"
              />
            </div>

            {/* Store list */}
            <div className="space-y-3">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.name)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedLocation === loc.name
                      ? 'border-[#006c47] bg-[#E8F2EA]/70 ring-1 ring-[#006c47]'
                      : 'border-gray-200 hover:border-gray-300 bg-white/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#07231d]">{loc.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#006c47]">
                      {loc.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">{loc.address}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500">Over 450 Reserve stores globally</span>
              <button
                onClick={() => onShowToast('Store Locator', 'Displaying Reserve bars near you', 'info')}
                className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                View All Locations
              </button>
            </div>
          </div>

          {/* Interactive Map Visual Simulator */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-[#E8F2EA] h-80 flex items-center justify-center p-6 text-center">
            {/* Visual map graphics / pins */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#006c47_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative z-10 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white max-w-sm space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#006c47] text-white mx-auto shadow-md">
                <span className="material-symbols-outlined text-2xl">local_cafe</span>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#07231d]">{selectedLocation}</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Daily Barista Masterclass at 2:00 PM
                </p>
              </div>
              <div className="p-2 rounded-xl bg-[#E8F2EA] text-[11px] font-semibold text-[#006c47]">
                Live cupping of Japanese green teas paired with single-origin Ethiopia Guji espresso.
              </div>
              <button
                onClick={() => onShowToast('Masterclass RSVP', 'Reserved 1 seat for today 2:00 PM', 'star')}
                className="w-full py-2 rounded-full bg-[#1e3932] text-white hover:bg-[#006c47] text-xs font-bold transition-colors cursor-pointer"
              >
                RSVP for Tasting Flight
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Starbucks Rewards Banner */}
      <section className="rounded-3xl bg-[#1e3932] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#006c47]/60 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">stars</span>
            Starbucks Rewards Heritage
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Join Starbucks Rewards &amp; Taste the Botanical Difference
          </h2>
          <p className="text-sm text-emerald-100/80 leading-relaxed">
            Unlock complimentary plant-based milk customizations, exclusive early reserve matcha drops, and earn Stars with every sip of artisan coffee.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => onShowToast('Welcome to Rewards!', 'Earn 25 Bonus Stars on your first drink', 'star')}
              className="bg-white text-[#1e3932] hover:bg-emerald-50 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
            >
              Join Now
            </button>
            <button
              onClick={onExploreMenu}
              className="text-xs font-bold text-white hover:underline cursor-pointer"
            >
              Order Signature Drinks →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
