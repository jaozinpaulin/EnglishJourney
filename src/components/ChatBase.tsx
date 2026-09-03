import { useState } from 'react';

type Message = {
    sender: 'user' | 'ai';
    text: string;
};

export default function ChatBase() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim() || loading) return;

        const userText = input.trim();
        setMessages((prev) => [...prev, { sender: 'user', text: userText }]);

        setInput('');
        setLoading(true);

        try {
            // throw new Error('Erro proposital para testar o catch');

            const response = await fetch('http://localhost:3000/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userText,
                }),
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                { sender: 'ai', text: data.response },
            ]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: 'ai',
                    text: 'Sorry, something went wrong. Please try again.',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen py-20 flex-col bg-zinc-950 text-zinc-100">
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message.sender === 'user'
                                    ? 'justify-end'
                                    : 'justify-start'
                            }`}
                        >
                            <div
                                className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                                    message.sender === 'user'
                                        ? 'bg-[#C96B62] text-white'
                                        : 'border border-zinc-800 bg-zinc-900 text-zinc-200'
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="border-t border-zinc-800 bg-zinc-950 p-4"
                >
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-[#C96B62]"
                        />

                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="rounded-xl bg-[#C96B62] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#B85C55] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
