import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, Flame, Eye, ShoppingBag, ShieldCheck, Heart, Award, Star } from 'lucide-react';
import { PageRoute, Product } from '@/types';
import { PRODUCTS } from '@/assets/data/products';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { PiaCanvas } from '@/components/three/PiaCanvas';
import { RealisticPiaCake } from '@/components/three/RealisticPiaCake';
import { MoonAtmosphere } from '@/components/three/MoonAtmosphere';
import { FloatingLanterns } from '@/components/three/FloatingLanterns';
import { ParticleDust } from '@/components/three/ParticleDust';
import { formatVND } from '@/utils/cn';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export function HomePage({ onNavigate, onAddToCart, onQuickView }: HomePageProps) {
  // Hero 3D interactive controls
  const [heroCutaway, setHeroCutaway] = useState(false);
  const [heroExploded, setHeroExploded] = useState(false);
  const [separationFactor, setSeparationFactor] = useState(1.5);
  const [selectedHeroFlavor, setSelectedHeroFlavor] = useState<'gold' | 'durian' | 'taro' | 'matcha'>('gold');
  const [cakeStyle, setCakeStyle] = useState<'pia' | 'traditional'>('pia');

  const heroFlavors = {
    gold: {
      name: 'Pía Kim Sa Hoàng Kim',
      crust: '#E5A93C',
      filling: '#F4C430',
      core: '#FF6F00',
      stamp: '福',
      desc: 'Dòng sốt kem trứng kim sa tuôn chảy ở 37°C ôm trọn lòng đỏ trứng muối ủ quế hồi.',
    },
    durian: {
      name: 'Pía Sầu Riêng Ri6 Thượng Hạng',
      crust: '#D4AF37',
      filling: '#D4AC0D',
      core: '#E65100',
      stamp: '蓮',
      desc: 'Cơm sầu riêng Ri6 chín cây Chợ Lách xao sên 4 giờ cùng đậu xanh lòng thơm phức.',
    },
    taro: {
      name: 'Pía Khoai Môn Sáp Hạt Sen',
      crust: '#9C6F9E',
      filling: '#7D5A85',
      core: '#FF8F00',
      stamp: '月',
      desc: 'Khoai môn sáp Cù Lao Dung dẻo bùi kết hợp hạt sen Tịnh Tâm xứ Huế thanh tao.',
    },
    matcha: {
      name: 'Pía Than Tre Uji Matcha',
      crust: '#2B2B2B',
      filling: '#4D6B3C',
      core: '#FFF1C5',
      stamp: '禄',
      desc: 'Tinh than tre Takesumi Nhật Bản siêu giòn cùng matcha Kyoto và phô mai béo ngậy.',
    },
  };

  const currentFlavor = heroFlavors[selectedHeroFlavor];

  return (
    <div className="min-h-screen">
      {/* ========================================================
          HERO SECTION: 3D REAL-TIME INTERACTIVE BANNER
      ======================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden hero-radial-bg">
        {/* Subtle Background Glows & Grid */}
        <div className="absolute inset-0 lab-grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pia-gold/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pia-gold/15 border border-pia-gold/30 text-pia-gold text-xs font-semibold tracking-wider uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>Bộ Sưu Tập Trung Thu 2026 • Đột Phá Vi Tầng</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-pia-cream tracking-tight leading-[1.15]">
                  Nghệ Thuật <br />
                  <span className="gold-gradient-text">Bánh Pía Mùa Trăng</span>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base sm:text-lg text-pia-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                  Khám phá giao điểm kỳ diệu giữa di sản bánh Pía Sóc Trăng hơn 100 năm và phòng thí nghiệm ẩm thực vi tầng. Vỏ 18 lớp giòn xốp như cánh ve, giảm 40% đường, nhân tươi tuôn chảy.
                </p>
              </Reveal>

              {/* Action Buttons */}
              <Reveal delay={0.3}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <Button
                    variant="gold"
                    size="lg"
                    magnetic
                    onClick={() => onNavigate('diy-lab')}
                  >
                    <Sparkles className="w-4 h-4 mr-1 text-pia-dark" />
                    <span>Tự Phối Bánh 3D Trong Lab</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => onNavigate('products')}
                  >
                    <span>Xem Menu Bánh</span>
                    <ArrowRight className="w-4 h-4 ml-1 text-pia-gold" />
                  </Button>
                </div>
              </Reveal>

              {/* Interactive Flavor Selector Pills */}
              <Reveal delay={0.4}>
                <div className="pt-4 border-t border-pia-border/60">
                  <p className="text-xs font-semibold text-pia-muted uppercase tracking-wider mb-3">
                    Chọn Vị Bánh Khám Phá 3D Thời Gian Thực:
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    {(Object.keys(heroFlavors) as Array<keyof typeof heroFlavors>).map((key) => {
                      const item = heroFlavors[key];
                      const isSelected = selectedHeroFlavor === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedHeroFlavor(key)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                            isSelected
                              ? 'bg-pia-gold text-pia-dark border-pia-gold font-bold shadow-lg shadow-pia-gold/30 scale-105'
                              : 'bg-pia-charcoal/80 text-pia-cream border-pia-border hover:border-pia-gold/40'
                          }`}
                        >
                          {item.name.replace('Pía ', '')}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-pia-goldLight/80 italic mt-2.5">
                    "{currentFlavor.desc}"
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Real-time 3D Canvas Showcase */}
            <div className="lg:col-span-6 relative">
              <Reveal delay={0.2} direction="right">
                <div className="relative w-full aspect-square max-w-[540px] mx-auto rounded-3xl glass-panel-gold p-2 shadow-2xl overflow-hidden border border-pia-gold/30 group">
                  
                  {/* Real-time 3D Scene */}
                  <PiaCanvas
                    className="w-full h-full min-h-[380px] sm:min-h-[460px]"
                    cameraPosition={[0, 1.4, 4.4]}
                    fov={44}
                  >
                    <RealisticPiaCake
                      crustColor={currentFlavor.crust}
                      fillingColor={currentFlavor.filling}
                      coreColor={currentFlavor.core}
                      stampText={currentFlavor.stamp}
                      cakeType={cakeStyle}
                      isCutaway={heroCutaway}
                      isExploded={heroExploded}
                      separationFactor={separationFactor}
                      scale={heroExploded ? 0.88 : 1.12}
                    />
                    <MoonAtmosphere position={[4.2, 3.8, -6]} size={1.8} />
                    <FloatingLanterns />
                    <ParticleDust count={60} color="#F7CE78" spread={7} speed={0.25} />
                  </PiaCanvas>

                  {/* Vertical Drag Scrubber (Khi Tách Lớp 3D: Kéo lên/xuống để điều chỉnh khoảng cách tầng) */}
                  {heroExploded && (
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 px-2.5 py-3 rounded-2xl bg-pia-dark/90 backdrop-blur-md border border-pia-gold/40 shadow-2xl select-none"
                    >
                      <div className="flex items-center gap-1 text-[10px] font-bold text-pia-gold uppercase tracking-wider">
                        <span>↕ Dãn tầng</span>
                      </div>

                      {/* Nút tăng dãn */}
                      <button
                        onClick={() => setSeparationFactor((prev) => Math.min(2.4, +(prev + 0.2).toFixed(2)))}
                        className="w-7 h-7 rounded-lg bg-pia-surface hover:bg-pia-gold hover:text-pia-dark border border-pia-gold/30 text-pia-gold text-sm font-bold flex items-center justify-center transition-all shadow-sm"
                        title="Dãn xa hơn"
                      >
                        +
                      </button>

                      {/* Thanh kéo Slider dọc tương tác trực tiếp bằng chuột */}
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

                      {/* Nút giảm dãn */}
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

                  {/* 3D Real-time Control Controls Bar Overlay */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    {/* Style Switcher: Bánh Pía vs Bánh Nướng */}
                    <div className="flex rounded-xl bg-pia-dark/85 backdrop-blur-md border border-pia-gold/30 p-0.5 shadow-md">
                      <button
                        onClick={() => setCakeStyle('pia')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          cakeStyle === 'pia'
                            ? 'bg-pia-gold text-pia-dark shadow-sm'
                            : 'text-pia-muted hover:text-pia-cream'
                        }`}
                      >
                        Bánh Pía
                      </button>
                      <button
                        onClick={() => setCakeStyle('traditional')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          cakeStyle === 'traditional'
                            ? 'bg-pia-gold text-pia-dark shadow-sm'
                            : 'text-pia-muted hover:text-pia-cream'
                        }`}
                      >
                        Bánh Nướng
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        const next = !heroCutaway;
                        setHeroCutaway(next);
                        if (next) setHeroExploded(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 border ${
                        heroCutaway
                          ? 'bg-pia-gold text-pia-dark border-pia-gold shadow-lg shadow-pia-gold/30'
                          : 'bg-pia-dark/80 text-pia-cream border-pia-gold/30 hover:bg-pia-gold/20'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{heroCutaway ? 'Xem Nguyên Bánh' : 'Bổ Đôi 3D'}</span>
                    </button>

                    <button
                      onClick={() => {
                        const next = !heroExploded;
                        setHeroExploded(next);
                        if (next) setHeroCutaway(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 border ${
                        heroExploded
                          ? 'bg-pia-crimson text-white border-pia-crimson shadow-lg'
                          : 'bg-pia-dark/80 text-pia-cream border-pia-gold/30 hover:bg-pia-gold/20'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{heroExploded ? 'Gom Bánh Lại' : 'Tách Lớp 3D'}</span>
                    </button>
                  </div>

                  {/* Real-time Indicator Tag */}
                  <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pia-dark/90 border border-pia-gold/40 text-[10px] text-pia-gold font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      WebGL 3D Render
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          KEY PILLARS & STATS BAR
      ======================================================== */}
      <section className="relative z-20 -mt-6 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl glass-panel-gold border border-pia-gold/30 shadow-xl">
          <div className="text-center p-3">
            <span className="font-serif text-3xl sm:text-4xl font-black text-pia-gold block">
              18 Lớp
            </span>
            <span className="text-xs text-pia-muted font-medium uppercase tracking-wider mt-1 block">
              Vỏ Ngàn Lớp Cán Tay
            </span>
          </div>

          <div className="text-center p-3 border-l border-pia-border/60">
            <span className="font-serif text-3xl sm:text-4xl font-black text-emerald-400 block">
              -40%
            </span>
            <span className="text-xs text-pia-muted font-medium uppercase tracking-wider mt-1 block">
              Đường Giảm Ngọt Thanh
            </span>
          </div>

          <div className="text-center p-3 border-l-0 md:border-l border-pia-border/60">
            <span className="font-serif text-3xl sm:text-4xl font-black text-pia-gold block">
              28 Ngày
            </span>
            <span className="text-xs text-pia-muted font-medium uppercase tracking-wider mt-1 block">
              Ủ Trứng Muối Thảo Mộc
            </span>
          </div>

          <div className="text-center p-3 border-l border-pia-border/60">
            <span className="font-serif text-3xl sm:text-4xl font-black text-pia-crimson block">
              100%
            </span>
            <span className="text-xs text-pia-muted font-medium uppercase tracking-wider mt-1 block">
              Tươi Mới Không Phụ Gia
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          SIGNATURE CREATIONS BENTO / CATALOG PREVIEW
      ======================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <Badge variant="gold" className="mb-3">
              Tuyệt Phẩm Mùa Trăng
            </Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pia-cream mb-4">
              Bốn Hương Vị Biểu Tượng Pía Lab
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sm text-pia-muted leading-relaxed">
              Từng chiếc bánh là bản hòa ca ẩm thực tinh xảo giữa bàn tay nghệ nhân Sóc Trăng và quy chuẩn kiểm soát nhiệt độ nghiêm ngặt của phòng lab.
            </p>
          </Reveal>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map((product, idx) => (
            <Reveal key={product.id} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-3xl glass-panel border border-pia-border hover:border-pia-gold/50 p-5 flex flex-col justify-between transition-all duration-300 group shadow-xl relative overflow-hidden"
              >
                {/* Badge Top */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-pia-gold/15 text-pia-gold border border-pia-gold/30">
                    {product.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* 3D Stylized Graphic Placeholder / Mini Canvas */}
                <div className="relative w-full aspect-square mb-4 rounded-2xl bg-gradient-to-b from-pia-surface to-pia-charcoal p-4 flex items-center justify-center border border-pia-border/50 group-hover:border-pia-gold/30 transition-colors">
                  {/* Decorative Glowing Concentric Rings representing 18 Layers */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="w-36 h-36 rounded-full border border-pia-gold animate-spin-slow" />
                    <div className="absolute w-28 h-28 rounded-full border border-pia-goldLight" />
                    <div className="absolute w-20 h-20 rounded-full border border-pia-crimson" />
                  </div>

                  {/* Pastry Icon Graphic */}
                  <div
                    className="w-24 h-24 rounded-full shadow-2xl flex items-center justify-center relative transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle, ${product.layers.crust.color} 0%, #1F150E 100%)`,
                      boxShadow: `0 10px 25px -5px ${product.layers.core.color}55`,
                    }}
                  >
                    <span className="font-serif font-black text-2xl text-pia-cream drop-shadow-md">
                      {product.layers.stamp.charAt(product.layers.stamp.indexOf('"') + 1) || '福'}
                    </span>
                    {/* Molten Lava Indicator */}
                    <div
                      className="absolute -bottom-1 w-6 h-6 rounded-full blur-[2px] animate-pulse"
                      style={{ background: product.layers.core.color }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <h3 className="font-serif text-lg font-bold text-pia-cream group-hover:text-pia-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-pia-muted line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Flavor Metrics Bar */}
                  <div className="pt-2 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-pia-muted">
                      <span>Độ ngọt:</span>
                      <span className="text-pia-gold font-medium">{'★'.repeat(product.sweetness)}{'☆'.repeat(5 - product.sweetness)}</span>
                    </div>
                    <div className="flex justify-between text-pia-muted">
                      <span>Độ béo ngậy:</span>
                      <span className="text-pia-gold font-medium">{'★'.repeat(product.richness)}{'☆'.repeat(5 - product.richness)}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-pia-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-pia-gold">
                      {formatVND(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-pia-muted line-through ml-2">
                        {formatVND(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onQuickView(product)}
                      className="p-2 rounded-xl bg-pia-surface hover:bg-pia-gold/20 text-pia-cream hover:text-pia-gold transition-colors"
                      title="Xem lát cắt 3D"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-xl bg-pia-gold hover:bg-pia-goldLight text-pia-dark font-bold transition-all shadow-md active:scale-95"
                      title="Thêm vào giỏ"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            magnetic
            onClick={() => onNavigate('products')}
          >
            <span>Khám Phá Toàn Bộ Hộp Quà & Menu</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* ========================================================
          DIY LAB 3D TEASER SECTION
      ======================================================== */}
      <section className="py-20 relative bg-gradient-to-b from-pia-dark via-pia-surface/80 to-pia-dark border-y border-pia-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="crimson">Phòng Sáng Chế Độc Bản</Badge>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-pia-cream leading-tight">
                Pía Lab DIY: <br />
                <span className="gold-gradient-text">Tự Tay Phối Bánh 3D</span>
              </h2>
              <p className="text-sm sm:text-base text-pia-muted leading-relaxed font-light">
                Lần đầu tiên tại Việt Nam, bạn có thể tự chọn từng thành phần chiếc bánh Pía của riêng mình trong không gian 3D tương tác. Tùy chỉnh màu sắc vỏ bột ngàn lớp, phối nhân sầu riêng hay khoai môn, thêm trứng muối tan chảy và đóng dấu triện son mang thông điệp riêng.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl glass-panel border border-pia-border/60">
                  <span className="text-pia-gold font-serif font-bold text-lg block">4 Loại Vỏ</span>
                  <span className="text-xs text-pia-muted">Hoàng Kim • Than Tre • Matcha • Môn Sáp</span>
                </div>
                <div className="p-3.5 rounded-2xl glass-panel border border-pia-border/60">
                  <span className="text-pia-gold font-serif font-bold text-lg block">4 Loại Nhân</span>
                  <span className="text-xs text-pia-muted">Ri6 Chợ Lách • Hạt Sen • Đậu Xanh • Socola</span>
                </div>
                <div className="p-3.5 rounded-2xl glass-panel border border-pia-border/60">
                  <span className="text-pia-gold font-serif font-bold text-lg block">Khắc Mộc Son</span>
                  <span className="text-xs text-pia-muted">Phúc • Lộc • Thọ • Pía Lab Mascot</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="gold"
                  size="lg"
                  magnetic
                  onClick={() => onNavigate('diy-lab')}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>Mở Phòng Thí Nghiệm Sáng Chế ➔</span>
                </Button>
              </div>
            </div>

            {/* Visual preview card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl glass-panel-gold p-8 border border-pia-gold/40 shadow-2xl text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-pia-gold/20 border-2 border-pia-gold flex items-center justify-center mx-auto shadow-xl">
                  <Sparkles className="w-10 h-10 text-pia-gold animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-pia-cream mb-2">
                    Bánh Tươi Nướng Mới
                  </h3>
                  <p className="text-xs text-pia-muted leading-relaxed max-w-sm mx-auto">
                    Chiếc bánh sau khi hoàn thiện trên mô hình 3D sẽ được các nghệ nhân Pía Lab nướng thủ công và gửi tận tay bạn kèm hộp quà khắc tên riêng.
                  </p>
                </div>
                <div className="inline-block px-4 py-2 rounded-xl bg-pia-dark/80 border border-pia-gold/30 text-xs text-pia-gold font-mono">
                  RENDER_MODE: REALTIME_3D_WEBGL
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          WORKSHOP PREVIEW TEASER
      ======================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel-gold border border-pia-gold/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <Badge variant="jade">Trải Nghiệm Nghệ Thuật Ẩm Thực</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pia-cream">
                Workshop Cán Bột 18 Lớp Cùng Nghệ Nhân
              </h2>
              <p className="text-sm text-pia-muted leading-relaxed font-light max-w-2xl">
                Dành 3 giờ đồng hồ cuối tuần để hòa mình vào không gian thơm lừng mùi bơ nướng và sầu riêng. Được nghệ nhân 38 năm kinh nghiệm cầm tay chỉ việc cán bột, đóng dấu triện và mang về 4 chiếc bánh do chính tay mình hoàn thiện.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-pia-cream">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-pia-gold" />
                  <span>Chứng chỉ Pía Lab Master</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pia-crimson" />
                  <span>Phù hợp cặp đôi & gia đình</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Bao gồm trà và hộp quà tặng</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <Button
                variant="gold"
                size="lg"
                magnetic
                onClick={() => onNavigate('workshop')}
              >
                <span>Đăng Ký Workshop ➔</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
