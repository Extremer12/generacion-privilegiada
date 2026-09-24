import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Heart,
  Users,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Check,
  Save,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  LogOut,
  AlertCircle,
  Upload,
  Camera
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { GpLogo } from '../GpLogo';
import { Host, RankingUser, SupportGoal } from '../../types';

type AdminTab = 'ranking' | 'funding' | 'hosts' | 'about';

const ADMIN_PASSWORD = '44674778Multimedia';
const AUTH_SESSION_KEY = 'gp_admin_auth_authenticated';

interface AdminPageProps {
  onBackToSite: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToSite }) => {
  const {
    hosts,
    ranking,
    goals,
    funding,
    about,
    updateHosts,
    updateRanking,
    updateGoals,
    updateFunding,
    updateAbout,
    resetAllToDefaults,
  } = useAdmin();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Dashboard Tab & Toast
  const [activeTab, setActiveTab] = useState<AdminTab>('ranking');
  const [saveToast, setSaveToast] = useState(false);

  // --- TAB 1: Ranking State ---
  const [editingRankUser, setEditingRankUser] = useState<RankingUser | null>(null);
  const [newRankName, setNewRankName] = useState('');
  const [newRankPoints, setNewRankPoints] = useState(1500);
  const [newRankAvatar, setNewRankAvatar] = useState('/images/host-sofi.jpg');

  // --- TAB 2: Funding State ---
  const [currFund, setCurrFund] = useState(funding.current);
  const [targFund, setTargFund] = useState(funding.target);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');

  // --- TAB 3: Hosts State ---
  const [editingHost, setEditingHost] = useState<Host | null>(null);
  const [newHostName, setNewHostName] = useState('');
  const [newHostRole, setNewHostRole] = useState('CONDUCTOR');
  const [newHostImage, setNewHostImage] = useState('/images/host-cristian.jpg');
  const [newHostIg, setNewHostIg] = useState('https://instagram.com/generacionprivilegiada1');
  const [newHostTt, setNewHostTt] = useState('https://tiktok.com/@generacionprivilegiada');
  const hostFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleHostImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const maxDim = 800;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setNewHostImage(compressedDataUrl);
        } else {
          setNewHostImage(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // --- TAB 4: About State ---
  const [aboutForm, setAboutForm] = useState(about);

  useEffect(() => {
    setCurrFund(funding.current);
    setTargFund(funding.target);
  }, [funding]);

  useEffect(() => {
    setAboutForm(about);
  }, [about]);

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // --- Login Handler ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setPasswordInput('');
  };

  // --- Ranking handlers ---
  const handleSaveRankUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRankName.trim()) return;

    if (editingRankUser) {
      const updated = ranking.map((u) =>
        u.rank === editingRankUser.rank
          ? { ...u, name: newRankName, points: Number(newRankPoints), avatar: newRankAvatar }
          : u
      );
      updateRanking(updated);
      setEditingRankUser(null);
    } else {
      const nextRank = ranking.length + 1;
      const newUser: RankingUser = {
        rank: nextRank,
        name: newRankName,
        points: Number(newRankPoints),
        avatar: newRankAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      };
      updateRanking([...ranking, newUser]);
    }
    setNewRankName('');
    setNewRankPoints(1500);
    triggerToast();
  };

  const handleDeleteRankUser = (rank: number) => {
    const filtered = ranking.filter((u) => u.rank !== rank);
    const reRanked = filtered.map((u, i) => ({ ...u, rank: i + 1, highlight: i === 0 }));
    updateRanking(reRanked);
    triggerToast();
  };

  // --- Funding handlers ---
  const handleSaveFunding = (e: React.FormEvent) => {
    e.preventDefault();
    updateFunding(Number(currFund), Number(targFund));
    triggerToast();
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    const newGoal: SupportGoal = {
      title: newGoalTitle,
      iconName: 'Sparkles',
      description: newGoalDesc || 'Meta prioritaria para la comunidad.',
    };
    updateGoals([...goals, newGoal]);
    setNewGoalTitle('');
    setNewGoalDesc('');
    triggerToast();
  };

  const handleDeleteGoal = (idx: number) => {
    const updated = goals.filter((_, i) => i !== idx);
    updateGoals(updated);
    triggerToast();
  };

  // --- Hosts handlers ---
  const handleSaveHost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHostName.trim()) return;

    if (editingHost) {
      const updated = hosts.map((h) =>
        h.id === editingHost.id
          ? {
              ...h,
              name: newHostName.toUpperCase(),
              role: newHostRole.toUpperCase(),
              image: newHostImage,
              socials: { instagram: newHostIg, tiktok: newHostTt, youtube: 'https://youtube.com/@GeneracionPrivilegiada' }
            }
          : h
      );
      updateHosts(updated);
      setEditingHost(null);
    } else {
      const id = newHostName.toLowerCase().replace(/\s+/g, '-');
      const newH: Host = {
        id,
        name: newHostName.toUpperCase(),
        role: newHostRole.toUpperCase(),
        image: newHostImage || '/images/host-cristian.jpg',
        socials: {
          instagram: newHostIg,
          tiktok: newHostTt,
          youtube: 'https://youtube.com/@GeneracionPrivilegiada',
        }
      };
      updateHosts([...hosts, newH]);
    }
    setNewHostName('');
    setNewHostImage('/images/host-cristian.jpg');
    if (hostFileInputRef.current) hostFileInputRef.current.value = '';
    triggerToast();
  };

  const handleDeleteHost = (id: string) => {
    const updated = hosts.filter((h) => h.id !== id);
    updateHosts(updated);
    triggerToast();
  };

  // --- About handlers ---
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(aboutForm);
    triggerToast();
  };

  // ==========================================
  // VIEW 1: PASSWORD LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#070A0F] text-[#F4F5F7] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A45C]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full z-10">
          <GpLogo size="sm" showText={true} />
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#AEB6C2] hover:text-[#C9A45C] tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VOLVER AL SITIO WEB</span>
          </button>
        </div>

        {/* Center Login Card */}
        <div className="max-w-md mx-auto w-full z-10 py-12">
          <div className="rounded-3xl border border-white/[0.1] bg-[#0C121B]/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-[#C9A45C]/15 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] mx-auto mb-6 shadow-[0_0_25px_rgba(201,164,92,0.2)]">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center mb-8">
              <span className="text-[10px] font-bold text-[#C9A45C] tracking-[0.25em] uppercase block mb-1">
                ACCESO RESTRINGIDO
              </span>
              <h1 className="font-akira text-xl font-black text-white uppercase tracking-wider mb-2">
                PANEL ADMINISTRATIVO
              </h1>
              <p className="text-xs text-[#AEB6C2] leading-relaxed">
                Ingresá la clave de acceso de Generación Privilegiada para gestionar el sitio.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-2">
                  Contraseña de Administrador
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError(false);
                    }}
                    placeholder="Ingresá la clave..."
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl bg-[#070A0F] border border-white/15 text-white text-sm focus:outline-none focus:border-[#C9A45C] pr-11 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#AEB6C2] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Contraseña incorrecta. Verificá tus credenciales.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(201,164,92,0.3)] hover:shadow-[0_0_25px_rgba(201,164,92,0.5)]"
              >
                INGRESAR AL PANEL
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-[#AEB6C2]/40 z-10">
          © {new Date().getFullYear()} Generación Privilegiada • Portal de Gestión Interna
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: FULL-SCREEN ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen w-full bg-[#070A0F] text-[#F4F5F7] flex flex-col antialiased">
      
      {/* Top Admin Navbar */}
      <header className="border-b border-white/[0.08] bg-[#0A0E15]/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <GpLogo size="sm" showText={true} />
            <div className="hidden sm:block h-5 w-px bg-white/10" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-[#C9A45C] text-[#070A0F] uppercase tracking-wider">
                ADMIN
              </span>
              <span className="text-xs text-[#AEB6C2] font-semibold">
                Gestión en Tiempo Real
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold animate-fade-in">
                <Check className="w-3.5 h-3.5" />
                ¡Cambios Guardados!
              </span>
            )}

            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-white tracking-wider uppercase transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Web</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Layout Container */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 py-8 flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Navigation */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="rounded-2xl bg-[#0C121B] border border-white/[0.08] p-3 space-y-1.5 sticky top-24">
            <span className="px-3 py-2 block text-[10px] font-bold text-[#AEB6C2]/60 uppercase tracking-widest">
              Módulos de Configuración
            </span>

            {[
              { id: 'ranking', label: 'RANKING 2026', icon: Trophy, count: ranking.length },
              { id: 'funding', label: 'DONACIONES & METAS', icon: Heart, count: goals.length },
              { id: 'hosts', label: 'EQUIPO & CONDUCTORES', icon: Users, count: hosts.length },
              { id: 'about', label: 'NOSOTROS & MANIFIESTO', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? 'bg-[#C9A45C] text-[#070A0F] shadow-[0_0_20px_rgba(201,164,92,0.35)]'
                      : 'text-[#AEB6C2] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      active ? 'bg-[#070A0F] text-[#C9A45C]' : 'bg-white/[0.06] text-[#AEB6C2]'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-white/[0.06] px-2">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('¿Deseas restablecer todos los datos del sitio a sus valores originales de fábrica?')) {
                    resetAllToDefaults();
                    triggerToast();
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs text-red-400 hover:bg-red-500/10 font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer Valores Iniciales</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Right Dashboard Content */}
        <main className="flex-1 min-w-0">
          
          {/* TAB 1: RANKING 2026 */}
          {activeTab === 'ranking' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#0C121B] border border-white/[0.08]">
                <div className="mb-6">
                  <h2 className="font-akira text-lg text-white">GESTIONAR RANKING COMUNITARIO 2026</h2>
                  <p className="text-xs text-[#AEB6C2]">
                    Los cambios se reflejan en tiempo real en la página principal y en el modal de ranking.
                  </p>
                </div>

                {/* Form Add / Edit */}
                <form onSubmit={handleSaveRankUser} className="p-5 rounded-2xl bg-[#111A25]/70 border border-white/[0.08] flex flex-wrap gap-4 items-end mb-6">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Nombre / Usuario</label>
                    <input
                      type="text"
                      value={newRankName}
                      onChange={(e) => setNewRankName(e.target.value)}
                      placeholder="Ej. Sofi, Marcos, Lucas"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                      required
                    />
                  </div>

                  <div className="w-36">
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Puntos</label>
                    <input
                      type="number"
                      value={newRankPoints}
                      onChange={(e) => setNewRankPoints(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                      required
                    />
                  </div>

                  <div className="flex-1 min-w-[220px]">
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Avatar (URL o Ruta Local)</label>
                    <input
                      type="text"
                      value={newRankAvatar}
                      onChange={(e) => setNewRankAvatar(e.target.value)}
                      placeholder="/images/host-sofi.jpg o URL"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase transition-colors shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{editingRankUser ? 'Actualizar' : 'Agregar'}</span>
                    </button>
                    {editingRankUser && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingRankUser(null);
                          setNewRankName('');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-white/[0.06] text-xs text-[#AEB6C2] hover:text-white"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>

                {/* Ranking List */}
                <div className="space-y-3">
                  {ranking.map((user) => (
                    <div
                      key={user.rank}
                      className="p-4 rounded-xl bg-[#0E1520] border border-white/[0.06] flex items-center justify-between gap-4 transition-all hover:border-white/15"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-akira text-xs font-black ${
                          user.rank === 1 ? 'bg-[#C9A45C] text-[#070A0F]' : 'bg-white/[0.08] text-white'
                        }`}>
                          #{user.rank}
                        </span>
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                        <div>
                          <span className="font-bold text-sm text-white block">{user.name}</span>
                          <span className="text-[11px] text-[#C9A45C] font-mono">{user.points.toLocaleString()} puntos</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingRankUser(user);
                            setNewRankName(user.name);
                            setNewRankPoints(user.points);
                            setNewRankAvatar(user.avatar);
                          }}
                          className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-[#AEB6C2] hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRankUser(user.rank)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: DONACIONES & METAS */}
          {activeTab === 'funding' && (
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-[#0C121B] border border-white/[0.08] space-y-6">
                <div>
                  <h2 className="font-akira text-lg text-white">RECAUDACIÓN & METAS DE FINANCIAMIENTO</h2>
                  <p className="text-xs text-[#AEB6C2]">
                    Ajustá los montos recaudados y los objetivos prioritarios de equipamiento.
                  </p>
                </div>

                {/* Amounts Form */}
                <form onSubmit={handleSaveFunding} className="p-5 rounded-2xl bg-[#111A25]/70 border border-white/[0.08] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Monto Actual Recaudado ($ ARS)</label>
                      <input
                        type="number"
                        value={currFund}
                        onChange={(e) => setCurrFund(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-[#070A0F] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#C9A45C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Monto Meta Objetivo ($ ARS)</label>
                      <input
                        type="number"
                        value={targFund}
                        onChange={(e) => setTargFund(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-[#070A0F] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#C9A45C]"
                        required
                      />
                    </div>
                  </div>

                  {/* Progress Bar Preview */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-[#AEB6C2] mb-1.5 font-mono">
                      <span>Avance en vivo: {Math.round((currFund / (targFund || 1)) * 100)}%</span>
                      <span>${currFund.toLocaleString('es-AR')} de ${targFund.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-black/60 overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#C9A45C] to-[#E4C77A] rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.round((currFund / (targFund || 1)) * 100))}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase transition-colors shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Montos</span>
                  </button>
                </form>

                {/* Goals */}
                <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                  <h3 className="font-akira text-xs text-[#C9A45C] uppercase tracking-wider">
                    METAS DE EQUIPAMIENTO & PRODUCCIÓN ({goals.length})
                  </h3>

                  {/* Add Goal */}
                  <form onSubmit={handleAddGoal} className="p-4 rounded-2xl bg-[#0E1520] border border-white/[0.06] flex flex-wrap gap-4 items-end">
                    <div className="w-48">
                      <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1">Título de la Meta</label>
                      <input
                        type="text"
                        value={newGoalTitle}
                        onChange={(e) => setNewGoalTitle(e.target.value)}
                        placeholder="Ej. Cámaras 4K, Consola"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                        required
                      />
                    </div>
                    <div className="flex-1 min-w-[240px]">
                      <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1">Descripción / Justificación</label>
                      <input
                        type="text"
                        value={newGoalDesc}
                        onChange={(e) => setNewGoalDesc(e.target.value)}
                        placeholder="Para mejorar la calidad de sonido en vivo..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs uppercase transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>Añadir Meta</span>
                    </button>
                  </form>

                  {/* Goals Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {goals.map((g, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#111A25]/50 border border-white/[0.05] flex items-start justify-between gap-3">
                        <div>
                          <span className="font-bold text-xs text-white uppercase block mb-1">{g.title}</span>
                          <p className="text-xs text-[#AEB6C2] leading-relaxed">{g.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteGoal(idx)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Eliminar meta"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: EQUIPO / CONDUCTORES */}
          {activeTab === 'hosts' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#0C121B] border border-white/[0.08] space-y-6">
                <div>
                  <h2 className="font-akira text-lg text-white">EQUIPO DE TRABAJO & CONDUCTORES</h2>
                  <p className="text-xs text-[#AEB6C2]">
                    Gestioná a los conductores del programa, sus fotos y redes sociales.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSaveHost} className="p-5 rounded-2xl bg-[#111A25]/70 border border-white/[0.08] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Nombre</label>
                      <input
                        type="text"
                        value={newHostName}
                        onChange={(e) => setNewHostName(e.target.value)}
                        placeholder="Ej. CRISTIAN, VICTORIA"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Rol en el Programa</label>
                      <input
                        type="text"
                        value={newHostRole}
                        onChange={(e) => setNewHostRole(e.target.value)}
                        placeholder="CONDUCTOR, CO-CONDUCTORA"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">
                        Foto (Subir desde Celular o PC)
                      </label>
                      <input
                        type="file"
                        ref={hostFileInputRef}
                        accept="image/*"
                        onChange={handleHostImageUpload}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2.5">
                        {newHostImage ? (
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#C9A45C]/40 flex-shrink-0 bg-black/40 shadow-inner">
                            <img src={newHostImage} alt="Preview" className="w-full h-full object-cover object-top" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl border border-dashed border-white/20 flex items-center justify-center text-[#AEB6C2]/50 flex-shrink-0 bg-black/20">
                            <Camera className="w-4 h-4" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => hostFileInputRef.current?.click()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-white text-xs font-semibold transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#C9A45C]" />
                          <span className="truncate">{newHostImage ? 'Cambiar Foto' : 'Subir Archivo'}</span>
                        </button>
                        {newHostImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setNewHostImage('');
                              if (hostFileInputRef.current) hostFileInputRef.current.value = '';
                            }}
                            className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Quitar imagen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Instagram URL</label>
                      <input
                        type="text"
                        value={newHostIg}
                        onChange={(e) => setNewHostIg(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">TikTok URL</label>
                      <input
                        type="text"
                        value={newHostTt}
                        onChange={(e) => setNewHostTt(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase transition-colors shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingHost ? 'Actualizar Integrante' : 'Agregar Integrante'}</span>
                    </button>
                    {editingHost && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingHost(null);
                          setNewHostName('');
                          setNewHostImage('/images/host-cristian.jpg');
                          if (hostFileInputRef.current) hostFileInputRef.current.value = '';
                        }}
                        className="px-4 py-2.5 rounded-xl bg-white/[0.06] text-xs text-[#AEB6C2] hover:text-white"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>

                {/* Hosts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {hosts.map((host) => (
                    <div
                      key={host.id}
                      className="p-4 rounded-2xl bg-[#0E1520] border border-white/[0.06] flex flex-col justify-between"
                    >
                      <div className="relative aspect-[3/3.8] rounded-xl overflow-hidden mb-3 border border-white/10">
                        <img src={host.image} alt={host.name} className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5">
                          <span className="font-akira text-sm font-bold text-white block">{host.name}</span>
                          <span className="text-[10px] text-[#C9A45C] font-semibold tracking-wider uppercase block">{host.role}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                        <span className="text-[10px] text-[#AEB6C2] truncate max-w-[120px]">
                          {host.socials?.instagram ? '@instagram' : 'Sin redes'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingHost(host);
                              setNewHostName(host.name);
                              setNewHostRole(host.role);
                              setNewHostImage(host.image);
                              setNewHostIg(host.socials?.instagram || '');
                              setNewHostTt(host.socials?.tiktok || '');
                            }}
                            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-[#AEB6C2] hover:text-white"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteHost(host.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: NOSOTROS & MANIFIESTO */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveAbout} className="p-6 rounded-2xl bg-[#0C121B] border border-white/[0.08] space-y-6">
                <div>
                  <h2 className="font-akira text-lg text-white">CONTENIDO DE LA SECCIÓN "NOSOTROS"</h2>
                  <p className="text-xs text-[#AEB6C2]">
                    Modificá el manifiesto, los valores y el relato del nacimiento de Generación Privilegiada.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Etiqueta Superior</label>
                    <input
                      type="text"
                      value={aboutForm.badge}
                      onChange={(e) => setAboutForm({ ...aboutForm, badge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Eslogan / Subtítulo</label>
                    <input
                      type="text"
                      value={aboutForm.manifestoSubtitle}
                      onChange={(e) => setAboutForm({ ...aboutForm, manifestoSubtitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Descripción del Manifiesto</label>
                  <textarea
                    rows={2}
                    value={aboutForm.manifestoDescription}
                    onChange={(e) => setAboutForm({ ...aboutForm, manifestoDescription: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Texto: ¿Cómo Nació GP?</label>
                  <textarea
                    rows={3}
                    value={aboutForm.storyDescription}
                    onChange={(e) => setAboutForm({ ...aboutForm, storyDescription: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0E1520] border border-white/[0.06] space-y-2">
                    <span className="text-[11px] font-bold text-[#C9A45C] uppercase block">Pilar 1</span>
                    <input
                      type="text"
                      value={aboutForm.pillar1Title}
                      onChange={(e) => setAboutForm({ ...aboutForm, pillar1Title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#070A0F] border border-white/10 text-white text-xs"
                    />
                    <textarea
                      rows={2}
                      value={aboutForm.pillar1Desc}
                      onChange={(e) => setAboutForm({ ...aboutForm, pillar1Desc: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#070A0F] border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#0E1520] border border-white/[0.06] space-y-2">
                    <span className="text-[11px] font-bold text-[#C9A45C] uppercase block">Pilar 2</span>
                    <input
                      type="text"
                      value={aboutForm.pillar2Title}
                      onChange={(e) => setAboutForm({ ...aboutForm, pillar2Title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#070A0F] border border-white/10 text-white text-xs"
                    />
                    <textarea
                      rows={2}
                      value={aboutForm.pillar2Desc}
                      onChange={(e) => setAboutForm({ ...aboutForm, pillar2Desc: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#070A0F] border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase transition-colors shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Sección Nosotros</span>
                </button>
              </form>
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
