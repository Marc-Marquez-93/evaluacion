import { GoogleGenAI } from "@google/genai";

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const llamarGemini = async (prompt) => {
  const keys = [
    process.env.API_KEY?.trim(),
    process.env.API_KEY2?.trim(),
    process.env.API_KEY3?.trim(),
  ].filter((k) => k);

  const MODEL_NAME = "gemini-3-flash-preview";

  let textoRespuesta = null;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    try {
      console.log(`📡 Conectando con Key ${i + 1}...`);

      const ai = new GoogleGenAI({ apiKey: key });

      const result = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
      });

      textoRespuesta = result.text;

      if (textoRespuesta) break; 
    } catch (err) {
      console.error(`❌ Falló Key ${i + 1}:`, err.message || err);

      if (err.status === 429 || err.message?.includes("429")) {
        console.warn("⏳ Cuota excedida. Esperando 5 segundos...");
        await esperar(5000);
      }
    }
  }
  return textoRespuesta;
};

export default llamarGemini;