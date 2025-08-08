
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { DrugInfo } from '../types.ts';

// The API key has been added here as requested to allow the application to run.
// For production environments, it's strongly recommended to use a more secure method
// like environment variables loaded during a build process or a backend proxy,
// to avoid exposing the key in client-side code.
const API_KEY = "AIzaSyBxDCMOXDe3mbSsBEgWSEQp9Kr0l_fbsuQ";

if (!API_KEY) {
    // This is a critical error, the app cannot function without the API key.
    // In a real app, you might want to display a user-friendly error message.
    throw new Error("Google AI API Key is missing. Please add it to components/geminiService.ts");
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
        // Basic Markdown to HTML
         text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^- (.*$)/gm, '<li>$1</li>')
                    .replace(
                      /(\n)?(<ul>|<ol>)?((<li>.*<\/li>)+)(<\/ul>|<\/ol>)?(\n)?/gs,
                      (
                        _m: string,
                        _p1: string,
                        _p2: string,
                        p3: string,
                        _p4: string,
                        _p5: string,
                        _p6: string
                      ) => {
                        return `<ul>${p3}</ul>`;
                      }
                    )
                    .replace(/\n/g, '<br />')
                    .replace(/<br \s*\/?><ul>/g, '<ul>')
                    .replace(/<\/ul><br \s*\/?>/g, '</ul>');
        return text;
      } catch (err) {
        console.warn(`Model ${modelName} failed for identifyPill:`, err);
        lastErr = err;
      }
    }
    console.error("All model candidates failed for identifyPill", lastErr);
    throw new Error("AI temporarily unavailable. Please try again shortly.");
}