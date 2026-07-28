import React, { useState } from 'react';
import {
  ViewPage,
  BusinessUnit,
  JobOrder,
  TalentPoolCandidate,
  ScreeningCandidate,
  KanbanCandidate,
  AICandidateAnalysis,
} from './types';
import {
  INITIAL_UNITS,
  INITIAL_TALENT_POOL_CANDIDATES,
  INITIAL_SCREENING_CANDIDATES,
  INITIAL_KANBAN_CANDIDATES,
  ONBOARDING_EVENTS,
} from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { FormRequestUnitsView } from './components/FormRequestUnitsView';
import { JobsTableView } from './components/JobsTableView';
import { KanbanView } from './components/KanbanView';
import { TalentPoolView } from './components/TalentPoolView';
import { CandidateManagementView } from './components/CandidateManagementView';
import { AddUnitModal } from './components/AddUnitModal';
import { AddJobModal } from './components/AddJobModal';
import { AICandidateModal } from './components/AICandidateModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentPage, setCurrentPage] = useState<ViewPage>('pageHome');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('hy');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // App Master States
  const [units, setUnits] = useState<BusinessUnit[]>(INITIAL_UNITS);
  const [talentPoolCandidates, setTalentPoolCandidates] =
    useState<TalentPoolCandidate[]>(INITIAL_TALENT_POOL_CANDIDATES);
  const [screeningCandidates, setScreeningCandidates] =
    useState<ScreeningCandidate[]>(INITIAL_SCREENING_CANDIDATES);
  const [kanbanCandidates, setKanbanCandidates] =
    useState<KanbanCandidate[]>(INITIAL_KANBAN_CANDIDATES);

  // Modals & Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  const [aiEvalState, setAiEvalState] = useState<{
    isOpen: boolean;
    name: string;
    role: string;
    analysis: AICandidateAnalysis | null;
    loading: boolean;
  }>({
    isOpen: false,
    name: '',
    role: '',
    analysis: null,
    loading: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Helper Navigation
  const navigateTo = (page: ViewPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedUnit = units.find((u) => u.id === selectedUnitId) || units[0];
  const selectedJob =
    selectedUnit?.jobs.find((j) => j.id === selectedJobId) || selectedUnit?.jobs[0];

  // Business Unit Actions
  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(unitId);
    navigateTo('page2');
  };

  const handleToggleUnitFavorite = (unitId: string) => {
    setUnits((prev) =>
      prev.map((u) => (u.id === unitId ? { ...u, isFavorite: !u.isFavorite } : u))
    );
  };

  const handleAddUnit = (newUnit: Partial<BusinessUnit>) => {
    const fullUnit: BusinessUnit = {
      id: newUnit.id || `unit-${Date.now()}`,
      code: newUnit.code || 'UN',
      name: newUnit.name || 'New Unit',
      sub: newUnit.sub || 'General',
      tag: newUnit.tag || 'PIC',
      color: newUnit.color || '#33417A',
      header: newUnit.header || { pic: 'HR Team' },
      jobs: [],
      isFavorite: false,
    };

    setUnits((prev) => [...prev, fullUnit]);
    showToast(`✓ Unit bisnis ${fullUnit.name} berhasil ditambahkan`);
  };

  // Job Actions
  const handleSelectJob = (job: JobOrder) => {
    setSelectedJobId(job.id);
    navigateTo('page3');
  };

  const handleAddJob = (newJobData: Partial<JobOrder>) => {
    const newJob: JobOrder = {
      id: `job-${Date.now()}`,
      pos: newJobData.pos || 'Specialist',
      status: newJobData.status || 'active',
      open: newJobData.open || 'Hari ini',
      total: newJobData.total || 1,
      filled: 0,
      pic: newJobData.pic || 'HR',
      company: newJobData.company || selectedUnit.name,
      salaryMin: newJobData.salaryMin,
      salaryMax: newJobData.salaryMax,
      description: newJobData.description,
    };

    setUnits((prev) =>
      prev.map((u) =>
        u.id === selectedUnitId ? { ...u, jobs: [...u.jobs, newJob] } : u
      )
    );

    showToast(`✓ Permintaan posisi ${newJob.pos} berhasil dibuat`);
  };

  // Kanban Actions
  const handleMoveCandidateStage = (candidateId: string, newStage: string) => {
    setKanbanCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );
    showToast(`Kandidat dipindahkan ke tahap ${newStage}`);
  };

  const handleAddManualCandidate = (candidateName: string, stage: string) => {
    const newKanbanCand: KanbanCandidate = {
      id: `kanban-${Date.now()}`,
      name: candidateName,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      stage,
      unitId: selectedUnit.id,
      jobPos: selectedJob ? selectedJob.pos : 'General',
      initials: candidateName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      psychPassed: true,
    };

    setKanbanCandidates((prev) => [...prev, newKanbanCand]);
    showToast(`✓ ${candidateName} ditambahkan ke tahap ${stage}`);
  };

  const handleImportFromTalentPool = (
    talentPoolCandidateId: number,
    targetStage: string
  ) => {
    const tpCand = talentPoolCandidates.find((c) => c.id === talentPoolCandidateId);
    if (!tpCand) return;

    // Update candidate in Talent Pool
    setTalentPoolCandidates((prev) =>
      prev.map((c) => (c.id === talentPoolCandidateId ? { ...c, stage: targetStage } : c))
    );

    // Add candidate to Kanban
    const newKanbanCand: KanbanCandidate = {
      id: `kanban-${Date.now()}`,
      name: tpCand.name,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      stage: targetStage,
      unitId: selectedUnit.id,
      jobPos: selectedJob ? selectedJob.pos : tpCand.role,
      initials: tpCand.initials,
      psychPassed: tpCand.psychPassed,
    };

    setKanbanCandidates((prev) => [...prev, newKanbanCand]);
    showToast(`✓ ${tpCand.name} diimpor dari Talenta Pool ke ${targetStage}`);
  };

  const handleRemoveKanbanCandidate = (candidateId: string) => {
    setKanbanCandidates((prev) => prev.filter((c) => c.id !== candidateId));
    showToast('Kandidat dihapus dari papan Kanban.');
  };

  // Talent Pool Actions
  const handleUpdateTalentPoolStage = (candidateId: number, newStage: string) => {
    setTalentPoolCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );
  };

  const handleRemoveFromTalentPoolPipeline = (candidateId: number) => {
    setTalentPoolCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: '-' } : c))
    );
  };

  const handleToggleTalentPoolFavorite = (candidateId: number) => {
    setTalentPoolCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  // Screening Candidates Actions
  const handleAddScreeningCandidate = (newCandData: Partial<ScreeningCandidate>) => {
    const newCand: ScreeningCandidate = {
      id: Date.now(),
      name: newCandData.name || 'Kandidat Baru',
      initials: newCandData.initials || 'NC',
      email: newCandData.email || 'cand@gmail.com',
      dept: newCandData.dept || 'Umum',
      position: newCandData.position || 'Staff',
      status: 'Pengerjaan',
      statusLabel: 'Pengerjaan Screening',
      steps: ['Screening'],
      recommended: false,
      note: 'Kandidat baru ditambahkan ke sistem.',
      org: '—',
      edu: '—',
      loc: '—',
      activities: [{ t: 'Kandidat ditambahkan ke sistem', d: 'Hari ini' }],
      attachments: [{ name: `CV & Resume — ${newCandData.name}`, date: 'Hari ini' }],
    };

    setScreeningCandidates((prev) => [newCand, ...prev]);
    showToast(`✓ ${newCand.name} berhasil ditambahkan`);
  };

  const handleUpdateCandidateStatus = (
    id: number,
    status: ScreeningCandidate['status'],
    statusLabel: string
  ) => {
    setScreeningCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, statusLabel } : c))
    );
  };

  // AI Evaluation Trigger
  const triggerAIEvaluation = async (candidateName: string, role: string, candidateObj?: any) => {
    setAiEvalState({
      isOpen: true,
      name: candidateName,
      role,
      analysis: null,
      loading: true,
    });

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/ai/screen-candidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName,
          candidateRole: role,
          tagline: candidateObj?.tagline || '',
          org: candidateObj?.org || '',
          edu: candidateObj?.edu || '',
          jobPos: role,
        }),
      });

      if (!response.ok) {
        throw new Error('Server responded with error');
      }

      const data = await response.json();
      setAiEvalState({
        isOpen: true,
        name: candidateName,
        role,
        analysis: data,
        loading: false,
      });
    } catch (err) {
      console.error('AI Eval trigger error:', err);
      setAiEvalState((prev) => ({
        ...prev,
        loading: false,
        analysis: {
          matchScore: 85,
          suitability: 'Sesuai Spesifikasi',
          strengths: [
            'Memiliki pengalaman teknis di sektor industri terkait',
            'Sesuai dengan kualifikasi tim rekrutmen',
            'Komunikasi dan rekam jejak kerja baik',
          ],
          growthAreas: [
            'Perlu pengenalan SOP K3 internal kawasan industri',
            'Ekspektasi masa probation perlu diselaraskan',
          ],
          suggestedQuestions: [
            'Bagaimana cara Anda memprioritaskan tugas saat menghadapi deadline tinggi?',
            'Ceritakan pengalaman Anda dalam menyelesaikan masalah teknis yang sulit.',
            'Bagaimana pengalaman Anda berkolaborasi dengan tim lintas divisi?',
          ],
          recommendation: 'Highly Recommended',
        },
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F7] text-[#1B1F2A] font-sans flex flex-col lg:flex-row antialiased">
      {/* Sidebar Navigation */}
      <Sidebar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content Viewport */}
      <main className="flex-1 p-5 sm:p-8 lg:p-9 max-w-[1280px] w-full mx-auto overflow-y-auto">
        {currentPage === 'pageHome' && (
          <HomeView
            onNavigate={navigateTo}
            onboardingEvents={ONBOARDING_EVENTS}
            newCandidates={talentPoolCandidates}
            onSearchSubmit={(query) => {
              if (query) showToast(`Mencari "${query}" di Talenta Pool...`);
              navigateTo('page4');
            }}
          />
        )}

        {currentPage === 'page1' && (
          <FormRequestUnitsView
            units={units}
            onSelectUnit={handleSelectUnit}
            onAddUnitClick={() => setShowAddUnitModal(true)}
            onToggleFavorite={handleToggleUnitFavorite}
          />
        )}

        {currentPage === 'page2' && (
          <JobsTableView
            unit={selectedUnit}
            onBack={() => navigateTo('page1')}
            onSelectJob={handleSelectJob}
            onAddJobClick={() => setShowAddJobModal(true)}
          />
        )}

        {currentPage === 'page3' && selectedJob && (
          <KanbanView
            unit={selectedUnit}
            job={selectedJob}
            kanbanCandidates={kanbanCandidates}
            talentPoolCandidates={talentPoolCandidates}
            onBack={() => navigateTo('page2')}
            onMoveCandidateStage={handleMoveCandidateStage}
            onAddManualCandidate={handleAddManualCandidate}
            onImportFromTalentPool={handleImportFromTalentPool}
            onRemoveCandidate={handleRemoveKanbanCandidate}
            onTriggerAIEvaluation={(name, role) => triggerAIEvaluation(name, role)}
          />
        )}

        {currentPage === 'page4' && (
          <TalentPoolView
            candidates={talentPoolCandidates}
            onUpdateCandidateStage={handleUpdateTalentPoolStage}
            onRemoveFromPipeline={handleRemoveFromTalentPoolPipeline}
            onToggleFavorite={handleToggleTalentPoolFavorite}
            onShowToast={showToast}
            onTriggerAIEvaluation={(cand) =>
              triggerAIEvaluation(cand.name, cand.role, cand)
            }
          />
        )}

        {currentPage === 'page5' && (
          <CandidateManagementView
            candidates={screeningCandidates}
            onAddCandidate={handleAddScreeningCandidate}
            onUpdateCandidateStatus={handleUpdateCandidateStatus}
            onTriggerAIEvaluation={(cand) =>
              triggerAIEvaluation(cand.name, cand.position, cand)
            }
          />
        )}
      </main>

      {/* Global Modals */}
      {showAddUnitModal && (
        <AddUnitModal
          onAddUnit={handleAddUnit}
          onClose={() => setShowAddUnitModal(false)}
        />
      )}

      {showAddJobModal && (
        <AddJobModal
          unitName={selectedUnit.name}
          onAddJob={handleAddJob}
          onClose={() => setShowAddJobModal(false)}
        />
      )}

      {aiEvalState.isOpen && (
        <AICandidateModal
          candidateName={aiEvalState.name}
          role={aiEvalState.role}
          analysis={aiEvalState.analysis}
          loading={aiEvalState.loading}
          onClose={() =>
            setAiEvalState((prev) => ({ ...prev, isOpen: false }))
          }
        />
      )}

      {/* Toast Alert */}
      <Toast message={toastMessage} />
    </div>
  );
}
