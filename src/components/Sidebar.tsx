import React, { useState } from 'react';
import { ViewPage } from '../types';
import { LayoutDashboard, FileText, Users, UserCheck, Menu, X } from 'lucide-react';

interface SidebarProps {
  currentPage: ViewPage;
  onNavigate: (page: ViewPage) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isFormRequestActive = currentPage === 'page1' || currentPage === 'page2' || currentPage === 'page3';

  const navItems = [
    {
      id: 'pageHome' as ViewPage,
      label: 'Home',
      icon: LayoutDashboard,
      isActive: currentPage === 'pageHome',
    },
    {
      id: 'page1' as ViewPage,
      label: 'Form Request',
      icon: FileText,
      isActive: isFormRequestActive,
    },
    {
      id: 'page4' as ViewPage,
      label: 'Talent Pool',
      icon: Users,
      isActive: currentPage === 'page4',
    },
    {
      id: 'page5' as ViewPage,
      label: 'Candidate',
      icon: UserCheck,
      isActive: currentPage === 'page5',
    },
  ];

  const handleNavClick = (page: ViewPage) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Bar Toggle */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E2E4EA] sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#33417A] via-[#2A3568] to-[#262E5C] shadow-sm flex-shrink-0" />
          <span className="text-xs tracking-tight text-[#9498A6]">
            ATS · <strong className="text-[#1B1F2A] font-extrabold text-sm">Pipeline</strong>
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg text-[#5B6070] hover:bg-[#ECEDF1] transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation Container */}
      <aside
        className={`
          fixed lg:static top-0 left-0 bottom-0 z-40
          w-[220px] bg-white border-r border-[#E2E4EA] px-3.5 py-5 flex flex-col gap-1.5
          transition-transform duration-200 ease-in-out shrink-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-2.5 pb-5 mb-2 border-b border-[#F3F4F7]">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#33417A] via-[#2A3568] to-[#262E5C] shadow-md flex-shrink-0" />
          <div>
            <div className="text-[11px] tracking-wider text-[#9498A6]">ATS · Recruitment</div>
            <strong className="block text-base tracking-tight text-[#1B1F2A] font-extrabold leading-none mt-0.5">
              Pipeline
            </strong>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full px-3.5 py-2.5 rounded-full text-[14px] font-semibold flex items-center gap-2.5 transition-all text-left
                  ${
                    item.isActive
                      ? 'bg-[#EEF0FA] text-[#262E5C] font-bold shadow-xs'
                      : 'text-[#5B6070] hover:bg-[#ECEDF1] hover:text-[#1B1F2A]'
                  }
                `}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    item.isActive ? 'bg-[#33417A]' : 'bg-[#CBCEDA]'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Subhead label */}
        <div className="pt-3 px-3.5 text-[11.5px] font-medium text-[#9498A6]">
          Screening &amp; Psychotest
        </div>
      </aside>
    </>
  );
};
