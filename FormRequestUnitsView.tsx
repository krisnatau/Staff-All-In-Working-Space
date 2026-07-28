import { BusinessUnit, TalentPoolCandidate, ScreeningCandidate, KanbanCandidate, OnboardingEvent } from '../types';

export const INITIAL_UNITS: BusinessUnit[] = [
  {
    id: 'hy',
    code: 'Hy',
    name: 'Hidrometallurgy',
    sub: 'BSE · GCNK',
    tag: 'Dummy\nLisa',
    color: '#33417A',
    header: { pic: 'Danang · Lisa' },
    isFavorite: false,
    jobs: [
      {
        id: 'hy-1',
        pos: 'Junior Specialist',
        status: 'active',
        open: '22-05-2026',
        total: 3,
        filled: 1,
        pic: 'Lisa',
        company: 'GCNK',
        department: 'Hidrometallurgy',
        salaryMin: '12.000.000',
        salaryMax: '18.000.000',
        description: 'Menganalisis proses ekstraksi hidrometalurgi dan optimalisasi pemulihan nikel-kobalt.'
      },
      {
        id: 'hy-2',
        pos: 'PPR',
        status: 'done',
        open: '01-02-2026',
        total: 1,
        filled: 1,
        pic: 'Danang',
        company: 'BSE',
        department: 'Hidrometallurgy',
        salaryMin: '15.000.000',
        salaryMax: '20.000.000',
        description: 'Petugas Proteksi Radiasi untuk pengawasan fasilitas pemrosesan.'
      }
    ]
  },
  {
    id: 'hse',
    code: 'HSE',
    name: 'Wedabay Medical Center',
    sub: 'HSE · MMC',
    tag: 'Dummy\nLisa',
    color: '#5B6BA8',
    header: { pic: 'Lisa' },
    isFavorite: false,
    jobs: [
      {
        id: 'hse-1',
        pos: 'Occupational Nurse',
        status: 'urgent',
        open: '10-06-2026',
        total: 2,
        filled: 0,
        pic: 'Lisa',
        company: 'MMC',
        department: 'Wedabay Medical Center',
        salaryMin: '10.000.000',
        salaryMax: '14.000.000',
        description: 'Pelayanan kesehatan kerja emergency dan pemeriksaan berkala karyawan.'
      },
      {
        id: 'hse-2',
        pos: 'HSE Officer',
        status: 'active',
        open: '03-04-2026',
        total: 2,
        filled: 1,
        pic: 'Lisa',
        company: 'MMC',
        department: 'HSE',
        salaryMin: '11.000.000',
        salaryMax: '16.000.000',
        description: 'Inspeksi keselamatan kerja, audit K3Lingkungan, dan pelatihan insiden.'
      }
    ]
  },
  {
    id: 'ipm',
    code: 'IPM',
    name: 'Inno Prima Mineral',
    sub: 'Lisa',
    tag: 'Lisa',
    color: '#2E6E5C',
    header: { pic: 'Lisa' },
    isFavorite: false,
    jobs: [
      {
        id: 'ipm-1',
        pos: 'Mine Planning Engineer',
        status: 'hold',
        open: '18-03-2026',
        total: 1,
        filled: 0,
        pic: 'Lisa',
        company: 'IPM',
        department: 'Mining Operations',
        salaryMin: '18.000.000',
        salaryMax: '25.000.000',
        description: 'Perencanaan tambang jangka pendek dan panjang serta pemodelan cadangan tambang.'
      }
    ]
  },
  {
    id: 'fn',
    code: 'FN',
    name: 'Ferronickel',
    sub: 'Lisa',
    tag: 'Lisa',
    color: '#8C5A2B',
    header: { pic: 'Lisa' },
    isFavorite: false,
    jobs: [
      {
        id: 'fn-1',
        pos: 'Smelter Technician',
        status: 'active',
        open: '29-05-2026',
        total: 4,
        filled: 2,
        pic: 'Lisa',
        company: 'FN',
        department: 'Smelter Production',
        salaryMin: '9.000.000',
        salaryMax: '13.000.000',
        description: 'Operasi tanur tiup dan pemeliharaan kiln peleburan ferronikel.'
      },
      {
        id: 'fn-2',
        pos: 'QA/QC Inspector',
        status: 'done',
        open: '14-01-2026',
        total: 1,
        filled: 1,
        pic: 'Lisa',
        company: 'FN',
        department: 'Quality Assurance',
        salaryMin: '10.000.000',
        salaryMax: '15.000.000',
        description: 'Inspeksi kualitas produk olahan produk smelter sebelum pengapalan.'
      }
    ]
  },
  {
    id: 'tek',
    code: 'Tek',
    name: 'Tekindo',
    sub: 'Evy',
    tag: 'Evy',
    color: '#A0472E',
    header: { pic: 'Evy' },
    isFavorite: false,
    jobs: [
      {
        id: 'tek-1',
        pos: 'Logistics Coordinator',
        status: 'active',
        open: '05-05-2026',
        total: 2,
        filled: 1,
        pic: 'Evy',
        company: 'Tekindo',
        department: 'Supply Chain',
        salaryMin: '11.000.000',
        salaryMax: '15.000.000',
        description: 'Koordinasi pergerakan armada material, pergudangan, dan jadwal kapal.'
      }
    ]
  },
  {
    id: 'air',
    code: 'Airp',
    name: 'Airport',
    sub: 'Evy',
    tag: 'Evy',
    color: '#4A5568',
    header: { pic: 'Evy' },
    isFavorite: false,
    jobs: [
      {
        id: 'air-1',
        pos: 'Ground Handling Staff',
        status: 'urgent',
        open: '21-06-2026',
        total: 6,
        filled: 2,
        pic: 'Evy',
        company: 'Airport',
        department: 'Aviation Logistics',
        salaryMin: '7.500.000',
        salaryMax: '10.500.000',
        description: 'Penanganan kargo pesawat, pendaftaran penumpang khusus, dan keselamatan runway.'
      }
    ]
  }
];

export const INITIAL_TALENT_POOL_CANDIDATES: TalentPoolCandidate[] = [
  {
    id: 1,
    initials: 'AF',
    name: 'Ahmad Fauzi',
    role: 'Senior Fullstack Developer',
    loc: 'Jakarta',
    rate: '19.000.000',
    unit: 'bulan',
    status: 'top',
    tagline: 'Spesialis arsitektur sistem dan cloud scaling.',
    org: 'PT Telkom Indonesia · ITB · Bandung',
    applied: '28 Juni 2026',
    stage: 'Interview',
    psychPassed: true,
    isFavorite: true,
    projectsCount: 1,
    messagesCount: 0,
    feedbackCount: 0,
    activities: [
      { t: 'Kandidat kini berada pada tahap <b>Interview</b>', d: 'Hari ini' },
      { t: 'Dilihat oleh Krisna Taufik Akbar', d: '27/6/2026' }
    ],
    attachments: [
      { name: 'CV & Resume — Ahmad Fauzi', date: '28 Juni 2026' },
      { name: 'Portofolio Arsitektur Cloud', date: '28 Juni 2026' },
      { name: 'Sertifikat AWS Solution Architect', date: '15 Mei 2026' }
    ]
  },
  {
    id: 2,
    initials: 'SR',
    name: 'Siti Rahma',
    role: 'Product Manager',
    loc: 'Surabaya',
    rate: '22.500.000',
    unit: 'bulan',
    status: 'top',
    tagline: 'Pengembangan produk agile & user-centric.',
    org: 'PT Tokopedia · Universitas Airlangga · Surabaya',
    applied: '27 Juni 2026',
    stage: 'Penawaran',
    psychPassed: true,
    isFavorite: true,
    projectsCount: 2,
    messagesCount: 1,
    feedbackCount: 1,
    activities: [
      { t: 'Kandidat kini berada pada tahap <b>Penawaran</b>', d: 'Kemarin' },
      { t: 'Penawaran gaji dikirim oleh HR Recruitment', d: '27/6/2026' }
    ],
    attachments: [
      { name: 'CV & Resume — Siti Rahma', date: '27 Juni 2026' },
      { name: 'PRD Sample — Fintech App', date: '27 Juni 2026' }
    ]
  },
  {
    id: 3,
    initials: 'BS',
    name: 'Budi Santoso',
    role: 'DevOps Engineer',
    loc: 'Bandung',
    rate: '17.000.000',
    unit: 'bulan',
    status: 'avail',
    tagline: 'Automasi CI/CD dan manajemen infrastruktur.',
    org: 'PT Bukalapak · Telkom University · Bandung',
    applied: '26 Juni 2026',
    stage: 'Administrasi',
    psychPassed: false,
    isFavorite: false,
    projectsCount: 0,
    messagesCount: 0,
    feedbackCount: 0,
    activities: [
      { t: 'Kandidat kini berada pada tahap <b>Administrasi</b>', d: '26/6/2026' }
    ],
    attachments: [
      { name: 'CV & Resume — Budi Santoso', date: '26 Juni 2026' }
    ]
  },
  {
    id: 4,
    initials: 'DN',
    name: 'Dian Novita',
    role: 'UI/UX Lead',
    loc: 'Yogyakarta',
    rate: '15.000.000',
    unit: 'bulan',
    status: 'top',
    tagline: 'Desain interaksi intuitif dan riset pengguna.',
    org: 'PT GoTo · UGM · Yogyakarta',
    applied: '25 Juni 2026',
    stage: 'Onboarding',
    psychPassed: true,
    isFavorite: true,
    projectsCount: 3,
    messagesCount: 2,
    feedbackCount: 2,
    activities: [
      { t: 'Jadwal onboarding dikonfirmasi untuk 30 Juli 2026', d: '25/6/2026' }
    ],
    attachments: [
      { name: 'CV & Resume — Dian Novita', date: '25 Juni 2026' },
      { name: 'Figma Design System Portfolio', date: '25 Juni 2026' }
    ]
  },
  {
    id: 5,
    initials: 'RA',
    name: 'Rian Ardiansyah',
    role: 'Data Scientist',
    loc: 'Jakarta',
    rate: '20.000.000',
    unit: 'bulan',
    status: 'top',
    tagline: 'Machine learning model & predictive analytics.',
    org: 'PT Shopee · UI · Depok',
    applied: '24 Juni 2026',
    stage: 'MCU',
    psychPassed: true,
    isFavorite: false,
    projectsCount: 1,
    messagesCount: 0,
    feedbackCount: 1,
    activities: [
      { t: 'Pemeriksaan MCU dijadwalkan di WMC', d: '24/6/2026' }
    ],
    attachments: [
      { name: 'CV & Resume — Rian Ardiansyah', date: '24 Juni 2026' }
    ]
  },
  {
    id: 6,
    initials: 'NW',
    name: 'Nadia Wulandari',
    role: 'QA Automation Engineer',
    loc: 'Malang',
    rate: '13.500.000',
    unit: 'bulan',
    status: 'avail',
    tagline: 'Pengujian sistem otomatis dan quality assurance.',
    org: 'PT Traveloka · Universitas Brawijaya · Malang',
    applied: '23 Juni 2026',
    stage: 'Tanda Tangan',
    psychPassed: false,
    isFavorite: false,
    projectsCount: 0,
    messagesCount: 0,
    feedbackCount: 0,
    activities: [
      { t: 'Kandidat menerima dokumen Perjanjian Kerja', d: '23/6/2026' }
    ],
    attachments: [
      { name: 'CV & Resume — Nadia Wulandari', date: '23 Juni 2026' }
    ]
  },
  {
    id: 7,
    initials: 'EP',
    name: 'Eko Prasetyo',
    role: 'Backend Developer',
    loc: 'Semarang',
    rate: '16.500.000',
    unit: 'bulan',
    status: 'top',
    tagline: 'Robust REST API & microservices architecture.',
    org: 'PT Blibli · UNDIP · Semarang',
    applied: '22 Juni 2026',
    stage: 'Interview',
    psychPassed: true,
    isFavorite: false,
    projectsCount: 1,
    messagesCount: 0,
    feedbackCount: 0,
    activities: [
      { t: 'Lolos screening awal dan direkomendasikan ke User', d: '22/6/2026' }
    ],
    attachments: [
      { name: 'CV & Resume — Eko Prasetyo', date: '22 Juni 2026' }
    ]
  },
  {
    id: 8,
    initials: 'LM',
    name: 'Lestari Maharani',
    role: 'Frontend Developer',
    loc: 'Bali',
    rate: '14.000.000',
    unit: 'bulan',
    status: 'avail',
    tagline: 'ReactJS, VueJS, dan modern web performance.',
    org: 'PT Ruangguru · Universitas Udayana · Bali',
    applied: '21 Juni 2026',
    stage: 'Penawaran',
    psychPassed: false,
    isFavorite: false,
    projectsCount: 1,
    messagesCount: 1,
    feedbackCount: 0,
    activities: [
      { t: 'Penawaran dikirim melalui email', d: '21/6/2026' }
    ],
    attachments: [
      { name: 'CV & Resume — Lestari Maharani', date: '21 Juni 2026' }
    ]
  }
];

export const INITIAL_SCREENING_CANDIDATES: ScreeningCandidate[] = [
  {
    id: 1,
    name: 'Titania',
    initials: 'T',
    email: 'Titan@gmail.com',
    dept: 'HRD',
    position: 'Senior HR Officer',
    status: 'Pengerjaan',
    statusLabel: 'Pengerjaan Screening',
    steps: ['Screening'],
    recommended: false,
    note: 'Sedang menjalani proses screening awal.',
    org: '—',
    edu: '—',
    loc: '—',
    activities: [{ t: 'Kandidat dipindahkan ke tahap <b>Screening</b>', d: '20/6/2026' }],
    attachments: [{ name: 'CV & Resume — Titania', date: '18 Juni 2026' }]
  },
  {
    id: 2,
    name: 'Krisna',
    initials: 'K',
    email: 'Krisna@gmaiil.com',
    dept: 'Wedabay Medical Center',
    position: 'Dokter Umum',
    status: 'Done',
    statusLabel: 'Done',
    steps: ['Screening', 'Psikotest'],
    recommended: true,
    note: 'Menyelesaikan seluruh tahap seleksi dengan hasil baik.',
    org: 'Wedabay Medical Center',
    edu: 'Universitas Indonesia',
    loc: 'Jakarta, Indonesia',
    activities: [{ t: 'Krisna Taufik Akbar memindahkan kandidat ke tahap <b>Selesai</b>', d: '27/6/2026' }],
    attachments: [{ name: 'CV & Resume — Krisna', date: '24 Juni 2026' }]
  },
  {
    id: 3,
    name: 'Mock up 1',
    initials: 'M',
    email: 'Mockup1@hotmail.com',
    dept: 'HSE',
    position: 'Safety Engineer',
    status: 'Pengerjaan',
    statusLabel: 'Pengerjaan Psikotest',
    steps: ['Screening'],
    recommended: false,
    note: 'Lolos screening, menunggu jadwal psikotes.',
    org: '—',
    edu: '—',
    loc: '—',
    activities: [{ t: 'Kandidat dipindahkan ke tahap <b>Psikotest</b>', d: '22/6/2026' }],
    attachments: [{ name: 'Hasil screening — Mock up 1', date: '20 Juni 2026' }]
  },
  {
    id: 4,
    name: 'Farah Adiba',
    initials: 'FA',
    email: 'farah.adiba@gmail.com',
    dept: 'Hidrometallurgy',
    position: 'Junior Specialist',
    status: 'Pengerjaan',
    statusLabel: 'Pengerjaan Screening',
    steps: [],
    recommended: false,
    note: 'Baru mendaftar, menunggu jadwal screening.',
    org: '—',
    edu: 'Institut Teknologi Bandung',
    loc: 'Bandung, Indonesia',
    activities: [{ t: 'Kandidat mendaftar untuk posisi <b>Junior Specialist</b>', d: '25/7/2026' }],
    attachments: [{ name: 'CV & Resume — Farah Adiba', date: '25 Juli 2026' }]
  },
  {
    id: 5,
    name: 'Reza Hakiki',
    initials: 'RH',
    email: 'reza.hakiki@yahoo.com',
    dept: 'Ferronickel',
    position: 'Smelter Technician',
    status: 'Done',
    statusLabel: 'Done',
    steps: ['Screening', 'Psikotest'],
    recommended: true,
    note: 'Lulus seluruh tahapan seleksi dengan nilai psikotes tinggi.',
    org: 'PT Vale Indonesia · Universitas Hasanuddin · Makassar',
    edu: 'Universitas Hasanuddin',
    loc: 'Makassar, Indonesia',
    activities: [{ t: 'Reza dipindahkan ke tahap <b>Selesai</b>', d: '26/7/2026' }],
    attachments: [{ name: 'CV & Resume — Reza Hakiki', date: '22 Juli 2026' }]
  },
  {
    id: 6,
    name: 'Clara Situmorang',
    initials: 'CS',
    email: 'clara.situmorang@gmail.com',
    dept: 'Wedabay Medical Center',
    position: 'Occupational Nurse',
    status: 'Pending',
    statusLabel: 'Pengerjaan Psikotest',
    steps: ['Screening'],
    recommended: false,
    note: 'Lolos screening, terjadwal psikotes minggu ini.',
    org: '—',
    edu: 'Universitas Padjadjaran',
    loc: 'Bandung, Indonesia',
    activities: [{ t: 'Kandidat dipindahkan ke tahap <b>Psikotest</b>', d: '24/7/2026' }],
    attachments: [{ name: 'CV & Resume — Clara Situmorang', date: '20 Juli 2026' }]
  },
  {
    id: 7,
    name: 'Yusuf Maulana',
    initials: 'YM',
    email: 'yusuf.maulana@outlook.com',
    dept: 'Inno Prima Mineral',
    position: 'Mine Planning Engineer',
    status: 'Cancel',
    statusLabel: 'Cancel',
    steps: ['Screening'],
    recommended: false,
    note: 'Kandidat mengundurkan diri sebelum psikotes.',
    org: '—',
    edu: 'Institut Teknologi Sepuluh Nopember',
    loc: 'Surabaya, Indonesia',
    activities: [{ t: 'Kandidat mengundurkan diri dari proses seleksi', d: '23/7/2026' }],
    attachments: [{ name: 'CV & Resume — Yusuf Maulana', date: '15 Juli 2026' }]
  },
  {
    id: 8,
    name: 'Intan Permatasari',
    initials: 'IP',
    email: 'intan.permatasari@gmail.com',
    dept: 'Tekindo',
    position: 'Logistics Coordinator',
    status: 'Pengerjaan',
    statusLabel: 'Pengerjaan Screening',
    steps: [],
    recommended: false,
    note: 'Menunggu jadwal screening awal.',
    org: '—',
    edu: 'Universitas Diponegoro',
    loc: 'Semarang, Indonesia',
    activities: [{ t: 'Kandidat mendaftar untuk posisi <b>Logistics Coordinator</b>', d: '27/7/2026' }],
    attachments: [{ name: 'CV & Resume — Intan Permatasari', date: '27 Juli 2026' }]
  }
];

export const INITIAL_KANBAN_CANDIDATES: KanbanCandidate[] = [
  {
    id: 'k-1',
    name: 'John Doe',
    date: '24-05-2026',
    stage: 'Interview',
    unitId: 'hy',
    jobPos: 'Junior Specialist',
    initials: 'JD',
    psychPassed: true
  },
  {
    id: 'k-2',
    name: 'Jeandean Pale',
    date: '12-02-2026',
    stage: 'Onboarding',
    unitId: 'hy',
    jobPos: 'PPR',
    initials: 'JP',
    psychPassed: true
  },
  {
    id: 'k-3',
    name: 'Nanda Pratama',
    date: '10-06-2026',
    stage: 'Interview',
    unitId: 'hse',
    jobPos: 'Occupational Nurse',
    initials: 'NP',
    psychPassed: true
  },
  {
    id: 'k-4',
    name: 'Ayu Kartika',
    date: '11-06-2026',
    stage: 'Penawaran',
    unitId: 'hse',
    jobPos: 'Occupational Nurse',
    initials: 'AK',
    psychPassed: true
  }
];

export const ONBOARDING_EVENTS: OnboardingEvent[] = [
  {
    id: 'cal-1',
    month: 'Jul',
    day: '28',
    name: 'Ahmad Fauzi',
    role: 'Senior Fullstack Developer',
    dept: 'IT Dept'
  },
  {
    id: 'cal-2',
    month: 'Jul',
    day: '30',
    name: 'Dian Novita',
    role: 'UI/UX Lead',
    dept: 'Digital Strategy'
  },
  {
    id: 'cal-3',
    month: 'Aug',
    day: '02',
    name: 'Budi Santoso',
    role: 'DevOps Engineer',
    dept: 'Infrastructure'
  }
];

export const FORM_REQUEST_STAGES = [
  'Interview',
  'Penawaran',
  'Administrasi',
  'Onboarding',
  'MCU',
  'Tanda Tangan',
  'Lainnya'
];
