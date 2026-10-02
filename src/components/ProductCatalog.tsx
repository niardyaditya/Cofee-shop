import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS, BAKERY_ITEMS } from '../data/products';
import { TransparentImage } from './TransparentImage';

interface ProductCatalogProps {
  searchQuery: string;
  onOpenCustomizer: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  onAddBakeryItem: (item: typeof BAKERY_ITEMS[0]) => void;
  onGoToCart: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  searchQuery,
  onOpenCustomizer,
  onQuickAddToCart,
  onAddBakeryItem,
  onGoToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Drinks');

  const categories = [
    'All Drinks',
    'Matcha & Tea Specials',
    'Espresso & Brews',
    'Frappuccino® Blended',
    'Cold Brew & Nitro',
    'Pastries & Food',
  ];

  // Filter products by category and search query
  const filteredDrinks = PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Drinks' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const showBakery =
    selectedCategory === 'All Drinks' || selectedCategory === 'Pastries & Food';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Catalog Stage Headline */}
      <section className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F2EA] text-[#006c47] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c47]"></span>
            Seasonal Botanical Craft
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#07231d] tracking-tight">
            Artisanal Beverages <span className="font-normal italic text-[#006c47]">&amp; Blends</span>
          </h1>
          <p className="text-sm sm:text-base text-[#64746B] mt-1 max-w-xl">
            Sip through sensory layered teas, pure cold foams, and handcrafted espresso combinations, tuned to velvety perfection.
          </p>
        </div>

        {/* Showing Items Counter & Quick Filter Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#64746B]">
            Showing {filteredDrinks.length} Signature Items
          </span>
          <div className="h-4 w-[1px] bg-gray-300"></div>
          <div className="text-xs font-bold text-[#006c47] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Direct Farm Sourced
          </div>
        </div>
      </section>

      {/* Category Filter Tabs (Pill style matching HTML spec) */}
      <section className="mb-10 overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_4px_24px_rgba(30,57,50,0.04)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1e3932] text-white shadow-[0_4px_16px_rgba(30,57,50,0.22)]'
                  : 'text-gray-700 hover:text-[#006c47] hover:bg-[#E8F2EA]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Bento Grid Layout (Matching HTML Spec) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* CARD 1: MATCHA FUSION FRAPPE (Featured Hero Glass Card - Span 2 on large screens when available) */}
        {filteredDrinks.find((d) => d.id === 'matcha-fusion') && (
          <article className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/80 p-6 sm:p-8 shadow-[0_12px_40px_rgba(30,57,50,0.06)] hover:shadow-[0_20px_50px_rgba(30,57,50,0.12)] transition-all duration-300 flex flex-col justify-between">
            {/* Ambient Accent Blob */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#9bf5c5]/30 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Left Info Column */}
              <div className="sm:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#006c47] text-white text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      Featured
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#E8F2EA] text-[#1e3932] text-xs font-semibold border border-emerald-200/40">
                      240 kcal
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-[#07231d] tracking-tight leading-tight mb-2">
                    MATCHA <br />
                    <span className="italic font-light text-[#006c47]">FUSION FRAPPE</span>
                  </h2>

                  <div className="w-14 h-1 bg-[#006c47] rounded-full my-2"></div>

                  <p className="text-xs sm:text-sm text-[#64746B] mt-2 max-w-sm leading-relaxed">
                    The Matcha &amp; Espresso Fusion offers a surprising and delightful combination of velvety matcha's grassy notes and natural sweetness mixed with espresso's rich bitterness.
                  </p>
                </div>

                {/* Quick Spec Tags */}
                <div className="mt-6 pt-4 border-t border-gray-200/60 flex flex-wrap gap-4 items-center text-xs text-gray-600">
                  <span className="flex items-center gap-1 font-semibold text-[#07231d]">
                    <span className="material-symbols-outlined text-[16px]">coffee</span> Grande (16 fl oz)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">water_drop</span> Oat Milk
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">ac_unit</span> Regular Ice
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="text-3xl font-black text-[#07231d]">$5.99</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onQuickAddToCart(filteredDrinks.find((d) => d.id === 'matcha-fusion')!)}
                      className="bg-[#1e3932] text-white hover:bg-[#006c47] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_8px_20px_rgba(30,57,50,0.22)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Add to Cart
                    </button>
                    <button
                      onClick={() => onOpenCustomizer(filteredDrinks.find((d) => d.id === 'matcha-fusion')!)}
                      className="text-xs font-bold text-[#1e3932] hover:text-[#006c47] px-4 py-3 rounded-full border border-gray-300 hover:border-[#006c47] transition-colors"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Cup Asset Composition */}
              <div className="sm:col-span-5 relative flex items-center justify-center py-4">
                <div className="absolute bottom-6 w-44 h-10 bg-[#1e3932]/25 blur-xl rounded-full"></div>
                <TransparentImage
                  src={filteredDrinks.find((d) => d.id === 'matcha-fusion')!.imageUrl}
                  alt="Matcha Fusion Frappe"
                  className="relative z-10 w-full max-w-[260px] h-[300px] object-contain drop-shadow-[0_24px_36px_rgba(30,57,50,0.25)] group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => onOpenCustomizer(filteredDrinks.find((d) => d.id === 'matcha-fusion')!)}
                />
              </div>
            </div>
          </article>
        )}

        {/* Other Drink Cards */}
        {filteredDrinks
          .filter((d) => d.id !== 'matcha-fusion')
          .map((drink) => (
            <article
              key={drink.id}
              className="relative group rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 p-6 shadow-[0_8px_30px_rgba(30,57,50,0.04)] hover:shadow-[0_16px_40px_rgba(30,57,50,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F2EA] text-[#006c47] text-xs font-semibold">
                    {drink.badge || 'Artisanal'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                    {drink.calories} kcal
                  </span>
                </div>

                {/* Cup Visual Showcase */}
                <div
                  onClick={() => onOpenCustomizer(drink)}
                  className="relative flex items-center justify-center my-4 h-56 cursor-pointer"
                >
                  <div className="absolute bottom-2 w-32 h-6 bg-[#1e3932]/20 blur-lg rounded-full"></div>
                  <TransparentImage
                    src={drink.imageUrl}
                    alt={`${drink.name} ${drink.subtitle}`}
                    className="relative z-10 h-52 object-contain group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-[0_16px_24px_rgba(30,57,50,0.18)]"
                  />
                </div>

                <div className="mt-2">
                  <h3 className="text-xl font-bold text-[#07231d] mb-1">
                    {drink.name} <span className="italic font-light text-[#006c47]">{drink.subtitle}</span>
                  </h3>
                  <p className="text-xs text-[#64746B] line-clamp-2 mb-4 leading-relaxed">
                    {drink.description}
                  </p>
                </div>
              </div>

              {/* Price baseline & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-[11px] text-gray-500 block font-medium">Grande (16 fl oz)</span>
                  <span className="text-xl font-black text-[#07231d]">${drink.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCustomizer(drink)}
                    className="px-3 py-2 rounded-full border border-gray-200 hover:border-[#006c47] text-xs font-bold text-gray-700 hover:bg-[#E8F2EA]/40 transition-colors"
                  >
                    Custom
                  </button>
                  <button
                    onClick={() => onQuickAddToCart(drink)}
                    className="bg-[#1e3932] text-white hover:bg-[#006c47] p-2.5 rounded-full shadow-[0_6px_16px_rgba(30,57,50,0.18)] active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                    aria-label={`Add ${drink.name} to cart`}
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
      </section>

      {/* Bakery & Frequently Paired Pastries Section */}
      {showBakery && (
        <section className="mt-14 pt-8 border-t border-gray-200/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006c47]">
                Fresh Daily Bake
              </span>
              <h2 className="text-2xl font-bold text-[#07231d]">
                Artisanal Bakery &amp; Pairings
              </h2>
            </div>
            <span className="text-xs text-gray-500">
              Warm croissants, scones &amp; oven-baked goods
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BAKERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 border border-white/90 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-18 h-18 rounded-2xl overflow-hidden bg-gray-100 shrink-0 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#07231d] truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-[#006c47]">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => onAddBakeryItem(item)}
                      className="px-3 py-1 rounded-full bg-[#1e3932] text-white hover:bg-[#006c47] text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                    >
                      <span>+ Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
