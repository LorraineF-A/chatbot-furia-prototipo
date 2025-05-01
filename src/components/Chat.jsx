import React, { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '../logic/chatLogic'; 
import "../styles/style.css"; 
import logoFuria from '../assets/images/Furia_Esports_logo.png'; 

const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Fala, furioso(a)! Qual é a boa? Quer saber sobre: <br> 👉 Jogadores <br> 👉 Estatísticas <br> 👉 Próximos jogos <br> 👉 Redes/Links'}
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (userInput) => {
        if (!userInput.trim()) return;

        setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
        setInput('');
        setLoading(true);

        const botResponse = await getBotResponse(userInput);
        setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        setLoading(false);
    };

    return (
    <>

    {!isOpen && (
        <button className="chat-toggle-button" onClick={() => setIsOpen(true)}>
            💬
        </button>
    )}

    {isOpen && (
        <div className="chat-container">
            <button className="chat-close-button" onClick={() => setIsOpen(false)}>
                ✖️
            </button>

            <header className="chat-header">
                <img src={logoFuria} alt="Logo FURIA" className="furia-logo" />
                <h1>Chatbot FURIA 🔥</h1>
            </header>

            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                        {msg.sender === 'bot' ? (
                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                    msg.text
                )}
            </div>
            ))}
            {loading && (
                <div className="chat-bubble bot">

                    <em>Carregando jogos...</em>
                </div>
            )}
            <div ref={endOfMessagesRef} />
            </div>

            <div className="input-area">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Manda a braba..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
                disabled={loading}
                />
                <button onClick={() => handleSendMessage(input)} disabled={loading}>
                {loading ? "..." : "Enviar"}
                </button>
            </div>
            </div>
        )}
        </>
    );
};

export default Chat;
