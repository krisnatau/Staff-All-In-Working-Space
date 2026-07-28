import React, { useState } from 'react';
import { BusinessUnit } from '../types';
import { X } from 'lucide-react';

interface AddUnitModalProps {
  onAddUnit: (newUnit: Partial<BusinessUnit>) => void;
  onClose: () => void;
}

export const AddUnitModal: React.FC<AddUnitModalProps> = ({ onAddUnit, onClose }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [sub, setSub] = useState('');
  const [tag, setTag] = useState('');
  const [pic, setPic] = useState('Lisa');
  const [color, setColor] = useState('#33417A');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    onAddUnit({
      id: code.toLowerCase().replace(/\s+/g, '-'),
      code,
      name,
      sub: sub || 'BSE',
      tag: tag || pic,
      color,
      header: { pic },
      jobs: [],
      isFavorite: false,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E4EA]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-extrabold text-[#1B1F2A]">Tambah Unit Bisnis Baru</h3>
          <button onClick={onClose} className="text-[#9498A6] hover:text-[#1B1F2A]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Kode Unit</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Kode"
                required
                className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A]"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Warna Badge</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-9 h-9 p-0 border border-[#CBCEDA] rounded-lg cursor-pointer"
                />
                <span className="font-mono text-xs text-[#5B6070]">{color}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Nama Unit Bisnis</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Nickel Processing Plant"
              required
              className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">Sub Entitas / Departemen</label>
            <input
              type="text"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              placeholder="Contoh: NPP · WBN"
              className="w-full border border-[#CBCEDA] rounded-xl px-3 py-2 text-xs text-[#1B1F2A] outline-none focus:border-[#33417A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1B1F2A] mb-1">PIC Rekrutmen Utama</label>
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
              Simpan Unit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
