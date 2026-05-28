import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

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
    const messages = [
      ...history.slice(-10).map(m => ({ role: m.role, content: m.content })),
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

export default router;
