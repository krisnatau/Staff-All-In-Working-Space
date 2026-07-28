import React, { useState } from 'react';
import { BusinessUnit, JobOrder, KanbanCandidate, TalentPoolCandidate } from '../types';
import { FORM_REQUEST_STAGES } from '../data/initialData';
import { ArrowLeft, Plus, ChevronRight, ChevronLeft, Trash2, Sparkles } from 'lucide-react';

interface KanbanViewProps {
  unit: BusinessUnit;
  job: JobOrder;
  kanbanCandidates: KanbanCandidate[];
  talentPoolCandidates: TalentPoolCandidate[];
  onBack: () => void;
  onMoveCandidateStage: (candidateId: string, newStage: string) => void;
  onAddManualCandidate: (candidateName: string, stage: string) => void;
  onImportFromTalentPool: (talentPoolCandidateId: number, targetStage: string) => void;
  onRemoveCandidate: (candidateId: string) => void;
  onTriggerAIEvaluation?: (candidateName: string, role: string) => void;
}

export const KanbanView: React.FC<KanbanViewProps> = ({
  unit,
  job,
  kanbanCandidates,
  talentPoolCandidates,
  onBack,
  onMoveCandidateStage,
  onAddManualCandidate,
  onImportFromTalentPool,
  onRemoveCandidate,
  onTriggerAIEvaluation,
}) => {
  const [showManualModal, setShowManualModal] = useState(false);
  const [showTtpModal, setShowTtpModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualStage, setManualStage] = useState(FORM_REQUEST_STAGES[0]);
  const [selectedTtpId, setSelectedTtpId] = useState<number>(talentPoolCandidates[0]?.id || 1);
  const [ttpTargetStage, setTtpTargetStage] = useState(FORM_REQUEST_STAGES[0]);

  // Filter candidates relevant to this job
  const jobCandidates = kanbanCandidates.filter(
    (c) => c.unitId === unit.id && c.jobPos === job.pos
  );

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;
    onAddManualCandidate(manualName, manualStage);
    setManualName('');
    setShowManualModal(false);
  };

  const handleTtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onImportFromTalentPool(Number(selectedTtpId), ttpTargetStage);
    setShowTtpModal(false);
  };

  return (
    <div className="animate-fade-in">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-[#1B1F2A] font-bold hover:text-[#262E5C] hover:underline mb-3"
      >
        <ArrowLeft className="w-4 h-4" /> Back to jobs
      </button>

      {/* Crumb */}
      <div className="font-mono text-xs text-[#9498A6] tracking-wider mb-4">
        Form Request / Detail Pemenuhan / <span className="text-[#1B1F2A] font-semibold">{unit.code} / {job.pos}</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-lg font-extrabold text-[#1B1F2A]">
            Detail Pemenuhan &mdash; {job.pos} ({unit.name})
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="font-mono text-[11px] text-[#9498A6] flex items-center gap-1.5 bg-white border border-[#E2E4EA] px-3 py-1.5 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
            <span>No changes</span>
          </div>

          <button
            onClick={() => setShowManualModal(true)}
            className="border border-[#CBCEDA] bg-white hover:bg-[#ECEDF1] rounded-full px-3.5 py-1.5 text-xs font-bold text-[#1B1F2A] cursor-pointer transition-all shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Manual
          </button>

          <button
            onClick={() => setShowTtpModal(true)}
            className="bg-[#33417A] hover:bg-[#262E5C] text-white rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-sm flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> TTP
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-flow-col auto-cols-[180px] sm:auto-cols-[190px] gap-3.5 overflow-x-auto pb-4 pt-1 snap-x">
        {FORM_REQUEST_STAGES.map((stageName, stageIdx) => {
          const stageCands = jobCandidates.filter((c) => c.stage === stageName);

          return (
            <div
              key={stageName}
              className="bg-[#ECEDF1] border border-[#E2E4EA] rounded-2xl p-3 min-h-[380px] flex flex-col snap-start shrink-0 shadow-2xs"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-extrabold text-[#1B1F2A] tracking-tight">{stageName}</span>
                <span className="font-mono text-[10.5px] text-[#262E5C] bg-[#EEF0FA] rounded-full px-2 py-0.5 font-bold">
                  {stageCands.length}
                </span>
              </div>

              {/* Stage Body */}
              <div className="flex-1 flex flex-col gap-2">
                {stageCands.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-xs text-[#9498A6] italic text-center px-2 py-4 border border-dashed border-[#CBCEDA] rounded-xl bg-white/50">
                    No candidates yet
                  </div>
                ) : (
                  stageCands.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white border border-[#E2E4EA] hover:border-[#CBCEDA] rounded-xl p-3 text-xs shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="font-bold text-[#1B1F2A] mb-1 flex items-center justify-between">
                        <span className="truncate pr-1">&bull; {c.name}</span>
                        <button
                          onClick={() => onRemoveCandidate(c.id)}
                          className="text-[#9498A6] hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove from stage"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono text-[10.5px] text-[#9498A6] mb-2">{c.date}</div>

                      {/* Stage Shift Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#ECEDF1] gap-1">
                        {stageIdx > 0 && (
                          <button
                            onClick={() => onMoveCandidateStage(c.id, FORM_REQUEST_STAGES[stageIdx - 1])}
                            className="p-1 text-[#5B6070] hover:bg-[#ECEDF1] rounded-md transition-colors"
                            title={`Move to ${FORM_REQUEST_STAGES[stageIdx - 1]}`}
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {onTriggerAIEvaluation && (
                          <button
                            onClick={() => onTriggerAIEvaluation(c.name, job.pos)}
                            className="p-1 text-[#33417A] hover:bg-[#EEF0FA] rounded-md transition-colors flex items-center gap-0.5 text-[10px] font-semibold"
                            title="AI Match Evaluation"
                          >
                            <Sparkles className="w-3 h-3 text-[#33417A]" /> AI
                          </button>
                        )}

                        {stageIdx < FORM_REQUEST_STAGES.length - 1 && (
                          <button
                            onClick={() => onMoveCandidateStage(c.id, FORM_REQUEST_STAGES[stageIdx + 1])}
                            className="p-1 text-[#5B6070] hover:bg-[#ECEDF1] rounded-md transition-colors ml-auto"
                            title={`Move to ${FORM_REQUEST_STAGES[stageIdx + 1]}`}
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add Manual Candidate */}
      {showManualModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E4EA]">
            <h3 className="text-base font-extrabold text-[#1B1F2A] mb-4">Tambah Kandidat Manual</h3>
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Nama Kandidat</label>
                <input
                  type="text"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="Masukkan nama lengkap kandidat"
                  required
                  className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Tahap Awal</label>
                <select
                  value={manualStage}
                  onChange={(e) => setManualStage(e.target.value)}
                  className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A] bg-white"
                >
                  {FORM_REQUEST_STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 border border-[#CBCEDA] rounded-xl text-xs font-semibold text-[#5B6070] hover:bg-[#ECEDF1]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#33417A] text-white rounded-xl text-xs font-bold hover:bg-[#262E5C]"
                >
                  Simpan Kandidat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Import from Talent Pool (TTP) */}
      {showTtpModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E4EA]">
            <h3 className="text-base font-extrabold text-[#1B1F2A] mb-4">
              Import dari Talenta Pool (TTP)
            </h3>
            <form onSubmit={handleTtpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Pilih Kandidat</label>
                <select
                  value={selectedTtpId}
                  onChange={(e) => setSelectedTtpId(Number(e.target.value))}
                  className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A] bg-white"
                >
                  {talentPoolCandidates.map((cand) => (
                    <option key={cand.id} value={cand.id}>
                      {cand.name} &mdash; {cand.role} ({cand.loc})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Tahap Target</label>
                <select
                  value={ttpTargetStage}
                  onChange={(e) => setTtpTargetStage(e.target.value)}
                  className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A] bg-white"
                >
                  {FORM_REQUEST_STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTtpModal(false)}
                  className="px-4 py-2 border border-[#CBCEDA] rounded-xl text-xs font-semibold text-[#5B6070] hover:bg-[#ECEDF1]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#33417A] text-white rounded-xl text-xs font-bold hover:bg-[#262E5C]"
                >
                  Import ke Kanban
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
