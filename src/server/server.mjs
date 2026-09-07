import express from 'express';
import cors from 'cors';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const app = express();
app.use(cors());
app.use(express.json());

const VOICE_MAP = {
    US: 'en-US-JennyNeural',
    UK: 'en-GB-SoniaNeural',
    AUS: 'en-AU-NatashaNeural'
};

app.get('/api/tts', async (req, res) => {
    const { text, accent = 'US' } = req.query;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    try {
        const tts = new MsEdgeTTS();
        const voice = VOICE_MAP[accent.toUpperCase()] || VOICE_MAP.US;
        await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        // pausas
        const formatted = String(text).replace(/,/g, ', ... ').replace(/\./g, '. ... ');
        const { audioStream } = tts.toStream(formatted, { rate: '-15%' });

        const chunks = [];
        for await (const chunk of audioStream) chunks.push(chunk);
        const buffer = Buffer.concat(chunks);

        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': buffer.length,
            'Accept-Ranges': 'bytes'
        }).send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate audio' });
    }
});

app.listen(3001, () => console.log('TTS Server on http://localhost:3001'));