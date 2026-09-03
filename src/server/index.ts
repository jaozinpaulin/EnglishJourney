import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import ai from './ai/gemini';
import { error } from 'console';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/ai', async (reg, res) => {
    try {
        const { message } = reg.body;

        if (typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({
                error: 'Message must be a non-empty string',
            });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: message,
        });

        res.json({
            response: response.text,
        });
    } catch (error) {
        console.error('Gemini error');

        res.status(500).json({
            error: 'Failid to generete response.',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
