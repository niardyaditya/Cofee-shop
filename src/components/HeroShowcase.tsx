import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { TransparentImage } from './TransparentImage';

interface HeroShowcaseProps {
  onOpenCustomizer: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  onGoToCart: () => void;
  onOpenStudio: () => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  onOpenCustomizer,
  onQuickAddToCart,
  onGoToCart,
  onOpenStudio,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = PRODUCTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
      {/* Master Pill-Curved Showcase Stage (Matching Image 1, 2, 3) */}
      <div className="relative w-full rounded-[2.5rem] sm:rounded-[3.2rem] bg-white/85 backdrop-blur-2xl border border-white/90 shadow-[0_20px_60px_rgba(7,35,29,0.08)] overflow-hidden">
        {/* Soft Organic Background Ambient Radiance */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#E8F2EA]/80 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-[#9bf5c5]/20 blur-[100px] pointer-events-none"></div>

        {/* Carousel Chevron Controls (Hairline floating circles) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Drink"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-[#E8F2EA] text-[#07231d] border border-gray-200/80 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Drink"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-[#E8F2EA] text-[#07231d] border border-gray-200/80 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>

        {/* Main Two-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[620px] items-stretch">
          {/* Left Column: Product Typography, Story & Actions */}
          <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10">
            <div>
              {/* Eyebrow Pill */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F2EA] text-[#006c47] text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c47]"></span>
                  {currentProduct.badge || 'Artisanal Seasonal Special'}
                </span>
                <button
                  onClick={onOpenStudio}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#07231d] border border-emerald-200 hover:border-[#006c47] text-xs font-bold tracking-wide shadow-2xs hover:bg-[#F2F8F4] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs text-[#006c47]">drag_indicator</span>
                  Drag &amp; Drop Studio
                </button>
              </div>

              {/* Product Hero Typography with Split Weight (Bold + Thin Italic) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <h1 className="text-4xl sm:text-6xl font-black text-[#07231d] tracking-tight leading-[1.05]">
                    {currentProduct.name} <br />
                    <span className="font-light italic text-[#006c47] tracking-normal">
                      {currentProduct.subtitle}
                    </span>
                  </h1>

                  {/* Accent Line Divider */}
                  <div className="w-20 h-1 bg-[#006c47] rounded-full my-4"></div>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#07231d]">
                      ${currentProduct.price.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-gray-500">
                      (Grande 16 fl oz)
                    </span>
                  </div>

                  {/* Narrative Body Copy */}
                  <p className="text-sm sm:text-base text-[#64746B] max-w-lg leading-relaxed font-normal mb-6">
                    {currentProduct.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onQuickAddToCart(currentProduct)}
                  className="bg-[#1e3932] text-white hover:bg-[#006c47] px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_8px_24px_rgba(30,57,50,0.24)] transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  ADD TO CART
                </motion.button>

                <button
                  onClick={() => onOpenCustomizer(currentProduct)}
                  className="px-6 py-3 rounded-full border border-gray-300 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#07231d] hover:bg-[#E8F2EA]/60 transition-colors cursor-pointer"
                >
                  Customize
                </button>

                <button
                  onClick={onGoToCart}
                  className="text-xs sm:text-sm font-bold text-[#1e3932] underline underline-offset-4 hover:text-[#006c47] transition-colors cursor-pointer"
                >
                  View Cart
                </button>
              </div>
            </div>

            {/* Bottom Meta & Nutritional Chips (Matching Image 3) */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 text-xs font-semibold text-gray-700 shadow-2xs">
                <span className="material-symbols-outlined text-xs text-[#006c47]">verified</span>
                100% Organic Uji Matcha
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 text-xs font-semibold text-gray-700 shadow-2xs">
                <span className="material-symbols-outlined text-xs text-amber-500">local_fire_department</span>
                {currentProduct.calories} kcal
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 text-xs font-semibold text-gray-700 shadow-2xs">
                <span className="material-symbols-outlined text-xs text-blue-500">tune</span>
                Customizable Milk &amp; Sweetness
              </span>
            </div>
          </div>

          {/* Right Column: Signature Deep Green Curved Stage Anchor & Floating Cup Asset */}
          <div className="lg:col-span-5 relative flex items-center justify-center p-6 sm:p-12 overflow-hidden bg-gradient-to-b from-[#1e3932] to-[#07231d] lg:rounded-r-[3.2rem]">
            {/* Organic Curve Overlays */}
            <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-[#006c47]/40 blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#98f2c2]/10 blur-3xl pointer-events-none"></div>

            {/* Drink Stage Card Overlay (Matching Image 3 Mini Frame Effect) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center justify-center"
              >
                {/* Floating ambient motion on the cup */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative group cursor-pointer"
                  onClick={() => onOpenCustomizer(currentProduct)}
                >
                  {/* Real Physical Placement Shadow */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-60 h-10 bg-black/40 blur-xl rounded-full"></div>

                  {/* Automatic Transparent Product Cup Image */}
                  <TransparentImage
                    src={currentProduct.imageUrl}
                    alt={`${currentProduct.name} ${currentProduct.subtitle}`}
                    className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] max-h-[420px] object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.45)] group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>

                {/* Craft Ritual Badge at Bottom of Right Panel */}
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#28B463] animate-pulse"></span>
                  <span>Cold Layered Craft Ritual</span>
                  <span className="text-white/40">|</span>
                  <span className="text-amber-300 font-bold">★ {currentProduct.rating}</span>
                  <span className="text-white/70">({currentProduct.reviewCount})</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 h-2 bg-[#006c47]'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
