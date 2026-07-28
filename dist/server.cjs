var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var PORT = 3e3;
async function startServer() {
  const app = (0, import_express.default)();
  app.use(import_express.default.json());
  const apiKey = process.env.GEMINI_API_KEY;
  let ai = null;
  if (apiKey) {
    ai = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/ai/screen-candidate", async (req, res) => {
    try {
      const { candidateName, candidateRole, tagline, org, edu, jobPos, jobDept, jobDesc } = req.body;
      if (!ai) {
        return res.json({
          matchScore: 88,
          suitability: "Sangat Sesuai",
          strengths: [
            "Pengalaman kuat pada posisi sejenis",
            "Latar belakang pendidikan dan organisasi yang teruji",
            "Sesuai dengan kualifikasi departemen " + (jobDept || "terkait")
          ],
          growthAreas: [
            "Perlu penyesuaian regulasi internal proyek tambang/smelter",
            "Ekspektasi negosiasi remunerasinya perlu diklarifikasi"
          ],
          suggestedQuestions: [
            "Bagaimana pengalaman Anda menangani tantangan proyek skala besar?",
            "Apa metodologi utama yang Anda gunakan dalam pemecahan masalah?",
            "Bagaimana kepemimpinan Anda saat berkolaborasi lintas tim?"
          ],
          recommendation: "Highly Recommended"
        });
      }
      const prompt = `Secara profesional sebagai HR Expert & Senior Recruiter, evaluasi kelayakan kandidat berikut untuk posisi pekerjaan di perusahaan tambang & smelter:

Kandidat: ${candidateName || "Kandidat"}
Role/Keahlian: ${candidateRole || "Spesialis"}
Tagline: ${tagline || "-"}
Pengalaman/Organisasi: ${org || "-"}
Pendidikan: ${edu || "-"}

Posisi Pekerjaan Dilamar: ${jobPos || candidateRole}
Departemen: ${jobDept || "Operasional"}
Deskripsi Posisi: ${jobDesc || "Tugas operasional rekrutmen dan keahlian spesifik."}

Berikan keluaran dalam format JSON terstruktur persis dengan skema:
- matchScore: integer (0-100)
- suitability: string (contoh: "Sangat Sesuai", "Sesuai", "Perlu Pertimbangan")
- strengths: array of string (3 poin kekuatan utama kandidat)
- growthAreas: array of string (2 poin area pengembangan/risiko)
- suggestedQuestions: array of string (3 pertanyaan wawancara teknis/perilaku)
- recommendation: string ("Highly Recommended" | "Consider with Reservation" | "Not Recommended")
`;
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              matchScore: { type: import_genai.Type.INTEGER },
              suitability: { type: import_genai.Type.STRING },
              strengths: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              growthAreas: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              suggestedQuestions: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              recommendation: { type: import_genai.Type.STRING }
            },
            required: ["matchScore", "suitability", "strengths", "growthAreas", "suggestedQuestions", "recommendation"]
          }
        }
      });
      const jsonText = response.text ? response.text.trim() : "{}";
      const parsedData = JSON.parse(jsonText);
      return res.json(parsedData);
    } catch (err) {
      console.error("AI Screening Error:", err);
      return res.status(500).json({
        error: "Failed to generate AI evaluation",
        details: err?.message || "Unknown error"
      });
    }
  });
  app.post("/api/ai/generate-jd", async (req, res) => {
    try {
      const { positionName, department, company } = req.body;
      if (!ai) {
        return res.json({
          title: positionName || "Spesialis Operasional",
          department: department || "General",
          company: company || "Perusahaan",
          responsibilities: [
            "Mengelola operasional harian sesuai standar K3Lingkungan",
            "Menyusun laporan kinerja berkala kepada Head of Department",
            "Berkoordinasi dengan tim lintas unit bisnis untuk kelancaran proyek"
          ],
          requirements: [
            "Pendidikan minimal S1 Jurusan Terkait",
            "Pengalaman kerja minimal 2-3 tahun di industri sejenis",
            "Kemampuan komunikasi, analitis, dan adaptasi yang baik"
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
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              title: { type: import_genai.Type.STRING },
              department: { type: import_genai.Type.STRING },
              company: { type: import_genai.Type.STRING },
              responsibilities: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
              requirements: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } }
            },
            required: ["title", "department", "company", "responsibilities", "requirements"]
          }
        }
      });
      const parsedData = JSON.parse(response.text || "{}");
      return res.json(parsedData);
    } catch (err) {
      console.error("AI JD Generator Error:", err);
      return res.status(500).json({ error: "Failed to generate JD" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ATS Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
