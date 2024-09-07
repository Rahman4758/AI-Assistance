import React, { useState } from 'react';

function Home() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (!userInput) return;

    const newMessages = [...messages, { sender: 'You', text: userInput }];
    setMessages(newMessages);

    try {
      const response = await fetch('http://localhost:3000/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: 'Gemini AI', text: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { sender: 'Error', text: 'Failed to get response from server.' }]);
    }

    setUserInput('');
  };

  return (
    <div className="home-container">
      <header>
        <h1>Your AI Assistance</h1>
        <p>Ask anything you want</p>
      </header>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
