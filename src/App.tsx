import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageRoute, Product, CartItem } from '@/types';
import { PRODUCTS } from '@/assets/data/products';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MascotAssistant } from '@/components/ui/MascotAssistant';
import { Modal } from '@/components/ui/Modal';
import { PiaCanvas } from '@/components/three/PiaCanvas';
import { RealisticPiaCake } from '@/components/three/RealisticPiaCake';
import { ParticleDust } from '@/components/three/ParticleDust';
import { HomePage } from '@/pages/HomePage';
import { StoryPage } from '@/pages/StoryPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { DiyLabPage } from '@/pages/DiyLabPage';
import { WorkshopPage } from '@/pages/WorkshopPage';
import { CartCheckoutPage } from '@/pages/CartCheckoutPage';
import { formatVND } from '@/utils/cn';
import { Sparkles, ShoppingBag, Eye, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [cart, setCart] = useState<CartItem[]>([
    // Initial demo product in cart
    {
      id: 'demo-item-1',
      product: PRODUCTS[0],
      quantity: 2,
    },
  ]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickCutaway, setQuickCutaway] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && !item.customDetails);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}`,
          product,
          quantity: 1,
        },
      ];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const handleAddCustomToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`Đã lưu và thêm mẻ bánh tự phối "${item.product.name}" vào giỏ hàng!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-pia-dark text-pia-cream flex flex-col justify-between selection:bg-pia-gold selection:text-pia-dark">
      {/* Global Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={setCurrentRoute}
        cartCount={totalCartCount}
      />

      {/* Main Pages with Animated Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentRoute === 'home' && (
              <HomePage
                onNavigate={setCurrentRoute}
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewProduct}
              />
            )}

            {currentRoute === 'story' && (
              <StoryPage onNavigate={setCurrentRoute} />
            )}

            {currentRoute === 'products' && (
              <ProductsPage
                onAddToCart={handleAddToCart}
                onNavigate={setCurrentRoute}
              />
            )}

            {currentRoute === 'diy-lab' && (
              <DiyLabPage
                onAddCustomToCart={handleAddCustomToCart}
                onNavigate={setCurrentRoute}
              />
            )}

            {currentRoute === 'workshop' && (
              <WorkshopPage onNavigate={setCurrentRoute} />
            )}

            {currentRoute === 'cart' && (
              <CartCheckoutPage
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onNavigate={setCurrentRoute}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Brand Footer */}
      <Footer onNavigate={setCurrentRoute} />

      {/* Interactive Mascot Assistant "Bé Pía" */}
      <MascotAssistant
        currentRoute={currentRoute}
        onNavigate={setCurrentRoute}
      />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-panel-gold px-5 py-3 rounded-full border border-pia-gold/40 shadow-2xl flex items-center gap-3 text-xs sm:text-sm text-pia-cream"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setCurrentRoute('cart')}
              className="text-xs font-bold text-pia-gold hover:text-pia-goldLight underline underline-offset-2 ml-2"
            >
              Xem giỏ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View 3D Modal */}
      {quickViewProduct && (
        <Modal
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          maxWidth="2xl"
          title={quickViewProduct.name}
          subtitle="Khám Phá Lát Cắt 3D Thời Gian Thực"
        >
          <div className="space-y-6">
            <div className="relative aspect-video sm:aspect-[16/10] rounded-2xl bg-pia-surface/70 border border-pia-gold/30 p-2 overflow-hidden shadow-inner">
              <PiaCanvas
                className="w-full h-full"
                cameraPosition={[0, 1.4, 4.0]}
                fov={45}
              >
                <RealisticPiaCake
                  crustColor={quickViewProduct.layers.crust.color}
                  fillingColor={quickViewProduct.layers.filling.color}
                  coreColor={quickViewProduct.layers.core.color}
                  stampText={quickViewProduct.layers.stamp.charAt(quickViewProduct.layers.stamp.indexOf('"') + 1) || '福'}
                  isCutaway={quickCutaway}
                  scale={1.2}
                />
                <ParticleDust count={35} color="#F7CE78" spread={5} speed={0.2} />
              </PiaCanvas>

              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => setQuickCutaway(!quickCutaway)}
                  className="px-3 py-1.5 rounded-xl bg-pia-dark/85 backdrop-blur-md border border-pia-gold/40 text-xs font-semibold text-pia-gold hover:bg-pia-gold hover:text-pia-dark transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{quickCutaway ? 'Xem Toàn Bộ Bánh' : 'Bổ Lát Cắt Vi Tầng'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-pia-cream/90 leading-relaxed font-light">
                {quickViewProduct.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {quickViewProduct.flavorNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-pia-surface text-pia-goldLight border border-pia-border"
                  >
                    • {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-pia-border flex items-center justify-between">
              <div>
                <span className="text-xs text-pia-muted block">Đơn giá:</span>
                <span className="font-serif text-2xl font-bold text-pia-gold">
                  {formatVND(quickViewProduct.price)}
                </span>
              </div>
              <Button
                variant="gold"
                size="md"
                onClick={() => {
                  handleAddToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                <span>Thêm Vào Giỏ Hàng</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
