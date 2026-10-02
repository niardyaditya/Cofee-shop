/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, CustomizationOptions, ViewTab } from './types';
import { PRODUCTS, BAKERY_ITEMS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroShowcase } from './components/HeroShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { DragDesignStudio } from './components/DragDesignStudio';
import { OrderReviewCart } from './components/OrderReviewCart';
import { AboutBotanicalReserve } from './components/AboutBotanicalReserve';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('showcase');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([
    // Initial sample cart matching Image 7 mockup
    {
      id: 'initial-matcha-item',
      productId: 'matcha-fusion',
      product: PRODUCTS[0],
      quantity: 1,
      customization: {
        size: 'Grande',
        milk: 'Oat Milk',
        ice: 'Less Ice',
        syrupPumps: '2 Pumps',
        whippedCream: true,
        extraMatchaDrizzle: true,
        espressoShot: false,
      },
      itemTotalPrice: 5.99,
    },
  ]);

  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    total: number;
    itemsCount: number;
    store: string;
    pickupTime: string;
    paymentMethod: string;
  } | null>(null);

  // Toast notifier
  const addToast = (
    title: string,
    description?: string,
    type: 'success' | 'info' | 'star' = 'success'
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleQuickAddToCart = (product: Product) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      product,
      quantity: 1,
      customization: { ...product.defaultCustomization },
      itemTotalPrice: product.price,
    };
    setCart((prev) => [...prev, newItem]);
    addToast(`Added ${product.name} ${product.subtitle}`, 'Tap "Orders" to review checkout', 'success');
  };

  const handleAddToCartWithCustomization = (
    product: Product,
    customization: CustomizationOptions,
    calculatedPrice: number
  ) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      product,
      quantity: 1,
      customization,
      itemTotalPrice: calculatedPrice,
    };
    setCart((prev) => [...prev, newItem]);
    addToast(`Added ${product.name} (Customized)`, `$${calculatedPrice.toFixed(2)} Grande`, 'success');
  };

  const handleAddBakeryItem = (bakeryItem: (typeof BAKERY_ITEMS)[0]) => {
    const mockProduct: Product = {
      id: bakeryItem.id,
      name: bakeryItem.name,
      subtitle: 'Artisanal Bake',
      category: 'Pastries & Food',
      price: bakeryItem.price,
      calories: bakeryItem.calories,
      description: bakeryItem.description,
      imageUrl: bakeryItem.imageUrl,
      rating: 4.9,
      reviewCount: '1.2k',
      ingredients: ['French Butter', 'Organic Flour', 'Artisan Sea Salt'],
      defaultCustomization: {
        size: 'Grande',
        milk: 'Whole Milk',
        ice: 'Regular Ice',
        syrupPumps: '2 Pumps',
        whippedCream: false,
        extraMatchaDrizzle: false,
        espressoShot: false,
      },
    };

    const newItem: CartItem = {
      id: `${bakeryItem.id}-${Date.now()}`,
      productId: bakeryItem.id,
      product: mockProduct,
      quantity: 1,
      customization: mockProduct.defaultCustomization,
      itemTotalPrice: bakeryItem.price,
    };
    setCart((prev) => [...prev, newItem]);
    addToast(`Added ${bakeryItem.name}`, `Warm fresh bake · $${bakeryItem.price.toFixed(2)}`, 'success');
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      addToast(`Removed ${item.product.name}`, 'Item removed from bag', 'info');
    }
  };

  const handleOpenCustomizer = (product: Product) => {
    setCustomizerProduct(product);
    setIsCustomizerOpen(true);
  };

  const handleEditCustomization = (item: CartItem) => {
    setCustomizerProduct(item.product);
    setIsCustomizerOpen(true);
  };

  const handleCheckoutSuccess = (orderData: {
    total: number;
    itemsCount: number;
    store: string;
    pickupTime: string;
    paymentMethod: string;
  }) => {
    setCompletedOrder(orderData);
    setIsSuccessModalOpen(true);
    setCart([]);
    addToast('Order Placed Successfully!', 'Your handcrafted drinks are preparing', 'star');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#f7faf5] text-[#191c1a] antialiased overflow-x-hidden selection:bg-[#006c47] selection:text-white">
      {/* Ambient Organic Background Canvas Layers (Design System Specification) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#E8F2EA]/70 blur-[130px]"></div>
        <div className="absolute top-1/3 -right-48 w-[700px] h-[700px] rounded-full bg-[#9bf5c5]/25 blur-[150px]"></div>
        <div className="absolute -bottom-40 left-1/4 w-[550px] h-[550px] rounded-full bg-[#F2F8F4] blur-[110px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          cartCount={totalCartCount}
          searchQuery={searchQuery}
          setSearchQuery={(q) => {
            setSearchQuery(q);
            if (activeTab !== 'menu') setActiveTab('menu');
          }}
          onOpenCart={() => setActiveTab('orders')}
        />

        {/* Main Dynamic View Content with Transitions */}
        <main className="flex-1 w-full pb-16">
          <AnimatePresence mode="wait">
            {activeTab === 'showcase' && (
              <motion.div
                key="showcase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <HeroShowcase
                  onOpenCustomizer={handleOpenCustomizer}
                  onQuickAddToCart={handleQuickAddToCart}
                  onGoToCart={() => setActiveTab('orders')}
                  onOpenStudio={() => setActiveTab('design-studio')}
                />
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCatalog
                  searchQuery={searchQuery}
                  onOpenCustomizer={handleOpenCustomizer}
                  onQuickAddToCart={handleQuickAddToCart}
                  onAddBakeryItem={handleAddBakeryItem}
                  onGoToCart={() => setActiveTab('orders')}
                />
              </motion.div>
            )}

            {activeTab === 'design-studio' && (
              <motion.div
                key="design-studio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <DragDesignStudio
                  onAddToCart={handleAddToCartWithCustomization}
                  onShowToast={addToast}
                />
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <OrderReviewCart
                  cart={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onEditCustomization={handleEditCustomization}
                  onAddBakeryItem={handleAddBakeryItem}
                  onCheckoutSuccess={handleCheckoutSuccess}
                  onShowToast={addToast}
                  onBackToMenu={() => setActiveTab('menu')}
                />
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <AboutBotanicalReserve
                  onExploreMenu={() => setActiveTab('menu')}
                  onShowToast={addToast}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Drink Customization Modal */}
      <DrinkCustomizerModal
        product={customizerProduct}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={handleAddToCartWithCustomization}
      />

      {/* Order Confirmed Receipt Modal */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        orderData={completedOrder}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setActiveTab('menu');
        }}
      />

      {/* Floating Animated Toasts */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
