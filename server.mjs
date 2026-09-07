import express from 'express';
import cors from 'cors';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const app = express();
app.use(cors());
app.use(express.json());

// Mapeamento das vozes por sotaque
const VOICE_MAP = {
    US: 'en-US-ChristopherNeural',
    UK: 'en-GB-RyanNeural',
    AUS: 'en-AU-WilliamNeural'
};

app.get('/api/tts', async (req, res) => {
    const { text, accent = 'US' } = req.query;

    if (!text) {
        return res.status(400).json({ error: 'Parâmetro text é obrigatório.' });
    }

    try {
        const tts = new MsEdgeTTS();
        const voice = VOICE_MAP[accent.toUpperCase()] || VOICE_MAP.US;

        await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

        // Formata o texto para cadência e pausas didáticas
        const formattedText = String(text)
            .replace(/,/g, ', ... ')
            .replace(/\./g, '. ... ');

        const { audioStream } = tts.toStream(formattedText, {
            rate: '-15%',
            pitch: '+0Hz'
        });

        // Acumula os chunks em um buffer completo para permitir Seek (avançar/voltar no input)
        const chunks = [];
        audioStream.on('data', (chunk) => chunks.push(chunk));

        audioStream.on('end', () => {
            const audioBuffer = Buffer.concat(chunks);

            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Length', audioBuffer.length);
            res.setHeader('Accept-Ranges', 'bytes');
            res.send(audioBuffer);
        });

        audioStream.on('error', (streamErr) => {
            console.error('Erro no stream de áudio:', streamErr);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Falha ao processar o áudio.' });
            }
        });

    } catch (err) {
        console.error('Erro geral no TTS:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erro interno ao gerar voz.' });
        }
    }
});

app.listen(3001, () => {
    console.log('🚀 Backend TTS rodando em http://localhost:3001');
});