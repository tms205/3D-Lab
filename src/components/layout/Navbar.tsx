import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Menu, X, Compass, Flame, Box, Calendar } from 'lucide-react';
import { PageRoute } from '@/types';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  cartCount: number;
}

export function Navbar({ currentRoute, onNavigate, cartCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { route: PageRoute; label: string; icon: typeof Compass; badge?: string }[] = [
    { route: 'home', label: 'Trang Chủ', icon: Compass },
    { route: 'story', label: 'Di Sản & Lab', icon: Flame },
    { route: 'products', label: 'Bộ Sưu Tập', icon: Box, badge: 'Mới' },
    { route: 'diy-lab', label: 'Pía Lab DIY 3D', icon: Sparkles, badge: 'HOT 3D' },
    { route: 'workshop', label: 'Workshop', icon: Calendar },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-pia-dark/85 backdrop-blur-md border-b border-pia-gold/20 shadow-2xl shadow-black/40'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pia-gold via-pia-goldLight to-pia-goldDark flex items-center justify-center p-0.5 shadow-lg shadow-pia-gold/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-pia-dark rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="font-serif font-black text-pia-gold text-lg group-hover:scale-110 transition-transform duration-300">
                  P
                </span>
                <span className="absolute bottom-0.5 right-0.5 text-[8px] text-pia-crimson font-bold">
                  福
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black tracking-wider text-lg text-pia-cream group-hover:text-pia-gold transition-colors">
                  PÍA LAB
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-pia-gold/20 text-pia-gold border border-pia-gold/30 font-semibold tracking-widest uppercase">
                  1920
                </span>
              </div>
              <p className="text-[10px] text-pia-muted tracking-wider uppercase font-medium">
                Nghệ Thuật Mùa Trăng
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-pia-charcoal/60 backdrop-blur-md border border-pia-gold/15 px-3 py-1.5 rounded-full shadow-inner">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-pia-dark bg-gradient-to-r from-pia-gold via-pia-goldLight to-pia-gold shadow-md shadow-pia-gold/30'
                      : 'text-pia-cream/80 hover:text-pia-gold hover:bg-pia-gold/10'
                  }`}
                >
                  <item.icon className={`w-3.5 h-3.5 ${isActive ? 'text-pia-dark' : 'text-pia-gold'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-pia-dark text-pia-gold'
                          : 'bg-pia-crimson/80 text-white animate-pulse'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2.5 rounded-full glass-panel hover:border-pia-gold text-pia-cream hover:text-pia-gold transition-all duration-300 active:scale-95"
              aria-label="Xem giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pia-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-pia-gold text-pia-dark text-[11px] font-black items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                </span>
              )}
            </button>

            {/* CTA Button: Đặt Hộp Quà */}
            <div className="hidden lg:block">
              <Button
                variant="gold"
                size="sm"
                magnetic
                onClick={() => onNavigate('products')}
              >
                <span>Khám Phá Menu</span>
              </Button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl glass-panel text-pia-cream hover:text-pia-gold transition-colors"
              aria-label="Mở menu di động"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-pia-charcoal/95 border-b border-pia-gold/20 backdrop-blur-xl px-4 pt-3 pb-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-2">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => {
                      onNavigate(item.route);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-pia-gold text-pia-dark'
                        : 'text-pia-cream hover:bg-pia-gold/10 hover:text-pia-gold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-pia-crimson text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 mt-2 border-t border-pia-border">
                <Button
                  variant="gold"
                  className="w-full justify-center"
                  onClick={() => {
                    onNavigate('diy-lab');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>Trải Nghiệm Pía Lab 3D</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
