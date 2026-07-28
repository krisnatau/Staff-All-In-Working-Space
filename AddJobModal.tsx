import React, { useState } from 'react';
import { BusinessUnit, JobOrder, JobStatus } from '../types';
import { ArrowLeft, FileText, Plus, X } from 'lucide-react';

interface JobsTableViewProps {
  unit: BusinessUnit;
  onBack: () => void;
  onSelectJob: (job: JobOrder) => void;
  onAddJobClick: () => void;
}

export const JobsTableView: React.FC<JobsTableViewProps> = ({
  unit,
  onBack,
  onSelectJob,
  onAddJobClick,
}) => {
  const [selectedPdfJob, setSelectedPdfJob] = useState<JobOrder | null>(null);

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'active':
        return 'bg-[#E7F5EC] text-[#2E8B57]';
      case 'done':
        return 'bg-[#ECEDF1] text-[#5B6070]';
      case 'urgent':
        return 'bg-[#FBEAE8] text-[#C1473B]';
      case 'hold':
        return 'bg-[#FBF1E0] text-[#C7841E]';
      default:
        return 'bg-[#ECEDF1] text-[#5B6070]';
    }
  };

  const getStatusLabel = (status: JobStatus) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'done':
        return 'Done';
      case 'urgent':
        return 'Urgent';
      case 'hold':
        return 'Hold';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-[#1B1F2A] font-bold hover:text-[#262E5C] hover:underline mb-3"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Business Units
      </button>

      {/* Crumb */}
      <div className="font-mono text-xs text-[#9498A6] tracking-wider mb-5">
        Form Request / Business Units / <span className="text-[#1B1F2A] font-semibold">{unit.code}</span>
      </div>

      {/* Unit Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E2E4EA] rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div
            className="w-11 h-11 rounded-xl font-extrabold text-base text-white flex items-center justify-center shrink-0 shadow-sm"
            style={{ backgroundColor: unit.color }}
          >
            {unit.code}
          </div>
          <div>
            <div className="text-base font-bold text-[#1B1F2A]">{unit.name}</div>
            <div className="font-mono text-xs text-[#9498A6] mt-0.5">
              {unit.sub} &middot; PIC {unit.header.pic}
            </div>
          </div>
        </div>

        <button
          onClick={onAddJobClick}
          className="px-4 py-2 bg-[#33417A] hover:bg-[#262E5C] text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-sm transition-all self-stretch sm:self-auto justify-center"
        >
          <Plus className="w-4 h-4" /> + Job Order Request
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white border border-[#E2E4EA] rounded-2xl overflow-x-auto shadow-sm">
        <table className="w-full border-collapse text-left min-w-[700px]">
          <thead>
            <tr className="bg-[#ECEDF1] border-b border-[#E2E4EA] text-[11px] uppercase tracking-wider text-[#9498A6] font-bold">
              <th className="py-3.5 px-4">Position Name</th>
              <th className="py-3.5 px-4">Request Form</th>
              <th className="py-3.5 px-4">Job Status</th>
              <th className="py-3.5 px-4">Open Date</th>
              <th className="py-3.5 px-4">Head Count</th>
              <th className="py-3.5 px-4">PIC</th>
              <th className="py-3.5 px-4">Perusahaan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E4EA]">
            {unit.jobs.map((job) => {
              const remain = job.total - job.filled;
              return (
                <tr
                  key={job.id}
                  onClick={() => onSelectJob(job)}
                  className="hover:bg-[#ECEDF1]/60 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-sm text-[#1B1F2A]">{job.pos}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPdfJob(job);
                      }}
                      className="inline-flex items-center gap-1.5 border border-[#CBCEDA] rounded-full px-2.5 py-1 font-mono text-[11px] text-[#5B6070] bg-white hover:bg-[#ECEDF1] hover:border-[#33417A] transition-all"
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-600" /> PDF
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11.5px] font-bold ${getStatusBadge(
                        job.status
                      )}`}
                    >
                      {getStatusLabel(job.status)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#5B6070]">{job.open}</td>
                  <td className="py-3.5 px-4 font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-[#1B1F2A]">
                      <span>
                        {job.total}&ndash;{job.filled}
                      </span>
                      <span className="w-5 h-5 rounded-full bg-[#EEF0FA] text-[#262E5C] flex items-center justify-center text-[10.5px] font-bold">
                        {remain}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#1B1F2A]">
                      <span className="w-5 h-5 rounded-full bg-[#33417A] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                        {job.pic.slice(0, 2).toUpperCase()}
                      </span>
                      <span>{job.pic}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-[#1B1F2A]">{job.company}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-4 items-center text-xs text-[#9498A6]">
        <span className="font-semibold text-[#5B6070]">Job order legend:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-600" /> Urgent
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600" /> Active
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-600" /> Hold
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-400" /> Done &rarr; Automated
        </span>
      </div>

      {/* PDF Request Form Modal */}
      {selectedPdfJob && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E4EA]">
            <div className="flex justify-between items-center px-5 py-4 border-b border-[#E2E4EA] bg-[#F3F4F7]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-600" />
                <h3 className="font-extrabold text-sm text-[#1B1F2A]">
                  Formulir Permintaan Tenaga Kerja (FPTK)
                </h3>
              </div>
              <button
                onClick={() => setSelectedPdfJob(null)}
                className="text-[#9498A6] hover:text-[#1B1F2A] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-xs text-[#1B1F2A] space-y-4">
              <div className="border-b border-[#E2E4EA] pb-3">
                <div className="text-[10px] uppercase font-mono text-[#9498A6]">Dokumen Ref:</div>
                <div className="text-sm font-extrabold text-[#33417A]">FPTK/{unit.code}/{selectedPdfJob.id.toUpperCase()}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#9498A6] block text-[11px]">Posisi:</span>
                  <strong className="text-sm">{selectedPdfJob.pos}</strong>
                </div>
                <div>
                  <span className="text-[#9498A6] block text-[11px]">Unit / Perusahaan:</span>
                  <strong>{unit.name} ({selectedPdfJob.company})</strong>
                </div>
                <div>
                  <span className="text-[#9498A6] block text-[11px]">Jumlah Headcount:</span>
                  <strong>{selectedPdfJob.total} Orang (Terisi: {selectedPdfJob.filled})</strong>
                </div>
                <div>
                  <span className="text-[#9498A6] block text-[11px]">Tanggal Buka:</span>
                  <span className="font-mono">{selectedPdfJob.open}</span>
                </div>
                <div>
                  <span className="text-[#9498A6] block text-[11px]">Estimasi Gaji:</span>
                  <span>Rp {selectedPdfJob.salaryMin || '10.000.000'} - {selectedPdfJob.salaryMax || '15.000.000'}</span>
                </div>
                <div>
                  <span className="text-[#9498A6] block text-[11px]">PIC Rekrutmen:</span>
                  <span>{selectedPdfJob.pic}</span>
                </div>
              </div>

              <div className="bg-[#EEF0FA] p-3 rounded-xl border border-[#33417A]/20">
                <span className="font-bold text-[#262E5C] block mb-1">Deskripsi &amp; Persyaratan Utama:</span>
                <p className="text-[#5B6070] leading-relaxed">
                  {selectedPdfJob.description || 'Memerlukan kandidat dengan latar belakang teknis yang relevan, sertifikasi operasional K3, dan kesiapan penempatan sesuai standar perusahaan.'}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2 text-[11px] text-[#9498A6]">
                <span>Status Persetujuan: <strong className="text-emerald-600">Disetujui HR Director</strong></span>
                <button
                  onClick={() => {
                    alert('Mengunduh salinan PDF Formulir Permintaan Tenaga Kerja...');
                    setSelectedPdfJob(null);
                  }}
                  className="px-3 py-1.5 bg-[#33417A] text-white rounded-lg font-bold hover:bg-[#262E5C] transition-colors"
                >
                  Unduh Document PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
