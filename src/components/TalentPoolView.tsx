import React, { useState } from 'react';
import { TalentPoolCandidate } from '../types';
import { FORM_REQUEST_STAGES } from '../data/initialData';
import {
  Heart,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  UserCheck,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  MapPin,
  Building2,
  Check,
  Sparkle,
} from 'lucide-react';

interface TalentPoolViewProps {
  candidates: TalentPoolCandidate[];
  onUpdateCandidateStage: (candidateId: number, newStage: string) => void;
  onRemoveFromPipeline: (candidateId: number) => void;
  onToggleFavorite?: (candidateId: number) => void;
  onShowToast: (message: string) => void;
  onTriggerAIEvaluation?: (cand: TalentPoolCandidate) => void;
}

export const TalentPoolView: React.FC<TalentPoolViewProps> = ({
  candidates,
  onUpdateCandidateStage,
  onRemoveFromPipeline,
  onToggleFavorite,
  onShowToast,
  onTriggerAIEvaluation,
}) => {
  const [filterName, setFilterName] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterPos, setFilterPos] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'engineering' | 'operations' | 'hse' | 'fav'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recommended' | 'salary-low' | 'salary-high'>('recommended');

  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'Profil' | 'Proyek' | 'Pesan' | 'Feedback' | 'Lampiran' | 'Aktivitas'>('Profil');
  const [pipelineSelectStage, setPipelineSelectStage] = useState<string>('');
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);

  // Filter candidates
  const filteredCandidates = candidates.filter((c) => {
    const matchName = !filterName || c.name.toLowerCase().includes(filterName.toLowerCase());
    const matchDept = !filterDept || c.org.toLowerCase().includes(filterDept.toLowerCase());
    const matchPos = !filterPos || c.role.toLowerCase().includes(filterPos.toLowerCase());

    let matchCategory = true;
    if (categoryFilter === 'fav') matchCategory = c.isFavorite;
    else if (categoryFilter === 'engineering') matchCategory = c.role.toLowerCase().includes('engineer') || c.role.toLowerCase().includes('process');
    else if (categoryFilter === 'operations') matchCategory = c.role.toLowerCase().includes('operator') || c.role.toLowerCase().includes('supervisor') || c.role.toLowerCase().includes('manager');
    else if (categoryFilter === 'hse') matchCategory = c.role.toLowerCase().includes('hse') || c.role.toLowerCase().includes('k3') || c.role.toLowerCase().includes('safety');

    return matchName && matchDept && matchPos && matchCategory;
  }).sort((a, b) => {
    if (sortBy === 'salary-low') {
      const rateA = parseInt(a.rate.replace(/\D/g, '')) || 0;
      const rateB = parseInt(b.rate.replace(/\D/g, '')) || 0;
      return rateA - rateB;
    }
    if (sortBy === 'salary-high') {
      const rateA = parseInt(a.rate.replace(/\D/g, '')) || 0;
      const rateB = parseInt(b.rate.replace(/\D/g, '')) || 0;
      return rateB - rateA;
    }
    return 0;
  });

  const activeCandidate = candidates.find((c) => c.id === activeModalId) || null;
  const currentIndex = candidates.findIndex((c) => c.id === activeModalId);

  const openModal = (id: number) => {
    setActiveModalId(id);
    const cand = candidates.find((c) => c.id === id);
    setPipelineSelectStage(cand?.stage && cand.stage !== '-' ? cand.stage : '');
    setCvPreviewOpen(false);
    setActiveTab('Profil');
  };

  const closeModal = () => {
    setActiveModalId(null);
    setCvPreviewOpen(false);
  };

  const stepModal = (dir: number) => {
    if (currentIndex === -1) return;
    const newIdx = (currentIndex + dir + candidates.length) % candidates.length;
    const newCand = candidates[newIdx];
    setActiveModalId(newCand.id);
    setPipelineSelectStage(newCand.stage && newCand.stage !== '-' ? newCand.stage : '');
    setCvPreviewOpen(false);
  };

  const handleSaveToPipeline = () => {
    if (!activeCandidate) return;
    if (!pipelineSelectStage) {
      alert('Silakan pilih tahap pipeline terlebih dahulu.');
      return;
    }
    onUpdateCandidateStage(activeCandidate.id, pipelineSelectStage);
    onShowToast(`✓ Berhasil dipindahkan ke tahap · ${pipelineSelectStage}`);
  };

  const handleRemoveFromPipeline = () => {
    if (!activeCandidate) return;
    onRemoveFromPipeline(activeCandidate.id);
    setPipelineSelectStage('');
    onShowToast('✓ Kandidat berhasil dihapus dari pipeline');
  };

  return (
    <div className="bg-[#FAF9F5] text-[#1A1A1A] rounded-2xl overflow-hidden border border-[#E6E4DC] font-sans animate-fade-in shadow-sm min-h-screen flex flex-col">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#111827] text-white px-6 py-4 border-b border-[#1F2937] gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0F6E56] text-white flex items-center justify-center font-black text-sm shadow-sm">
            KP
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight flex items-center gap-2">
              <span>Krisna Talenta Pool Catalogue</span>
              <span className="text-[10px] bg-white/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                Verified Candidates
              </span>
            </div>
            <div className="text-[11px] text-gray-400">
              Koleksi kandidat unggulan siap rekruitmen &amp; penempatan cepat
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            Total: <strong className="text-white">{filteredCandidates.length} Kandidat</strong>
          </span>
        </div>
      </div>

      {/* Filter & Toolbar Area */}
      <div className="p-5 sm:p-6 bg-white border-b border-[#E6E4DC] space-y-4">
        {/* Top Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Quick Search */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Cari nama kandidat, keahlian, atau lokasi..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F5] border border-[#E6E4DC] focus:border-[#0F6E56] focus:bg-white rounded-xl text-xs text-[#1A1A1A] outline-none transition-all shadow-2xs"
            />
            {filterName && (
              <button
                onClick={() => setFilterName('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Department & Position Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <input
                type="text"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                placeholder="Dept / Org..."
                className="w-36 px-3 py-2 bg-[#FAF9F5] border border-[#E6E4DC] focus:border-[#0F6E56] rounded-xl text-xs text-[#1A1A1A] outline-none"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                value={filterPos}
                onChange={(e) => setFilterPos(e.target.value)}
                placeholder="Posisi / Skill..."
                className="w-36 px-3 py-2 bg-[#FAF9F5] border border-[#E6E4DC] focus:border-[#0F6E56] rounded-xl text-xs text-[#1A1A1A] outline-none"
              />
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-[#FAF9F5] border border-[#E6E4DC] rounded-xl text-xs font-semibold text-[#1A1A1A] outline-none cursor-pointer hover:bg-gray-100"
            >
              <option value="recommended">Urutkan: Rekomendasi Utama</option>
              <option value="salary-low">Ekspektasi: Terendah ke Tertinggi</option>
              <option value="salary-high">Ekspektasi: Tertinggi ke Terendah</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#FAF9F5] border border-[#E6E4DC] rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-2xs text-[#111827] font-bold'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Tampilan Grid Katalog"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white shadow-2xs text-[#111827] font-bold'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Tampilan Baris Tabel"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills (Luxury E-Commerce Tag Navigation) */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-[#FAF9F5] text-[#525252] border border-[#E6E4DC] hover:border-[#111827]'
            }`}
          >
            Semua Kandidat ({candidates.length})
          </button>
          <button
            onClick={() => setCategoryFilter('engineering')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              categoryFilter === 'engineering'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-[#FAF9F5] text-[#525252] border border-[#E6E4DC] hover:border-[#111827]'
            }`}
          >
            Engineering &amp; Technical
          </button>
          <button
            onClick={() => setCategoryFilter('operations')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              categoryFilter === 'operations'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-[#FAF9F5] text-[#525252] border border-[#E6E4DC] hover:border-[#111827]'
            }`}
          >
            Operations &amp; Plant
          </button>
          <button
            onClick={() => setCategoryFilter('hse')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              categoryFilter === 'hse'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-[#FAF9F5] text-[#525252] border border-[#E6E4DC] hover:border-[#111827]'
            }`}
          >
            HSE &amp; K3 Ops
          </button>
          <button
            onClick={() => setCategoryFilter('fav')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              categoryFilter === 'fav'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-[#FAF9F5] text-rose-700 border border-rose-200 hover:border-rose-400'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Favorit ({candidates.filter(c => c.isFavorite).length})
          </button>
        </div>
      </div>

      {/* Main Showcase Viewport */}
      <div className="p-5 sm:p-7 flex-1 bg-[#FAF9F5]">
        {filteredCandidates.length === 0 ? (
          <div className="bg-white border border-[#E6E4DC] rounded-2xl p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <SlidersHorizontal className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#111827]">Kandidat Tidak Ditemukan</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Tidak ada kandidat yang memenuhi kriteria pencarian atau filter pilihan Anda.
            </p>
            <button
              onClick={() => {
                setFilterName('');
                setFilterDept('');
                setFilterPos('');
                setCategoryFilter('all');
              }}
              className="px-4 py-2 bg-[#111827] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View Mode - Directly Inspired by Luxury Boutique Reference Image */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCandidates.map((c) => {
              // Calculate match score for candidate suitability
              const matchScore = c.psychPassed ? 96 : 82;

              return (
                <div
                  key={c.id}
                  onClick={() => openModal(c.id)}
                  className="bg-white border border-[#E6E4DC] hover:border-[#111827] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-200 flex flex-col justify-between group relative"
                >
                  {/* Top Image Showcase Area */}
                  <div className="h-44 bg-[#F5F4EF] relative flex flex-col items-center justify-center p-4 border-b border-[#E6E4DC]/60 overflow-hidden">
                    {/* Top-Left Pill Badge (Pipeline Stage) */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      <span className="bg-white/95 backdrop-blur-xs text-[#111827] text-[10.5px] font-semibold px-2.5 py-1 rounded-md shadow-2xs border border-gray-200/80 tracking-tight">
                        {c.stage && c.stage !== '-' ? c.stage : 'Belum dalam Pipeline'}
                      </span>
                      {c.psychPassed && (
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200/60 inline-flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" /> Psikotes Lulus
                        </span>
                      )}
                    </div>

                    {/* Top-Right Favorite Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleFavorite) onToggleFavorite(c.id);
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-500 hover:text-rose-500 shadow-2xs transition-all cursor-pointer"
                      title={c.isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          c.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-500'
                        }`}
                      />
                    </button>

                    {/* Center Portrait Avatar Box */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#111827] to-[#1F2937] text-white flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                      {c.initials}
                    </div>

                    {/* Sub Badge overlay */}
                    <div className="mt-2 text-[10.5px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                      ID-{c.id.toString().padStart(4, '0')} &middot; {c.loc}
                    </div>
                  </div>

                  {/* Bottom Information Content Box */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Primary Candidate Name (Title like Philipp Plein / Jil Sander) */}
                      <h3 className="font-extrabold text-[#111827] text-sm group-hover:text-[#0F6E56] transition-colors truncate">
                        {c.name}
                      </h3>

                      {/* Subtitle / Role (like "3H 45mm" / "pegasus graphic T-shirt") */}
                      <p className="text-xs text-[#525252] font-medium truncate mt-0.5">
                        {c.role}
                      </p>

                      <div className="text-[11px] text-[#8C8C8C] font-medium flex items-center gap-1 truncate mt-1">
                        <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="truncate">{c.org}</span>
                      </div>
                    </div>

                    {/* Rate / Expectation & Match Score Row */}
                    <div className="pt-2 border-t border-[#F0EFEA] space-y-1.5">
                      {/* Rate formatting */}
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-[11px] text-gray-500 font-medium">Ekspektasi:</span>
                        <span className="text-sm font-extrabold text-[#111827] font-mono">
                          Rp {c.rate}
                          <span className="text-[10.5px] font-normal text-gray-500">/{c.unit}</span>
                        </span>
                      </div>

                      {/* Match Score & Pipeline Stage Tags */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                          {matchScore}% Match
                        </span>
                        {c.stage && c.stage !== '-' && (
                          <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                            {c.stage}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(c.id);
                        }}
                        className="w-full py-2 bg-[#111827] group-hover:bg-[#0F6E56] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <Sparkle className="w-3.5 h-3.5" /> Lihat Detail Profil
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Mode Option */
          <div className="bg-white border border-[#E6E4DC] rounded-xl overflow-hidden shadow-xs divide-y divide-[#E6E4DC]">
            {filteredCandidates.map((c) => (
              <div
                key={c.id}
                onClick={() => openModal(c.id)}
                className="p-4 hover:bg-[#FAF9F5] transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-[#111827] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-2xs">
                    {c.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm text-[#111827] group-hover:text-[#0F6E56] transition-colors truncate">
                        {c.name}
                      </h3>
                      {c.isFavorite && (
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 font-medium truncate mt-0.5">
                      {c.role} &middot; <span className="text-gray-400">{c.org}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          c.psychPassed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {c.psychPassed ? 'Psychological Test Passed' : 'Test Pending'}
                      </span>
                      <span className="text-[10.5px] text-gray-500 font-mono">
                        Stage: {c.stage && c.stage !== '-' ? c.stage : 'Belum dalam pipeline'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <div className="text-[11px] text-gray-500 font-medium">Ekspektasi Rate</div>
                    <div className="font-extrabold text-sm text-[#111827] font-mono">
                      Rp {c.rate}/{c.unit}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(c.id);
                    }}
                    className="px-3.5 py-2 bg-[#111827] group-hover:bg-[#0F6E56] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Detail &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal Overlay */}
      {activeCandidate && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in backdrop-blur-xs">
          <div className="bg-white w-full max-w-[1120px] h-[88vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-[#E6E4DC]">
            {/* Modal Top */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E6E4DC] bg-white shrink-0">
              <div className="font-extrabold text-sm text-[#111827] flex items-center gap-2">
                <span>Profil Katalog &mdash; {activeCandidate.role}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Terverifikasi HR
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <button
                  onClick={() => stepModal(-1)}
                  className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono">
                  {currentIndex + 1} dari {candidates.length}
                </span>
                <button
                  onClick={() => stepModal(1)}
                  className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-100 rounded text-lg font-bold cursor-pointer ml-2"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-hidden">
              {/* Main Column */}
              <div className="lg:col-span-8 overflow-y-auto p-5 sm:p-6 space-y-4">
                {/* Candidate Head */}
                <div className="flex gap-4">
                  <div className="w-[68px] h-[68px] rounded-2xl bg-[#111827] text-white flex items-center justify-center text-2xl font-extrabold shrink-0 shadow-md">
                    {activeCandidate.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-extrabold text-[#111827]">{activeCandidate.name}</span>
                      <span className="text-[11px] bg-amber-100 text-amber-900 border border-amber-300/60 px-2.5 py-0.5 rounded-full font-bold">
                        Special Talent
                      </span>
                    </div>
                    <div className="text-xs text-gray-700 font-medium my-1">{activeCandidate.tagline}</div>
                    <div className="text-[11.5px] text-gray-500 font-mono">
                      {activeCandidate.org} &middot; {activeCandidate.loc} &middot; Ekspektasi Rate: Rp {activeCandidate.rate}/{activeCandidate.unit}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 my-3">
                  <button
                    onClick={() => {
                      if (onTriggerAIEvaluation) onTriggerAIEvaluation(activeCandidate);
                    }}
                    className="px-4 py-2 bg-[#0F6E56] hover:bg-[#0C5744] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> AI Match Evaluation
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Tolak kandidat ${activeCandidate.name}?`)) {
                        onRemoveFromPipeline(activeCandidate.id);
                        onShowToast('Kandidat ditandai tidak memenuhi kualifikasi.');
                      }
                    }}
                    className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 cursor-pointer"
                  >
                    Tolak Candidate
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-5 border-b border-[#E6E4DC] text-xs text-gray-500 overflow-x-auto">
                  {(['Profil', 'Proyek', 'Pesan', 'Feedback', 'Lampiran', 'Aktivitas'] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2.5 font-medium whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                          activeTab === tab
                            ? 'border-[#0F6E56] text-[#111827] font-bold'
                            : 'border-transparent hover:text-[#111827]'
                        }`}
                      >
                        {tab}{' '}
                        {tab === 'Proyek' && `(${activeCandidate.projectsCount || 1})`}
                        {tab === 'Lampiran' && `(${activeCandidate.attachments.length})`}
                      </button>
                    )
                  )}
                </div>

                {/* Tab Content */}
                {activeTab === 'Profil' && (
                  <div className="space-y-4">
                    {/* Activity Block */}
                    <div className="border border-[#E6E4DC] rounded-xl p-4 bg-white">
                      <h4 className="text-xs font-bold text-[#111827] mb-3">Aktivitas Terbaru</h4>
                      <div className="space-y-2 divide-y divide-gray-100">
                        <div className="flex justify-between items-center text-xs pt-1">
                          <span className="text-gray-700">
                            Kandidat berada pada tahap{' '}
                            <b className="text-[#0F6E56]">
                              {activeCandidate.stage && activeCandidate.stage !== '-'
                                ? activeCandidate.stage
                                : 'Belum dalam pipeline'}
                            </b>
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">Hari ini</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-2">
                          <span className="text-gray-700">Dilihat oleh Tim Recruitment WBN</span>
                          <span className="text-[11px] text-gray-400 font-mono">27/06/2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights Block */}
                    <div className="border border-[#E6E4DC] rounded-xl p-4 bg-white">
                      <h4 className="text-xs font-bold text-[#111827] mb-1">
                        Sorotan Dokumen Pelamar
                      </h4>
                      <p className="text-xs text-gray-500 mb-3">
                        Melamar posisi {activeCandidate.role} ({activeCandidate.applied})
                      </p>

                      <div className="flex items-center gap-3 p-3 bg-[#FAF9F5] border border-[#E6E4DC] rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                          PDF
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#111827]">
                            CV &amp; Resume &mdash; {activeCandidate.name}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Posisi: {activeCandidate.applied}
                          </div>
                        </div>
                        <button
                          onClick={() => setCvPreviewOpen(true)}
                          className="text-xs text-[#0F6E56] font-bold hover:underline cursor-pointer"
                        >
                          Pratinjau CV
                        </button>
                      </div>
                    </div>

                    {/* Pipeline Selector Block */}
                    <div className="border border-[#E6E4DC] rounded-xl p-4 bg-[#FAF9F5]">
                      <h4 className="text-xs font-bold text-[#111827] mb-2">
                        Penempatan Pipeline Form Request
                      </h4>
                      <div className="text-xs text-gray-600 mb-2.5">
                        Tahap saat ini:{' '}
                        <b>
                          {activeCandidate.stage && activeCandidate.stage !== '-'
                            ? activeCandidate.stage
                            : 'Belum dalam pipeline'}
                        </b>
                      </div>

                      <select
                        value={pipelineSelectStage}
                        onChange={(e) => setPipelineSelectStage(e.target.value)}
                        className="w-full p-2.5 border border-[#E6E4DC] rounded-xl text-xs bg-white outline-none focus:border-[#0F6E56] mb-3"
                      >
                        <option value="">-- Pilih tahap pipeline --</option>
                        {FORM_REQUEST_STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>

                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveToPipeline}
                          className="flex-1 py-2.5 bg-[#0F6E56] hover:bg-[#0C5744] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Simpan Ke Pipeline
                        </button>
                        <button
                          onClick={handleRemoveFromPipeline}
                          className="flex-1 py-2.5 border border-rose-300 text-rose-700 bg-white hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Hapus Dari Pipeline
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Lampiran' && (
                  <div className="border border-[#E6E4DC] rounded-xl p-4 space-y-3 bg-white">
                    <h4 className="text-xs font-bold text-[#111827]">Daftar Dokumen Lampiran</h4>
                    {activeCandidate.attachments.map((att, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2.5 bg-[#FAF9F5] border border-[#E6E4DC] rounded-xl"
                      >
                        <FileText className="w-5 h-5 text-[#111827]" />
                        <div className="flex-1">
                          <div className="text-xs font-bold text-[#111827]">{att.name}</div>
                          <div className="text-[11px] text-gray-500 font-mono">{att.date}</div>
                        </div>
                        <button
                          onClick={() => setCvPreviewOpen(true)}
                          className="text-xs text-[#0F6E56] font-bold underline cursor-pointer"
                        >
                          Lihat
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab !== 'Profil' && activeTab !== 'Lampiran' && (
                  <div className="border border-[#E6E4DC] rounded-xl p-6 text-center text-xs text-gray-500 bg-white">
                    Informasi modul {activeTab} untuk kandidat {activeCandidate.name} siap diperbarui.
                  </div>
                )}
              </div>

              {/* Side Column (Recruitment tools or CV Mockup Viewer) */}
              <div className="lg:col-span-4 overflow-y-auto p-5 sm:p-6 border-l border-[#E6E4DC] bg-[#FAF9F5]">
                {cvPreviewOpen ? (
                  <div className="bg-white p-5 border border-[#E6E4DC] rounded-xl shadow-xs space-y-4">
                    <div className="border-b-2 border-[#0F6E56] pb-3 text-center">
                      <h3 className="text-base font-extrabold text-[#111827]">{activeCandidate.name}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {activeCandidate.role} &middot; {activeCandidate.loc}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 font-mono">
                        {activeCandidate.initials.toLowerCase()}@example.com &middot; +62 812 3456 7890
                      </p>
                    </div>

                    <div>
                      <div className="text-xs text-[#0F6E56] font-extrabold uppercase mb-1">
                        Summary
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {activeCandidate.tagline} Highly motivated with extensive industry experience in driving operational excellence.
                      </p>
                    </div>

                    <div>
                      <div className="text-xs text-[#0F6E56] font-extrabold uppercase mb-1">
                        Professional Experience
                      </div>
                      <div className="text-xs text-gray-700 space-y-1">
                        <strong className="block text-[#111827]">{activeCandidate.role}</strong>
                        <span className="text-[11px] text-gray-500 italic block">
                          {activeCandidate.org} | 2021 - Present
                        </span>
                        <ul className="list-disc pl-4 text-[11.5px] space-y-1">
                          <li>Spearheaded key initiatives related to {activeCandidate.role.toLowerCase()} operations.</li>
                          <li>Collaborated effectively with cross-functional teams to exceed KPIs.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-[#0F6E56] font-extrabold uppercase mb-1">
                        Education
                      </div>
                      <div className="text-xs text-gray-700">
                        <strong className="block text-[#111827]">Bachelor Degree in Engineering / Science</strong>
                        <span className="text-[11px] text-gray-500 italic">Top Tier University | 2017 - 2021</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCvPreviewOpen(false)}
                      className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-[#111827] text-xs font-bold rounded-xl transition-colors mt-2 cursor-pointer"
                    >
                      Tutup Pratinjau CV
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xs font-extrabold text-[#111827] mb-3">Alat Rekrutmen</h3>
                    <div className="text-center py-8 text-gray-500 text-xs space-y-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-lg">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>Klik &quot;Pratinjau CV&quot; untuk membuka dokumen CV kandidat lengkap.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
