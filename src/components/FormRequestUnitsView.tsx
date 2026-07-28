import React, { useState } from 'react';
import { BusinessUnit } from '../types';
import { Plus, Heart, Search } from 'lucide-react';

interface FormRequestUnitsViewProps {
  units: BusinessUnit[];
  onSelectUnit: (unitId: string) => void;
  onAddUnitClick: () => void;
  onToggleFavorite: (unitId: string) => void;
}

export const FormRequestUnitsView: React.FC<FormRequestUnitsViewProps> = ({
  units,
  onSelectUnit,
  onAddUnitClick,
  onToggleFavorite,
}) => {
  const [posFilter, setPosFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [candFilter, setCandFilter] = useState('');
  const [picFilter, setPicFilter] = useState('');

  const filteredUnits = units.filter((unit) => {
    // Check if any job or unit meta matches search inputs
    const matchPos =
      !posFilter ||
      unit.jobs.some((j) => j.pos.toLowerCase().includes(posFilter.toLowerCase()));
    const matchUser =
      !userFilter ||
      unit.name.toLowerCase().includes(userFilter.toLowerCase()) ||
      unit.sub.toLowerCase().includes(userFilter.toLowerCase());
    const matchCand = !candFilter; // Can match candidates if needed
    const matchPic =
      !picFilter ||
      unit.header.pic.toLowerCase().includes(picFilter.toLowerCase()) ||
      unit.jobs.some((j) => j.pic.toLowerCase().includes(picFilter.toLowerCase()));

    return matchPos && matchUser && matchCand && matchPic;
  });

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="font-mono text-xs text-[#9498A6] tracking-wider mb-2">
        Form Request / <span className="text-[#1B1F2A] font-semibold">Business Units</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-7">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B1F2A] tracking-tight">Business Units</h1>
          <div className="text-sm text-[#5B6070] mt-1">Select a unit to view open job requests</div>
        </div>

        {/* Search Panel */}
        <div className="bg-white border border-[#E2E4EA] rounded-2xl p-3.5 w-full md:w-[280px] shrink-0 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#5B6070] uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-[#9498A6]" />
            <span>Search Filter</span>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={posFilter}
              onChange={(e) => setPosFilter(e.target.value)}
              placeholder="Position name"
              className="w-full border border-[#E2E4EA] focus:border-[#33417A] outline-none rounded-full px-3.5 py-1.5 text-xs text-[#1B1F2A] placeholder-[#9498A6]"
            />
            <input
              type="text"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              placeholder="User name"
              className="w-full border border-[#E2E4EA] focus:border-[#33417A] outline-none rounded-full px-3.5 py-1.5 text-xs text-[#1B1F2A] placeholder-[#9498A6]"
            />
            <input
              type="text"
              value={candFilter}
              onChange={(e) => setCandFilter(e.target.value)}
              placeholder="Candidate name"
              className="w-full border border-[#E2E4EA] focus:border-[#33417A] outline-none rounded-full px-3.5 py-1.5 text-xs text-[#1B1F2A] placeholder-[#9498A6]"
            />
            <input
              type="text"
              value={picFilter}
              onChange={(e) => setPicFilter(e.target.value)}
              placeholder="PIC name"
              className="w-full border border-[#E2E4EA] focus:border-[#33417A] outline-none rounded-full px-3.5 py-1.5 text-xs text-[#1B1F2A] placeholder-[#9498A6]"
            />
          </div>
        </div>
      </div>

      {/* Action & Grid */}
      <div className="flex items-start gap-4">
        <button
          onClick={onAddUnitClick}
          title="Add new business unit"
          className="w-11 h-11 rounded-full bg-[#33417A] hover:bg-[#262E5C] text-white flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-all mt-1"
        >
          <Plus className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1 max-w-[880px]">
          {filteredUnits.map((u) => (
            <div
              key={u.id}
              onClick={() => onSelectUnit(u.id)}
              className="bg-white border border-[#E2E4EA] hover:border-[#CBCEDA] rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg relative group shadow-sm"
            >
              {/* Badge */}
              <div
                className="w-full h-[64px] flex items-center justify-start px-4 font-extrabold text-[17px] text-white tracking-tight"
                style={{
                  background: `linear-gradient(135deg, ${u.color} 0%, ${u.color}CC 100%)`,
                }}
              >
                {u.code}
              </div>

              {/* Heart Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(u.id);
                }}
                className="absolute top-3 right-3 text-white text-lg filter drop-shadow-md hover:scale-110 transition-transform"
                title={u.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 ${u.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
              </button>

              {/* Tag */}
              <div className="absolute top-[22px] right-[38px] font-mono text-[9.5px] text-white text-right leading-tight drop-shadow-xs opacity-85 pointer-events-none">
                {u.tag.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>

              {/* Card Body */}
              <div className="p-4">
                <div className="font-bold text-[14.5px] text-[#1B1F2A] mb-0.5">{u.name}</div>
                <div className="text-xs text-[#5B6070]">
                  {u.jobs.length} open request{u.jobs.length !== 1 ? 's' : ''} &middot; PIC {u.header.pic}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
