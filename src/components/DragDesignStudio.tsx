import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DraggableIngredient, Product, CustomizationOptions } from '../types';
import { DRAGGABLE_INGREDIENTS, PRODUCTS } from '../data/products';
import { TransparentImage } from './TransparentImage';

interface DragDesignStudioProps {
  onAddToCart: (product: Product, customization: CustomizationOptions, price: number) => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'star') => void;
}

export const DragDesignStudio: React.FC<DragDesignStudioProps> = ({
  onAddToCart,
  onShowToast,
}) => {
  const baseProduct = PRODUCTS[0]; // Matcha Fusion
  const [activeLayers, setActiveLayers] = useState<string[]>([
    'oat-milk',
    'matcha-powder',
    'cold-foam',
    'green-straw',
  ]);
  const [isDropTargetHovered, setIsDropTargetHovered] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);
  const [designMode, setDesignMode] = useState<'ingredients' | 'canvas'>('ingredients');

  // Positions for canvas elements in Canvas Mode
  const [cupPos, setCupPos] = useState({ x: 0, y: 0 });
  const [titlePos, setTitlePos] = useState({ x: 0, y: 0 });
  const [pricePos, setPricePos] = useState({ x: 0, y: 0 });
  const [badgePos, setBadgePos] = useState({ x: 0, y: 0 });

  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic price and calories from added layers
  const addedCalories = activeLayers.reduce((acc, layerId) => {
    const ing = DRAGGABLE_INGREDIENTS.find((i) => i.id === layerId);
    return acc + (ing ? ing.calorieDelta : 0);
  }, 120);

  const calculatedPrice = activeLayers.reduce((acc, layerId) => {
    const ing = DRAGGABLE_INGREDIENTS.find((i) => i.id === layerId);
    return acc + (ing ? ing.priceDelta : 0);
  }, 4.5);

  const handleDropIngredient = (ingredient: DraggableIngredient) => {
    if (!activeLayers.includes(ingredient.id)) {
      setActiveLayers([...activeLayers, ingredient.id]);
      setLastAddedItem(ingredient.name);
      onShowToast(`Added ${ingredient.name}!`, `+${ingredient.calorieDelta} kcal · $${ingredient.priceDelta.toFixed(2)}`, 'success');
      setTimeout(() => setLastAddedItem(null), 1200);
    } else {
      onShowToast(`${ingredient.name} already infused`, 'Try adding another ingredient or reset cup', 'info');
    }
  };

  const handleRemoveLayer = (id: string) => {
    setActiveLayers(activeLayers.filter((l) => l !== id));
  };

  const handleResetLayers = () => {
    setActiveLayers(['oat-milk', 'matcha-powder', 'cold-foam']);
    onShowToast('Reset cup composition', 'Start fresh with botanical layers', 'info');
  };

  const handleResetCanvas = () => {
    setCupPos({ x: 0, y: 0 });
    setTitlePos({ x: 0, y: 0 });
    setPricePos({ x: 0, y: 0 });
    setBadgePos({ x: 0, y: 0 });
    onShowToast('Layout Reset', 'All design elements snapped to default positions', 'info');
  };

  const handleOrderCustomCreation = () => {
    const customOptions: CustomizationOptions = {
      size: 'Grande',
      milk: activeLayers.includes('oat-milk') ? 'Oat Milk' : 'Whole Milk',
      ice: activeLayers.includes('ice-cubes') ? 'Extra Ice' : 'Regular Ice',
      syrupPumps: activeLayers.includes('caramel-drizzle') ? '3 Pumps' : '2 Pumps',
      whippedCream: activeLayers.includes('cold-foam'),
      extraMatchaDrizzle: activeLayers.includes('matcha-drizzle'),
      espressoShot: activeLayers.includes('espresso-shot'),
    };

    onAddToCart(
      {
        ...baseProduct,
        name: 'CUSTOM CRAFT',
        subtitle: 'BOTANICAL CREATION',
        price: Number(calculatedPrice.toFixed(2)),
        calories: addedCalories,
      },
      customOptions,
      Number(calculatedPrice.toFixed(2))
    );
    onShowToast('Custom Creation in Cart!', 'Ready to review and order', 'star');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F2EA] text-[#006c47] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm">touch_app</span>
            Interactive Design Studio &amp; Physics
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07231d] tracking-tight">
            Drag-and-Drop <span className="text-[#006c47] font-normal italic">Artisan Workshop</span>
          </h1>
          <p className="text-sm text-[#64746B] mt-1 max-w-xl">
            {designMode === 'ingredients'
              ? 'Drag crafted ingredients onto the cup to create your custom layered drink.'
              : 'Drag design elements anywhere on the canvas to customize your layout and visual composition.'}
          </p>
        </div>

        {/* Studio Mode Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/90 border border-gray-200 shadow-sm self-start">
          <button
            onClick={() => setDesignMode('ingredients')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              designMode === 'ingredients'
                ? 'bg-[#1e3932] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🍵 Drink Builder
          </button>
          <button
            onClick={() => setDesignMode('canvas')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              designMode === 'canvas'
                ? 'bg-[#1e3932] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ✨ Canvas Layout Drag
          </button>
        </div>
      </div>

      {designMode === 'ingredients' ? (
        /* MODE 1: DRAG INGREDIENTS ONTO CUP */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Draggable Ingredients Tray */}
          <div className="lg:col-span-5 bg-white/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/80 shadow-[0_8px_30px_rgba(30,57,50,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#07231d]">
                  1. Drag Ingredients to Cup
                </h3>
                <span className="text-xs text-gray-500">
                  Touch &amp; drag any item onto the cup drop zone
                </span>
              </div>
              <button
                onClick={handleResetLayers}
                className="text-xs text-[#006c47] hover:underline font-bold"
              >
                Reset
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {DRAGGABLE_INGREDIENTS.map((item) => {
                const isInfused = activeLayers.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    drag
                    dragSnapToOrigin
                    dragElastic={0.2}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileDrag={{ scale: 1.12, rotate: 6, zIndex: 60, opacity: 0.9 }}
                    onDragStart={() => setIsDropTargetHovered(true)}
                    onDragEnd={(e, info) => {
                      setIsDropTargetHovered(false);
                      // Check if dropped near the cup drop zone
                      if (dropZoneRef.current) {
                        const rect = dropZoneRef.current.getBoundingClientRect();
                        const pointX = info.point.x;
                        const pointY = info.point.y;
                        if (
                          pointX >= rect.left - 40 &&
                          pointX <= rect.right + 40 &&
                          pointY >= rect.top - 40 &&
                          pointY <= rect.bottom + 40
                        ) {
                          handleDropIngredient(item);
                        }
                      }
                    }}
                    className={`relative p-3.5 rounded-2xl border text-left cursor-grab active:cursor-grabbing select-none transition-colors ${
                      isInfused
                        ? 'border-[#006c47] bg-[#E8F2EA]/70 text-[#07231d]'
                        : 'border-gray-200/90 bg-white/95 text-gray-800 hover:border-[#006c47]/50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-base shadow-sm"
                        style={{ backgroundColor: item.color }}
                      >
                        <span className="material-symbols-outlined text-sm">{item.icon}</span>
                      </div>
                      {isInfused && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#006c47] text-white">
                          Infused
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold leading-tight truncate">{item.name}</p>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-gray-500">
                      <span>+{item.calorieDelta} kcal</span>
                      <span className="font-semibold text-[#006c47]">
                        {item.priceDelta > 0 ? `+$${item.priceDelta.toFixed(2)}` : 'Included'}
                      </span>
                    </div>

                    {/* Quick Tap to Add Button for mobile convenience */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropIngredient(item);
                      }}
                      className="mt-2 w-full py-1 text-[10px] font-bold uppercase rounded-lg bg-gray-100 hover:bg-[#006c47] hover:text-white transition-colors"
                    >
                      {isInfused ? 'Infused ✓' : '+ Tap or Drag'}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Infused Layers Tag Cloud */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-600 block mb-2">
                Active Layers ({activeLayers.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeLayers.map((layerId) => {
                  const ing = DRAGGABLE_INGREDIENTS.find((i) => i.id === layerId);
                  if (!ing) return null;
                  return (
                    <motion.span
                      key={layerId}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F2EA] text-[#07231d] text-xs font-semibold"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ing.color }}></span>
                      {ing.name}
                      <button
                        onClick={() => handleRemoveLayer(layerId)}
                        className="text-gray-400 hover:text-red-500 ml-0.5 text-xs"
                      >
                        ✕
                      </button>
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Drop Target Cup Stage */}
          <div className="lg:col-span-7 bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_12px_40px_rgba(30,57,50,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[520px]">
            {/* Ambient Background Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#9bf5c5]/25 blur-3xl pointer-events-none"></div>

            {/* Top Bar inside Stage */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#006c47]">
                  Target Canvas
                </span>
                <h2 className="text-xl font-extrabold text-[#07231d]">Your Handcrafted Blend</h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">Energy &amp; Price</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E8F2EA] text-[#006c47]">
                    {addedCalories} kcal
                  </span>
                  <span className="text-2xl font-extrabold text-[#07231d]">
                    ${calculatedPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Central Cup Drop Zone */}
            <div
              ref={dropZoneRef}
              className={`relative z-10 my-6 mx-auto w-full max-w-sm rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-300 border-2 ${
                isDropTargetHovered
                  ? 'border-[#006c47] bg-[#E8F2EA]/40 scale-102 ring-4 ring-[#006c47]/20 shadow-xl'
                  : 'border-dashed border-gray-300/70 hover:border-[#006c47]/40'
              }`}
            >
              {/* Drop Target Guide Indicator */}
              <div className="absolute top-3 text-[11px] font-bold text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm text-[#006c47]">ads_click</span>
                Drop Zone for Ingredients
              </div>

              {/* Splash Reaction on Layer Added */}
              <AnimatePresence>
                {lastAddedItem && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: -40 }}
                    exit={{ scale: 1.2, opacity: 0, y: -60 }}
                    className="absolute z-30 px-4 py-1.5 rounded-full bg-[#006c47] text-white text-xs font-bold shadow-lg"
                  >
                    ✨ Infused: {lastAddedItem}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Visual Cup Asset with Dynamic Layer Sprinkles */}
              <motion.div
                animate={{
                  y: isDropTargetHovered ? [-4, 4, -4] : [0, -3, 0],
                  scale: isDropTargetHovered ? 1.05 : 1,
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="relative my-4 flex items-center justify-center"
              >
                {/* Visual shadow */}
                <div className="absolute -bottom-4 w-40 h-8 bg-[#1e3932]/25 blur-xl rounded-full"></div>

                <TransparentImage
                  src={baseProduct.imageUrl}
                  alt="Custom Botanical Cup"
                  className="h-64 sm:h-72 w-auto object-contain select-none pointer-events-none drop-shadow-2xl"
                />

                {/* Overlaid Dynamic Badges indicating active customizations */}
                {activeLayers.includes('green-straw') && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -top-3 right-10 w-4 h-12 bg-[#006c47] rounded-full shadow-md transform rotate-12"
                    title="Iconic Green Straw"
                  />
                )}

                {activeLayers.includes('espresso-shot') && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-20 left-4 px-2 py-0.5 rounded-full bg-[#463000] text-white text-[10px] font-bold shadow-md"
                  >
                    ☕ Espresso Float
                  </motion.div>
                )}

                {activeLayers.includes('matcha-drizzle') && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-16 right-4 px-2 py-0.5 rounded-full bg-[#28B463] text-white text-[10px] font-bold shadow-md"
                  >
                    🌿 Matcha Swirl
                  </motion.div>
                )}
              </motion.div>

              <span className="text-xs text-gray-500 font-medium mt-1">
                Release ingredients over this container
              </span>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Crafted recipe with <span className="font-bold text-[#07231d]">{activeLayers.length} components</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleResetLayers}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={handleOrderCustomCreation}
                  className="w-1/2 sm:w-auto bg-[#1e3932] text-white hover:bg-[#006c47] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(30,57,50,0.2)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">shopping_bag</span>
                  Add Custom to Cart (${calculatedPrice.toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: CANVAS LAYOUT DRAG-AND-DROP */
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_12px_40px_rgba(30,57,50,0.06)] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006c47]">
                Freeform Canvas Mode
              </span>
              <h3 className="text-lg font-bold text-[#07231d]">
                Touch, drag and rearrange all design blocks freely
              </h3>
              <p className="text-xs text-gray-500">
                Grab any element below (the cup, the bold typography, price badge, or tags) to test custom billboard layouts!
              </p>
            </div>
            <button
              onClick={handleResetCanvas}
              className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Reset to Original Grid
            </button>
          </div>

          {/* Interactive Playground Canvas */}
          <div className="relative w-full h-[520px] rounded-2xl bg-gradient-to-br from-[#E8F2EA]/40 via-white/80 to-[#F2F8F4] border border-emerald-100 overflow-hidden p-6 select-none">
            {/* Ambient aesthetic blob */}
            <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#006c47]/10 blur-3xl pointer-events-none"></div>

            {/* Draggable Title Block */}
            <motion.div
              drag
              dragConstraints={{ left: -100, right: 400, top: -50, bottom: 250 }}
              dragElastic={0.1}
              whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 40 }}
              style={{ x: titlePos.x, y: titlePos.y }}
              onDragEnd={(e, info) => setTitlePos({ x: info.offset.x, y: info.offset.y })}
              className="absolute top-10 left-8 cursor-grab p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-md max-w-sm"
            >
              <div className="text-[10px] font-bold text-[#006c47] uppercase tracking-wider mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">drag_indicator</span>
                Draggable Typography
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07231d] tracking-tight leading-none">
                MATCHA <br />
                <span className="font-light italic text-[#006c47]">FUSION FRAPPE</span>
              </h2>
              <div className="w-12 h-1 bg-[#006c47] rounded-full my-2"></div>
              <p className="text-xs text-gray-600 line-clamp-2">
                The surprising &amp; delightful combination of velvety matcha &amp; espresso.
              </p>
            </motion.div>

            {/* Draggable Price Tag */}
            <motion.div
              drag
              dragConstraints={{ left: -100, right: 500, top: -50, bottom: 300 }}
              dragElastic={0.1}
              whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 40 }}
              style={{ x: pricePos.x, y: pricePos.y }}
              onDragEnd={(e, info) => setPricePos({ x: info.offset.x, y: info.offset.y })}
              className="absolute top-44 left-8 cursor-grab p-3 rounded-2xl bg-[#006c47] text-white shadow-xl flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-sm">drag_indicator</span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 block">
                  Artisanal Price
                </span>
                <span className="text-2xl font-black">$5.99</span>
              </div>
            </motion.div>

            {/* Draggable Badges Stack */}
            <motion.div
              drag
              dragConstraints={{ left: -100, right: 500, top: -50, bottom: 300 }}
              dragElastic={0.1}
              whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 40 }}
              style={{ x: badgePos.x, y: badgePos.y }}
              onDragEnd={(e, info) => setBadgePos({ x: info.offset.x, y: info.offset.y })}
              className="absolute bottom-8 left-8 cursor-grab p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm flex flex-col gap-2"
            >
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase">
                <span className="material-symbols-outlined text-xs">drag_indicator</span>
                Draggable Feature Chips
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-[#E8F2EA] text-[#006c47] text-xs font-bold">
                  ✓ 100% Organic Uji Matcha
                </span>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                  ⚡ 240 kcal
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                  ★ 4.9 Rated
                </span>
              </div>
            </motion.div>

            {/* Draggable Hero Beverage Cup */}
            <motion.div
              drag
              dragConstraints={{ left: -300, right: 300, top: -100, bottom: 200 }}
              dragElastic={0.15}
              whileDrag={{ scale: 1.08, rotate: 4, cursor: 'grabbing', zIndex: 50 }}
              style={{ x: cupPos.x, y: cupPos.y }}
              onDragEnd={(e, info) => setCupPos({ x: info.offset.x, y: info.offset.y })}
              className="absolute top-10 right-12 sm:right-24 cursor-grab flex flex-col items-center"
            >
              <div className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[11px] font-bold text-[#006c47] mb-2 shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">open_with</span>
                Drag Beverage Cup
              </div>
              <div className="relative">
                <div className="absolute -bottom-4 w-44 h-8 bg-[#1e3932]/25 blur-xl rounded-full"></div>
                <TransparentImage
                  src={baseProduct.imageUrl}
                  alt="Draggable Starbucks Cup"
                  className="h-64 sm:h-80 w-auto object-contain pointer-events-none drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
