
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { DrugInfo } from '../types.ts';

// Load API key from environment variables for better security
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("Google AI API Key is missing. Please add VITE_GEMINI_API_KEY to your .env.local file");
}

const ai = new GoogleGenerativeAI(API_KEY);
const MODEL_CANDIDATES = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
];

export async function fetchDrugInfo(drugName: string): Promise<DrugInfo> {
  const prompt = `You are a pharmacy technician assistant.
Return ONLY a single valid JSON object (no markdown fences or extra text) describing the drug "${drugName}" with this exact shape:
{
  "genericName": "string",
  "brandNames": ["string"],
  "commonUses": ["string"],
  "dosageForms": ["string"],
  "commonSideEffects": ["string"],
  "pharmacology": "string"
}`;

  let lastErr: unknown = null;
  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = ai.getGenerativeModel({ model: modelName });
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      });

      let jsonStr = result.response.text().trim();
      // Strip potential fences just in case
      const fenceRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?```$/;
      const m = jsonStr.match(fenceRegex);
      if (m && m[1]) jsonStr = m[1].trim();

      const parsed = JSON.parse(jsonStr);
      if (
        !parsed ||
        typeof parsed.genericName !== "string" ||
        !Array.isArray(parsed.brandNames) ||
        !Array.isArray(parsed.commonUses) ||
        !Array.isArray(parsed.dosageForms) ||
        !Array.isArray(parsed.commonSideEffects) ||
        typeof parsed.pharmacology !== "string"
      ) {
        throw new Error("Malformed AI JSON");
      }
      return parsed as DrugInfo;
    } catch (err) {
      console.warn(`Model ${modelName} failed for fetchDrugInfo:`, err);
      lastErr = err;
      // try next model
    }
  }
  console.error("All model candidates failed for fetchDrugInfo", lastErr);
  throw new Error("AI temporarily unavailable. Local results are shown below when available.");
}

interface PillCharacteristics {
  shape: string;
  form: 'tablet' | 'capsule' | '';
  color: string;
  imprint1: string;
  imprint2: string;
}

export async function identifyPill(characteristics: PillCharacteristics): Promise<string> {
    const { shape, form, color, imprint1, imprint2 } = characteristics;
    const prompt = `
        You are an expert pharmacy assistant AI. Identify a medication based on the following physical characteristics.
        - Shape: ${shape || 'Not provided'}
        - Form: ${form || 'Not provided'}
        - Color: ${color}
        - Imprint (Side 1): ${imprint1}
        - Imprint (Side 2): ${imprint2 || 'Not provided'}

        Based on this information, provide a list of possible medications. For each possibility, include the drug name (brand and generic), strength, and the manufacturer if available.
        Format the list of possibilities clearly.

        If the information is insufficient to make a positive identification, state that clearly and suggest what additional details might be helpful.

        Finally, include this exact disclaimer in bold: "**DISCLAIMER: This identification is based on provided data and should be confirmed by a licensed pharmacist. It is not a substitute for professional medical advice.**"

        Return the entire response as a single block of well-formatted text. Use markdown for lists and bolding to improve readability. Do not use JSON.
    `;

    let lastErr: unknown = null;
    for (const modelName of MODEL_CANDIDATES) {
      try {
        const model = ai.getGenerativeModel({ model: modelName });
        const result = await model.generateContent({
          contents: [
            { role: 'user', parts: [{ text: prompt }]}
          ]
        });
        let text = result.response.text();
        // Simple and reliable Markdown to HTML conversion
        // Convert bold text
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert bullet lists
        const lines = text.split('\n');
        const processedLines: string[] = [];
        let inList = false;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const isListItem = line.trim().startsWith('- ');

          if (isListItem) {
            if (!inList) {
              processedLines.push('<ul class="list-disc pl-6 space-y-1">');
              inList = true;
            }
            processedLines.push(`<li>${line.trim().substring(2)}</li>`);
          } else {
            if (inList) {
              processedLines.push('</ul>');
              inList = false;
            }
            if (line.trim()) {
              processedLines.push(`<p class="mb-2">${line}</p>`);
            }
          }
        }

        if (inList) {
          processedLines.push('</ul>');
        }

        return processedLines.join('\n');
      } catch (err) {
        console.warn(`Model ${modelName} failed for identifyPill:`, err);
        lastErr = err;
      }
    }
    console.error("All model candidates failed for identifyPill", lastErr);
    throw new Error("AI temporarily unavailable. Please try again shortly.");
}