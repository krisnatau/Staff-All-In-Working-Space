import React, { useState } from 'react';
import { ScreeningCandidate } from '../types';
import { Plus, ChevronRight, ChevronLeft, X, Sparkles, FileText, Check } from 'lucide-react';

interface CandidateManagementViewProps {
  candidates: ScreeningCandidate[];
  onAddCandidate: (newCand: Partial<ScreeningCandidate>) => void;
  onUpdateCandidateStatus: (id: number, status: ScreeningCandidate['status'], statusLabel: string) => void;
  onTriggerAIEvaluation?: (cand: ScreeningCandidate) => void;
}

export const CandidateManagementView: React.FC<CandidateManagementViewProps> = ({
  candidates,
  onAddCandidate,
  onUpdateCandidateStatus,
  onTriggerAIEvaluation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [posFilter, setPosFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Candidate Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('HRD');
  const [newPos, setNewPos] = useState('General Staff');

  const depts = Array.from(new Set(candidates.map((c) => c.dept))).filter(Boolean);
  const positions = Array.from(new Set(candidates.map((c) => c.position))).filter(Boolean);
  const statuses = Array.from(new Set(candidates.map((c) => c.statusLabel))).filter(Boolean);

  const filteredCandidates = candidates.filter((c) => {
    const matchSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = !deptFilter || c.dept === deptFilter;
    const matchPos = !posFilter || c.position === posFilter;
    const matchStatus = !statusFilter || c.statusLabel === statusFilter;
    return matchSearch && matchDept && matchPos && matchStatus;
  });

  const activeCandidate = candidates.find((c) => c.id === activeModalId) || null;
  const currentIndex = candidates.findIndex((c) => c.id === activeModalId);

  const stepModal = (dir: number) => {
    if (currentIndex === -1) return;
    const newIdx = (currentIndex + dir + candidates.length) % candidates.length;
    setActiveModalId(candidates[newIdx].id);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const initials = newName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    onAddCandidate({
      name: newName,
      initials: initials || 'NC',
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      dept: newDept,
      position: newPos,
      status: 'Pengerjaan',
      statusLabel: 'Pengerjaan Screening',
      steps: ['Screening'],
      recommended: false,
      note: 'Kandidat baru ditambahkan ke sistem.',
      org: '—',
      edu: '—',
      loc: '—',
      activities: [{ t: 'Kandidat ditambahkan ke sistem', d: 'Hari ini' }],
      attachments: [{ name: `CV & Resume — ${newName}`, date: 'Hari ini' }],
    });

    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-[#E1F5EE] text-[#0C5744]';
      case 'Pending':
        return 'bg-[#FBF1E0] text-[#C7841E]';
      case 'Cancel':
        return 'bg-[#FBEAE8] text-[#C1473B]';
      default:
        return 'bg-[#ECEDF1] text-[#5B6070]';
    }
  };

  return (
    <div className="animate-fade-in font-sans">
      {/* Topbar */}
      <div className="flex items-center gap-2 bg-[#152426] text-[#cfe0da] px-5 py-3 rounded-xl text-xs mb-5">
        <b className="text-white font-bold tracking-wider">TALENTA POOL</b>
        <span className="text-[#8fa89f]">&middot;</span>
        <span className="text-[#8fa89f]">Form Request</span>
        <span className="text-[#8fa89f]">&rsaquo;</span>
        <span className="text-white font-semibold">Semua Posisi</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div>
          <h1 className="text-xl font-extrabold text-[#1A1A1A]">Kandidat</h1>
          <p className="text-xs text-[#767d78] mt-0.5">
            Klik kandidat untuk melihat detail dan riwayat rekrutmen.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#0F6E56] hover:bg-[#0C5744] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors self-stretch sm:self-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add new candidate
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-[#E3E0D5] mb-5 shadow-2xs">
        <div>
          <label className="block text-[11px] font-bold text-[#8A897F] uppercase tracking-wider mb-1.5">
            Cari Kandidat
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full p-2 border border-[#D8D5C9] focus:border-[#0F6E56] rounded-lg text-xs bg-[#FBFAF6] outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#8A897F] uppercase tracking-wider mb-1.5">
            Departemen
          </label>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="w-full p-2 border border-[#D8D5C9] focus:border-[#0F6E56] rounded-lg text-xs bg-[#FBFAF6] outline-none"
          >
            <option value="">Semua Departemen</option>
            {depts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#8A897F] uppercase tracking-wider mb-1.5">
            Posisi
          </label>
          <select
            value={posFilter}
            onChange={(e) => setPosFilter(e.target.value)}
            className="w-full p-2 border border-[#D8D5C9] focus:border-[#0F6E56] rounded-lg text-xs bg-[#FBFAF6] outline-none"
          >
            <option value="">Semua Posisi</option>
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#8A897F] uppercase tracking-wider mb-1.5">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border border-[#D8D5C9] focus:border-[#0F6E56] rounded-lg text-xs bg-[#FBFAF6] outline-none"
          >
            <option value="">Semua Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E3E0D5] rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full border-collapse text-left min-w-[700px]">
          <thead>
            <tr className="bg-[#FAFAFC] border-b border-[#E3E0D5] text-[11px] uppercase tracking-wider text-[#8A897F] font-bold">
              <th className="py-3 px-4">Kandidat</th>
              <th className="py-3 px-4">Departemen</th>
              <th className="py-3 px-4">Posisi</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEEDE5]">
            {filteredCandidates.map((c) => (
              <tr
                key={c.id}
                onClick={() => setActiveModalId(c.id)}
                className="hover:bg-[#FBFAF6] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0F6E56] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {c.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-[13.5px] text-[#1A1A1A]">{c.name}</div>
                      <div className="text-[11.5px] text-[#8A897F]">{c.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-xs text-[#1A1A1A]">{c.dept}</td>
                <td className="py-3 px-4 text-xs text-[#1A1A1A]">{c.position}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[11.5px] font-bold ${getStatusBadgeClass(
                      c.status
                    )}`}
                  >
                    {c.statusLabel}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['Screening', 'Psikotest'].map((step) => {
                      const isDone = c.steps.includes(step);
                      return (
                        <span
                          key={step}
                          className={`text-[10.5px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                            isDone
                              ? 'bg-[#E1F5EE] text-[#0C5744]'
                              : 'bg-[#EEEDE5] text-[#8A897F]'
                          }`}
                        >
                          {isDone && <Check className="w-3 h-3" />} {step}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <ChevronRight className="w-4 h-4 text-[#b7bdb8] inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Candidate Drawer / Modal */}
      {activeCandidate && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-[1020px] max-h-[88vh] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl border border-[#E3E0D5]">
            {/* Main Column */}
            <div className="lg:col-span-8 p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <span />
                <div className="flex items-center gap-2 text-xs text-[#8A897F]">
                  <button
                    onClick={() => stepModal(-1)}
                    className="p-1 hover:bg-[#EEEDE5] rounded cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span>
                    {currentIndex + 1} dari {candidates.length}
                  </span>
                  <button
                    onClick={() => stepModal(1)}
                    className="p-1 hover:bg-[#EEEDE5] rounded cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveModalId(null)}
                    className="p-1 text-base hover:bg-[#EEEDE5] rounded cursor-pointer ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Head */}
              <div className="flex gap-3.5">
                <div className="w-[54px] h-[54px] rounded-full bg-[#0F6E56] text-white flex items-center justify-center text-lg font-bold shrink-0">
                  {activeCandidate.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-extrabold text-[#1A1A1A]">
                      {activeCandidate.name}
                    </span>
                    {activeCandidate.recommended && (
                      <span className="bg-[#E1F5EE] text-[#0C5744] text-[11px] font-bold px-2 py-0.5 rounded-full">
                        Rekomendasi
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#1A1A1A] my-1">{activeCandidate.note}</div>
                  <div className="text-[12px] text-[#8A897F]">
                    {activeCandidate.org} &middot; {activeCandidate.edu} &middot; {activeCandidate.loc}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onTriggerAIEvaluation) onTriggerAIEvaluation(activeCandidate);
                  }}
                  className="px-4 py-2 bg-[#0F6E56] hover:bg-[#0C5744] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> AI Screening
                </button>

                <button
                  onClick={() => {
                    onUpdateCandidateStatus(activeCandidate.id, 'Done', 'Done');
                    alert(`Status kandidat ${activeCandidate.name} diset ke Selesai/Lulus.`);
                  }}
                  className="px-4 py-2 border border-[#D8D5C9] bg-white hover:bg-[#FBFAF6] text-xs font-semibold rounded-lg text-[#1A1A1A]"
                >
                  Tandai Selesai
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 border-b border-[#E3E0D5] text-xs font-semibold text-[#8A897F] pt-2">
                <span className="pb-2 border-b-2 border-[#0F6E56] text-[#1A1A1A]">Profil</span>
                <span className="pb-2">Lampiran ({activeCandidate.attachments.length})</span>
                <span className="pb-2">Aktivitas rekrutmen</span>
              </div>

              {/* Activity Log */}
              <div className="border border-[#E3E0D5] rounded-xl p-4 bg-white">
                <h4 className="text-xs font-bold text-[#1A1A1A] mb-3">Aktivitas terbaru</h4>
                <div className="space-y-2 divide-y divide-[#F0EFE7]">
                  {activeCandidate.activities.map((act, i) => (
                    <div key={i} className="flex justify-between items-center text-xs pt-1">
                      <span
                        className="text-[#1A1A1A]"
                        dangerouslySetInnerHTML={{ __html: act.t }}
                      />
                      <span className="text-[11.5px] text-[#ABA99B] font-mono">{act.d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              <div className="border border-[#E3E0D5] rounded-xl p-4 bg-white">
                <h4 className="text-xs font-bold text-[#1A1A1A] mb-3">Dokumen Lampiran</h4>
                {activeCandidate.attachments.map((att, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 border-b border-[#F0EFE7] last:border-none">
                    <FileText className="w-4 h-4 text-[#A32D2D]" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-[#1A1A1A]">{att.name}</div>
                      <div className="text-[11px] text-[#8A897F]">{att.date}</div>
                    </div>
                    <button
                      onClick={() => alert(`Membuka lampiran ${att.name}...`)}
                      className="text-xs font-bold text-[#0F6E56] hover:underline"
                    >
                      Lihat
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Column */}
            <div className="lg:col-span-4 bg-[#FBFAF6] p-6 border-l border-[#E3E0D5] overflow-y-auto">
              <h4 className="text-xs font-extrabold text-[#1A1A1A] mb-4">Alat rekrutmen</h4>
              <div className="text-center py-10 text-[#8A897F] text-xs space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#E3DED3] text-[#8b8574] flex items-center justify-center mx-auto text-base">
                  &bull;
                </div>
                <div>Tidak ada kandidat serupa.<br />Coba kandidat lain.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E3E0D5]">
            <h3 className="text-base font-extrabold text-[#1A1A1A] mb-4">Tambah Kandidat Baru</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Masukkan nama kandidat"
                  required
                  className="w-full border border-[#D8D5C9] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#0F6E56]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="contoh@gmail.com"
                  className="w-full border border-[#D8D5C9] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#0F6E56]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Departemen</label>
                <input
                  type="text"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  placeholder="HRD, HSE, IT, etc."
                  className="w-full border border-[#D8D5C9] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#0F6E56]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Posisi</label>
                <input
                  type="text"
                  value={newPos}
                  onChange={(e) => setNewPos(e.target.value)}
                  placeholder="General Staff, Officer, etc."
                  className="w-full border border-[#D8D5C9] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#0F6E56]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#D8D5C9] rounded-xl text-xs font-semibold text-[#6B6A63] hover:bg-[#FBFAF6]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F6E56] text-white rounded-xl text-xs font-bold hover:bg-[#0C5744]"
                >
                  Tambah Kandidat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
