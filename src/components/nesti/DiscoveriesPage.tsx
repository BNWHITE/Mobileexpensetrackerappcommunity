import { useState } from "react";
import { MapPin, Calendar, Euro, Star, Sparkles, Filter, Heart, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function DiscoveriesPage() {
  const activities = [
    {
      id: 1,
      title: "Match de football amateur",
      category: "Sport",
      type: "Football",
      image: "⚽",
      location: "Stade Municipal, Paris 15e",
      distance: "2,3 km",
      date: "Ce samedi 15h00",
      price: "Gratuit",
      rating: 4.5,
      reviews: 23,
      description: "Match amical inter-quartiers. Tous niveaux bienvenus !",
      tags: ["Famille", "Sport", "Gratuit"],
      aiMatch: 95,
    },
    {
      id: 2,
      title: "Cours de cuisine végétarienne",
      category: "Cuisine",
      type: "Cuisine",
      image: "👨‍🍳",
      location: "Atelier Gourmand, Paris 11e",
      distance: "4,1 km",
      date: "Mercredi 18h30",
      price: "35€/pers",
      rating: 4.8,
      reviews: 156,
      description: "Apprenez à préparer 3 plats végétariens savoureux avec un chef.",
      tags: ["Cuisine", "Végétarien", "Famille"],
      aiMatch: 92,
    },
    {
      id: 3,
      title: "Exposition Art Moderne",
      category: "Culture",
      type: "Musées",
      image: "🎨",
      location: "Centre Pompidou, Paris 4e",
      distance: "5,8 km",
      date: "Jusqu'au 30 juin",
      price: "12€ (gratuit -18ans)",
      rating: 4.7,
      reviews: 892,
      description: "Rétrospective des grands artistes du XXe siècle.",
      tags: ["Culture", "Art", "Famille"],
      aiMatch: 88,
    },
    {
      id: 4,
      title: "Randonnée en forêt de Fontainebleau",
      category: "Nature",
      type: "Aventure",
      image: "🌲",
      location: "Fontainebleau, 77",
      distance: "52 km",
      date: "Dimanche 10h00",
      price: "Gratuit",
      rating: 4.9,
      reviews: 234,
      description: "Balade familiale de 8km avec guide nature. Pique-nique prévu.",
      tags: ["Nature", "Famille", "Gratuit", "Aventure"],
      aiMatch: 90,
    },
    {
      id: 5,
      title: "Atelier jardinage pour enfants",
      category: "Jardinage",
      type: "Jardinage",
      image: "🌱",
      location: "Jardin Partagé du Marais",
      distance: "3,2 km",
      date: "Samedi 14h00",
      price: "10€/enfant",
      rating: 4.6,
      reviews: 67,
      description: "Initiation au jardinage urbain : plantation, arrosage, compost.",
      tags: ["Jardinage", "Enfants", "Nature"],
      aiMatch: 87,
    },
    {
      id: 6,
      title: "Concert Jazz en plein air",
      category: "Musique",
      type: "Concerts",
      image: "🎵",
      location: "Parc de Bercy, Paris 12e",
      distance: "6,5 km",
      date: "Vendredi 20h00",
      price: "Gratuit",
      rating: 4.8,
      reviews: 445,
      description: "Soirée jazz sous les étoiles avec plusieurs formations.",
      tags: ["Musique", "Gratuit", "Soirée"],
      aiMatch: 85,
    },
  ];

  const articles = [
    {
      id: 1,
      title: "10 astuces pour un potager familial réussi",
      category: "Jardinage",
      image: "🌿",
      readTime: "5 min",
      summary: "Découvrez comment créer et entretenir un potager avec vos enfants.",
    },
    {
      id: 2,
      title: "Les bienfaits du sport en famille",
      category: "Sport & Santé",
      image: "⚽",
      readTime: "4 min",
      summary: "Comment maintenir une activité physique régulière tous ensemble.",
    },
    {
      id: 3,
      title: "Recettes végétariennes faciles",
      category: "Cuisine",
      image: "🥗",
      readTime: "7 min",
      summary: "15 recettes rapides et savoureuses pour toute la famille.",
    },
  ];

  return (
    <div className="px-4 py-6 space-y-4 pb-24">
      {/* AI Banner */}
      <Card className="border-border bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Suggestions personnalisées</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Basées sur vos préférences : Football, Cuisine, Jardinage, Art
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-xl">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted rounded-2xl p-1 mb-4">
          <TabsTrigger value="activities" className="rounded-xl data-[state=active]:bg-card">
            🎯 Activités
          </TabsTrigger>
          <TabsTrigger value="articles" className="rounded-xl data-[state=active]:bg-card">
            📚 Articles
          </TabsTrigger>
        </TabsList>

        {/* ACTIVITIES TAB */}
        <TabsContent value="activities" className="space-y-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="border-border bg-card overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Image/Icon Header */}
                <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl relative">
                  {activity.image}
                  {activity.aiMatch >= 90 && (
                    <Badge className="absolute top-3 right-3 bg-success text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {activity.aiMatch}% match
                    </Badge>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  {/* Title & Category */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground flex-1 pr-2">
                        {activity.title}
                      </h3>
                      <Badge variant="outline" className="border-primary text-primary text-xs">
                        {activity.category}
                      </Badge>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium text-foreground">{activity.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({activity.reviews} avis)</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="truncate">{activity.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span className="truncate">{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                      <Euro className="w-4 h-4 text-accent" />
                      <span>{activity.price}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl">
                      <Calendar className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                    <Button variant="outline" className="flex-1 border-border rounded-xl">
                      <Heart className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ARTICLES TAB */}
        <TabsContent value="articles" className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id} className="border-border bg-card overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {article.image}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground text-sm leading-tight flex-1 pr-2">
                        {article.title}
                      </h3>
                      <Badge variant="outline" className="border-secondary text-secondary text-xs flex-shrink-0">
                        {article.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-xl h-8">
                        Lire →
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* More Articles */}
          <Button variant="outline" className="w-full border-border rounded-xl">
            Voir plus d'articles
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
