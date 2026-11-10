import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Layers, Sparkles, ShieldCheck, Heart, ArrowRight, Award, Compass, Microscope } from 'lucide-react';
import { PageRoute } from '@/types';
import { BRAND_STORY, LAB_STEPS } from '@/assets/data/stories';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

interface StoryPageProps {
  onNavigate: (route: PageRoute) => void;
}

export function StoryPage({ onNavigate }: StoryPageProps) {
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* ========================================================
          HERO HEADER
      ======================================================== */}
      <section className="relative py-16 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Badge variant="gold" className="mb-3">
            Di Sản & Tầm Nhìn
          </Badge>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-pia-cream mb-6 tracking-tight leading-[1.2]">
            Từ Lò Nướng Củi Vũng Thơm <br />
            <span className="gold-gradient-text">Đến Phòng Thí Nghiệm Đương Đại</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-base sm:text-lg text-pia-muted leading-relaxed font-light">
            Hơn một thế kỷ gìn giữ tinh hoa ẩm thực Nam Bộ. Chúng tôi không chỉ bảo tồn kỹ nghệ cán 18 lớp vỏ cổ truyền, mà còn đưa tư duy khoa học ẩm thực để kiến tạo chiếc bánh Pía nhẹ êm, thanh thoát và tốt cho sức khỏe mùa Tết Trung Thu.
          </p>
        </Reveal>
      </section>

      {/* ========================================================
          INTERACTIVE TIMELINE CHAPTERS
      ======================================================== */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chapter Selector Tabs (Left) */}
          <div className="lg:col-span-4 space-y-3 sticky top-28">
            <p className="text-xs font-semibold text-pia-gold uppercase tracking-widest mb-2 px-2">
              Các Cột Mốc Phát Triển
            </p>
            {BRAND_STORY.map((chapter, idx) => {
              const isSelected = activeChapter === idx;
              return (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-pia-surface border-pia-gold shadow-lg shadow-pia-gold/20'
                      : 'bg-pia-charcoal/40 border-pia-border hover:border-pia-gold/40'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pia-gold/20 text-pia-gold border border-pia-gold/30">
                      {chapter.year}
                    </span>
                    <h4 className={`font-serif text-sm font-bold mt-1.5 ${isSelected ? 'text-pia-goldLight' : 'text-pia-cream'}`}>
                      {chapter.title}
                    </h4>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-pia-gold translate-x-1' : 'text-pia-muted'}`} />
                </button>
              );
            })}
          </div>

          {/* Chapter Details (Right Display Panel) */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-10 rounded-3xl glass-panel-gold border border-pia-gold/30 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-pia-border/60 pb-4">
                <span className="text-xs font-bold text-pia-gold tracking-widest uppercase">
                  Chương {activeChapter + 1} • {BRAND_STORY[activeChapter].year}
                </span>
                {BRAND_STORY[activeChapter].stats && (
                  <div className="text-right">
                    <span className="font-serif text-2xl font-black text-pia-gold block">
                      {BRAND_STORY[activeChapter].stats?.value}
                    </span>
                    <span className="text-[10px] text-pia-muted uppercase tracking-wider">
                      {BRAND_STORY[activeChapter].stats?.label}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pia-cream mb-2">
                  {BRAND_STORY[activeChapter].title}
                </h3>
                <p className="text-sm font-medium text-pia-goldLight/90 italic mb-4">
                  "{BRAND_STORY[activeChapter].subtitle}"
                </p>
                <p className="text-sm sm:text-base text-pia-cream/90 leading-relaxed font-light">
                  {BRAND_STORY[activeChapter].content}
                </p>
              </div>

              {BRAND_STORY[activeChapter].quote && (
                <div className="p-4 rounded-2xl bg-pia-surface/90 border-l-4 border-pia-gold italic text-xs sm:text-sm text-pia-cream/90">
                  {BRAND_STORY[activeChapter].quote}
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ========================================================
          6-STEP CULINARY LAB PROCESS
      ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="jade" className="mb-3">
            Quy Chuẩn Chế Tác
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pia-cream mb-4">
            6 Bước Kiểm Soát Chuẩn Phòng Lab
          </h2>
          <p className="text-sm text-pia-muted leading-relaxed">
            Mỗi mẻ bánh ra đời đều trải qua sự giám sát nghiêm ngặt từ khâu đo độ brix của sầu riêng chín đến vi tầng bột xốp khi ra lò.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_STEPS.map((item, idx) => (
            <Reveal key={item.step} delay={idx * 0.1}>
              <div className="p-6 rounded-3xl glass-panel border border-pia-border hover:border-pia-gold/40 transition-all duration-300 group h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif font-black text-2xl text-pia-gold/80 group-hover:text-pia-gold transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-pia-surface flex items-center justify-center border border-pia-border text-pia-gold">
                      {idx === 0 && <Compass className="w-5 h-5" />}
                      {idx === 1 && <Flame className="w-5 h-5" />}
                      {idx === 2 && <Layers className="w-5 h-5" />}
                      {idx === 3 && <Sparkles className="w-5 h-5" />}
                      {idx === 4 && <Award className="w-5 h-5" />}
                      {idx === 5 && <Microscope className="w-5 h-5" />}
                    </div>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-pia-cream mb-2 group-hover:text-pia-gold transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-pia-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-pia-border/40 text-[11px] text-pia-goldLight/70 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Đảm bảo vệ sinh an toàn thực phẩm 100%</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================================================
          TEAM CALLOUT & WORKSHOP CTA
      ======================================================== */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-gold border border-pia-gold/40 text-center space-y-6">
          <Badge variant="crimson">Đồng Sáng Lập & Nghệ Nhân</Badge>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-pia-cream">
            Bàn Tay Nghệ Nhân & Tư Duy Nhà Khoa Học
          </h3>
          <p className="text-sm sm:text-base text-pia-muted max-w-2xl mx-auto leading-relaxed font-light">
            Chúng tôi tin rằng ẩm thực truyền thống không phải là thứ để đóng khung trong bảo tàng, mà là nguồn cảm hứng sống động để tiếp tục phát triển cùng thế hệ trẻ.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="gold"
              size="lg"
              magnetic
              onClick={() => onNavigate('diy-lab')}
            >
              <span>Trải Nghiệm Phối Bánh 3D Trong Lab</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('workshop')}
            >
              <span>Tham Gia Workshop Cuối Tuần</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
