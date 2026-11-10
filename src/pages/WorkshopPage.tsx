import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Award, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { PageRoute, WorkshopSession } from '@/types';
import { WORKSHOPS } from '@/assets/data/products';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatVND } from '@/utils/cn';

interface WorkshopPageProps {
  onNavigate: (route: PageRoute) => void;
}

export function WorkshopPage({ onNavigate }: WorkshopPageProps) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopSession | null>(null);
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingName && bookingPhone) {
      setBookingConfirmed(true);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Badge variant="jade" className="mb-3">
          Không Gian Trải Nghiệm Thực Tế
        </Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-pia-cream mb-4">
          Workshop Làm Bánh Pía <br />
          <span className="gold-gradient-text">Cùng Nghệ Nhân Lão Thành</span>
        </h1>
        <p className="text-sm sm:text-base text-pia-muted leading-relaxed font-light">
          Cầm tay chỉ việc bí quyết cán 18 lớp vỏ giòn xốp như cánh ve. Tự tay nhào bột, sên nhân, đóng triện son và mang về hộp quà bánh nóng hổi thơm nức cho gia đình mùa Tết Trung Thu.
        </p>
      </section>

      {/* Workshop Cards List */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {WORKSHOPS.map((ws, idx) => (
          <motion.div
            key={ws.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl glass-panel-gold border border-pia-gold/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Workshop Details */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={idx === 0 ? 'gold' : 'crimson'}>
                    {idx === 0 ? 'Khóa Cổ Truyền' : 'Khóa Đương Đại & Molecular'}
                  </Badge>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Còn {ws.totalSpots - ws.bookedSpots} chỗ trống</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pia-cream">
                    {ws.title}
                  </h3>
                  <p className="text-sm text-pia-goldLight italic mt-1 font-medium">
                    "{ws.subtitle}"
                  </p>
                </div>

                {/* Key Meta tags */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-pia-muted p-2.5 rounded-xl bg-pia-surface/70 border border-pia-border">
                    <Calendar className="w-4 h-4 text-pia-gold shrink-0" />
                    <span>{ws.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-pia-muted p-2.5 rounded-xl bg-pia-surface/70 border border-pia-border">
                    <Clock className="w-4 h-4 text-pia-gold shrink-0" />
                    <span>{ws.time} ({ws.duration})</span>
                  </div>
                  <div className="flex items-center gap-2 text-pia-muted p-2.5 rounded-xl bg-pia-surface/70 border border-pia-border col-span-2 sm:col-span-1">
                    <MapPin className="w-4 h-4 text-pia-gold shrink-0" />
                    <span className="truncate">{ws.address}</span>
                  </div>
                </div>

                {/* Lead Artisan */}
                <div className="p-4 rounded-2xl bg-pia-surface/90 border-l-4 border-pia-gold flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pia-gold/20 border border-pia-gold flex items-center justify-center font-serif font-black text-pia-gold text-lg shrink-0">
                    {ws.leadArtisan.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-pia-cream">
                      {ws.leadArtisan.name}
                    </h4>
                    <p className="text-xs text-pia-goldLight">{ws.leadArtisan.role}</p>
                    <p className="text-[11px] text-pia-muted mt-0.5">{ws.leadArtisan.experience}</p>
                  </div>
                </div>

                {/* Curriculum Breakdown */}
                <div>
                  <h5 className="font-serif text-xs font-bold text-pia-cream uppercase tracking-wider mb-2">
                    Nội dung buổi thực hành:
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-pia-muted">
                    {ws.curriculum.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-pia-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Pricing & Booking Action */}
              <div className="lg:col-span-4 rounded-2xl glass-panel p-6 border border-pia-border text-center space-y-5">
                <div>
                  <span className="text-xs text-pia-muted block">Học phí trọn gói:</span>
                  <span className="font-serif text-3xl font-black text-pia-gold">
                    {formatVND(ws.price)}
                  </span>
                  <span className="text-[11px] text-pia-muted block mt-1">
                    (Bao gồm nguyên liệu cao cấp, hộp quà 4 bánh & tiệc trà)
                  </span>
                </div>

                <div className="space-y-2 text-left text-xs text-pia-cream/90 bg-pia-surface/60 p-3 rounded-xl border border-pia-border">
                  <p className="font-bold text-pia-gold">Quà mang về:</p>
                  {ws.takeaways.map((takeaway, i) => (
                    <p key={i} className="flex items-center gap-1.5 text-pia-muted text-[11px]">
                      <Sparkles className="w-3 h-3 text-pia-gold shrink-0" />
                      <span>{takeaway}</span>
                    </p>
                  ))}
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full justify-center"
                  onClick={() => {
                    setSelectedWorkshop(ws);
                    setBookingConfirmed(false);
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Đăng Ký Tham Gia</span>
                </Button>
              </div>

            </div>
          </motion.div>
        ))}
      </section>

      {/* Booking Form Modal */}
      {selectedWorkshop && (
        <Modal
          isOpen={!!selectedWorkshop}
          onClose={() => setSelectedWorkshop(null)}
          title={selectedWorkshop.title}
          subtitle="Đặt Chỗ Workshop Mùa Trăng"
          maxWidth="md"
        >
          {bookingConfirmed ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-pia-cream">
                Đăng Ký Thành Công!
              </h4>
              <p className="text-xs text-pia-muted leading-relaxed">
                Mã giữ chỗ <strong className="text-pia-gold">WS-{Date.now().toString().slice(-6)}</strong> đã được gửi qua SMS cho bạn ({bookingPhone}). Ban tổ chức sẽ liên hệ hướng dẫn trước ngày workshop.
              </p>
              <Button
                variant="gold"
                className="w-full justify-center mt-4"
                onClick={() => setSelectedWorkshop(null)}
              >
                <span>Hoàn Tất</span>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="text-xs text-pia-muted block mb-1">Họ và tên của bạn:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Minh Anh"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  className="w-full bg-pia-surface border border-pia-border rounded-xl px-4 py-2 text-sm text-pia-cream focus:outline-none focus:border-pia-gold"
                />
              </div>

              <div>
                <label className="text-xs text-pia-muted block mb-1">Số điện thoại nhận vé SMS:</label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  className="w-full bg-pia-surface border border-pia-border rounded-xl px-4 py-2 text-sm text-pia-cream focus:outline-none focus:border-pia-gold"
                />
              </div>

              <div>
                <label className="text-xs text-pia-muted block mb-1">Số người tham dự:</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendeeCount(Math.max(1, attendeeCount - 1))}
                    className="w-9 h-9 rounded-xl bg-pia-surface border border-pia-border text-pia-cream font-bold hover:border-pia-gold"
                  >
                    -
                  </button>
                  <span className="font-bold text-pia-gold px-2">{attendeeCount} Người</span>
                  <button
                    type="button"
                    onClick={() => setAttendeeCount(Math.min(5, attendeeCount + 1))}
                    className="w-9 h-9 rounded-xl bg-pia-surface border border-pia-border text-pia-cream font-bold hover:border-pia-gold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-pia-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-pia-muted block">Tổng học phí:</span>
                  <span className="font-serif text-xl font-bold text-pia-gold">
                    {formatVND(selectedWorkshop.price * attendeeCount)}
                  </span>
                </div>
                <Button variant="gold" size="md" type="submit">
                  <Send className="w-4 h-4 mr-1.5" />
                  <span>Xác Nhận Giữ Chỗ</span>
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
