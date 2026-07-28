import React, { useState } from 'react';
import { TalentPoolCandidate } from '../types';
import { FORM_REQUEST_STAGES } from '../data/initialData';
import { Heart, FileText, ChevronLeft, ChevronRight, X, Sparkles, UserCheck } from 'lucide-react';

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

  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'Profil' | 'Proyek' | 'Pesan' | 'Feedback' | 'Lampiran' | 'Aktivitas'>('Profil');
  const [pipelineSelectStage, setPipelineSelectStage] = useState<string>('');
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);

  // Filter candidates
  const filteredCandidates = candidates.filter((c) => {
    const matchName = !filterName || c.name.toLowerCase().includes(filterName.toLowerCase());
    const matchDept = !filterDept || c.org.toLowerCase().includes(filterDept.toLowerCase());
    const matchPos = !filterPos || c.role.toLowerCase().includes(filterPos.toLowerCase());
    return matchName && matchDept && matchPos;
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
    <div className="bg-[#F3F2ED] text-[#1A1A1A] rounded-2xl overflow-hidden border border-[#E3E0D5] font-sans animate-fade-in shadow-sm">
      {/* Topbar */}
      <div className="flex items-center justify-between bg-[#101828] text-white px-6 py-3">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0F6E56]" />
          <span>Krisna Talenta Pool</span>
        </div>
        <div className="text-xs text-[#C6CAD3] flex items-center gap-1.5">
          <span className="font-bold text-white">Talent Pool</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 sm:p-6">
        {/* Left Search Filter Panel */}
        <div className="lg:col-span-3 bg-white border border-[#E3E0D5] rounded-xl p-4 self-start shadow-xs">
          <h3 className="text-xs font-semibold text-[#48473F] uppercase tracking-wider mb-3">
            Form request
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Nama</label>
              <input
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Cari nama kandidat"
                className="w-full px-2.5 py-2 border border-[#D8D5C9] rounded-lg text-xs bg-[#FBFAF6] outline-none focus:border-[#0F6E56]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Dept</label>
              <input
                type="text"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                placeholder="Cari rekomendasi dept"
                className="w-full px-2.5 py-2 border border-[#D8D5C9] rounded-lg text-xs bg-[#FBFAF6] outline-none focus:border-[#0F6E56]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Posisi</label>
              <input
                type="text"
                value={filterPos}
                onChange={(e) => setFilterPos(e.target.value)}
                placeholder="Cari rekomendasi posisi"
                className="w-full px-2.5 py-2 border border-[#D8D5C9] rounded-lg text-xs bg-[#FBFAF6] outline-none focus:border-[#0F6E56]"
              />
            </div>

            <button
              onClick={() => {}}
              className="w-full py-2.5 rounded-lg bg-[#0F6E56] hover:bg-[#0C5744] text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Cari kandidat
            </button>
          </div>
        </div>

        {/* Right Main Columns */}
        <div className="lg:col-span-9 space-y-6">
          {/* Section 1: Recommendations */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h2 className="text-base font-bold text-[#1A1A1A]">
                Rekomendasi berdasarkan histori dan form request
              </h2>
            </div>

            <div className="bg-white border border-[#E3E0D5] rounded-xl overflow-hidden divide-y divide-[#EEEDE5]">
              {filteredCandidates.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  onClick={() => openModal(c.id)}
                  className="flex items-center gap-3 p-3.5 hover:bg-[#FBFAF6] cursor-pointer transition-colors"
                >
                  <div className="w-[34px] h-[34px] rounded-full bg-[#0F6E56] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#1A1A1A]">{c.name}</div>
                    <div className="text-xs text-[#6B6A63]">{c.role} &middot; {c.loc}</div>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          c.psychPassed
                            ? 'bg-[#E1F5EE] text-[#0C5744]'
                            : 'bg-[#FBEAE8] text-[#C1473B]'
                        }`}
                      >
                        {c.psychPassed ? 'Psychological Test passed' : 'Psychological Test not passed'}
                      </span>
                      <span className="text-[10.5px] bg-[#EEEDE5] text-[#48473F] px-1.5 py-0.5 rounded font-semibold">
                        Tahap: {c.stage && c.stage !== '-' ? c.stage : 'Belum dalam pipeline'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-[#48473F] font-mono whitespace-nowrap">
                    Rp {c.rate}/{c.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Newly Added Grid */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h2 className="text-base font-bold text-[#1A1A1A]">Baru ditambahkan</h2>
              <span className="text-xs text-[#8A897F]">Selesai screening &amp; psikotes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
              {filteredCandidates.map((c) => (
                <div
                  key={c.id}
                  onClick={() => openModal(c.id)}
                  className="bg-white border border-[#E3E0D5] hover:border-[#0F6E56]/50 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all relative group"
                >
                  <div className="h-[88px] bg-[#E1F5EE] relative flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#0F6E56] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                      {c.initials}
                    </div>
                    <div className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-white text-[#0F6E56] font-semibold shadow-2xs">
                      New candidate
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleFavorite) onToggleFavorite(c.id);
                      }}
                      className="absolute top-2 right-2 text-white hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          c.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-3">
                    <div className="text-xs font-bold text-[#1A1A1A] truncate">{c.name}</div>
                    <div className="text-[11px] text-[#6B6A63] mb-1.5 truncate">
                      {c.role} &middot; {c.loc}
                    </div>
                    <div className="flex justify-between text-[11px] text-[#1A1A1A] font-semibold mb-1.5">
                      <span>Rp {c.rate}/{c.unit}</span>
                    </div>

                    <div
                      className={`text-[10.5px] font-semibold p-1 rounded text-center mb-1.5 ${
                        c.psychPassed
                          ? 'bg-[#E1F5EE] text-[#0C5744]'
                          : 'bg-[#FBEAE8] text-[#C1473B]'
                      }`}
                    >
                      {c.psychPassed ? 'Psychological Test passed' : 'Psychological Test not passed'}
                    </div>

                    <div className="text-[10.5px] bg-[#EEEDE5] text-[#48473F] p-1 rounded text-center font-semibold truncate">
                      Tahap: {c.stage && c.stage !== '-' ? c.stage : 'Belum dalam pipeline'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {activeCandidate && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white w-full max-w-[1120px] h-[88vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-[#E3E0D5]">
            {/* Modal Top */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E3E0D5] bg-white shrink-0">
              <div className="font-bold text-sm text-[#1A1A1A]">Dari {activeCandidate.role}</div>

              <div className="flex items-center gap-3 text-xs text-[#6B6A63]">
                <button
                  onClick={() => stepModal(-1)}
                  className="p-1 hover:bg-[#EEEDE5] rounded cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>
                  {currentIndex + 1} dari {candidates.length}
                </span>
                <button
                  onClick={() => stepModal(1)}
                  className="p-1 hover:bg-[#EEEDE5] rounded cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-[#EEEDE5] rounded text-lg font-bold cursor-pointer ml-2"
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
                <div className="flex gap-3.5">
                  <div className="w-[68px] h-[68px] rounded-full bg-[#0F6E56] text-white flex items-center justify-center text-2xl font-bold shrink-0">
                    {activeCandidate.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#1A1A1A]">{activeCandidate.name}</span>
                      <span className="text-[11px] bg-[#EEEDE5] text-[#48473F] px-2 py-0.5 rounded-full font-semibold">
                        Rekomendasi
                      </span>
                    </div>
                    <div className="text-xs text-[#48473F] my-1">{activeCandidate.tagline}</div>
                    <div className="text-[11.5px] text-[#8A897F]">{activeCandidate.org}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 my-3">
                  <button
                    onClick={() => {
                      if (onTriggerAIEvaluation) onTriggerAIEvaluation(activeCandidate);
                    }}
                    className="px-4 py-2 bg-[#0F6E56] hover:bg-[#0C5744] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
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
                    className="px-4 py-2 border border-[#D8D5C9] bg-white hover:bg-[#FBFAF6] rounded-lg text-xs font-semibold text-[#1A1A1A]"
                  >
                    Tolak
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-5 border-b border-[#E3E0D5] text-xs text-[#8A897F] overflow-x-auto">
                  {(['Profil', 'Proyek', 'Pesan', 'Feedback', 'Lampiran', 'Aktivitas'] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2.5 font-medium whitespace-nowrap border-b-2 transition-all ${
                          activeTab === tab
                            ? 'border-[#0F6E56] text-[#1A1A1A] font-bold'
                            : 'border-transparent hover:text-[#1A1A1A]'
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
                    <div className="border border-[#E3E0D5] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-[#1A1A1A] mb-3">Aktivitas terbaru</h4>
                      <div className="space-y-2 divide-y divide-[#F0EFE7]">
                        <div className="flex justify-between items-center text-xs pt-1">
                          <span className="text-[#48473F]">
                            Kandidat kini berada pada tahap{' '}
                            <b>
                              {activeCandidate.stage && activeCandidate.stage !== '-'
                                ? activeCandidate.stage
                                : 'Belum dalam pipeline'}
                            </b>
                          </span>
                          <span className="text-[11px] text-[#ABA99B]">Hari ini</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-2">
                          <span className="text-[#48473F]">Dilihat oleh Krisna Taufik Akbar</span>
                          <span className="text-[11px] text-[#ABA99B]">27/6/2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights Block */}
                    <div className="border border-[#E3E0D5] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-[#1A1A1A] mb-1">
                        Sorotan untuk proyek ini
                      </h4>
                      <p className="text-xs text-[#6B6A63] mb-3">
                        Melamar posisi {activeCandidate.role} ({activeCandidate.applied})
                      </p>

                      <div className="flex items-center gap-3 p-2.5 bg-[#FBFAF6] border border-[#EEEDE5] rounded-lg">
                        <div className="w-8 h-8 rounded bg-[#FCEBEB] text-[#A32D2D] flex items-center justify-center font-bold text-[10px] shrink-0">
                          PDF
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#1A1A1A]">
                            CV &amp; Resume &mdash; {activeCandidate.name}
                          </div>
                          <div className="text-[11px] text-[#8A897F]">
                            {activeCandidate.applied}
                          </div>
                        </div>
                        <button
                          onClick={() => setCvPreviewOpen(true)}
                          className="text-xs text-[#0F6E56] font-bold hover:underline cursor-pointer"
                        >
                          Pratinjau
                        </button>
                      </div>
                    </div>

                    {/* Pipeline Selector Block */}
                    <div className="border border-[#E3E0D5] rounded-xl p-4 bg-[#FBFAF6]">
                      <h4 className="text-xs font-bold text-[#1A1A1A] mb-2">
                        Penempatan pipeline Form Request
                      </h4>
                      <div className="text-xs text-[#6B6A63] mb-2.5">
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
                        className="w-full p-2.5 border border-[#D8D5C9] rounded-lg text-xs bg-white outline-none focus:border-[#0F6E56] mb-3"
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
                          className="flex-1 py-2 bg-[#0F6E56] hover:bg-[#0C5744] text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          Simpan ke pipeline
                        </button>
                        <button
                          onClick={handleRemoveFromPipeline}
                          className="flex-1 py-2 border border-[#C1473B] text-[#C1473B] bg-white hover:bg-[#FBEAE8] rounded-lg text-xs font-semibold transition-colors"
                        >
                          Hapus dari pipeline
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Lampiran' && (
                  <div className="border border-[#E3E0D5] rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-[#1A1A1A]">Daftar Dokumen Lampiran</h4>
                    {activeCandidate.attachments.map((att, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2.5 bg-[#FBFAF6] border border-[#EEEDE5] rounded-lg"
                      >
                        <FileText className="w-5 h-5 text-[#33417A]" />
                        <div className="flex-1">
                          <div className="text-xs font-semibold">{att.name}</div>
                          <div className="text-[11px] text-[#8A897F]">{att.date}</div>
                        </div>
                        <button
                          onClick={() => setCvPreviewOpen(true)}
                          className="text-xs text-[#0F6E56] font-bold underline"
                        >
                          Lihat
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab !== 'Profil' && activeTab !== 'Lampiran' && (
                  <div className="border border-[#E3E0D5] rounded-xl p-6 text-center text-xs text-[#8A897F]">
                    Informasi modul {activeTab} untuk kandidat {activeCandidate.name} siap diperbarui.
                  </div>
                )}
              </div>

              {/* Side Column (Recruitment tools or CV Mockup Viewer) */}
              <div className="lg:col-span-4 overflow-y-auto p-5 sm:p-6 border-l border-[#E3E0D5] bg-[#FBFAF6]">
                {cvPreviewOpen ? (
                  <div className="bg-white p-5 border border-[#E3E0D5] rounded-xl shadow-xs space-y-4">
                    <div className="border-b-2 border-[#0F6E56] pb-3 text-center">
                      <h3 className="text-base font-bold text-[#1A1A1A]">{activeCandidate.name}</h3>
                      <p className="text-xs text-[#6B6A63] mt-0.5">
                        {activeCandidate.role} &middot; {activeCandidate.loc}
                      </p>
                      <p className="text-[11px] text-[#8A897F] mt-0.5">
                        {activeCandidate.initials.toLowerCase()}@example.com &middot; +62 812 3456 7890
                      </p>
                    </div>

                    <div>
                      <div className="text-xs text-[#0F6E56] font-bold uppercase mb-1">
                        Summary
                      </div>
                      <p className="text-xs text-[#48473F] leading-relaxed">
                        {activeCandidate.tagline} Highly motivated with extensive industry experience in driving operational excellence.
                      </p>
                    </div>

                    <div>
                      <div className="text-xs text-[#0F6E56] font-bold uppercase mb-1">
                        Professional Experience
                      </div>
                      <div className="text-xs text-[#48473F] space-y-1">
                        <strong className="block text-[#1A1A1A]">{activeCandidate.role}</strong>
                        <span className="text-[11px] text-[#8A897F] italic block">
                          {activeCandidate.org} | 2021 - Present
                        </span>
                        <ul className="list-disc pl-4 text-[11.5px] space-y-1">
                          <li>Spearheaded key initiatives related to {activeCandidate.role.toLowerCase()} operations.</li>
                          <li>Collaborated effectively with cross-functional teams to exceed KPIs.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-[#0F6E56] font-bold uppercase mb-1">
                        Education
                      </div>
                      <div className="text-xs text-[#48473F]">
                        <strong className="block text-[#1A1A1A]">Bachelor Degree in Relevant Field</strong>
                        <span className="text-[11px] text-[#8A897F] italic">Top Tier University | 2017 - 2021</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCvPreviewOpen(false)}
                      className="w-full py-2 bg-[#ECEDF1] hover:bg-[#E3E0D5] text-[#1A1A1A] text-xs font-bold rounded-lg transition-colors mt-2"
                    >
                      Tutup Pratinjau CV
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xs font-bold text-[#1A1A1A] mb-3">Alat rekrutmen</h3>
                    <div className="text-center py-8 text-[#8A897F] text-xs space-y-2">
                      <div className="w-10 h-10 rounded-full bg-[#EEEDE5] text-[#8A897F] flex items-center justify-center mx-auto text-lg">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>Klik &quot;Pratinjau&quot; pada CV untuk membuka tampilan dokumen lengkap.</div>
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
