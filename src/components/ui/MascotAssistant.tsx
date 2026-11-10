import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles, ChevronRight } from 'lucide-react';
import { PageRoute } from '@/types';

interface MascotAssistantProps {
  currentRoute: PageRoute;
  onNavigate?: (route: PageRoute) => void;
}

const MESSAGES: Record<PageRoute, { text: string; actionText?: string; targetRoute?: PageRoute }> = {
  home: {
    text: 'Xin chào! Mình là Bé Pía 🔬. Bạn có thể kéo chuột xoay 360° chiếc bánh Pía 3D bên cạnh để khám phá lớp vỏ ngàn lớp nhé!',
    actionText: 'Tự phối bánh 3D ngay ➔',
    targetRoute: 'diy-lab',
  },
  story: {
    text: 'Bí mật của Pía Lab chính là kết hợp kỹ nghệ cán 18 lớp bột truyền thống Sóc Trăng với công thức giảm 40% đường!',
    actionText: 'Khám phá Menu bánh ➔',
    targetRoute: 'products',
  },
  products: {
    text: 'Mách nhỏ: Bạn bấm vào từng bánh để mở chế độ "Cắt Lớp 3D" ngắm dòng lava kim sa tuôn chảy nhé!',
    actionText: 'Thử nghiệm phòng Lab ➔',
    targetRoute: 'diy-lab',
  },
  'diy-lab': {
    text: 'Bạn đang ở Phòng Thí Nghiệm! Hãy chọn vỏ Than Tre hoặc Matcha, thêm lòng đỏ trứng muối và khắc mộc son độc bản!',
    actionText: 'Đặt vé Workshop làm bánh ➔',
    targetRoute: 'workshop',
  },
  workshop: {
    text: 'Workshop cuối tuần được nghệ nhân lão thành 38 năm kinh nghiệm trực tiếp hướng dẫn cán bột 18 lớp đó nha!',
    actionText: 'Xem giỏ hàng của bạn ➔',
    targetRoute: 'cart',
  },
  cart: {
    text: 'Đơn hàng của bạn sẽ được nướng mới mỗi sáng và giao hỏa tốc giữ trọn độ giòn xốp thơm lừng!',
  },
};

export function MascotAssistant({ currentRoute, onNavigate }: MascotAssistantProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState(MESSAGES[currentRoute]);

  useEffect(() => {
    setBubbleMessage(MESSAGES[currentRoute]);
    setIsOpen(true);
  }, [currentRoute]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Interactive Speech Bubble */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="pointer-events-auto max-w-[290px] mb-3 p-4 rounded-2xl glass-panel-gold relative shadow-2xl"
          >
            {/* Close / Dismiss */}
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute top-2.5 right-2.5 text-pia-muted hover:text-pia-cream p-1 rounded-full transition-colors"
              aria-label="Đóng hội thoại"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-pia-gold">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Bé Pía Lab Assistant</span>
            </div>

            <p className="text-xs text-pia-cream/90 leading-relaxed">
              {bubbleMessage.text}
            </p>

            {bubbleMessage.actionText && bubbleMessage.targetRoute && (
              <button
                onClick={() => onNavigate?.(bubbleMessage.targetRoute!)}
                className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-pia-gold hover:text-pia-goldLight transition-colors underline underline-offset-4"
              >
                <span>{bubbleMessage.actionText}</span>
              </button>
            )}

            {/* Bubble Tail */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-pia-surface border-r border-b border-pia-gold/30 rotate-45 transform" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Avatar Figure */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="pointer-events-auto relative cursor-pointer group"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {/* Glow halo */}
        <div className="absolute inset-0 rounded-full bg-pia-gold/25 blur-lg group-hover:bg-pia-gold/40 transition-all duration-300 transform scale-110" />

        {/* Custom SVG Mascot "Bé Pía" */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#FFF2CC] to-[#F1C40F] border-2 border-pia-gold p-1 shadow-xl flex items-center justify-center overflow-visible">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Baker Toque / Chef Hat on top */}
            <g transform="translate(25, -12) scale(0.5)">
              <path
                d="M10,40 C10,20 20,5 50,5 C80,5 90,20 90,40 Z"
                fill="#FFFFFF"
                stroke="#D4AF37"
                strokeWidth="3"
              />
              <rect x="15" y="38" width="70" height="12" rx="4" fill="#F5EDE0" stroke="#D4AF37" strokeWidth="2" />
            </g>

            {/* Mascot Bánh Pía Round Body */}
            <circle cx="50" cy="50" r="42" fill="url(#piaGradient)" />

            {/* Traditional Forehead Seal "福" */}
            <circle cx="50" cy="22" r="8" fill="#C0392B" />
            <text x="50" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="serif">
              福
            </text>

            {/* Round Lab Glasses / Spectacles */}
            <g stroke="#1F150E" strokeWidth="3" fill="none">
              <circle cx="36" cy="48" r="12" fill="rgba(255,255,255,0.4)" />
              <circle cx="64" cy="48" r="12" fill="rgba(255,255,255,0.4)" />
              <line x1="48" y1="48" x2="52" y2="48" />
            </g>

            {/* Sparkly Happy Eyes behind glasses */}
            <ellipse cx="36" cy="47" rx="4" ry="5" fill="#1F150E" />
            <ellipse cx="64" cy="47" rx="4" ry="5" fill="#1F150E" />
            <circle cx="38" cy="45" r="1.5" fill="#FFFFFF" />
            <circle cx="66" cy="45" r="1.5" fill="#FFFFFF" />

            {/* Cheerful Smile */}
            <path d="M43,62 Q50,71 57,62" fill="none" stroke="#C0392B" strokeWidth="3" strokeLinecap="round" />

            {/* Rosy Cheeks */}
            <ellipse cx="26" cy="57" rx="5" ry="3" fill="#FF8A80" opacity="0.75" />
            <ellipse cx="74" cy="57" rx="5" ry="3" fill="#FF8A80" opacity="0.75" />

            {/* Definitions */}
            <defs>
              <radialGradient id="piaGradient" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#FFF3D6" />
                <stop offset="60%" stopColor="#F5B041" />
                <stop offset="100%" stopColor="#D68910" />
              </radialGradient>
            </defs>
          </svg>

          {/* Unread / Notification Ping */}
          {isMinimized && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pia-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-pia-gold text-pia-dark text-[9px] font-bold items-center justify-center">
                !
              </span>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
