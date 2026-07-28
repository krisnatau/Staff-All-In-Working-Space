import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini API
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Healthcheck endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Screening & Match Evaluation Endpoint
  app.post('/api/ai/screen-candidate', async (req, res) => {
    try {
      const { candidateName, candidateRole, tagline, org, edu, jobPos, jobDept, jobDesc } = req.body;

      if (!ai) {
        // Fallback simulation if GEMINI_API_KEY is not set yet
        return res.json({
          matchScore: 88,
          suitability: 'Sangat Sesuai',
          strengths: [
            'Pengalaman kuat pada posisi sejenis',
            'Latar belakang pendidikan dan organisasi yang teruji',
            'Sesuai dengan kualifikasi departemen ' + (jobDept || 'terkait')
          ],
          growthAreas: [
            'Perlu penyesuaian regulasi internal proyek tambang/smelter',
            'Ekspektasi negosiasi remunerasinya perlu diklarifikasi'
          ],
          suggestedQuestions: [
            'Bagaimana pengalaman Anda menangani tantangan proyek skala besar?',
            'Apa metodologi utama yang Anda gunakan dalam pemecahan masalah?',
            'Bagaimana kepemimpinan Anda saat berkolaborasi lintas tim?'
          ],
          recommendation: 'Highly Recommended'
        });
      }

      const prompt = `Secara profesional sebagai HR Expert & Senior Recruiter, evaluasi kelayakan kandidat berikut untuk posisi pekerjaan di perusahaan tambang & smelter:

Kandidat: ${candidateName || 'Kandidat'}
Role/Keahlian: ${candidateRole || 'Spesialis'}
Tagline: ${tagline || '-'}
Pengalaman/Organisasi: ${org || '-'}
Pendidikan: ${edu || '-'}

Posisi Pekerjaan Dilamar: ${jobPos || candidateRole}
Departemen: ${jobDept || 'Operasional'}
Deskripsi Posisi: ${jobDesc || 'Tugas operasional rekrutmen dan keahlian spesifik.'}

Berikan keluaran dalam format JSON terstruktur persis dengan skema:
- matchScore: integer (0-100)
- suitability: string (contoh: "Sangat Sesuai", "Sesuai", "Perlu Pertimbangan")
- strengths: array of string (3 poin kekuatan utama kandidat)
- growthAreas: array of string (2 poin area pengembangan/risiko)
- suggestedQuestions: array of string (3 pertanyaan wawancara teknis/perilaku)
- recommendation: string ("Highly Recommended" | "Consider with Reservation" | "Not Recommended")
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchScore: { type: Type.INTEGER },
              suitability: { type: Type.STRING },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              growthAreas: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              suggestedQuestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              recommendation: { type: Type.STRING }
            },
            required: ['matchScore', 'suitability', 'strengths', 'growthAreas', 'suggestedQuestions', 'recommendation']
          }
        }
      });

      const jsonText = response.text ? response.text.trim() : '{}';
      const parsedData = JSON.parse(jsonText);
      return res.json(parsedData);
    } catch (err: any) {
      console.error('AI Screening Error:', err);
      return res.status(500).json({
        error: 'Failed to generate AI evaluation',
        details: err?.message || 'Unknown error'
      });
    }
  });

  // AI Job Description Generator Endpoint
  app.post('/api/ai/generate-jd', async (req, res) => {
    try {
      const { positionName, department, company } = req.body;

      if (!ai) {
        return res.json({
          title: positionName || 'Spesialis Operasional',
          department: department || 'General',
          company: company || 'Perusahaan',
          responsibilities: [
            'Mengelola operasional harian sesuai standar K3Lingkungan',
            'Menyusun laporan kinerja berkala kepada Head of Department',
            'Berkoordinasi dengan tim lintas unit bisnis untuk kelancaran proyek'
          ],
          requirements: [
            'Pendidikan minimal S1 Jurusan Terkait',
            'Pengalaman kerja minimal 2-3 tahun di industri sejenis',
            'Kemampuan komunikasi, analitis, dan adaptasi yang baik'
          ]
        });
      }

      const prompt = `Buatlah deskripsi pekerjaan (Job Description) yang ringkas dan profesional untuk posisi:
Posisi: ${positionName}
Departemen: ${department}
Perusahaan: ${company}

Kembalikan format JSON:
- title: string
- department: string
- company: string
- responsibilities: array of string (3 tugas utama)
- requirements: array of string (3 kualifikasi utama)
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              department: { type: Type.STRING },
              company: { type: Type.STRING },
              responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
              requirements: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['title', 'department', 'company', 'responsibilities', 'requirements']
          }
        }
      });

      const parsedData = JSON.parse(response.text || '{}');
      return res.json(parsedData);
    } catch (err: any) {
      console.error('AI JD Generator Error:', err);
      return res.status(500).json({ error: 'Failed to generate JD' });
    }
  });

  // Vite or Static files handling
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ATS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
