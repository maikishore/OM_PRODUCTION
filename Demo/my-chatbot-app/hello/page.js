import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = async () => {
    const newMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
    setMessages([...messages, newMessage]);  // Add the user message to the chat

    try {
      const response = await axios.post('/api/chat', { message: inputValue });
      const botMessage = { id: messages.length + 2, text: response.data.reply, sender: 'bot' };
      setMessages(messages => [...messages, botMessage]);  // Add the bot's response to the chat
    } catch (error) {
      console.error('Error in sending message:', error);
    }

    setInputValue("");  // Clear input after sending
  };

  return (
    <div>
      <div style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ textAlign: msg.sender === 'bot' ? 'left' : 'right' }}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..." 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
