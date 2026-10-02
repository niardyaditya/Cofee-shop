import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CustomizationOptions, SizeOption, MilkOption, IceOption, SweetnessOption } from '../types';
import { TransparentImage } from './TransparentImage';

interface DrinkCustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, customization: CustomizationOptions, calculatedPrice: number) => void;
}

export const DrinkCustomizerModal: React.FC<DrinkCustomizerModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [customization, setCustomization] = useState<CustomizationOptions>(
    product.defaultCustomization || {
      size: 'Grande',
      milk: 'Oat Milk',
      ice: 'Regular Ice',
      syrupPumps: '2 Pumps',
      whippedCream: true,
      extraMatchaDrizzle: true,
      espressoShot: false,
    }
  );

  const calculatePrice = (): number => {
    let price = product.price;
    if (customization.size === 'Tall') price -= 0.5;
    if (customization.size === 'Venti') price += 0.7;
    if (customization.milk === 'Oat Milk' || customization.milk === 'Almond Milk') price += 0.5;
    if (customization.espressoShot) price += 0.9;
    if (customization.extraMatchaDrizzle) price += 0.4;
    return Math.max(2.5, Number(price.toFixed(2)));
  };

  const calculateCalories = (): number => {
    let cal = product.calories;
    if (customization.size === 'Tall') cal -= 40;
    if (customization.size === 'Venti') cal += 70;
    if (customization.whippedCream) cal += 50;
    if (customization.extraMatchaDrizzle) cal += 30;
    return cal;
  };

  const currentPrice = calculatePrice();
  const currentCal = calculateCalories();

  const handleConfirm = () => {
    onAddToCart(product, customization, currentPrice);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07231d]/60 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-white/80 z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Header info with Drink Thumbnail */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
              <div className="w-20 h-20 rounded-2xl bg-[#E8F2EA]/60 flex items-center justify-center p-2 relative overflow-hidden">
                <TransparentImage
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#006c47]">
                  Customize Signature Drink
                </span>
                <h3 className="text-2xl font-extrabold text-[#07231d] leading-tight">
                  {product.name} {product.subtitle}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 font-medium">
                  <span>{currentCal} kcal</span>
                  <span>·</span>
                  <span className="text-[#006c47] font-bold text-sm">${currentPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="py-6 space-y-6">
              {/* Cup Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  1. Select Cup Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Tall', 'Grande', 'Venti'] as SizeOption[]).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setCustomization({ ...customization, size: sz })}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        customization.size === sz
                          ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d] shadow-sm font-bold ring-2 ring-[#006c47]/20'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 font-medium'
                      }`}
                    >
                      <span className="block text-sm font-bold">{sz}</span>
                      <span className="text-xs text-gray-500">
                        {sz === 'Tall' ? '12 fl oz (-$0.50)' : sz === 'Grande' ? '16 fl oz (Standard)' : '24 fl oz (+$0.70)'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  2. Milk & Plant-Based Choice
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(['Oat Milk', 'Whole Milk', 'Almond Milk', 'Coconut Milk', 'Nonfat Milk'] as MilkOption[]).map(
                    (m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setCustomization({ ...customization, milk: m })}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          customization.milk === m
                            ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d] ring-1 ring-[#006c47]'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        {m}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Ice Level & Sweetness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    3. Ice Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['No Ice', 'Less Ice', 'Regular Ice', 'Extra Ice'] as IceOption[]).map((ice) => (
                      <button
                        key={ice}
                        type="button"
                        onClick={() => setCustomization({ ...customization, ice })}
                        className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          customization.ice === ice
                            ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {ice}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    4. Sweetness / Syrup
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Unsweetened', '2 Pumps', '3 Pumps', '4 Pumps'] as SweetnessOption[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setCustomization({ ...customization, syrupPumps: s })}
                        className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          customization.syrupPumps === s
                            ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add-ons & Toppings */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  5. Artisanal Toppings & Add-ins
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setCustomization({
                        ...customization,
                        extraMatchaDrizzle: !customization.extraMatchaDrizzle,
                      })
                    }
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      customization.extraMatchaDrizzle
                        ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <span>Matcha Drizzle</span>
                    <span className="text-[11px] text-[#006c47]">+$0.40</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCustomization({
                        ...customization,
                        espressoShot: !customization.espressoShot,
                      })
                    }
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      customization.espressoShot
                        ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <span>Blonde Espresso Shot</span>
                    <span className="text-[11px] text-[#006c47]">+$0.90</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCustomization({
                        ...customization,
                        whippedCream: !customization.whippedCream,
                      })
                    }
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      customization.whippedCream
                        ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <span>Velvety Whip</span>
                    <span className="text-[11px] text-gray-500">Free</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <span className="text-xs text-gray-500 block">Total for this item</span>
                <span className="text-2xl font-extrabold text-[#07231d]">
                  ${currentPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="bg-[#1e3932] text-white hover:bg-[#006c47] px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_8px_20px_rgba(30,57,50,0.22)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                  Add Custom Drink
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
