import { useState } from "react";
import { Heart, MessageCircle, Share2, Calendar, Camera, MapPin, Users, ThumbsUp, PartyPopper, Trophy, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export function FeedPage() {
  const [newPost, setNewPost] = useState("");

  const posts = [
    {
      id: 1,
      type: "birthday",
      author: "Maman",
      authorAvatar: "M",
      authorRole: "parent",
      time: "Il y a 2h",
      nest: "Famille Martin",
      title: "🎂 ANNIVERSAIRE",
      content: "Emma fête ses 15 ans aujourd'hui !",
      message: "Joyeux anniversaire à notre grande fille ! Nous sommes tellement fiers de toi 💝",
      reactions: { likes: 12, hearts: 18, party: 5 },
      comments: [
        { author: "Grand-mère", message: "Joyeux anniversaire ma chérie !" },
        { author: "Papa", message: "Happy birthday ma grande ! 🎉" },
      ],
    },
    {
      id: 2,
      type: "event",
      author: "Papa",
      authorAvatar: "P",
      authorRole: "admin",
      time: "Hier",
      nest: "Famille Martin",
      title: "🏖️ VACANCES",
      content: "Vacances d'été en famille",
      event: {
        dates: "15-29 Juillet 2025",
        location: "Île de Ré, France",
        participants: ["Papa", "Maman", "Emma", "Lucas"],
      },
      reactions: { likes: 8, hearts: 15 },
      comments: [],
    },
    {
      id: 3,
      type: "achievement",
      author: "Lucas",
      authorAvatar: "L",
      authorRole: "teen",
      time: "Il y a 3 jours",
      nest: "Famille Martin",
      title: "⚽ SPORT",
      content: "Match de foot - Victoire 3-2 ! ⚽\nJ'ai marqué le but de la victoire à la dernière minute !",
      reactions: { likes: 20, hearts: 10, trophy: 12 },
      comments: [
        { author: "Papa", message: "Bravo champion ! 🏆" },
        { author: "Emma", message: "Trop fort petit frère !" },
      ],
    },
    {
      id: 4,
      type: "activity",
      author: "Maman",
      authorAvatar: "M",
      authorRole: "parent",
      time: "Il y a 5 jours",
      nest: "Famille Martin",
      title: "🎨 ACTIVITÉ",
      content: "Atelier peinture familial ce dimanche 🎨\nOn a passé un super moment créatif tous ensemble !",
      reactions: { likes: 15, hearts: 20 },
      comments: [],
    },
  ];

  const getRoleColor = (role: string) => {
    const colors = {
      admin: "bg-forest-green",
      parent: "bg-sage-green",
      adult: "bg-sky-blue",
      teen: "bg-golden-yellow",
      grandparent: "bg-warm-orange",
      guest: "bg-gray-400",
    };
    return colors[role as keyof typeof colors] || "bg-gray-400";
  };

  return (
    <div className="px-4 py-6 space-y-4 pb-24">
      {/* Quick Composer */}
      <Card className="border-border overflow-hidden shadow-md bg-card">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarFallback className="bg-forest-green text-white">S</AvatarFallback>
            </Avatar>
            <button
              onClick={() => {/* Open full composer */}}
              className="flex-1 text-left px-4 py-3 bg-muted rounded-2xl text-muted-foreground"
            >
              Partagez un moment...
            </button>
            <button className="p-3 bg-primary rounded-2xl text-white hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="border-border overflow-hidden shadow-md bg-card animate-fadeIn">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Avatar className="w-11 h-11">
                  <AvatarFallback className={`${getRoleColor(post.authorRole)} text-white`}>
                    {post.authorAvatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground text-sm">{post.author}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {post.time}
                  </p>
                </div>
              </div>
              
              <Badge className="bg-primary/10 text-primary border-0 text-xs px-2 py-1">
                {post.title.split(' ')[0]}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Event Card */}
            {post.event && (
              <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{post.content}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.event.dates}
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {post.event.location}
                      </p>
                      <p className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {post.event.participants.join(", ")}
                      </p>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white rounded-xl mt-3 w-full">
                      Voir les détails
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Birthday Card */}
            {post.type === "birthday" && !post.event && (
              <div className="text-center py-8 bg-gradient-to-br from-accent/10 via-warning/10 to-secondary/10 rounded-2xl">
                <p className="text-6xl mb-3">🎂</p>
                <p className="text-xl font-semibold text-foreground mb-2">{post.content}</p>
                {post.message && (
                  <p className="text-muted-foreground px-4 italic">&ldquo;{post.message}&rdquo;</p>
                )}
              </div>
            )}

            {/* Regular Content */}
            {!post.event && post.type !== "birthday" && (
              <div>
                <p className="text-foreground whitespace-pre-line leading-relaxed">
                  {post.content}
                </p>
              </div>
            )}

            <Separator className="my-3" />

            {/* Reactions */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                {post.reactions.likes > 0 && (
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" /> {post.reactions.likes}
                  </span>
                )}
                {post.reactions.hearts > 0 && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-accent text-accent" /> {post.reactions.hearts}
                  </span>
                )}
                {post.reactions.party > 0 && (
                  <span className="flex items-center gap-1">
                    <PartyPopper className="w-4 h-4" /> {post.reactions.party}
                  </span>
                )}
                {post.reactions.trophy > 0 && (
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" /> {post.reactions.trophy}
                  </span>
                )}
              </div>
              
              {post.comments.length > 0 && (
                <span className="text-muted-foreground">
                  {post.comments.length} commentaire{post.comments.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <Separator className="my-3" />

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary rounded-xl text-xs">
                <ThumbsUp className="w-4 h-4 mr-1" />
                J'aime
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-secondary/10 hover:text-secondary rounded-xl text-xs">
                <MessageCircle className="w-4 h-4 mr-1" />
                Commenter
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-accent/10 hover:text-accent rounded-xl text-xs">
                <Share2 className="w-4 h-4 mr-1" />
                Partager
              </Button>
            </div>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="space-y-2 mt-3 pt-3 border-t border-border">
                {post.comments.map((comment, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Avatar className="w-7 h-7 flex-shrink-0">
                      <AvatarFallback className="bg-sage-green text-white text-xs">
                        {comment.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-muted px-3 py-2 rounded-2xl">
                      <p className="text-xs font-medium text-foreground mb-0.5">{comment.author}</p>
                      <p className="text-sm text-foreground">{comment.message}</p>
                    </div>
                  </div>
                ))}
                
                {/* Add Comment Input */}
                <div className="flex gap-2 pt-2">
                  <Avatar className="w-7 h-7 flex-shrink-0">
                    <AvatarFallback className="bg-forest-green text-white text-xs">S</AvatarFallback>
                  </Avatar>
                  <input
                    type="text"
                    placeholder="Ajouter un commentaire..."
                    className="flex-1 px-3 py-2 bg-muted rounded-2xl border-0 text-sm focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
