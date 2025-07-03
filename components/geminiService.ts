
import { GoogleGenAI } from "@google/genai";
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

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function fetchDrugInfo(drugName: string): Promise<DrugInfo> {
    const prompt = `
        Provide a concise summary for the drug "${drugName}" for a pharmacy technician.
        Return the information as a single, valid JSON object. Do not include any text, markdown formatting, or code fences before or after the JSON object.
        The JSON object must have the following structure and data types:
        {
          "genericName": "string",
          "brandNames": ["string"],
          "commonUses": ["string"],
          "dosageForms": ["string"],
          "commonSideEffects": ["string"],
          "pharmacology": "string (a brief, easy-to-understand explanation of the mechanism of action)"
        }
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.2,
            },
        });

        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }

        const parsedData = JSON.parse(jsonStr);
        
        // Basic validation
        if (typeof parsedData.genericName !== 'string' || !Array.isArray(parsedData.brandNames)) {
            throw new Error("Received malformed JSON data from AI.");
        }

        return parsedData as DrugInfo;

    } catch (error) {
        console.error("Error fetching drug information from Gemini:", error);
        throw new Error("Failed to retrieve drug information. The AI model may be unavailable or the drug name may not be recognized.");
    }
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

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                temperature: 0.3,
            },
        });
        
        let text = response.text;
        // Basic Markdown to HTML
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                   .replace(/^- (.*$)/gm, '<li>$1</li>')
                   .replace(/(\n)?(<ul>|<ol>)?((<li>.*<\/li>)+)(<\/ul>|<\/ol>)?(\n)?/gs, (match, p1, p2, p3, p4, p5, p6) => {
                       return `<ul>${p3}</ul>`;
                   })
                   .replace(/\n/g, '<br />')
                   .replace(/<br \s*\/?><ul>/g, '<ul>')
                   .replace(/<\/ul><br \s*\/?>/g, '</ul>');

        return text;

    } catch (error) {
        console.error("Error identifying pill from Gemini:", error);
        throw new Error("Failed to identify pill. The AI model may be unavailable or the provided information may be invalid.");
    }
}