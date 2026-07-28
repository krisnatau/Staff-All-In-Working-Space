import React, { useState } from 'react';
import { ViewPage, OnboardingEvent, TalentPoolCandidate } from '../types';
import { Search } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: ViewPage) => void;
  onboardingEvents: OnboardingEvent[];
  newCandidates: TalentPoolCandidate[];
  onSearchSubmit?: (query: string, unit: string, stage: string) => void;
  onSelectCandidate?: (candidateId: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onboardingEvents,
  newCandidates,
  onSearchSubmit,
  onSelectCandidate,
}) => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Feedback' | 'Reminders'>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [unitFilter, setUnitFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery, unitFilter, stageFilter);
    } else {
      // Default behavior: Navigate to Talent Pool or Candidate list
      onNavigate('page4');
    }
  };

  return (
    <div className="max-w-[1060px] mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="text-center pt-2 pb-3">
        <svg
          className="w-[140px] mx-auto mb-4 opacity-90"
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M40 70C40 45 70 20 100 20C130 20 160 45 160 70" fill="#E8EAED" />
          <path d="M100 10C80 10 70 30 70 30H130C130 30 120 10 100 10Z" fill="#FCE8B2" opacity="0.5" />
          <rect x="85" y="30" width="30" height="40" fill="#9AA0A6" />
          <rect x="75" y="40" width="10" height="30" fill="#BCC1C6" />
          <rect x="115" y="40" width="10" height="30" fill="#BCC1C6" />
          <circle cx="100" cy="42" r="6" fill="#FFFFFF" />
          <path d="M100 42 L100 38 M100 42 L103 42" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="94" y="56" width="12" height="14" fill="#FFFFFF" />
          <path d="M20 70 L180 70" stroke="#E8EAED" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#1B1F2A] mb-6 tracking-tight">
          Good morning, Krisna
        </h2>

        {/* Search Container */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-stretch max-w-[680px] mx-auto bg-white border border-[#CBCEDA] rounded-2xl sm:rounded-full p-1.5 gap-1 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex-1 flex flex-col justify-center px-4 py-2 rounded-full hover:bg-[#ECEDF1] transition-colors text-left border-b sm:border-b-0 sm:border-r border-[#CBCEDA]/50">
            <label className="text-[11px] font-bold text-[#1B1F2A]">Cari</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nama kandidat / posisi"
              className="border-none outline-none text-[13.5px] text-[#1B1F2A] bg-transparent w-full p-0 placeholder-[#9498A6]"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center px-4 py-2 rounded-full hover:bg-[#ECEDF1] transition-colors text-left border-b sm:border-b-0 sm:border-r border-[#CBCEDA]/50">
            <label className="text-[11px] font-bold text-[#1B1F2A]">Unit bisnis</label>
            <input
              type="text"
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
              placeholder="Semua unit"
              className="border-none outline-none text-[13.5px] text-[#1B1F2A] bg-transparent w-full p-0 placeholder-[#9498A6]"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center px-4 py-2 rounded-full hover:bg-[#ECEDF1] transition-colors text-left">
            <label className="text-[11px] font-bold text-[#1B1F2A]">Tahap</label>
            <input
              type="text"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              placeholder="Semua tahap"
              className="border-none outline-none text-[13.5px] text-[#1B1F2A] bg-transparent w-full p-0 placeholder-[#9498A6]"
            />
          </div>

          <button
            type="submit"
            title="Search"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#33417A] to-[#262E5C] hover:scale-105 border-none cursor-pointer flex items-center justify-center text-white shrink-0 shadow-md transition-all self-center"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2.5 my-8 max-w-[600px] mx-auto">
        {(['Home', 'Feedback', 'Reminders'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-sm font-semibold rounded-full border transition-all ${
              activeTab === tab
                ? 'text-[#1B1F2A] bg-[#ECEDF1] border-[#CBCEDA]'
                : 'text-[#5B6070] border-transparent hover:text-[#1B1F2A] hover:bg-[#ECEDF1]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Home' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            <div
              onClick={() => onNavigate('page1')}
              className="bg-white border border-[#E2E4EA] hover:border-[#CBCEDA] rounded-2xl p-5 flex flex-col gap-1.5 hover:-translate-y-1 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="text-[12.5px] color-[#5B6070] font-bold uppercase tracking-wider text-[#5B6070]">
                Interview
              </div>
              <div className="text-3xl font-extrabold text-[#1B1F2A]">18</div>
              <div className="text-[12.5px] text-[#9498A6]">Candidates in progress</div>
            </div>

            <div
              onClick={() => onNavigate('page4')}
              className="bg-white border border-[#E2E4EA] hover:border-[#CBCEDA] rounded-2xl p-5 flex flex-col gap-1.5 hover:-translate-y-1 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="text-[12.5px] font-bold uppercase tracking-wider text-[#5B6070]">
                Negotiation
              </div>
              <div className="text-3xl font-extrabold text-[#1B1F2A]">5</div>
              <div className="text-[12.5px] text-[#9498A6]">Offers sent &amp; pending</div>
            </div>

            <div
              onClick={() => onNavigate('page5')}
              className="bg-white border border-[#E2E4EA] hover:border-[#CBCEDA] rounded-2xl p-5 flex flex-col gap-1.5 hover:-translate-y-1 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="text-[12.5px] font-bold uppercase tracking-wider text-[#5B6070]">
                Onboarding
              </div>
              <div className="text-3xl font-extrabold text-[#1B1F2A]">12</div>
              <div className="text-[12.5px] text-[#9498A6]">Scheduled to join</div>
            </div>

            <div
              onClick={() => onNavigate('page1')}
              className="bg-[#EEF0FA] border border-[#EEF0FA] hover:border-[#CBCEDA] rounded-2xl p-5 flex flex-col gap-1.5 hover:-translate-y-1 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="text-[12.5px] font-bold uppercase tracking-wider text-[#262E5C]">
                Active Requests
              </div>
              <div className="text-3xl font-extrabold text-[#262E5C]">42</div>
              <div className="text-[12.5px] text-[#5B6070]">
                <strong className="text-[#262E5C]">+3</strong> this week
              </div>
            </div>
          </div>

          {/* Two-Column Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Onboarding Calendar */}
            <div className="lg:col-span-7 bg-white border border-[#E2E4EA] rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-baseline mb-5">
                <div className="text-base font-extrabold text-[#1B1F2A]">Onboarding Calendar</div>
                <button
                  onClick={() => onNavigate('page5')}
                  className="text-xs text-[#1B1F2A] font-bold underline hover:text-[#262E5C]"
                >
                  View all
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {onboardingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => onNavigate('page5')}
                    className="flex gap-4 items-center p-3.5 border border-[#E2E4EA] hover:border-[#CBCEDA] rounded-xl hover:-translate-y-0.5 transition-all cursor-pointer hover:shadow-sm"
                  >
                    <div className="flex flex-col items-center justify-center bg-[#ECEDF1] border border-[#E2E4EA] rounded-xl w-[54px] h-[54px] shrink-0">
                      <span className="text-[10.5px] font-bold text-[#33417A] uppercase">{evt.month}</span>
                      <span className="text-lg font-extrabold text-[#1B1F2A] leading-none">{evt.day}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-[14.5px] font-bold text-[#1B1F2A]">{evt.name}</div>
                      <div className="text-[12.5px] text-[#5B6070] flex items-center gap-1.5">
                        <span>{evt.role}</span>
                        <span className="w-1 h-1 rounded-full bg-[#9498A6]" />
                        <span>{evt.dept}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Newly added candidates */}
            <div className="lg:col-span-5 bg-white border border-[#E2E4EA] rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-baseline mb-5">
                <div className="text-base font-extrabold text-[#1B1F2A]">Newly added candidates</div>
                <button
                  onClick={() => onNavigate('page4')}
                  className="text-xs text-[#1B1F2A] font-bold underline hover:text-[#262E5C]"
                >
                  Open Pool
                </button>
              </div>

              <div className="flex flex-col">
                {newCandidates.slice(0, 4).map((cand, idx) => {
                  const bgColors = ['#0F6E56', '#33417A', '#C7841E', '#C1473B'];
                  const relativeTimes = ['2 hrs ago', '5 hrs ago', '1 day ago', '2 days ago'];
                  return (
                    <div
                      key={cand.id}
                      onClick={() => {
                        if (onSelectCandidate) onSelectCandidate(cand.id);
                        onNavigate('page4');
                      }}
                      className="flex items-center gap-3.5 p-3 border-b border-[#E2E4EA] last:border-none hover:bg-[#ECEDF1] rounded-xl cursor-pointer transition-colors"
                    >
                      <div
                        className="w-10 h-10 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ backgroundColor: bgColors[idx % bgColors.length] }}
                      >
                        {cand.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#1B1F2A] truncate">{cand.name}</div>
                        <div className="text-xs text-[#5B6070] truncate">{cand.role}</div>
                      </div>
                      <div className="text-[11.5px] text-[#9498A6] font-mono whitespace-nowrap">
                        {relativeTimes[idx % relativeTimes.length]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'Feedback' && (
        <div className="bg-white border border-[#E2E4EA] rounded-2xl p-8 text-center text-[#5B6070]">
          <h3 className="text-lg font-bold text-[#1B1F2A] mb-2">Feedback &amp; Interview Notes</h3>
          <p className="text-sm max-w-md mx-auto">
            Semua catatan wawancara user dan umpan balik dari manajer unit terkumpul di sini secara terpusat.
          </p>
        </div>
      )}

      {activeTab === 'Reminders' && (
        <div className="bg-white border border-[#E2E4EA] rounded-2xl p-8 text-center text-[#5B6070]">
          <h3 className="text-lg font-bold text-[#1B1F2A] mb-2">Scheduled Reminders</h3>
          <p className="text-sm max-w-md mx-auto">
            Pengingat verifikasi berkas, tindak lanjut penawaran, dan jadwal psikotes karyawan baru.
          </p>
        </div>
      )}
    </div>
  );
};
