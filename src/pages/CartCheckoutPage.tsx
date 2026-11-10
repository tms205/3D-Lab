import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShoppingBag, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Tag, Truck, CreditCard, QrCode } from 'lucide-react';
import { PageRoute, CartItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatVND } from '@/utils/cn';

interface CartCheckoutPageProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigate: (route: PageRoute) => void;
}

export function CartCheckoutPage({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
}: CartCheckoutPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Checkout form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('2026-09-15');
  const [cardMessage, setCardMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card' | 'cod'>('qr');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingFee = subtotal > 500000 || subtotal === 0 ? 0 : 35000;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'PIALAB10' || code === 'TRUNGTHU2026') {
      setDiscountPercent(10);
      setPromoMessage('Áp dụng mã giảm 10% thành công!');
    } else if (code === 'VIPLAB') {
      setDiscountPercent(15);
      setPromoMessage('Áp dụng mã VIP giảm 15% thành công!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Mã không hợp lệ hoặc đã hết lượt.');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const generatedId = `PIA-${Date.now().toString().slice(-6)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    onClearCart();

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#E5A93C', '#C0392B', '#FFF', '#2F6E4F'],
    });
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full glass-panel-gold rounded-3xl p-8 sm:p-10 text-center space-y-6 border border-pia-gold/40 shadow-2xl"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <Badge variant="gold" className="mb-2">Đặt Hàng Thành Công</Badge>
            <h2 className="font-serif text-3xl font-bold text-pia-cream">
              Cảm Ơn Bạn Đã Chọn Pía Lab!
            </h2>
            <p className="text-xs sm:text-sm text-pia-muted mt-2 leading-relaxed">
              Mã đơn hàng của bạn là: <strong className="text-pia-gold font-mono">{orderId}</strong>. Bếp bánh sẽ bắt đầu chuẩn bị mẻ bánh nướng tươi theo yêu cầu và giao vào ngày <strong className="text-pia-goldLight">{deliveryDate}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pia-surface/80 border border-pia-border text-xs text-left space-y-1.5 text-pia-cream/80">
            <p><strong className="text-pia-gold">Người nhận:</strong> {name} ({phone})</p>
            <p><strong className="text-pia-gold">Địa chỉ giao:</strong> {address}</p>
            <p><strong className="text-pia-gold">Phương thức:</strong> {paymentMethod === 'qr' ? 'Quét mã VietQR' : paymentMethod === 'card' ? 'Thẻ Quốc Tế' : 'Thanh toán khi nhận bánh (COD)'}</p>
            {cardMessage && <p><strong className="text-pia-gold">Lời chúc thiệp:</strong> "{cardMessage}"</p>}
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              variant="gold"
              className="w-full justify-center"
              onClick={() => onNavigate('home')}
            >
              <span>Về Trang Chủ Mùa Trăng</span>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <div className="text-center max-w-md space-y-5">
          <div className="w-20 h-20 rounded-full bg-pia-surface border border-pia-border flex items-center justify-center mx-auto text-pia-muted">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-pia-cream">
            Giỏ Hàng Của Bạn Đang Trống
          </h2>
          <p className="text-xs text-pia-muted leading-relaxed">
            Hãy khám phá các tuyệt phẩm bánh Pía hoàng kim hoặc tự tay phối chiếc bánh 3D theo ý thích của mình nhé!
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="outline" onClick={() => onNavigate('products')}>
              <span>Xem Menu Bánh</span>
            </Button>
            <Button variant="gold" onClick={() => onNavigate('diy-lab')}>
              <span>Tự Phối Bánh 3D ➔</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <Badge variant="gold" className="mb-2">Mùa Trăng Đoàn Viên</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-pia-cream">
            Giỏ Hàng & Thanh Toán Bánh Tươi
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================
              LEFT COLUMN: CART ITEMS LIST
          ======================================================== */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl glass-panel border border-pia-border space-y-4">
              <h3 className="font-serif font-bold text-lg text-pia-cream pb-3 border-b border-pia-border flex items-center justify-between">
                <span>Danh Sách Bánh ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                <span className="text-xs text-pia-gold font-normal">Nướng mới mỗi ngày</span>
              </h3>

              <div className="divide-y divide-pia-border/60">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                    
                    {/* Item Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-sm text-pia-cream">
                          {item.product.name}
                        </h4>
                        {item.customDetails?.isDiy && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-pia-gold/20 text-pia-gold border border-pia-gold/30">
                            Custom 3D
                          </span>
                        )}
                      </div>

                      {/* Custom layers if DIY */}
                      {item.customDetails?.isDiy ? (
                        <p className="text-[11px] text-pia-goldLight mt-1">
                          Vỏ: {item.customDetails.crustName} • Nhân: {item.customDetails.fillingName} • Lõi: {item.customDetails.coreName} • Triện: {item.customDetails.stampText}
                        </p>
                      ) : (
                        <p className="text-xs text-pia-muted mt-0.5">
                          {item.product.tagline}
                        </p>
                      )}

                      <span className="text-xs font-bold text-pia-gold mt-1 block">
                        {formatVND(item.product.price)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-pia-surface border border-pia-border text-pia-cream hover:border-pia-gold flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-pia-cream px-1.5 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-pia-surface border border-pia-border text-pia-cream hover:border-pia-gold flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 rounded-xl text-pia-muted hover:text-pia-crimson transition-colors"
                      title="Xóa món này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Voucher Code */}
            <div className="p-5 rounded-3xl glass-panel border border-pia-border">
              <form onSubmit={applyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-pia-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Nhập mã ưu đãi (Thử: PIALAB10, TRUNGTHU2026)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-pia-surface border border-pia-border rounded-xl pl-10 pr-4 py-2 text-xs text-pia-cream placeholder:text-pia-muted focus:outline-none focus:border-pia-gold uppercase tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pia-surface hover:bg-pia-gold text-pia-cream hover:text-pia-dark border border-pia-gold/40 text-xs font-bold transition-all"
                >
                  Áp Dụng
                </button>
              </form>
              {promoMessage && (
                <p className={`text-xs mt-2 font-medium ${discountPercent > 0 ? 'text-emerald-400' : 'text-pia-crimson'}`}>
                  {promoMessage}
                </p>
              )}
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: CHECKOUT FORM & TOTAL SUMMARY
          ======================================================== */}
          <div className="lg:col-span-5">
            <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 rounded-3xl glass-panel-gold border border-pia-gold/40 shadow-2xl space-y-5">
              <h3 className="font-serif font-bold text-xl text-pia-cream pb-2 border-b border-pia-border">
                Thông Tin Giao Bánh
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-pia-muted block mb-1">Họ tên người nhận:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Lê Hoàng Nam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-pia-surface border border-pia-border rounded-xl px-3.5 py-2 text-xs text-pia-cream focus:outline-none focus:border-pia-gold"
                  />
                </div>

                <div>
                  <label className="text-pia-muted block mb-1">Số điện thoại:</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0908 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-pia-surface border border-pia-border rounded-xl px-3.5 py-2 text-xs text-pia-cream focus:outline-none focus:border-pia-gold"
                  />
                </div>

                <div>
                  <label className="text-pia-muted block mb-1">Địa chỉ nhận bánh tươi:</label>
                  <input
                    type="text"
                    required
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-pia-surface border border-pia-border rounded-xl px-3.5 py-2 text-xs text-pia-cream focus:outline-none focus:border-pia-gold"
                  />
                </div>

                <div>
                  <label className="text-pia-muted block mb-1">Chọn ngày nhận bánh:</label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-pia-surface border border-pia-border rounded-xl px-3.5 py-2 text-xs text-pia-cream focus:outline-none focus:border-pia-gold"
                  />
                </div>

                <div>
                  <label className="text-pia-muted block mb-1">Ghi chú lời chúc thiệp Trung Thu (Miễn phí):</label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Kính chúc Gia Đình mùa Trăng bình an, vạn sự cát tường..."
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    className="w-full bg-pia-surface border border-pia-border rounded-xl px-3.5 py-2 text-xs text-pia-cream focus:outline-none focus:border-pia-gold resize-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2 border-t border-pia-border/60">
                <label className="text-xs font-bold text-pia-cream block mb-2">Phương thức thanh toán:</label>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'qr'
                        ? 'bg-pia-gold/20 border-pia-gold text-pia-gold font-bold'
                        : 'bg-pia-surface border-pia-border text-pia-muted'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mx-auto mb-1" />
                    <span>VietQR 24/7</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-pia-gold/20 border-pia-gold text-pia-gold font-bold'
                        : 'bg-pia-surface border-pia-border text-pia-muted'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1" />
                    <span>Thẻ Visa/Master</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-pia-gold/20 border-pia-gold text-pia-gold font-bold'
                        : 'bg-pia-surface border-pia-border text-pia-muted'
                    }`}
                  >
                    <Truck className="w-4 h-4 mx-auto mb-1" />
                    <span>Tiền mặt (COD)</span>
                  </button>
                </div>
              </div>

              {/* Order Calculation Breakdown */}
              <div className="pt-3 border-t border-pia-border/60 space-y-1.5 text-xs text-pia-muted">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="text-pia-cream font-medium">{formatVND(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Ưu đãi ({discountPercent}%):</span>
                    <span>-{formatVND(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao bánh tươi:</span>
                  <span>{shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-pia-cream pt-2 border-t border-pia-border">
                  <span>Tổng thanh toán:</span>
                  <span className="font-serif text-2xl text-pia-gold">{formatVND(finalTotal)}</span>
                </div>
              </div>

              <Button
                variant="glow"
                size="lg"
                type="submit"
                className="w-full justify-center"
              >
                <span>Xác Nhận Đặt Bánh Mùa Trăng</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-pia-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bảo hiểm bánh tươi nguyên vẹn khi đến tay</span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
