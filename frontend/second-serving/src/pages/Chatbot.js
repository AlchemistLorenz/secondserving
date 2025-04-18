import React, { useState } from 'react';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const toggleModal = () => setOpen(!open);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('${process.env.REACT_APP_API_BASE}/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: 'bot', text: data.reply || 'Sorry, I didn’t get that.' }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'bot', text: 'Server error. Try again later.' }]);
    }
  };

  return (
    <>
      {/* Chatbot bubble */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-selectiveYellow text-black font-bold w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-105 transition"
      >
        💬
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-hotRed rounded-lg shadow-lg flex flex-col z-50">
          <div className="bg-selectiveYellow text-black font-bold px-4 py-2 rounded-t flex justify-between items-center">
            <span>Ask Second Serving</span>
            <button onClick={toggleModal} className="text-xl font-bold">×</button>
          </div>

          <div className="p-4 h-64 overflow-y-auto space-y-2 bg-paleDog text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded max-w-xs ${
                  msg.sender === 'user'
                    ? 'bg-prussianBlue text-white self-end ml-auto'
                    : 'bg-hotRed border border-gray-200 text-black self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 outline-none text-sm"
            />
            <button type="submit" className="bg-selectiveYellow px-4 text-sm font-bold">Send</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
