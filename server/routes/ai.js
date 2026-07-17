import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: 'Trop de requêtes IA. Veuillez patienter une minute.' },
  standardHeaders: true,
  legacyHeaders: false,
});
router.use(aiLimiter);

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const GREENBOT_SYSTEM = `You are GreenBot, the AI agricultural advisor for Green Field Consortium (GreenFCO),
an agro-environmental enterprise based in Burkina Faso serving Francophone Africa.

Your expertise covers:
- Climate-smart agriculture and agroecology for West Africa
- Crop management: maize, sorghum, millet, cowpea, onion, potato, tomato, sesame
- Agroforestry species: Faidherbia albida, Moringa, Acacia
- Water management and irrigation optimization
- Organic inputs and bio-fertilizers (including BioGrowth)
- Farm business planning and agri-entrepreneurship
- Carbon sequestration and environmental practices
- Training of Trainers methodology

Your approach:
- Always recommend organic and climate-smart solutions first
- Respect local knowledge and traditional practices
- Provide practical, actionable advice adapted to smallholder farmers (3-5 ha)
- Reference Burkina Faso and West African agricultural context
- Encourage sustainable practices aligned with GreenFCO's mission

Respond in the user's language (French or English).
Be warm, encouraging, and accessible to farmers with varying literacy levels.
When uncertain, recommend consulting a local agronomist or GreenFCO's expert team.
Keep responses concise and practical — maximum 3-4 paragraphs.`;

const SOIL_ADVISOR_SYSTEM = `You are an agricultural diagnostic specialist for West Africa, working with GreenFCO.
When given a crop problem description, provide:
1. **Diagnostic** — Most likely diagnosis (1-3 possibilities ranked by probability)
2. **Traitement organique** — Recommended organic/sustainable treatment first
3. **Traitement conventionnel** — Conventional option if organic is insufficient
4. **Prévention** — Prevention advice for next season
5. **Consultation professionnelle** — Whether a professional field visit is recommended

Focus on crops common to Burkina Faso and West Africa.
Prioritize organic solutions aligned with climate-smart agriculture principles.
Respond in the user's language (French or English).
Keep responses practical and actionable for smallholder farmers.`;

router.post('/greenbot', async (req, res) => {
  const { message, history = [], language = 'fr' } = req.body;
  if (!message) return res.status(400).json({ message: 'Message required' });

  try {
    // Sanitize history: only user/assistant roles, alternating, no trailing user turn
    const validHistory = Array.isArray(history)
      ? history.filter(m => m.role === 'user' || m.role === 'assistant').slice(-10)
      : [];
    const deduped = [];
    for (const m of validHistory) {
      if (!deduped.length || deduped[deduped.length - 1].role !== m.role) {
        deduped.push({ role: m.role, content: String(m.content || '') });
      }
    }
    while (deduped.length && deduped[deduped.length - 1].role === 'user') deduped.pop();

    const messages = [
      ...deduped,
      { role: 'user', content: message },
    ];

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: GREENBOT_SYSTEM,
      messages,
    });

    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('GreenBot error:', err.message);
    res.status(500).json({
      reply: language === 'fr'
        ? 'Désolé, une erreur technique est survenue. Veuillez réessayer.'
        : 'Sorry, a technical error occurred. Please try again.',
    });
  }
});

const KOOB_ASSIST_SYSTEM = `You are Koob Assist, a business coach and strategic advisor for agricultural entrepreneurs (agripreneurs) in Burkina Faso and West Africa, working with Green Field Consortium (GreenFCO).

When given a farmer's situation, generate a structured action plan with these exact sections:

## 🎯 Actions Immédiates (0-2 semaines)
List 3-5 concrete, achievable quick wins the farmer can start this week.

## 📅 Plan 30 jours
List 5-7 specific actions to accomplish in the next month.

## 📈 Plan 90 jours
List 3-5 strategic medium-term actions for the next 3 months.

## 💡 Ressources GreenFCO Recommandées
Mention the most relevant GreenFCO services: Assistance-Conseil, Négoce Agricole, Formations, Études, Aménagements Hydro-Agricoles, Intrants (BioGrowth), Développement de Projets. Be specific.

## ⚠️ Points de vigilance
List 2-3 key risks or things to watch out for.

Keep advice practical, measurable, and adapted to smallholder farmers in the Sahel.
Reference local crops (oignons, tomates, maïs, mil, sorgho, niébé, sésame), local markets, and climate-smart agriculture.
Use motivating, encouraging tone.
Respond in the user's language (French or English).`;

router.post('/koob-assist', async (req, res) => {
  const { prompt, language = 'fr' } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Prompt required' });

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      system: KOOB_ASSIST_SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ plan: response.content[0].text });
  } catch (err) {
    console.error('Koob Assist error:', err.message);
    res.status(500).json({
      plan: language === 'fr'
        ? 'Erreur lors de la génération du plan. Veuillez réessayer.'
        : 'Error generating plan. Please try again.',
    });
  }
});

router.post('/soil-advisor', async (req, res) => {
  const { crop, symptoms, description, language = 'fr' } = req.body;
  if (!crop || !symptoms) return res.status(400).json({ message: 'Crop and symptoms required' });

  const userMessage = `Culture: ${crop}\nSymptômes: ${symptoms}${description ? `\nContexte: ${description}` : ''}`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: SOIL_ADVISOR_SYSTEM,
      messages: [{ role: 'user', content: userMessage }],
    });

    res.json({ diagnosis: response.content[0].text });
  } catch (err) {
    console.error('Soil advisor error:', err.message);
    res.status(500).json({
      diagnosis: language === 'fr'
        ? 'Erreur lors de l\'analyse. Veuillez réessayer.'
        : 'Analysis error. Please try again.',
    });
  }
});

const PLANT_ANALYZE_SYSTEM = `You are an expert plant pathologist and agronomist specializing in West African crops.
Analyze the provided plant/crop image(s) to detect diseases, pests, nutrient deficiencies, or other issues.

Return your analysis in this EXACT JSON format (no markdown, pure JSON):
{
  "plantIdentified": "Name of plant/crop identified (or user-provided)",
  "healthStatus": "healthy|warning|critical",
  "confidence": 85,
  "issues": [
    {
      "name": "Disease/issue name",
      "nameFr": "French name",
      "severity": "low|medium|high",
      "confidence": 90,
      "symptoms": "Observed symptoms",
      "cause": "Pathogen or cause",
      "affectedParts": ["leaf", "stem", "root", "fruit"]
    }
  ],
  "organicTreatment": "Step-by-step organic treatment in the user's language",
  "conventionalTreatment": "Conventional treatment if needed",
  "prevention": "Prevention advice for next season",
  "urgency": "monitor|treat_soon|treat_immediately",
  "recommendConsultation": true,
  "references": ["PlantVillage", "INERA Burkina Faso", "FAO crop protection"]
}

If the image shows a healthy plant, issues array should be empty and healthStatus = "healthy".
If no plant is visible or image is unclear, set confidence to 0 and explain in the issues array.
Respond with pure JSON only — no markdown code blocks, no explanation outside the JSON.`;

router.post('/plant-analyze', async (req, res) => {
  const { images, plantType, language = 'fr' } = req.body;
  if (!images || !images.length) return res.status(400).json({ error: 'At least one image required' });

  try {
    // Build content array with all images
    const content = [];

    // Add each image
    for (const img of images.slice(0, 4)) { // max 4 images
      // img is either a base64 data URL (data:image/jpeg;base64,...) or pure base64
      let base64Data = img;
      let mediaType = 'image/jpeg';

      if (img.startsWith('data:')) {
        const match = img.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          mediaType = match[1];
          base64Data = match[2];
        }
      }

      content.push({
        type: 'image',
        source: { type: 'base64', media_type: mediaType, data: base64Data }
      });
    }

    // Add text prompt
    const textPrompt = language === 'fr'
      ? `Analyse ces images de ${plantType ? `la culture "${plantType}"` : 'cette plante/culture'}. Identifie toutes les maladies, ravageurs, carences nutritionnelles ou autres problèmes visibles. Réponds en JSON pur.`
      : `Analyze these images of ${plantType ? `the crop "${plantType}"` : 'this plant/crop'}. Identify all diseases, pests, nutritional deficiencies or other visible issues. Respond in pure JSON.`;

    content.push({ type: 'text', text: textPrompt });

    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 2000,
      system: PLANT_ANALYZE_SYSTEM,
      messages: [{ role: 'user', content }],
    });

    let result;
    try {
      result = JSON.parse(response.content[0].text);
    } catch {
      // Fallback if JSON parsing fails
      result = {
        plantIdentified: plantType || 'Unknown',
        healthStatus: 'warning',
        confidence: 60,
        issues: [{ name: 'Analysis incomplete', nameFr: 'Analyse incomplète', severity: 'low', confidence: 60, symptoms: response.content[0].text.slice(0, 200), cause: 'Image quality or model error', affectedParts: [] }],
        organicTreatment: language === 'fr' ? 'Consultez un agronome GreenFCO.' : 'Consult a GreenFCO agronomist.',
        conventionalTreatment: '',
        prevention: '',
        urgency: 'monitor',
        recommendConsultation: true,
        references: []
      };
    }

    res.json(result);
  } catch (err) {
    console.error('Plant analyze error:', err.message);
    res.status(500).json({ error: language === 'fr' ? 'Erreur analyse. Réessayez.' : 'Analysis error. Try again.' });
  }
});

export default router;
