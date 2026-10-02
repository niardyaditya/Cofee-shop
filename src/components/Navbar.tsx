import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewTab } from '../types';

interface NavbarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  searchQuery,
  setSearchQuery,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full pt-4 sm:pt-6 px-4 sm:px-8 bg-transparent relative z-30">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto gap-4 sm:gap-6">
        {/* Zone 1: Brand Wordmark & Search */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button
            onClick={() => setActiveTab('showcase')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            {/* Starbucks Medallion Icon */}
            <div className="w-10 h-10 rounded-full bg-[#1e3932] flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0">
              <span className="material-symbols-outlined text-[24px]">local_cafe</span>
            </div>
            <span className="text-xl sm:text-2xl tracking-[0.2em] uppercase font-extrabold text-[#07231d]">
              STARBUCKS
            </span>
          </button>

          {/* Pill Search Bar */}
          <div className="hidden md:flex items-center bg-white/85 backdrop-blur-md border border-[#c1c8c4]/60 rounded-full px-4 py-2 w-64 lg:w-72 focus-within:w-80 focus-within:border-[#006c47] focus-within:ring-2 focus-within:ring-[#006c47]/20 transition-all duration-300 shadow-sm">
            <span className="material-symbols-outlined text-[#64746B] text-[18px] mr-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find your Favourite"
              className="w-full bg-transparent border-none p-0 text-sm font-medium text-[#191c1a] placeholder:text-[#64746B] focus:ring-0 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-gray-600 ml-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            onClick={() => setActiveTab('showcase')}
            className={`pb-1 text-sm font-bold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === 'showcase' ? 'text-[#07231d]' : 'text-[#414846] hover:text-[#006c47]'
            }`}
          >
            Showcase
            {activeTab === 'showcase' && (
              <motion.div
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006c47]"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`pb-1 text-sm font-bold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === 'menu' ? 'text-[#07231d]' : 'text-[#414846] hover:text-[#006c47]'
            }`}
          >
            Menu
            {activeTab === 'menu' && (
              <motion.div
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006c47]"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('design-studio')}
            className={`pb-1 text-sm font-bold tracking-wider uppercase transition-colors relative cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'design-studio' ? 'text-[#07231d]' : 'text-[#414846] hover:text-[#006c47]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c47] animate-pulse"></span>
            Drag Studio
            {activeTab === 'design-studio' && (
              <motion.div
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006c47]"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-1 text-sm font-bold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === 'orders' ? 'text-[#07231d]' : 'text-[#414846] hover:text-[#006c47]'
            }`}
          >
            Orders
            {cartCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#006c47] text-white text-[11px] font-semibold">
                {cartCount}
              </span>
            )}
            {activeTab === 'orders' && (
              <motion.div
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006c47]"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`pb-1 text-sm font-bold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === 'about' ? 'text-[#07231d]' : 'text-[#414846] hover:text-[#006c47]'
            }`}
          >
            Reserve Story
            {activeTab === 'about' && (
              <motion.div
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006c47]"
              />
            )}
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('about')}
            className="hidden sm:inline-flex items-center justify-center bg-[#1e3932] text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(30,57,50,0.2)] hover:bg-[#006c47] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            About Us
          </button>

          {/* Cart Quick Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-white/85 backdrop-blur-md border border-[#c1c8c4]/60 text-[#1e3932] hover:bg-[#E8F2EA] transition-all shadow-sm cursor-pointer flex items-center justify-center"
            aria-label="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#006c47] text-[10px] font-bold text-white shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full bg-white/85 backdrop-blur-md border border-[#c1c8c4]/60 text-[#1e3932] lg:hidden hover:bg-[#E8F2EA] transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-3 bg-white/95 backdrop-blur-xl border border-[#c1c8c4]/50 rounded-2xl p-4 shadow-xl overflow-hidden"
          >
            {/* Mobile Search */}
            <div className="flex items-center bg-[#F2F8F4] border border-[#c1c8c4]/40 rounded-full px-3 py-2 mb-4">
              <span className="material-symbols-outlined text-[#64746B] text-[18px] mr-2">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find your Favourite"
                className="w-full bg-transparent border-none p-0 text-sm text-[#191c1a] placeholder:text-[#64746B] focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setActiveTab('showcase');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
                  activeTab === 'showcase' ? 'bg-[#E8F2EA] text-[#006c47]' : 'text-gray-700'
                }`}
              >
                <span>Featured Showcase</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('menu');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
                  activeTab === 'menu' ? 'bg-[#E8F2EA] text-[#006c47]' : 'text-gray-700'
                }`}
              >
                <span>Drink Menu & Catalog</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('design-studio');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
                  activeTab === 'design-studio' ? 'bg-[#E8F2EA] text-[#006c47]' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#006c47] animate-pulse"></span>
                  <span>Drag & Drop Design Studio</span>
                </div>
                <span className="material-symbols-outlined text-sm">palette</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('orders');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
                  activeTab === 'orders' ? 'bg-[#E8F2EA] text-[#006c47]' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>Review Your Order</span>
                  {cartCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#006c47] text-white text-xs font-semibold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('about');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
                  activeTab === 'about' ? 'bg-[#E8F2EA] text-[#006c47]' : 'text-gray-700'
                }`}
              >
                <span>Botanical Reserve Story</span>
                <span className="material-symbols-outlined text-sm">spa</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
