
import { GoogleGenAI, Type, GenerateContentResponse, GenerateContentParameters, Modality } from "@google/genai";

// Ensure API Key is used directly from process.env.API_KEY
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const geminiService = {
  // AI Market Assistant: Multimodal Product Description Generation (Bolt/Flash-Lite for speed)
  async generateProductDetails(imageB64?: string, voiceNotePrompt?: string): Promise<{ name: string; description: string; category: string }> {
    const ai = getAI();
    const parts: any[] = [];
    
    if (imageB64) {
      parts.push({
        inlineData: { mimeType: "image/jpeg", data: imageB64 }
      });
    }
    
    parts.push({
      text: voiceNotePrompt || "Analyze this product and provide a creative name, detailed description, and appropriate category in JSON format."
    });

    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest', // Using Flash-Lite for "Bolt" fast response
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING }
          },
          required: ["name", "description", "category"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return { name: "New Artisan Craft", description: "A beautiful handmade item.", category: "General" };
    }
  },

  // Document Scanner: Extract data from receipts or documents
  async scanDocument(imageB64: string): Promise<string> {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: imageB64 } },
          { text: "Act as a document scanner. Extract all text, line items, and totals from this document. Provide a clean summary." }
        ]
      }
    });
    return response.text || "Scanning failed.";
  },

  // Network Intelligence: Thinking Mode for complex queries
  async complexReasoning(prompt: string): Promise<string> {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 16000 } // Enabling high-effort thinking
      }
    });
    return response.text || "Reasoning failed.";
  },

  // Pricing Advisor: Google Search Grounding
  async getPricingAdvice(productName: string, description: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find real-time market prices for: ${productName}. Context: ${description}. Cite sources.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  },

  // Logistics Hub: Google Maps Grounding
  async findLocalMaterials(location: string, material: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Where can I find ${material} suppliers in or near ${location}? Provide addresses and links.`,
      config: {
        tools: [{ googleMaps: {} }]
      }
    });
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  },

  // Asset Factory: Image Generation (Pro Image)
  async generateAsset(prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" = "1:1"): Promise<string | null> {
    const hasKey = await (window as any).aistudio?.hasSelectedApiKey?.();
    if (!hasKey) await (window as any).aistudio?.openSelectKey?.();

    // Re-initialize with latest key as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio, imageSize: "1K" }
      }
    });
    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return imagePart?.inlineData?.data ? `data:image/png;base64,${imagePart.inlineData.data}` : null;
  },

  // Movie/Video Animate: Animate an image using Veo
  async animateImage(prompt: string, imageB64: string): Promise<string | null> {
    const hasKey = await (window as any).aistudio?.hasSelectedApiKey?.();
    if (!hasKey) await (window as any).aistudio?.openSelectKey?.();

    // Re-initialize with latest key as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    try {
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        image: { imageBytes: imageB64, mimeType: 'image/jpeg' },
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const fetchRes = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await fetchRes.blob();
        return URL.createObjectURL(blob);
      }
    } catch (e) { console.error(e); }
    return null;
  },

  // Fix: Added missing createVideoAd method for VideoCreator component
  async createVideoAd(prompt: string): Promise<string | null> {
    const hasKey = await (window as any).aistudio?.hasSelectedApiKey?.();
    if (!hasKey) await (window as any).aistudio?.openSelectKey?.();

    // Re-initialize with latest key as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    try {
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const fetchRes = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await fetchRes.blob();
        return URL.createObjectURL(blob);
      }
    } catch (e) { console.error(e); }
    return null;
  },

  // Fix: Added missing transformImage method for PhotoStudio and StylistModal components
  async transformImage(imageSource: string, prompt: string): Promise<string | null> {
    const ai = getAI();
    let base64Data = imageSource;
    if (imageSource.startsWith('data:')) {
      base64Data = imageSource.split(',')[1];
    } else if (imageSource.startsWith('http')) {
      try {
        const fetchRes = await fetch(imageSource);
        const blob = await fetchRes.blob();
        const reader = new FileReader();
        base64Data = await new Promise((resolve) => {
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.error("Failed to fetch image for transformation", e);
        return null;
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
          { text: prompt },
        ],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return imagePart?.inlineData?.data ? `data:image/png;base64,${imagePart.inlineData.data}` : null;
  },

  // Bargain Chat: Refined to be more persuasive and value-driven
  async bargainChat(history: { role: 'user' | 'ai'; text: string }[], message: string, product: any): Promise<string> {
    const ai = getAI();
    const contents: any[] = history.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: `You are the AI co-pilot for ${product.artisanName}, a master craftsman specializing in ${product.category}. 
        You are negotiating the price for "${product.name}". 
        Current list price: $${product.price}. 
        
        RULES:
        1. Be sophisticated, respectful, and emphasize the hours of human labor, material quality, and heritage.
        2. Never drop the price by more than 15% in a single step.
        3. Minimum acceptable price is $${Math.floor(product.price * 0.75)} (25% off max).
        4. If the user offers a fair price within your range, enthusiastically say "It's a deal!" and confirm the final price (e.g., "$38").
        5. If the offer is too low, explain why the craftsmanship is worth more, but offer a smaller alternative discount.
        6. Use short, persuasive responses.`
      }
    });

    return response.text || "I'm sorry, I'm unable to continue the negotiation.";
  },

  // Certificate: Refined heritage storytelling
  async generateCertificate(product: any): Promise<string> {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, soulful heritage story for a certificate of authenticity. 
      Product: "${product.name}", Category: "${product.category}", Artisan: "${product.artisanName}". 
      Focus on the lineage of the technique and the soul of the maker. Max 45 words.`,
    });
    return response.text || "A unique piece of human heritage, hand-crafted with ancestral techniques.";
  },

  // Audio Spark: Generate Speech (TTS)
  async textToSpeech(text: string, voiceName: string = 'Kore'): Promise<AudioBuffer | null> {
    const ai = getAI();
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
        },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        return await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
      }
    } catch (e) { console.error(e); }
    return null;
  }
};

// Audio Decoding Utilities
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
