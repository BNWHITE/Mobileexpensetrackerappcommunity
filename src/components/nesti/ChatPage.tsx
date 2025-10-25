import { useState } from "react";
import { Send, Sparkles, Settings, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

export function ChatPage() {
  const [message, setMessage] = useState("");
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const messages = [
    {
      id: 1,
      author: "Sophie",
      avatar: "S",
      message: "Bonjour tout le monde ! N'oubliez pas le rendez-vous chez le dentiste cet après-midi.",
      time: "08:30",
      isMe: true,
      color: "from-cyan-400 to-emerald-400",
    },
    {
      id: 2,
      author: "Pierre",
      avatar: "P",
      message: "Merci pour le rappel ! À quelle heure exactement ?",
      time: "08:35",
      isMe: false,
      color: "from-blue-400 to-purple-400",
    },
    {
      id: 3,
      author: "Sophie",
      avatar: "S",
      message: "14h00, pour toi et Jules",
      time: "08:36",
      isMe: true,
      color: "from-cyan-400 to-emerald-400",
    },
    {
      id: 4,
      author: "Léa",
      avatar: "L",
      message: "Maman, tu peux m'aider avec mes devoirs de maths ce soir ?",
      time: "09:15",
      isMe: false,
      color: "from-pink-400 to-orange-400",
    },
    {
      id: 5,
      author: "Sophie",
      avatar: "S",
      message: "Bien sûr ma chérie, après le dîner ça te va ?",
      time: "09:17",
      isMe: true,
      color: "from-cyan-400 to-emerald-400",
    },
    {
      id: 6,
      author: "Pierre",
      avatar: "P",
      message: "J'arrive vers 19h ce soir, je rapporte une pizza ?",
      time: "10:30",
      isMe: false,
      color: "from-blue-400 to-purple-400",
    },
    {
      id: 7,
      author: "Jules",
      avatar: "J",
      message: "Ouiii ! Margherita pour moi 🍕",
      time: "10:32",
      isMe: false,
      color: "from-amber-400 to-yellow-400",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* AI Assistant Toggle */}
      <div className="mb-4 p-4 glass rounded-3xl border border-white/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
            <div>
              <p className="text-sm text-slate-800">Assistant IA</p>
              <p className="text-xs text-slate-500">Reformulation de messages</p>
            </div>
          </div>
          <button
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className={`px-4 py-2 rounded-2xl text-xs transition-all ${
              showAIAssistant
                ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {showAIAssistant ? "Activé" : "Désactivé"}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}
          >
            <Avatar className="w-10 h-10 flex-shrink-0 border-2 border-white shadow-md">
              <AvatarFallback className={`bg-gradient-to-br ${msg.color} text-white text-sm`}>
                {msg.avatar}
              </AvatarFallback>
            </Avatar>

            <div className={`flex flex-col max-w-[75%] ${msg.isMe ? "items-end" : "items-start"}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-500">{msg.author}</span>
                <span className="text-xs text-slate-400">{msg.time}</span>
              </div>
              <div
                className={`p-3 rounded-2xl shadow-sm ${
                  msg.isMe
                    ? "bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 border border-cyan-300/30 rounded-tr-sm"
                    : "glass border border-white/40 rounded-tl-sm"
                }`}
              >
                <p className="text-sm text-slate-800 leading-relaxed">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 pt-4 pb-2">
        <div className="glass-strong rounded-3xl border border-white/40 p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Écrivez votre message..."
              className="flex-1 border-0 bg-white/50 rounded-2xl focus:ring-2 focus:ring-cyan-400/20 h-11"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white rounded-2xl px-5 border-0 shadow-md h-11"
            >
              <Send className="w-5 h-5" strokeWidth={1.5} />
            </Button>
          </div>
          
          {showAIAssistant && message.trim() && (
            <div className="mt-3 pt-3 border-t border-white/40">
              <div className="flex items-start gap-2 p-3 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/80">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="text-xs text-amber-900/70 mb-1">Suggestion IA</p>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    "Bonjour, {message}"
                  </p>
                </div>
                <button className="text-xs text-amber-700 hover:text-amber-800 underline">
                  Utiliser
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-500">
          <Heart className="w-3 h-3" strokeWidth={1.5} />
          <span>Un espace bienveillant pour votre famille</span>
        </div>
      </div>
    </div>
  );
}
