import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

// Simple in-memory storage for contacts (resets on server restart, but syncs with client localStorage)
interface ContactMsg {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
}

const contactMessages: ContactMsg[] = [
  {
    id: "msg1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Collaboration Opportunity",
    message: "Hi Alex, I love your portfolio and projects! We're looking for a Senior Full-Stack Engineer with AI experience for a new workspace automation project at TechVentures. Let me know if you are open to a freelance contract.",
    date: "July 08, 2026",
    status: "unread"
  }
];

// Lazy Gemini Initialization helper
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required for the AI chatbot. Please add it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Get current contact messages
  app.get("/api/messages", (req, res) => {
    res.json(contactMessages);
  });

  // Post a new contact message
  app.post("/api/messages", (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      const newMessage: ContactMsg = {
        id: "msg-" + Date.now(),
        name,
        email,
        subject: subject || "No Subject",
        message,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: "unread"
      };

      contactMessages.push(newMessage);
      return res.status(201).json({ success: true, message: "Message submitted successfully!", data: newMessage });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Mark message as read
  app.patch("/api/messages/:id/read", (req, res) => {
    const { id } = req.params;
    const msg = contactMessages.find(m => m.id === id);
    if (msg) {
      msg.status = 'read';
      return res.json({ success: true, data: msg });
    }
    return res.status(404).json({ error: "Message not found." });
  });

  // Delete message
  app.delete("/api/messages/:id", (req, res) => {
    const { id } = req.params;
    const index = contactMessages.findIndex(m => m.id === id);
    if (index !== -1) {
      contactMessages.splice(index, 1);
      return res.json({ success: true, message: "Message deleted." });
    }
    return res.status(404).json({ error: "Message not found." });
  });

  // AI Portfolio Assistant endpoint (recommends gemini-3.5-flash for Basic Text Q&A)
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, portfolioData } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request payload. Messages must be an array." });
      }

      // Initialize Gemini
      const ai = getGeminiClient();

      // Extract details from current portfolio data or fall back to default
      const profile = portfolioData?.profile || {};
      const skillsStr = (portfolioData?.skills || []).map((s: any) => `- ${s.name} (${s.category}, level: ${s.level}%)`).join("\n");
      const projectsStr = (portfolioData?.projects || []).map((p: any) => `- **${p.name}** (${p.category}): ${p.description}\n  Tech: ${p.technologies.join(", ")}`).join("\n");
      const achievementsStr = (portfolioData?.achievements || []).map((a: any) => `- ${a.title} by ${a.organization} (${a.date})`).join("\n");
      const experiencesStr = (portfolioData?.experiences || []).map((e: any) => `- ${e.position} at ${e.company} (${e.duration})`).join("\n");
      const educationStr = (portfolioData?.education || []).map((ed: any) => `- ${ed.degree} from ${ed.university} (${ed.graduationYear})`).join("\n");

      // Construct the system instruction to give context about the developer
      const systemInstruction = `
You are an intelligent, highly professional AI Assistant named BOOPATHI, acting on behalf of ${profile.name || "Dharmenthira Boopathi"}, a ${profile.title || "Computer Science & Web Systems Engineer"}.
Your goal is to represent them impeccably to recruiters, hiring managers, potential clients, and collaborators.

Here is the current, up-to-date background information about ${profile.name || "Dharmenthira Boopathi"}:
- **Bio**: ${profile.bio}
- **Contact**: Email: ${profile.email}, Phone: ${profile.phone}, Location: ${profile.location}
- **LinkedIn**: ${profile.linkedin}
- **GitHub**: ${profile.github}
- **Twitter/X**: ${profile.twitter}

### Core Experience:
${experiencesStr}

### Education:
${educationStr}

### Technical Skills:
${skillsStr}

### Outstanding Projects:
${projectsStr}

### Achievements & Certifications:
${achievementsStr}

### Chatbot Behaviors and Tone:
1. Speak clearly, concisely, and with professional, warm confidence. Use the first person plural "we" or refer to the developer as "${profile.name || "Boopathi"}" or "I" naturally.
2. Provide direct, helpful, and technically accurate responses. If asked about experience, pull from the provided lists.
3. Keep answers concise (ideally 1-3 short paragraphs) with scannable bullet points if helpful.
4. If asked about topics unrelated to ${profile.name || "Boopathi"}'s professional background, skills, or projects, politely steer the conversation back: e.g., "While I can discuss general topics, as ${profile.name}'s assistant BOOPATHI, I would love to tell you about their Noval Reading interactive portal or their Web Performance optimization cases!"
5. Format your response elegantly in clear Markdown. Do not output raw HTML tags or escape symbols.
`;

      // Map incoming messages to Gemini contents structure.
      // Gemini expects: contents: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
      const formattedContents = messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Call Gemini 3.5 Flash for conversational Q&A
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm sorry, I couldn't formulate a response. Let's try again.";
      return res.json({ reply: replyText });

    } catch (err: any) {
      console.error("Gemini Assistant Error:", err);
      // Fallback gracefully
      const errMessage = err.message || "An unknown error occurred.";
      if (errMessage.includes("GEMINI_API_KEY")) {
        return res.status(500).json({ error: "Gemini API key is not configured in the Secrets panel. Please ask the workspace owner to set GEMINI_API_KEY." });
      }
      return res.status(500).json({ error: `AI Assistant Error: ${errMessage}` });
    }
  });

  // Vite Dev / Prod static serving middleware
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio Full-Stack Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
