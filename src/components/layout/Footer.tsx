import { useState } from 'react';
import { Mail, MapPin, Phone, Clock, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '@/types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-pia-charcoal/95 border-t border-pia-gold/20 pt-16 pb-12 overflow-hidden text-pia-cream">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-pia-gold/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pia-gold to-pia-goldDark flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-pia-dark rounded-[9px] flex items-center justify-center">
                  <span className="font-serif font-black text-pia-gold text-base">P</span>
                </div>
              </div>
              <div>
                <span className="font-serif font-black tracking-wider text-lg text-pia-cream">
                  PÍA LAB
                </span>
                <p className="text-[10px] text-pia-gold uppercase tracking-widest">
                  Heritage Meets Innovation
                </p>
              </div>
            </div>
            <p className="text-xs text-pia-muted leading-relaxed mb-4">
              Phòng thí nghiệm ẩm thực đầu tiên kết hợp di sản bánh Pía Sóc Trăng hơn 100 năm với công nghệ vi tầng đương đại. Tinh tuyển nguyên liệu bản địa, giảm đường, trọn vị giòn xốp.
            </p>
            <div className="flex items-center gap-2 text-xs text-pia-goldLight">
              <Sparkles className="w-4 h-4 text-pia-gold" />
              <span>Tiêu chuẩn ISO 22000 & HACCP Quốc Tế</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-pia-cream tracking-wider uppercase mb-4 pb-1 border-b border-pia-gold/20 inline-block">
              Khám Phá
            </h4>
            <ul className="space-y-2.5 text-xs text-pia-muted">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-pia-gold transition-colors"
                >
                  Trang Chủ Mùa Trăng
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-pia-gold transition-colors"
                >
                  Di Sản Vũng Thơm & Phòng Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-pia-gold transition-colors"
                >
                  Bộ Sưu Tập Bánh Pía Thượng Hạng
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('diy-lab')}
                  className="hover:text-pia-gold transition-colors flex items-center gap-1.5 text-pia-goldLight"
                >
                  <span>Pía Lab DIY — Phối Bánh 3D</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-pia-gold/20 text-pia-gold">HOT</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="hover:text-pia-gold transition-colors"
                >
                  Lớp Học Làm Bánh Cuối Tuần
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Workshop Locations */}
          <div>
            <h4 className="font-serif font-bold text-sm text-pia-cream tracking-wider uppercase mb-4 pb-1 border-b border-pia-gold/20 inline-block">
              Hệ Thống Không Gian
            </h4>
            <ul className="space-y-3 text-xs text-pia-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pia-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pia-cream font-medium">Heritage Space (Workshop):</strong>
                  <p>88 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pia-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pia-cream font-medium">Innovation Lab:</strong>
                  <p>124 Thảo Điền, TP. Thủ Đức, TP.HCM</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-pia-gold shrink-0" />
                <span>Hotline: 1900 886 638 (08:00 - 21:00)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-pia-gold shrink-0" />
                <span>Mở cửa: 08:30 - 21:30 hàng ngày</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-sm text-pia-cream tracking-wider uppercase mb-4 pb-1 border-b border-pia-gold/20 inline-block">
              Bản Tin Mùa Trăng
            </h4>
            <p className="text-xs text-pia-muted mb-3 leading-relaxed">
              Nhận voucher 10% cho đơn hàng đầu tiên và thông báo sớm nhất về các mẻ bánh giới hạn nướng trong ngày.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-pia-jade/20 border border-pia-jade/40 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Cảm ơn bạn! Mã ưu đãi PIALAB10 đã được gửi.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-pia-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Nhập email của bạn..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-pia-surface/80 border border-pia-border rounded-xl pl-10 pr-4 py-2 text-xs text-pia-cream placeholder:text-pia-muted focus:outline-none focus:border-pia-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-xl bg-pia-gold hover:bg-pia-goldLight text-pia-dark text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md shadow-pia-gold/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Đăng Ký Nhận Tin</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-8 border-t border-pia-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-pia-muted">
          <p>© 2026 PÍA LAB — Dự án Thiết Kế Tương Tác 3D Nhóm 1. Tự hào tôn vinh văn hóa ẩm thực Việt Nam.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-pia-gold transition-colors cursor-pointer">Chính Sách Bảo Mật</span>
            <span>•</span>
            <span className="hover:text-pia-gold transition-colors cursor-pointer">Điều Khoản Dịch Vụ</span>
            <span>•</span>
            <span className="hover:text-pia-gold transition-colors cursor-pointer">Cam Kết Chất Lượng Bánh Tươi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
