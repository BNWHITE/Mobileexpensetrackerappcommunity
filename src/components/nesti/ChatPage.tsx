import { useState } from "react";
import { Send, Mic, Sparkles, ThumbsUp, ThumbsDown, Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function ChatPage() {
  const [inputMessage, setInputMessage] = useState("");

  const messages = [
    {
      id: 1,
      type: "user",
      content: "Bonjour Nesti ! Peux-tu me suggérer une activité calme pour Lucas aujourd'hui ? Il a du mal à se concentrer ces derniers jours.",
      timestamp: "10:30",
    },
    {
      id: 2,
      type: "ai",
      content: "Bonjour Sophie ! 👋 Bien sûr, je comprends. D'après son profil TDAH, voici 3 activités calmes et adaptées pour Lucas :",
      timestamp: "10:31",
      suggestions: [
        {
          icon: "🌳",
          title: "Parc sensoriel de Bercy",
          description: "Environnement calme avec zones sensorielles",
          details: "📍 3,2 km • Gratuit • ⭐ 4.8",
          tags: ["Calme", "Adapté TDAH"],
        },
        {
          icon: "📚",
          title: "Bibliothèque Louise Michel",
          description: "Espace jeunesse avec coussins et jeux calmes",
          details: "📍 1,8 km • Gratuit • ⭐ 4.6",
          tags: ["Silencieux", "Lecture"],
        },
        {
          icon: "🧩",
          title: "Atelier puzzle géant",
          description: "Session de 1h avec puzzles adaptatifs",
          details: "📍 4,5 km • 8€ • ⭐ 4.9",
          tags: ["Concentration", "Petit groupe"],
        },
      ],
      helpful: true,
    },
    {
      id: 3,
      type: "user",
      content: "Super ! Et pour Emma qui s'ennuie un peu ces vacances ?",
      timestamp: "10:35",
    },
    {
      id: 4,
      type: "ai",
      content: "Emma adore la nature d'après vos préférences ! Voici ce que je propose pour elle :",
      timestamp: "10:35",
      suggestions: [
        {
          icon: "🦜",
          title: "Observation oiseaux au Parc",
          description: "Initiation ornithologie avec guide nature",
          details: "📅 Samedi 10h • 📍 2,1 km • 12€",
          tags: ["Nature", "Pédagogique"],
        },
        {
          icon: "🌿",
          title: "Création d'herbier collectif",
          description: "Collecte et identification de plantes",
          details: "📅 Dimanche 14h • 📍 3,5 km • 15€",
          tags: ["Créatif", "Nature"],
        },
        {
          icon: "🗺️",
          title: "Chasse au trésor botanique",
          description: "Jeu de piste nature en famille",
          details: "📅 Mercredi 15h • 📍 5 km • Gratuit",
          tags: ["Aventure", "Famille"],
        },
      ],
      helpful: false,
    },
    {
      id: 5,
      type: "user",
      content: "Parfait ! Peux-tu ajouter la chasse au trésor à notre calendrier familial ?",
      timestamp: "10:38",
    },
    {
      id: 6,
      type: "ai",
      content: "✅ J'ai ajouté \"Chasse au trésor botanique\" au calendrier familial :\n\n📅 Mercredi 27 Janvier, 15h00\n📍 Parc de Vincennes (5 km)\n👥 Participants suggérés : Toute la famille\n\nVoulez-vous que j'envoie une notification aux membres du nest ?",
      timestamp: "10:38",
      action: "calendar_added",
      helpful: false,
    },
  ];

  const quickActions = [
    { icon: "🎨", label: "Activités créatives" },
    { icon: "⚽", label: "Sports" },
    { icon: "🍽️", label: "Restaurants" },
    { icon: "🎭", label: "Culture" },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border backdrop-blur-lg px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Nesti IA</h2>
            <Badge className="bg-success text-white text-xs px-2 py-0.5">
              Assistant familial
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-32">
        {/* Welcome Message */}
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Bienvenue ! 👋</h3>
          <p className="text-sm text-muted-foreground px-6">
            Je suis Nesti, votre assistant familial IA. Posez-moi vos questions sur les activités, 
            l'organisation familiale, ou demandez-moi conseil !
          </p>
        </div>

        {/* Chat Messages */}
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            {message.type === "ai" && (
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                  <Sparkles className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
              {/* Message Bubble */}
              <div className={`rounded-2xl p-4 ${
                message.type === "user" 
                  ? "bg-primary text-white rounded-tr-sm" 
                  : "bg-card border border-border rounded-tl-sm"
              }`}>
                <p className={`text-sm leading-relaxed whitespace-pre-line ${
                  message.type === "user" ? "text-white" : "text-foreground"
                }`}>
                  {message.content}
                </p>
                
                {/* Action Confirmation */}
                {message.action === "calendar_added" && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="bg-success hover:bg-success/90 text-white rounded-xl text-xs">
                      Oui, notifier
                    </Button>
                    <Button variant="outline" size="sm" className="border-border rounded-xl text-xs">
                      Non merci
                    </Button>
                  </div>
                )}
              </div>

              {/* AI Suggestions Cards */}
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, idx) => (
                    <Card key={idx} className="border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {suggestion.icon}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm mb-1">
                              {suggestion.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                              {suggestion.description}
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">
                              {suggestion.details}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {suggestion.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary text-xs px-2 py-0.5">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Button variant="ghost" size="sm" className="flex-shrink-0 hover:bg-primary/10 text-primary rounded-xl h-8 w-8 p-0">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <p className={`text-xs text-muted-foreground mt-1 ${message.type === "user" ? "text-right" : "text-left"}`}>
                {message.timestamp}
              </p>

              {/* AI Message Feedback */}
              {message.type === "ai" && message.helpful !== undefined && (
                <div className="flex gap-2 mt-2">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-success transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    Utile
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
                    <ThumbsDown className="w-3 h-3" />
                    Pas utile
                  </button>
                </div>
              )}
            </div>

            {message.type === "user" && (
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="bg-forest-green text-white">
                  S
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="sticky bottom-20 px-4 pb-2">
        <div className="bg-card/95 backdrop-blur-lg border border-border rounded-2xl p-3">
          <p className="text-xs text-muted-foreground mb-2 px-1">Suggestions rapides :</p>
          <div className="flex gap-2 overflow-x-auto">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-primary/10 rounded-xl text-sm whitespace-nowrap transition-colors"
              >
                <span>{action.icon}</span>
                <span className="text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 z-10 bg-card border-t border-border backdrop-blur-lg px-4 py-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-border rounded-2xl flex-shrink-0"
          >
            <Mic className="w-5 h-5 text-accent" />
          </Button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Posez une question à Nesti..."
              className="w-full px-4 py-3 bg-muted rounded-2xl border-0 text-sm focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Button
            size="icon"
            disabled={!inputMessage.trim()}
            className="bg-primary hover:bg-primary/90 text-white rounded-2xl flex-shrink-0 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
