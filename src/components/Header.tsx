import React, { useState, useEffect } from 'react';
import { GpLogo } from './GpLogo';
import { Menu, X as CloseIcon, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const Header: React.FC = () => {
  const { setIsAdminOpen } = useAdmin();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'INICIO', href: '#inicio' },
    { id: 'programas', label: 'PROGRAMAS', href: '#ultimo-programa' },
    { id: 'ranking', label: 'RANKING', href: '#ranking' },
    { id: 'conductores', label: 'CONDUCTORES', href: '#conductores' },
    { id: 'patrocinadores', label: 'PATROCINADORES', href: '#patrocinadores' },
    { id: 'nosotros', label: 'NOSOTROS', href: '#nosotros' },
    { id: 'apoyanos', label: 'APÓYANOS', href: '#apoyanos' },
    { id: 'contacto', label: 'CONTACTO', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070A0F]/85 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#070A0F]/90 via-[#070A0F]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo Left */}
          <a href="#inicio" className="group flex items-center transition-opacity hover:opacity-90">
            <GpLogo size="sm" showText={true} />
          </a>

          {/* Desktop Nav Center */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wider font-medium text-[#AEB6C2]">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`relative py-1 transition-colors duration-200 hover:text-white uppercase ${
                    isActive ? 'text-[#C9A45C] font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A45C] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Admin Trigger */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#C9A45C]/15 border border-white/10 hover:border-[#C9A45C]/40 text-[#AEB6C2] hover:text-[#C9A45C] text-xs font-bold uppercase tracking-wider transition-all duration-200"
              title="Abrir Panel Administrativo (Ctrl+Shift+A)"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ADMIN</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-1.5 text-[#C9A45C]"
              title="Panel Admin"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#F4F5F7] p-1.5 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/[0.08] flex flex-col gap-3.5 pb-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm py-1 tracking-wider uppercase ${
                  activeNav === item.id ? 'text-[#C9A45C] font-semibold' : 'text-[#AEB6C2]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
