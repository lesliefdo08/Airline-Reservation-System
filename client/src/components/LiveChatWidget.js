import React, { useState } from "react";


const FAQ_ENTRIES = [
  { q: "How do I book a flight?", a: "Go to the Flights page, search for your route and date, select a flight, choose your seat, and proceed to payment." },
  { q: "How can I change or cancel my booking?", a: "Visit the My Bookings page, select the booking you wish to modify, and follow the on-screen instructions." },
  { q: "What if I forget my password?", a: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password." },
  { q: "How do I contact support?", a: "Use the live chat widget at the bottom right or email us at support@ars.com for assistance." },
  { q: "How do I check flight status?", a: "Go to the Flight Status page, select your source and destination, and view all available flights and their current status." },
  { q: "What payment methods are accepted?", a: "We accept credit/debit cards, UPI, and net banking." },
  { q: "How do I access the admin dashboard?", a: "Admins can access the dashboard from the Navbar after logging in with admin credentials." },
  { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page and follow the instructions sent to your email." },
  { q: "How do I get a refund?", a: "Refunds are processed automatically for eligible cancellations. Check My Bookings for status." },
  { q: "How do I contact live support?", a: "Use this chat or email support@ars.com for urgent issues." },
];

const getBestAnswer = input => {
  input = input.toLowerCase();
  const found = FAQ_ENTRIES.find(faq => input.includes(faq.q.toLowerCase().split(" ")[2]));
  if (found) return found.a;
  if (input.includes("book")) return FAQ_ENTRIES[0].a;
  if (input.includes("cancel") || input.includes("change")) return FAQ_ENTRIES[1].a;
  if (input.includes("password")) return FAQ_ENTRIES[2].a;
  if (input.includes("status")) return FAQ_ENTRIES[4].a;
  if (input.includes("payment")) return FAQ_ENTRIES[5].a;
  if (input.includes("admin")) return FAQ_ENTRIES[6].a;
  if (input.includes("refund")) return FAQ_ENTRIES[8].a;
  if (input.includes("support")) return FAQ_ENTRIES[9].a;
  return null;
};

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm ARS Assistant. How can I help you today?" }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: "user", text: input }]);
    const answer = getBestAnswer(input);
    setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: answer || "Sorry, I couldn't find an answer. Please check the FAQ or contact support@ars.com." }]), 800);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-80 bg-white rounded-xl shadow-2xl border border-blue-300 flex flex-col">
          <div className="bg-blue-700 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
            <span className="font-bold">ARS Live Chat</span>
            <button onClick={() => setOpen(false)} className="text-white font-bold">×</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto h-64 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`text-sm ${msg.from === "bot" ? "text-blue-900" : "text-right text-gray-700"}`}>{msg.text}</div>
            ))}
          </div>
          <div className="flex border-t">
            <input
              className="flex-1 px-3 py-2 rounded-bl-xl focus:outline-none"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
            />
            <button onClick={handleSend} className="bg-blue-700 text-white px-4 py-2 rounded-br-xl font-bold">Send</button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-700 text-white px-6 py-3 rounded-full shadow-xl font-bold hover:bg-blue-900 transition"
          onClick={() => setOpen(true)}
        >
          Live Chat
        </button>
      )}
    </div>
  );
}
