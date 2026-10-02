import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderData: {
    total: number;
    itemsCount: number;
    store: string;
    pickupTime: string;
    paymentMethod: string;
  } | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  orderData,
  onClose,
}) => {
  if (!isOpen || !orderData) return null;

  const orderNumber = Math.floor(1000 + Math.random() * 9000);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07231d]/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-white z-10 text-center"
        >
          {/* Success Badge */}
          <div className="w-16 h-16 rounded-full bg-[#E8F2EA] text-[#006c47] flex items-center justify-center mx-auto mb-4 shadow-inner">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-[#006c47]">
            Order #{orderNumber} Confirmed
          </span>
          <h2 className="text-2xl font-black text-[#07231d] mt-1 mb-2">
            Your Drink is Being Crafted
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Thank you! Your barista is micro-milling tencha leaves and steaming foam at{' '}
            <span className="font-bold text-[#07231d]">{orderData.store}</span>.
          </p>

          {/* Prep Status Progress Bar */}
          <div className="p-4 rounded-2xl bg-[#F2F8F4] border border-gray-100 text-left mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
              <span className="flex items-center gap-1.5 text-[#006c47]">
                <span className="w-2 h-2 rounded-full bg-[#006c47] animate-ping"></span>
                Barista Crafting Ritual
              </span>
              <span>{orderData.pickupTime}</span>
            </div>

            <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
              <motion.div
                initial={{ width: '10%' }}
                animate={{ width: '65%' }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className="h-full bg-[#006c47] rounded-full"
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
              <span>Received</span>
              <span className="text-[#006c47] font-bold">In Progress</span>
              <span>Hand-off Counter</span>
            </div>
          </div>

          {/* Simulated Contactless Pickup Barcode */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200 text-center space-y-2 mb-6">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">
              Contactless Hand-off Pass
            </span>
            <div className="flex justify-center items-center gap-1 h-12 py-1">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full ${
                    i % 3 === 0
                      ? 'w-1 bg-black'
                      : i % 2 === 0
                      ? 'w-0.5 bg-black'
                      : 'w-1.5 bg-gray-900'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono tracking-widest text-gray-600 block">
              SBX-{orderNumber}-REV
            </span>
          </div>

          {/* Payment & Items Summary */}
          <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-100 mb-6">
            <span>
              Paid with <strong className="text-gray-900">{orderData.paymentMethod}</strong>
            </span>
            <span className="text-base font-extrabold text-[#07231d]">
              ${orderData.total.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#1e3932] text-white hover:bg-[#006c47] py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md active:scale-98 transition-all cursor-pointer"
          >
            Done · Back to Menu
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
