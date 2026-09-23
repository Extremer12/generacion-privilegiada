import React, { useState } from 'react';
import {
  X,
  Trophy,
  Heart,
  Users,
  BookOpen,
  Tv,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Check,
  Save,
  ShieldCheck
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Host, RankingUser, SupportGoal } from '../../types';

type AdminTab = 'ranking' | 'funding' | 'hosts' | 'about' | 'broadcast';

export const AdminPanelModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    hosts,
    ranking,
    goals,
    funding,
    about,
    latestBroadcast,
    updateHosts,
    updateRanking,
    updateGoals,
    updateFunding,
    updateAbout,
    updateLatestBroadcast,
    resetAllToDefaults,
  } = useAdmin();

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

  // --- TAB 4: About State ---
  const [aboutForm, setAboutForm] = useState(about);

  // --- TAB 5: Broadcast State ---
  const [broadcastForm, setBroadcastForm] = useState(latestBroadcast);

  if (!isAdminOpen) return null;

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
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
    // re-rank
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

  // --- Broadcast handlers ---
  const handleSaveBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = broadcastForm.youtubeId.trim();
    const autoThumb = cleanId
      ? `https://i.ytimg.com/vi/${cleanId}/hqdefault.jpg`
      : broadcastForm.thumbnail;
    const finalData = { ...broadcastForm, youtubeId: cleanId, thumbnail: autoThumb };
    setBroadcastForm(finalData);
    updateLatestBroadcast(finalData);
    triggerToast();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-hidden">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[880px] bg-[#0C121B] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#070A0F] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9A45C]/15 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-akira text-sm sm:text-base font-black text-white tracking-wider uppercase">
                  PANEL ADMINISTRATIVO GP
                </h3>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#C9A45C] text-[#070A0F] uppercase">
                  EN VIVO
                </span>
              </div>
              <p className="text-[11px] text-[#AEB6C2]">
                Configurá el ranking, donaciones, equipo, manifiesto y programa destacado.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold animate-fade-in">
                <Check className="w-3.5 h-3.5" />
                ¡Cambios Guardados!
              </span>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/20 text-[#AEB6C2] hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.06] bg-[#0A0E15] overflow-x-auto flex-shrink-0">
          {[
            { id: 'ranking', label: 'RANKING', icon: Trophy },
            { id: 'funding', label: 'DONACIONES & METAS', icon: Heart },
            { id: 'hosts', label: 'EQUIPO & CONDUCTORES', icon: Users },
            { id: 'about', label: 'NOSOTROS & MANIFIESTO', icon: BookOpen },
            { id: 'broadcast', label: 'ÚLTIMO PROGRAMA', icon: Tv },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 ${
                  active
                    ? 'bg-[#C9A45C] text-[#070A0F] shadow-[0_0_15px_rgba(201,164,92,0.3)]'
                    : 'text-[#AEB6C2] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: RANKING */}
          {activeTab === 'ranking' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/[0.06]">
                <div>
                  <h4 className="font-akira text-base text-white">GESTIONAR RANKING 2026</h4>
                  <p className="text-xs text-[#AEB6C2]">
                    Modificá los puntajes, agregá nuevos miembros de la comunidad o reordená las posiciones.
                  </p>
                </div>
              </div>

              {/* Form Add / Edit */}
              <form onSubmit={handleSaveRankUser} className="p-4 rounded-2xl bg-[#111A25]/60 border border-white/[0.08] flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[180px]">
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Nombre / Usuario</label>
                  <input
                    type="text"
                    value={newRankName}
                    onChange={(e) => setNewRankName(e.target.value)}
                    placeholder="Ej. Sofi, Marcos, Lucas"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    required
                  />
                </div>

                <div className="w-36">
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Puntos</label>
                  <input
                    type="number"
                    value={newRankPoints}
                    onChange={(e) => setNewRankPoints(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    required
                  />
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Avatar (URL o Ruta)</label>
                  <input
                    type="text"
                    value={newRankAvatar}
                    onChange={(e) => setNewRankAvatar(e.target.value)}
                    placeholder="/images/host-sofi.jpg o URL web"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase transition-colors"
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
                      className="px-3 py-2 rounded-xl bg-white/[0.06] text-xs text-[#AEB6C2] hover:text-white"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>

              {/* List */}
              <div className="space-y-2.5">
                {ranking.map((user) => (
                  <div
                    key={user.rank}
                    className="p-3 rounded-xl bg-[#0E1520] border border-white/[0.06] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-akira text-xs font-bold ${
                        user.rank === 1 ? 'bg-[#C9A45C] text-[#070A0F]' : 'bg-white/[0.08] text-white'
                      }`}>
                        #{user.rank}
                      </span>
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                      <div>
                        <span className="font-bold text-sm text-white block">{user.name}</span>
                        <span className="text-[11px] text-[#C9A45C] font-mono">{user.points.toLocaleString()} pts</span>
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
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteRankUser(user.rank)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DONACIONES & METAS */}
          {activeTab === 'funding' && (
            <div className="space-y-8">
              <div>
                <h4 className="font-akira text-base text-white">RECAUDACIÓN & METAS DE COMUNIDAD</h4>
                <p className="text-xs text-[#AEB6C2]">
                  Ajustá los montos recaudados, la meta financiera y las prioridades de equipamiento.
                </p>
              </div>

              {/* Funding Amounts Form */}
              <form onSubmit={handleSaveFunding} className="p-5 rounded-2xl bg-[#111A25]/60 border border-white/[0.08] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Monto Actual Recaudado ($ ARS)</label>
                    <input
                      type="number"
                      value={currFund}
                      onChange={(e) => setCurrFund(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#C9A45C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Monto Meta Objetivo ($ ARS)</label>
                    <input
                      type="number"
                      value={targFund}
                      onChange={(e) => setTargFund(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#C9A45C]"
                      required
                    />
                  </div>
                </div>

                {/* Progress bar preview */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-[#AEB6C2] mb-1.5 font-mono">
                    <span>Avance en vivo: {Math.round((currFund / (targFund || 1)) * 100)}%</span>
                    <span>${currFund.toLocaleString('es-AR')} de ${targFund.toLocaleString('es-AR')}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-[#C9A45C] to-[#E4C77A] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((currFund / (targFund || 1)) * 100))}%` }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Montos</span>
                </button>
              </form>

              {/* Equipment Goals Section */}
              <div className="space-y-4">
                <h5 className="font-akira text-xs text-[#C9A45C] uppercase tracking-wider">
                  METAS DE EQUIPAMIENTO & PRODUCCIÓN ({goals.length})
                </h5>

                {/* Add Goal */}
                <form onSubmit={handleAddGoal} className="p-4 rounded-2xl bg-[#0E1520] border border-white/[0.06] flex flex-wrap gap-4 items-end">
                  <div className="w-48">
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1">Título de la Meta</label>
                    <input
                      type="text"
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      placeholder="Ej. Audio Consola, Cámaras"
                      className="w-full px-3 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                      required
                    />
                  </div>
                  <div className="flex-1 min-w-[220px]">
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1">Descripción / Justificación</label>
                    <input
                      type="text"
                      value={newGoalDesc}
                      onChange={(e) => setNewGoalDesc(e.target.value)}
                      placeholder="Para mejorar la calidad de sonido en vivo..."
                      className="w-full px-3 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs uppercase"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Añadir Meta</span>
                  </button>
                </form>

                {/* Goals List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goals.map((g, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#111A25]/50 border border-white/[0.05] flex items-start justify-between gap-3">
                      <div>
                        <span className="font-bold text-xs text-white uppercase block mb-1">{g.title}</span>
                        <p className="text-[11px] text-[#AEB6C2] leading-relaxed">{g.description}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteGoal(idx)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Eliminar meta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EQUIPO / CONDUCTORES */}
          {activeTab === 'hosts' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-akira text-base text-white">EQUIPO DE TRABAJO & CONDUCTORES</h4>
                <p className="text-xs text-[#AEB6C2]">
                  Modificá a los integrantes del programa, sus fotos oficiales y redes sociales.
                </p>
              </div>

              {/* Host Form */}
              <form onSubmit={handleSaveHost} className="p-5 rounded-2xl bg-[#111A25]/60 border border-white/[0.08] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Nombre</label>
                    <input
                      type="text"
                      value={newHostName}
                      onChange={(e) => setNewHostName(e.target.value)}
                      placeholder="Ej. CRISTIAN, VICTORIA"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
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
                      className="w-full px-3.5 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Foto (URL o Ruta Local)</label>
                    <input
                      type="text"
                      value={newHostImage}
                      onChange={(e) => setNewHostImage(e.target.value)}
                      placeholder="/images/host-cristian.jpg o URL"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Instagram URL</label>
                    <input
                      type="text"
                      value={newHostIg}
                      onChange={(e) => setNewHostIg(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">TikTok URL</label>
                    <input
                      type="text"
                      value={newHostTt}
                      onChange={(e) => setNewHostTt(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{editingHost ? 'Actualizar Integrante' : 'Agregar Integrante'}</span>
                  </button>
                  {editingHost && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingHost(null);
                        setNewHostName('');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.06] text-xs text-[#AEB6C2] hover:text-white"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>

              {/* Host Cards Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {hosts.map((host) => (
                  <div
                    key={host.id}
                    className="p-4 rounded-2xl bg-[#0E1520] border border-white/[0.06] flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/3.8] rounded-xl overflow-hidden mb-3 border border-white/10">
                      <img src={host.image} alt={host.name} className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
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
          )}

          {/* TAB 4: NOSOTROS & MANIFIESTO */}
          {activeTab === 'about' && (
            <form onSubmit={handleSaveAbout} className="space-y-6">
              <div>
                <h4 className="font-akira text-base text-white">CONTENIDO DE LA SECCIÓN "NOSOTROS"</h4>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Eslogan / Subtítulo</label>
                  <input
                    type="text"
                    value={aboutForm.manifestoSubtitle}
                    onChange={(e) => setAboutForm({ ...aboutForm, manifestoSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Descripción del Manifiesto</label>
                <textarea
                  rows={2}
                  value={aboutForm.manifestoDescription}
                  onChange={(e) => setAboutForm({ ...aboutForm, manifestoDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Texto: ¿Cómo Nació GP?</label>
                <textarea
                  rows={3}
                  value={aboutForm.storyDescription}
                  onChange={(e) => setAboutForm({ ...aboutForm, storyDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Sección Nosotros</span>
              </button>
            </form>
          )}

          {/* TAB 5: ÚLTIMO PROGRAMA DESTACADO */}
          {activeTab === 'broadcast' && (
            <form onSubmit={handleSaveBroadcast} className="space-y-6">
              <div>
                <h4 className="font-akira text-base text-white">CONFIGURACIÓN DEL ÚLTIMO PROGRAMA</h4>
                <p className="text-xs text-[#AEB6C2]">
                  Configurá el programa principal en la sección superior de la web con su video real de YouTube.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Título del Programa</label>
                  <input
                    type="text"
                    value={broadcastForm.title}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Etiqueta</label>
                  <input
                    type="text"
                    value={broadcastForm.tag}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, tag: e.target.value })}
                    placeholder="ÚLTIMA TRANSMISIÓN, EN VIVO"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Fecha / Horario</label>
                  <input
                    type="text"
                    value={broadcastForm.dateFormatted}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, dateFormatted: e.target.value })}
                    placeholder="Sábados • 19:30 hs"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Duración</label>
                  <input
                    type="text"
                    value={broadcastForm.duration}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, duration: e.target.value })}
                    placeholder="1:19:21"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">ID Video YouTube</label>
                  <input
                    type="text"
                    value={broadcastForm.youtubeId}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, youtubeId: e.target.value })}
                    placeholder="zwkn7POAC-Y"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">Descripción</label>
                <textarea
                  rows={3}
                  value={broadcastForm.description}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              {/* Thumbnail Preview */}
              <div className="p-4 rounded-2xl bg-[#0E1520] border border-white/[0.06] flex items-center gap-4">
                <div className="w-36 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                  <img
                    src={broadcastForm.youtubeId ? `https://i.ytimg.com/vi/${broadcastForm.youtubeId}/hqdefault.jpg` : broadcastForm.thumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-bold text-xs text-white block mb-1">Vista Previa de la Carátula</span>
                  <span className="text-[11px] text-[#AEB6C2] block">
                    Se genera automáticamente en base al ID de YouTube ({broadcastForm.youtubeId || 'sin ID'}).
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Último Programa</span>
              </button>
            </form>
          )}

        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/[0.08] bg-[#070A0F] flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('¿Deseas restablecer todos los datos del sitio a sus valores originales de fábrica?')) {
                resetAllToDefaults();
                triggerToast();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Todo a Valores de Fábrica</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="px-5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-bold text-white tracking-wider uppercase transition-colors"
          >
            Cerrar Panel
          </button>
        </div>

      </div>
    </div>
  );
};
