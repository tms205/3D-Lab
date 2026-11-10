import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Eye, Layers, ShoppingBag, RotateCcw, Check, ShieldCheck, Info } from 'lucide-react';
import { PageRoute, Product, CartItem } from '@/types';
import { DIY_CATALOG } from '@/assets/data/products';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PiaCanvas } from '@/components/three/PiaCanvas';
import { DiyCakeBuilder3D } from '@/components/three/DiyCakeBuilder3D';
import { FloatingLanterns } from '@/components/three/FloatingLanterns';
import { MoonAtmosphere } from '@/components/three/MoonAtmosphere';
import { ParticleDust } from '@/components/three/ParticleDust';
import { formatVND } from '@/utils/cn';

interface DiyLabPageProps {
  onAddCustomToCart: (item: CartItem) => void;
  onNavigate: (route: PageRoute) => void;
}

export function DiyLabPage({ onAddCustomToCart, onNavigate }: DiyLabPageProps) {
  // Selections
  const [selectedCrust, setSelectedCrust] = useState(DIY_CATALOG.crusts[0]);
  const [selectedFilling, setSelectedFilling] = useState(DIY_CATALOG.fillings[0]);
  const [selectedCore, setSelectedCore] = useState(DIY_CATALOG.cores[0]);
  const [selectedStamp, setSelectedStamp] = useState(DIY_CATALOG.stamps[0]);

  // 3D Visual toggles
  const [isCutaway, setIsCutaway] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [separationFactor, setSeparationFactor] = useState(1.5);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  // Active step tab in accordion: 'crust' | 'filling' | 'core' | 'stamp'
  const [activeStep, setActiveStep] = useState<'crust' | 'filling' | 'core' | 'stamp'>('crust');

  // Total price computation
  const totalPrice = selectedCrust.price + selectedFilling.price + selectedCore.price + selectedStamp.price;

  // Recipe identifier
  const recipeId = `LAB-${selectedCrust.id.slice(0, 2).toUpperCase()}${selectedFilling.id.slice(0, 2).toUpperCase()}${selectedCore.id.slice(0, 2).toUpperCase()}-${selectedStamp.id.toUpperCase()}`;

  const handleAddToCart = () => {
    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E5A93C', '#F7CE78', '#C0392B', '#FFFFFF'],
    });

    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `Bánh Pía Custom: ${selectedCrust.name} x ${selectedFilling.name}`,
      category: 'combo-lab',
      categoryLabel: 'Pía Lab DIY Custom',
      price: totalPrice,
      badge: 'Độc Bản Tự Phối',
      tagline: `Vỏ ${selectedCrust.name}, nhân ${selectedFilling.name}, lõi ${selectedCore.name}, triện ${selectedStamp.text}.`,
      description: `Chiếc bánh Pía tùy biến cá nhân hóa được nướng tươi thủ công theo công thức độc bản ${recipeId}.`,
      origin: 'Pía Innovation Kitchen — Đặt Nướng Riêng',
      weight: '165g',
      shelfLife: '14 ngày',
      sweetness: 3,
      richness: 4,
      flakiness: 5,
      rating: 5.0,
      reviewCount: 1,
      layers: {
        crust: {
          name: selectedCrust.name,
          description: selectedCrust.desc,
          color: selectedCrust.color,
          texture: 'flaky',
        },
        filling: {
          name: selectedFilling.name,
          description: selectedFilling.desc,
          color: selectedFilling.color,
          texture: 'smooth',
        },
        core: {
          name: selectedCore.name,
          description: selectedCore.desc,
          color: selectedCore.color,
          texture: 'rich',
        },
        stamp: selectedStamp.text,
      },
      flavorNotes: ['Hương vị cá nhân hóa', 'Bột nướng tươi mới trong ngày', 'Trứng muối thảo mộc'],
      pairing: 'Trà Oolong hoặc Trà Sen',
      inStock: true,
    };

    const cartItem: CartItem = {
      id: `cart-${Date.now()}`,
      product: customProduct,
      quantity: 1,
      customDetails: {
        isDiy: true,
        crustName: selectedCrust.name,
        fillingName: selectedFilling.name,
        coreName: selectedCore.name,
        stampText: selectedStamp.text,
        boxColor: '#1F150E',
      },
    };

    onAddCustomToCart(cartItem);
    setShowRecipeModal(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <Badge variant="crimson" className="mb-2">
            Phòng Sáng Chế Ẩm Thực 3D
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-pia-cream tracking-tight">
            Pía Lab DIY: <span className="gold-gradient-text">Tự Tay Phối Bánh</span>
          </h1>
          <p className="text-xs sm:text-sm text-pia-muted mt-2 leading-relaxed font-light">
            Chọn từng thành phần để kiến tạo chiếc bánh Pía độc bản. Mô hình 3D phản ánh cấu trúc vi tầng thời gian thực. Bếp trưởng Pía Lab sẽ nướng mẻ tươi giao tận tay bạn.
          </p>
        </div>

        {/* Workbench Layout: 3D Scene on Left, Customizer Options on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(24rem,1fr)] gap-8 items-start">
          
          {/* ========================================================
              3D WORKBENCH VIEWPORT (Left Column)
          ======================================================== */}
          <div className="lg:sticky lg:top-24">
            <div className="relative w-full aspect-[40/39] sm:aspect-square max-h-[754px] rounded-3xl glass-panel-gold border border-pia-gold/40 p-2 shadow-2xl overflow-hidden group">
              
              {/* 3D Canvas Scene */}
              <PiaCanvas
                className="w-full h-full"
                cameraPosition={[0, 1.8, 4.4]}
                fov={46}
                showShadows={false}
              >
                <DiyCakeBuilder3D
                  crustColor={selectedCrust.color}
                  fillingColor={selectedFilling.color}
                  coreColor={selectedCore.color}
                  stampText={selectedStamp.text.split(' ')[0] || '福'}
                  isCutaway={isCutaway}
                  isExploded={isExploded}
                  separationFactor={separationFactor}
                />
                <MoonAtmosphere position={[0.35, 0.45, -5]} size={0.9} />
                <group position={[0, -1.1, -2]} scale={0.55}>
                  <FloatingLanterns />
                </group>
                <ParticleDust count={65} color="#F7CE78" spread={7.5} speed={0.2} />
              </PiaCanvas>

              {/* Vertical Drag Scrubber (Khi Tách Lớp 3D) */}
              {isExploded && (
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 px-2.5 py-3 rounded-2xl bg-pia-dark/90 backdrop-blur-md border border-pia-gold/40 shadow-2xl select-none"
                >
                  <div className="flex items-center gap-1 text-[10px] font-bold text-pia-gold uppercase tracking-wider">
                    <span>↕ Dãn tầng</span>
                  </div>

                  <button
                    onClick={() => setSeparationFactor((prev) => Math.min(2.4, +(prev + 0.2).toFixed(2)))}
                    className="w-7 h-7 rounded-lg bg-pia-surface hover:bg-pia-gold hover:text-pia-dark border border-pia-gold/30 text-pia-gold text-sm font-bold flex items-center justify-center transition-all shadow-sm"
                    title="Dãn xa hơn"
                  >
                    +
                  </button>

                  <div className="relative w-3 h-32 bg-pia-surface/90 rounded-full border border-pia-gold/30 flex items-end p-0.5 cursor-ns-resize">
                    <div
                      className="w-full bg-gradient-to-t from-pia-gold via-amber-400 to-amber-200 rounded-full transition-all duration-75 shadow-sm"
                      style={{
                        height: `${Math.round(((separationFactor - 0.6) / (2.4 - 0.6)) * 100)}%`,
                      }}
                    />
                    <input
                      type="range"
                      min="0.6"
                      max="2.4"
                      step="0.05"
                      value={separationFactor}
                      onChange={(e) => setSeparationFactor(parseFloat(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ns-resize h-full w-full"
                      style={{ WebkitAppearance: 'slider-vertical' } as React.CSSProperties}
                      title="Click & kéo chuột lên/xuống để dãn khoảng cách các tầng"
                    />
                  </div>

                  <button
                    onClick={() => setSeparationFactor((prev) => Math.max(0.6, +(prev - 0.2).toFixed(2)))}
                    className="w-7 h-7 rounded-lg bg-pia-surface hover:bg-pia-gold hover:text-pia-dark border border-pia-gold/30 text-pia-gold text-sm font-bold flex items-center justify-center transition-all shadow-sm"
                    title="Thu gần lại"
                  >
                    -
                  </button>

                  <span className="text-[10px] font-mono font-bold text-pia-goldLight">
                    {Math.round(separationFactor * 100)}%
                  </span>
                </motion.div>
              )}

              {/* 3D Visual Modes Action Bar Overlay */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    const next = !isCutaway;
                    setIsCutaway(next);
                    if (next) setIsExploded(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 border shadow-md ${
                    isCutaway
                      ? 'bg-pia-gold text-pia-dark border-pia-gold shadow-pia-gold/30'
                      : 'bg-pia-dark/80 text-pia-cream border-pia-gold/30 hover:bg-pia-gold/20'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isCutaway ? 'Xem Nguyên Bánh' : 'Bổ Đôi Lát Cắt'}</span>
                </button>

                <button
                  onClick={() => {
                    const next = !isExploded;
                    setIsExploded(next);
                    if (next) setIsCutaway(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 border shadow-md ${
                    isExploded
                      ? 'bg-pia-crimson text-white border-pia-crimson'
                      : 'bg-pia-dark/80 text-pia-cream border-pia-gold/30 hover:bg-pia-gold/20'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isExploded ? 'Gom Bánh Lại' : 'Tách Lớp 3D'}</span>
                </button>
              </div>

              {/* Real-time Recipe Blueprint Tag */}
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-xl bg-pia-dark/90 backdrop-blur-md border border-pia-gold/40 text-[11px] font-mono text-pia-goldLight">
                  <span>MÃ CÔNG THỨC: </span>
                  <span className="font-bold text-pia-gold">{recipeId}</span>
                </div>
              </div>
            </div>

            {/* Quick summary strip under canvas */}
            <div className="mt-4 p-4 rounded-2xl glass-panel border border-pia-border text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-pia-muted">
                <Info className="w-4 h-4 text-pia-gold shrink-0" />
                <span>Trọng lượng: ~165g • Năng lượng: ~380 kcal • Hạn dùng: 14 ngày</span>
              </div>
              <button
                onClick={() => {
                  setSelectedCrust(DIY_CATALOG.crusts[0]);
                  setSelectedFilling(DIY_CATALOG.fillings[0]);
                  setSelectedCore(DIY_CATALOG.cores[0]);
                  setSelectedStamp(DIY_CATALOG.stamps[0]);
                }}
                className="text-pia-muted hover:text-pia-gold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            </div>
          </div>

          {/* ========================================================
              CUSTOMIZER CONTROL PANEL (Right Column)
          ======================================================== */}
          <div className="space-y-5">
            
            {/* Step 1: Chọn Vỏ Bánh */}
            <div className="rounded-3xl glass-panel p-5 border border-pia-border hover:border-pia-gold/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-pia-gold/20 text-pia-gold text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-serif font-bold text-sm text-pia-cream uppercase tracking-wider">
                    Lớp Vỏ Ngàn Lớp
                  </h3>
                </div>
                <span className="text-xs font-bold text-pia-gold">
                  {formatVND(selectedCrust.price)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {DIY_CATALOG.crusts.map((crust) => {
                  const isSelected = selectedCrust.id === crust.id;
                  return (
                    <button
                      key={crust.id}
                      onClick={() => setSelectedCrust(crust)}
                      className={`p-3 rounded-2xl text-left border transition-all duration-300 relative ${
                        isSelected
                          ? 'bg-pia-surface border-pia-gold shadow-md'
                          : 'bg-pia-charcoal/50 border-pia-border hover:border-pia-gold/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: crust.color }}
                        />
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-pia-gold' : 'text-pia-cream'}`}>
                          {crust.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-pia-muted line-clamp-1">{crust.desc}</p>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-pia-gold absolute top-2.5 right-2.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Chọn Nhân Sên */}
            <div className="rounded-3xl glass-panel p-5 border border-pia-border hover:border-pia-gold/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-pia-gold/20 text-pia-gold text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-serif font-bold text-sm text-pia-cream uppercase tracking-wider">
                    Nhân Sên Thủ Công
                  </h3>
                </div>
                <span className="text-xs font-bold text-pia-gold">
                  {formatVND(selectedFilling.price)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {DIY_CATALOG.fillings.map((fil) => {
                  const isSelected = selectedFilling.id === fil.id;
                  return (
                    <button
                      key={fil.id}
                      onClick={() => setSelectedFilling(fil)}
                      className={`p-3 rounded-2xl text-left border transition-all duration-300 relative ${
                        isSelected
                          ? 'bg-pia-surface border-pia-gold shadow-md'
                          : 'bg-pia-charcoal/50 border-pia-border hover:border-pia-gold/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: fil.color }}
                        />
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-pia-gold' : 'text-pia-cream'}`}>
                          {fil.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-pia-muted line-clamp-1">{fil.desc}</p>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-pia-gold absolute top-2.5 right-2.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Chọn Lõi Tâm */}
            <div className="rounded-3xl glass-panel p-5 border border-pia-border hover:border-pia-gold/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-pia-gold/20 text-pia-gold text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-serif font-bold text-sm text-pia-cream uppercase tracking-wider">
                    Lõi Tâm Hoàng Kim
                  </h3>
                </div>
                <span className="text-xs font-bold text-pia-gold">
                  {formatVND(selectedCore.price)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {DIY_CATALOG.cores.map((core) => {
                  const isSelected = selectedCore.id === core.id;
                  return (
                    <button
                      key={core.id}
                      onClick={() => setSelectedCore(core)}
                      className={`p-3 rounded-2xl text-left border transition-all duration-300 relative ${
                        isSelected
                          ? 'bg-pia-surface border-pia-gold shadow-md'
                          : 'bg-pia-charcoal/50 border-pia-border hover:border-pia-gold/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: core.color }}
                        />
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-pia-gold' : 'text-pia-cream'}`}>
                          {core.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-pia-muted line-clamp-1">{core.desc}</p>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-pia-gold absolute top-2.5 right-2.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Khắc Triện Son */}
            <div className="rounded-3xl glass-panel p-5 border border-pia-border hover:border-pia-gold/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-pia-gold/20 text-pia-gold text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="font-serif font-bold text-sm text-pia-cream uppercase tracking-wider">
                    Triện Son May Mắn
                  </h3>
                </div>
                <span className="text-xs font-bold text-pia-gold">
                  {formatVND(selectedStamp.price)}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {DIY_CATALOG.stamps.map((stamp) => {
                  const isSelected = selectedStamp.id === stamp.id;
                  return (
                    <button
                      key={stamp.id}
                      onClick={() => setSelectedStamp(stamp)}
                      className={`p-2.5 rounded-2xl text-center border transition-all duration-300 ${
                        isSelected
                          ? 'bg-pia-crimson/25 border-pia-crimson text-red-300 font-bold scale-105'
                          : 'bg-pia-charcoal/50 border-pia-border text-pia-muted hover:border-pia-gold/30'
                      }`}
                    >
                      <span className="font-serif text-lg block">{stamp.text.split(' ')[0]}</span>
                      <span className="text-[9px] uppercase tracking-tighter truncate block mt-0.5">
                        {stamp.id}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-pia-goldLight/80 italic mt-2.5 text-center">
                "{selectedStamp.meaning}"
              </p>
            </div>

            {/* Final Order Card & Add To Cart Button */}
            <div className="p-6 rounded-3xl glass-panel-gold border border-pia-gold/50 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-pia-muted block">Tổng chi phí nướng mới:</span>
                  <span className="font-serif text-3xl font-black text-pia-gold">
                    {formatVND(totalPrice)}
                  </span>
                </div>
                <div className="text-right text-[11px] text-pia-muted">
                  <span className="block text-emerald-400 font-medium">Bao gồm hộp bảo quản</span>
                  <span>Thời gian nướng: 120 phút</span>
                </div>
              </div>

              <Button
                variant="glow"
                size="lg"
                className="w-full justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                <span>Thêm Chiếc Bánh Này Vào Giỏ Hàng</span>
              </Button>
            </div>

          </div>

        </div>

      </div>

      {/* Success / Recipe Saved Modal */}
      {showRecipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel-gold rounded-3xl p-6 sm:p-8 text-center space-y-5 border border-pia-gold/40 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-pia-gold/20 border-2 border-pia-gold text-pia-gold flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="w-8 h-8 animate-spin-slow" />
            </div>

            <div>
              <Badge variant="gold" className="mb-2">Đã Lưu Công Thức</Badge>
              <h3 className="font-serif text-2xl font-bold text-pia-cream">
                Đã Thêm Vào Giỏ Hàng!
              </h3>
              <p className="text-xs text-pia-muted mt-2 leading-relaxed">
                Công thức <strong className="text-pia-gold">{recipeId}</strong> của bạn đã sẵn sàng. Bạn có thể thanh toán ngay hoặc tiếp tục sáng chế bánh khác.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowRecipeModal(false)}
              >
                <span>Phối Thêm Bánh</span>
              </Button>
              <Button
                variant="gold"
                className="flex-1"
                onClick={() => {
                  setShowRecipeModal(false);
                  onNavigate('cart');
                }}
              >
                <span>Đến Giỏ Hàng ➔</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
