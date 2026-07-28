import React from 'react';
import { AICandidateAnalysis } from '../types';
import { Sparkles, CheckCircle2, AlertTriangle, HelpCircle, X } from 'lucide-react';

interface AICandidateModalProps {
  candidateName: string;
  role: string;
  analysis: AICandidateAnalysis | null;
  loading: boolean;
  onClose: () => void;
}

export const AICandidateModal: React.FC<AICandidateModalProps> = ({
  candidateName,
  role,
  analysis,
  loading,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E4EA]">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-[#E2E4EA] bg-gradient-to-r from-[#EEF0FA] to-[#F3F4F7]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#33417A] text-white flex items-center justify-center shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#1B1F2A]">AI Candidate Evaluation</h3>
              <p className="text-[11px] text-[#5B6070]">Powered by Gemini 3.6 Flash Server Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#9498A6] hover:text-[#1B1F2A] p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 text-xs text-[#1B1F2A] space-y-4">
          <div className="bg-[#FBFAF6] border border-[#E3E0D5] p-3.5 rounded-xl">
            <span className="text-[10.5px] uppercase font-mono text-[#9498A6] block">Evaluasi Posisi:</span>
            <strong className="text-sm text-[#1B1F2A]">{candidateName}</strong>
            <span className="text-xs text-[#5B6070] block mt-0.5">Posisi: {role}</span>
          </div>

          {loading ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-9 h-9 border-3 border-[#33417A] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-[#5B6070]">
                Menganalisis kualifikasi, riwayat &amp; kesesuaian kandidat...
              </p>
            </div>
          ) : analysis ? (
            <div className="space-y-4">
              {/* Match Score Gauge */}
              <div className="flex items-center justify-between bg-[#EEF0FA] p-4 rounded-xl border border-[#33417A]/20">
                <div>
                  <span className="text-[10.5px] font-bold text-[#262E5C] uppercase tracking-wider block">
                    Skor Kesesuaian (Match Score)
                  </span>
                  <div className="text-2xl font-extrabold text-[#262E5C] mt-0.5">
                    {analysis.matchScore}% &middot; {analysis.suitability}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    analysis.recommendation === 'Highly Recommended'
                      ? 'bg-[#E7F5EC] text-[#2E8B57]'
                      : 'bg-[#FBF1E0] text-[#C7841E]'
                  }`}
                >
                  {analysis.recommendation}
                </div>
              </div>

              {/* Strengths */}
              <div>
                <span className="font-bold text-[#2E8B57] flex items-center gap-1.5 mb-2 text-xs">
                  <CheckCircle2 className="w-4 h-4" /> Keunggulan Utama (Strengths)
                </span>
                <ul className="space-y-1.5 pl-5 list-disc text-[#5B6070]">
                  {analysis.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>

              {/* Growth Areas */}
              <div>
                <span className="font-bold text-[#C7841E] flex items-center gap-1.5 mb-2 text-xs">
                  <AlertTriangle className="w-4 h-4" /> Catatan Pertimbangan (Growth Areas)
                </span>
                <ul className="space-y-1.5 pl-5 list-disc text-[#5B6070]">
                  {analysis.growthAreas.map((ga, i) => (
                    <li key={i}>{ga}</li>
                  ))}
                </ul>
              </div>

              {/* Suggested Interview Questions */}
              <div className="bg-[#F3F4F7] p-3.5 rounded-xl border border-[#E2E4EA]">
                <span className="font-bold text-[#33417A] flex items-center gap-1.5 mb-2 text-xs">
                  <HelpCircle className="w-4 h-4" /> Rekomendasi Pertanyaan Wawancara
                </span>
                <ol className="space-y-1.5 pl-5 list-decimal text-[#5B6070]">
                  {analysis.suggestedQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-[#9498A6]">Gagal memuat analisis AI.</div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#33417A] hover:bg-[#262E5C] text-white rounded-xl text-xs font-bold transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
