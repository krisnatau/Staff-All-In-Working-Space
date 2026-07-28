import React, { useState } from 'react';
import { JobOrder, JobStatus } from '../types';
import { X } from 'lucide-react';

interface AddJobModalProps {
  unitName: string;
  onAddJob: (newJob: Partial<JobOrder>) => void;
  onClose: () => void;
}

export const AddJobModal: React.FC<AddJobModalProps> = ({ unitName, onAddJob, onClose }) => {
  const [pos, setPos] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<JobStatus>('active');
  const [total, setTotal] = useState(1);
  const [pic, setPic] = useState('Lisa');
  const [salaryMin, setSalaryMin] = useState('10.000.000');
  const [salaryMax, setSalaryMax] = useState('15.000.000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pos.trim()) return;

    onAddJob({
      pos,
      company: company || unitName,
      status,
      total: Number(total),
      filled: 0,
      pic,
      open: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      salaryMin,
      salaryMax,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E4EA]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-extrabold text-[#1B1F2A]">Buat Permintaan Posisi Baru ({unitName})</h3>
          <button onClick={onClose} className="text-[#9498A6] hover:text-[#1B1F2A]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Nama Posisi Pekerjaan</label>
            <input
              type="text"
              value={pos}
              onChange={(e) => setPos(e.target.value)}
              placeholder="Contoh: Senior Process Engineer"
              required
              className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Entitas Perusahaan</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Contoh: PT Weda Bay Nickel"
              className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Status Permintaan</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A] bg-white"
              >
                <option value="urgent">Urgent</option>
                <option value="active">Active</option>
                <option value="hold">Hold</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Total Headcount</label>
              <input
                type="number"
                min="1"
                value={total}
                onChange={(e) => setTotal(Number(e.target.value))}
                className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">PIC Rekrutmen</label>
            <input
              type="text"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              placeholder="Nama PIC"
              className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#CBCEDA] rounded-xl text-xs font-semibold text-[#5B6070] hover:bg-[#ECEDF1]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#33417A] text-white rounded-xl text-xs font-bold hover:bg-[#262E5C]"
            >
              Simpan Permintaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
