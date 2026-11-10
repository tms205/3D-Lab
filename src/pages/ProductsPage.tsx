import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, ShoppingBag, Filter, Sparkles, Coffee, Clock, Scale } from 'lucide-react';
import { PageRoute, Product } from '@/types';
import { PRODUCTS } from '@/assets/data/products';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { PiaCanvas } from '@/components/three/PiaCanvas';
import { RealisticPiaCake } from '@/components/three/RealisticPiaCake';
import { ParticleDust } from '@/components/three/ParticleDust';
import { formatVND } from '@/utils/cn';

interface ProductsPageProps {
  onAddToCart: (product: Product) => void;
  onNavigate: (route: PageRoute) => void;
}

export function ProductsPage({ onAddToCart, onNavigate }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSweetFilter, setSelectedSweetFilter] = useState<number | 'all'>('all');
  const [inspectionProduct, setInspectionProduct] = useState<Product | null>(null);
  const [modalCutaway, setModalCutaway] = useState(true);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSweet = selectedSweetFilter === 'all' || (
        selectedSweetFilter === 2 ? item.sweetness <= 2 : item.sweetness >= 3
      );
      return matchCat && matchSweet;
    });
  }, [selectedCategory, selectedSweetFilter]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Badge variant="gold" className="mb-3">Bộ Sưu Tập 2026</Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-pia-cream mb-4">
          Tuyệt Phẩm <span className="gold-gradient-text">Bánh Pía & Hộp Quà</span>
        </h1>
        <p className="text-sm sm:text-base text-pia-muted leading-relaxed font-light">
          Khám phá danh mục đầy đủ các vị bánh Pía thủ công và các bộ hộp quà Trung Thu giới hạn. Mọi sản phẩm đều có thể kiểm tra cấu trúc vi tầng 3D thời gian thực.
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
          {[
            { id: 'all', label: 'Tất Cả Sản Phẩm' },
            { id: 'banh-pia-don', label: 'Bánh Pía Đơn' },
            { id: 'hop-qua-trung-thu', label: 'Hộp Quà Mùa Trăng' },
            { id: 'phien-ban-gioi-han', label: 'Phiên Bản Giới Hạn' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? 'bg-pia-gold text-pia-dark border-pia-gold shadow-lg shadow-pia-gold/25'
                  : 'bg-pia-charcoal/80 text-pia-cream border-pia-border hover:border-pia-gold/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter: Sweetness */}
        <div className="flex items-center justify-center gap-4 pt-4 text-xs text-pia-muted">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-pia-gold" />
            <span>Độ ngọt:</span>
          </div>
          <button
            onClick={() => setSelectedSweetFilter('all')}
            className={`hover:text-pia-gold ${selectedSweetFilter === 'all' ? 'text-pia-gold font-bold underline' : ''}`}
          >
            Tất cả
          </button>
          <span>•</span>
          <button
            onClick={() => setSelectedSweetFilter(2)}
            className={`hover:text-pia-gold ${selectedSweetFilter === 2 ? 'text-pia-gold font-bold underline' : ''}`}
          >
            Ít ngọt (Thanh đạm)
          </button>
          <span>•</span>
          <button
            onClick={() => setSelectedSweetFilter(3)}
            className={`hover:text-pia-gold ${selectedSweetFilter === 3 ? 'text-pia-gold font-bold underline' : ''}`}
          >
            Đậm vị truyền thống
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              className="rounded-3xl glass-panel-gold border border-pia-border hover:border-pia-gold/60 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl relative group"
            >
              {/* Badge & Rating */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-pia-gold/20 text-pia-gold border border-pia-gold/30">
                  {product.badge || product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating} ({product.reviewCount})</span>
                </div>
              </div>

              {/* Central Graphic Art with 3D Preview Button */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-pia-surface to-pia-dark p-6 flex flex-col items-center justify-center border border-pia-border/60 mb-5 overflow-hidden">
                <div
                  className="w-28 h-28 rounded-full shadow-2xl flex items-center justify-center relative transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `radial-gradient(circle, ${product.layers.crust.color} 0%, #1F150E 100%)`,
                    boxShadow: `0 10px 30px -5px ${product.layers.core.color}66`,
                  }}
                >
                  <span className="font-serif font-black text-3xl text-pia-cream drop-shadow-lg">
                    {product.layers.stamp.charAt(product.layers.stamp.indexOf('"') + 1) || '福'}
                  </span>
                  <div
                    className="absolute -bottom-1.5 w-7 h-7 rounded-full blur-[2px] animate-pulse"
                    style={{ background: product.layers.core.color }}
                  />
                </div>

                {/* Inspect in 3D Button Overlay on Hover */}
                <button
                  onClick={() => {
                    setInspectionProduct(product);
                    setModalCutaway(true);
                  }}
                  className="mt-4 px-4 py-1.5 rounded-full bg-pia-dark/90 hover:bg-pia-gold text-pia-cream hover:text-pia-dark text-xs font-semibold border border-pia-gold/40 flex items-center gap-1.5 transition-all duration-300 shadow-lg"
                >
                  <Eye className="w-3.5 h-3.5 text-pia-gold group-hover:text-pia-dark" />
                  <span>Khám Phá Lát Cắt 3D</span>
                </button>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 mb-6">
                <h3 className="font-serif text-xl font-bold text-pia-cream group-hover:text-pia-gold transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-pia-muted leading-relaxed">
                  {product.tagline}
                </p>

                {/* Layer summary tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-pia-surface text-pia-goldLight border border-pia-border">
                    {product.layers.crust.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-pia-surface text-pia-goldLight border border-pia-border">
                    {product.layers.core.name}
                  </span>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="pt-4 border-t border-pia-border/60 flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-pia-gold font-serif">
                    {formatVND(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-pia-muted line-through ml-2">
                      {formatVND(product.originalPrice)}
                    </span>
                  )}
                </div>

                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingBag className="w-4 h-4 mr-1.5" />
                  <span>Thêm Giỏ Hàng</span>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          DETAILED 3D PRODUCT INSPECTION MODAL
      ======================================================== */}
      {inspectionProduct && (
        <Modal
          isOpen={!!inspectionProduct}
          onClose={() => setInspectionProduct(null)}
          maxWidth="4xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Real-time 3D Canvas */}
            <div className="lg:col-span-6 relative aspect-square rounded-2xl bg-pia-surface/60 border border-pia-gold/30 p-2 overflow-hidden shadow-inner">
              <PiaCanvas
                className="w-full h-full min-h-[340px]"
                cameraPosition={[0, 1.4, 4.0]}
                fov={46}
              >
                <RealisticPiaCake
                  crustColor={inspectionProduct.layers.crust.color}
                  fillingColor={inspectionProduct.layers.filling.color}
                  coreColor={inspectionProduct.layers.core.color}
                  stampText={inspectionProduct.layers.stamp.charAt(inspectionProduct.layers.stamp.indexOf('"') + 1) || '福'}
                  cakeType={inspectionProduct.category === 'hop-qua-trung-thu' ? 'traditional' : 'pia'}
                  isCutaway={modalCutaway}
                  scale={1.15}
                />
                <ParticleDust count={40} color="#F7CE78" spread={6} speed={0.2} />
              </PiaCanvas>

              {/* Modal 3D Controls */}
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => setModalCutaway(!modalCutaway)}
                  className="px-3 py-1.5 rounded-xl bg-pia-dark/85 backdrop-blur-md border border-pia-gold/40 text-xs font-semibold text-pia-gold hover:bg-pia-gold hover:text-pia-dark transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{modalCutaway ? 'Xem Nguyên Bánh' : 'Bổ Lát Cắt Vi Tầng'}</span>
                </button>
              </div>
            </div>

            {/* Right: Product Story & Specifications */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pia-gold/20 text-pia-gold border border-pia-gold/30">
                  {inspectionProduct.badge || inspectionProduct.categoryLabel}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pia-cream mt-2">
                  {inspectionProduct.name}
                </h3>
                <p className="text-xs text-pia-goldLight italic mt-1">
                  "{inspectionProduct.tagline}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-pia-muted leading-relaxed font-light">
                {inspectionProduct.description}
              </p>

              {/* Internal Layers Architecture Breakdown */}
              <div className="p-3.5 rounded-2xl bg-pia-surface/80 border border-pia-border/60 space-y-2 text-xs">
                <p className="font-bold text-pia-gold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cấu Trúc Vi Tầng Ẩm Thực:</span>
                </p>
                <div className="space-y-1 text-pia-cream/90 pl-2 border-l border-pia-gold/40">
                  <p><strong className="text-pia-goldLight">1. Vỏ:</strong> {inspectionProduct.layers.crust.name} ({inspectionProduct.layers.crust.description})</p>
                  <p><strong className="text-pia-goldLight">2. Nhân:</strong> {inspectionProduct.layers.filling.name} ({inspectionProduct.layers.filling.description})</p>
                  <p><strong className="text-pia-goldLight">3. Lõi:</strong> {inspectionProduct.layers.core.name} ({inspectionProduct.layers.core.description})</p>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-pia-muted">
                <div className="p-2 rounded-xl bg-pia-charcoal/60 border border-pia-border">
                  <Scale className="w-4 h-4 text-pia-gold mx-auto mb-1" />
                  <span>{inspectionProduct.weight}</span>
                </div>
                <div className="p-2 rounded-xl bg-pia-charcoal/60 border border-pia-border">
                  <Clock className="w-4 h-4 text-pia-gold mx-auto mb-1" />
                  <span>{inspectionProduct.shelfLife}</span>
                </div>
                <div className="p-2 rounded-xl bg-pia-charcoal/60 border border-pia-border">
                  <Coffee className="w-4 h-4 text-pia-gold mx-auto mb-1" />
                  <span className="truncate block" title={inspectionProduct.pairing}>Gợi ý trà</span>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-4 border-t border-pia-border/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-pia-muted block">Giá nướng tươi:</span>
                  <span className="font-serif text-2xl font-black text-pia-gold">
                    {formatVND(inspectionProduct.price)}
                  </span>
                </div>

                <Button
                  variant="gold"
                  size="md"
                  onClick={() => {
                    onAddToCart(inspectionProduct);
                    setInspectionProduct(null);
                  }}
                >
                  <ShoppingBag className="w-4 h-4 mr-1.5" />
                  <span>Thêm Vào Giỏ Hàng</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
