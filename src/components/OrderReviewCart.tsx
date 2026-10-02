import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { BAKERY_ITEMS } from '../data/products';
import { TransparentImage } from './TransparentImage';

interface OrderReviewCartProps {
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onEditCustomization: (item: CartItem) => void;
  onAddBakeryItem: (bakeryItem: typeof BAKERY_ITEMS[0]) => void;
  onCheckoutSuccess: (orderData: {
    total: number;
    itemsCount: number;
    store: string;
    pickupTime: string;
    paymentMethod: string;
  }) => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'star') => void;
  onBackToMenu: () => void;
}

export const OrderReviewCart: React.FC<OrderReviewCartProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onEditCustomization,
  onAddBakeryItem,
  onCheckoutSuccess,
  onShowToast,
  onBackToMenu,
}) => {
  const [fulfilmentMode, setFulfilmentMode] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedStore, setSelectedStore] = useState('Green Terrace Store');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'starbucks' | 'apple' | 'card'>('starbucks');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.itemTotalPrice * item.quantity, 0);
  const tax = subtotal * 0.1;
  const deliveryFee = fulfilmentMode === 'delivery' ? 2.99 : 0;
  const total = Math.max(0, subtotal + tax + deliveryFee - appliedDiscount);

  const starsEarned = Math.round(total * 2);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'BOTANICAL15' || code === 'MATCHALOVE') {
      const discount = subtotal * 0.15;
      setAppliedDiscount(discount);
      onShowToast('15% Promo Applied!', `You saved $${discount.toFixed(2)} on this order`, 'star');
    } else if (code) {
      // Default sample discount
      setAppliedDiscount(1.5);
      onShowToast('Promo Applied!', 'Saved $1.50 with sample code', 'success');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      onShowToast('Your cart is empty', 'Add artisanal drinks from the menu to checkout', 'info');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCheckoutSuccess({
        total,
        itemsCount: cart.reduce((acc, i) => acc + i.quantity, 0),
        store: selectedStore,
        pickupTime: fulfilmentMode === 'pickup' ? '~10 mins' : '~25 mins',
        paymentMethod:
          paymentMethod === 'starbucks'
            ? 'Starbucks Card ($24.50 bal)'
            : paymentMethod === 'apple'
            ? 'Apple Pay'
            : 'Credit Card (•••• 8832)',
      });
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Breadcrumb & Store Prep Time Pill (Image 7 Top Bar) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#64746B]">
          <button onClick={onBackToMenu} className="hover:text-[#006c47] transition-colors">
            Cart
          </button>
          <span>›</span>
          <span className="text-[#07231d] font-bold">Review &amp; Checkout</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F2EA] text-[#006c47] text-xs font-bold self-start sm:self-auto border border-emerald-200/50">
          <span className="material-symbols-outlined text-[16px]">timer</span>
          Store Prep Time: ~10 mins
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-[#07231d] tracking-tight mb-6">
        Review Your Order
      </h1>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-white/80 rounded-3xl p-12 text-center border border-white/80 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#E8F2EA] text-[#006c47] flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">shopping_bag</span>
          </div>
          <h3 className="text-xl font-bold text-[#07231d] mb-2">Your Bag is Empty</h3>
          <p className="text-sm text-gray-500 mb-6">
            Explore our curated Reserve menu, craft a custom creation in the Design Studio, or try our seasonal Matcha Fusion.
          </p>
          <button
            onClick={onBackToMenu}
            className="bg-[#1e3932] text-white hover:bg-[#006c47] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            Explore Drink Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Order Items, Store Selector, Paired Bakery */}
          <div className="lg:col-span-7 space-y-6">
            {/* Fulfilment Toggle (Pickup vs Express Delivery) */}
            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-full bg-white/80 border border-gray-200/80 shadow-sm">
              <button
                type="button"
                onClick={() => setFulfilmentMode('pickup')}
                className={`flex items-center justify-center gap-2 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  fulfilmentMode === 'pickup'
                    ? 'bg-[#1e3932] text-white shadow-md'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <span className="material-symbols-outlined text-base">storefront</span>
                Pickup: Green Terrace Store
              </button>

              <button
                type="button"
                onClick={() => setFulfilmentMode('delivery')}
                className={`flex items-center justify-center gap-2 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  fulfilmentMode === 'delivery'
                    ? 'bg-[#1e3932] text-white shadow-md'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <span className="material-symbols-outlined text-base">moped</span>
                Express Delivery
              </button>
            </div>

            {/* Store Information Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-white/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F2EA] flex items-center justify-center text-[#006c47] shrink-0">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#07231d]">
                    {selectedStore} • <span className="text-[#006c47]">Ready in 10 mins</span>
                  </h4>
                  <p className="text-xs text-gray-500">
                    452 Botanical Way, Suite 100 • 0.4 miles away
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedStore((prev) =>
                    prev === 'Green Terrace Store' ? 'Pike Place Reserve' : 'Green Terrace Store'
                  );
                  onShowToast('Store Updated', 'Pickup location changed', 'info');
                }}
                className="text-xs font-bold text-[#006c47] hover:underline"
              >
                Change
              </button>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 sm:p-6 rounded-3xl bg-white/85 border border-white/90 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#E8F2EA]/60 p-2 flex items-center justify-center shrink-0 relative overflow-hidden">
                        <TransparentImage
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-16 sm:h-20 w-auto object-contain"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006c47]">
                              {item.product.badge || 'Seasonal Handcrafted'}
                            </span>
                            <h3 className="text-lg sm:text-xl font-extrabold text-[#07231d] leading-tight">
                              {item.product.name} {item.product.subtitle}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.customization.size} • 16 fl oz
                            </p>
                          </div>
                          <span className="text-xl font-extrabold text-[#07231d]">
                            ${(item.itemTotalPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Customization Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-3">
                          <span className="text-xs font-semibold text-gray-500 mr-1">
                            Customized:
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                            ✓ {item.customization.milk}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                            ✓ {item.customization.ice}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                            ✓ {item.customization.syrupPumps}
                          </span>
                          {item.customization.espressoShot && (
                            <span className="px-2 py-0.5 rounded-full bg-[#463000]/10 text-[#463000] text-xs font-medium">
                              ✓ Blonde Shot
                            </span>
                          )}
                          <button
                            onClick={() => onEditCustomization(item)}
                            className="text-xs font-bold text-[#006c47] hover:underline ml-1 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Quantity Stepper & Remove */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-600 hover:text-gray-900 font-bold text-base px-1 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="text-xs font-bold text-[#07231d] w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-600 hover:text-gray-900 font-bold text-base px-1 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Frequently Paired Together Section (Matching Image 7) */}
            <div className="mt-8 pt-6 border-t border-gray-200/80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-extrabold text-[#07231d]">Frequently Paired Together</h3>
                <span className="text-xs text-gray-500">Artisanal Bakery</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BAKERY_ITEMS.slice(0, 2).map((bakery) => (
                  <div
                    key={bakery.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 border border-white/90 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={bakery.imageUrl}
                        alt={bakery.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#07231d]">{bakery.name}</h4>
                        <p className="text-[11px] text-gray-500">
                          {bakery.description} • {bakery.calories} Cal
                        </p>
                        <span className="text-xs font-black text-[#006c47]">
                          ${bakery.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onAddBakeryItem(bakery)}
                      className="w-8 h-8 rounded-full bg-[#1e3932] text-white hover:bg-[#006c47] flex items-center justify-center transition-colors active:scale-95 cursor-pointer shadow-sm"
                      aria-label={`Add ${bakery.name}`}
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card (Matching Image 7) */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_12px_40px_rgba(30,57,50,0.06)] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-[#07231d]">Order Summary</h3>
                  <span className="text-xs text-gray-500">
                    Standard Order • {cart.reduce((a, b) => a + b.quantity, 0)} Items
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#E8F2EA] flex items-center justify-center text-[#006c47]">
                  <span className="material-symbols-outlined text-xl">receipt_long</span>
                </div>
              </div>

              {/* Green Rewards Box */}
              <div className="p-4 rounded-2xl bg-[#E8F2EA]/70 border border-emerald-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#006c47] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">star</span>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#07231d]">Green Rewards Earned</h5>
                    <p className="text-[11px] text-gray-600">+{starsEarned} Stars with this order</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white text-[#006c47] font-extrabold text-xs shadow-xs">
                  +{starsEarned} ★
                </span>
              </div>

              {/* Promo Code Input */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    local_offer
                  </span>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Promo Code (e.g. BOTANICAL15)"
                    className="w-full bg-[#F2F8F4] border border-gray-200 rounded-full pl-9 pr-3 py-2.5 text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#006c47]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-[#006c47] hover:text-white text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#07231d]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Estimated Tax &amp; Service</span>
                  <span className="font-semibold text-[#07231d]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Store Pickup Fee</span>
                  <span className="font-bold text-[#006c47]">FREE</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex items-center justify-between text-[#006c47] font-semibold">
                    <span>Botanical Privilege Promo</span>
                    <span>-${appliedDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-xl font-extrabold text-[#07231d]">Total</span>
                    <span className="text-[11px] text-gray-500 block">
                      Includes all applicable local taxes
                    </span>
                  </div>
                  <span className="text-3xl font-black text-[#07231d]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('starbucks')}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'starbucks'
                        ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d] ring-1 ring-[#006c47]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg block text-[#006c47]">
                      credit_card
                    </span>
                    <span className="text-[11px] font-bold block mt-0.5 truncate">
                      Starbucks Card
                    </span>
                    <span className="text-[10px] text-gray-500 block">$24.50 bal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'apple'
                        ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d] ring-1 ring-[#006c47]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg block text-gray-800">
                      phone_iphone
                    </span>
                    <span className="text-[11px] font-bold block mt-0.5">Apple Pay</span>
                    <span className="text-[10px] text-gray-500 block">Instant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#006c47] bg-[#E8F2EA] text-[#07231d] ring-1 ring-[#006c47]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg block text-gray-800">
                      payment
                    </span>
                    <span className="text-[11px] font-bold block mt-0.5">Credit Card</span>
                    <span className="text-[10px] text-gray-500 block">•••• 8832</span>
                  </button>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCheckout}
                className="w-full bg-[#1e3932] text-white hover:bg-[#006c47] py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_8px_24px_rgba(30,57,50,0.25)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Transmitting Order...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">lock</span>
                    <span>Proceed to Checkout · ${total.toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="pt-2 flex items-center justify-center gap-6 text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#006c47]">check_circle</span>
                  Contactless Safe Pickup
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#006c47]">military_tech</span>
                  Rewards Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Legal notice */}
      <footer className="mt-16 pt-8 border-t border-gray-200 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 Starbucks Coffee Company. All rights reserved.</span>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">CA Supply Chains Act</a>
          <a href="#" className="hover:underline">Cookie Preferences</a>
        </div>
      </footer>
    </div>
  );
};
