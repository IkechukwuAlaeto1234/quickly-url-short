import { GoogleGenAI, Type } from "@google/genai";

// The API key is assumed to be available in the execution environment as per the requirements.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

export const generateShortLinkSlug = async (longUrl: string): Promise<string> => {
    const prompt = `
        You are an expert URL slug generator. Your task is to create a short, memorable, and URL-safe slug for the given URL.
        The slug should be 2-3 words long, in all lowercase, and words must be separated by hyphens.
        The slug should creatively summarize the core topic of the URL.
        Analyze the following URL: ${longUrl}
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        slug: {
                            type: Type.STRING,
                            description: "The generated 2-3 word, lowercase, hyphenated slug.",
                        },
                    },
                    required: ["slug"],
                },
                temperature: 0.7,
            },
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (result && typeof result.slug === 'string' && result.slug.length > 0) {
            return result.slug;
        } else {
            // Fallback for unexpected API response
            console.warn("Received invalid slug format from API, generating fallback.", result);
            return `link-${Date.now().toString().slice(-6)}`;
        }
    } catch (error) {
        console.error("Error generating short link slug:", error);
        // Provide a more user-friendly error
        throw new Error("The smart generator failed to create a short link. The URL might be inaccessible or invalid.");
    }
};

export const generateSocialPostSuggestion = async (originalUrl: string): Promise<string> => {
    const prompt = `
        You are a witty social media expert. Your task is to create a short, catchy, and engaging post for Twitter/X to share the following link.
        - The post should be under 250 characters.
        - It should summarize the core idea of the linked content in an interesting way.
        - It MUST include the placeholder "{link}" where the shortened URL should be inserted.
        - Include 1-2 relevant hashtags.
        Analyze the following URL and create the post: ${originalUrl}
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                temperature: 0.8,
            },
        });

        const suggestion = response.text.trim();
        if (suggestion) {
            return suggestion;
        } else {
            throw new Error("The generator did not return a suggestion.");
        }
    } catch (error) {
        console.error("Error generating social post suggestion:", error);
        throw new Error("The smart generator failed to create a post suggestion. The URL might be inaccessible.");
    }
};