import { useState } from "react";
import { User, Palette, Bell, Shield, Sparkles, Camera, Save, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

export function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Sophie Martin",
    email: "sophie@martin.com",
    role: "admin",
  });

  const [notifications, setNotifications] = useState({
    posts: true,
    comments: true,
    events: true,
    activities: false,
  });

  const [aiPreferences, setAiPreferences] = useState({
    sports: ["Football", "Natation", "Tennis"],
    hobbies: ["Lecture", "Cuisine", "Jardinage", "Art"],
    vacationTypes: ["Plage", "Montagne"],
    culturalInterests: ["Musées", "Concerts", "Théâtre"],
    dietaryPreferences: ["Végétarien"],
  });

  const sportOptions = ["Football", "Basketball", "Tennis", "Natation", "Cyclisme", "Yoga", "Course", "Danse"];
  const hobbyOptions = ["Lecture", "Cuisine", "Jardinage", "Art", "Musique", "Photographie", "Bricolage", "Jeux"];
  const vacationOptions = ["Plage", "Montagne", "Ville", "Campagne", "Aventure"];
  const culturalOptions = ["Musées", "Concerts", "Théâtre", "Cinéma", "Festivals", "Expositions"];

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="px-4 py-6 space-y-4 pb-24">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted rounded-2xl p-1 mb-6">
          <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-card">
            <User className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-xl data-[state=active]:bg-card">
            <Sparkles className="w-4 h-4 mr-2" />
            IA Nesti
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl data-[state=active]:bg-card">
            <Palette className="w-4 h-4 mr-2" />
            App
          </TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile" className="space-y-4">
          {/* Profile Photo */}
          <Card className="border-border bg-card overflow-hidden shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarFallback className="bg-forest-green text-white text-2xl">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <Badge className="role-badge-admin text-white px-4 py-1 mb-2">
                  👑 Admin
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Profile Info */}
          <Card className="border-border bg-card overflow-hidden shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Nom complet</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="mt-2 bg-background border-border text-foreground"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="mt-2 bg-background border-border text-foreground"
                />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI PREFERENCES TAB */}
        <TabsContent value="preferences" className="space-y-4">
          <Card className="border-border bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">IA Nesti personnalisée</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Partagez vos préférences familiales pour que l'IA Nesti vous propose des activités 
                    et du contenu parfaitement adaptés à votre famille.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sports & Activities */}
          <Card className="border-border bg-card overflow-hidden shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                ⚽ Sports pratiqués dans la famille
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sportOptions.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setAiPreferences({
                      ...aiPreferences,
                      sports: toggleArrayItem(aiPreferences.sports, sport)
                    })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      aiPreferences.sports.includes(sport)
                        ? "bg-success text-white shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-success/20"
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hobbies */}
          <Card className="border-border bg-card overflow-hidden shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                🎨 Centres d'intérêt & Hobbies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {hobbyOptions.map((hobby) => (
                  <button
                    key={hobby}
                    onClick={() => setAiPreferences({
                      ...aiPreferences,
                      hobbies: toggleArrayItem(aiPreferences.hobbies, hobby)
                    })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      aiPreferences.hobbies.includes(hobby)
                        ? "bg-secondary text-white shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-secondary/20"
                    }`}
                  >
                    {hobby}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vacation Preferences */}
          <Card className="border-border bg-card overflow-hidden shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                🏖️ Types de vacances préférés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {vacationOptions.map((vacation) => (
                  <button
                    key={vacation}
                    onClick={() => setAiPreferences({
                      ...aiPreferences,
                      vacationTypes: toggleArrayItem(aiPreferences.vacationTypes, vacation)
                    })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      aiPreferences.vacationTypes.includes(vacation)
                        ? "bg-accent text-white shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-accent/20"
                    }`}
                  >
                    {vacation}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cultural Interests */}
          <Card className="border-border bg-card overflow-hidden shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                🎭 Activités culturelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {culturalOptions.map((cultural) => (
                  <button
                    key={cultural}
                    onClick={() => setAiPreferences({
                      ...aiPreferences,
                      culturalInterests: toggleArrayItem(aiPreferences.culturalInterests, cultural)
                    })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      aiPreferences.culturalInterests.includes(cultural)
                        ? "bg-warning text-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-warning/20"
                    }`}
                  >
                    {cultural}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
            <Sparkles className="w-4 h-4 mr-2" />
            Enregistrer mes préférences
          </Button>
        </TabsContent>

        {/* APP SETTINGS TAB */}
        <TabsContent value="settings" className="space-y-4">
          {/* Notifications */}
          <Card className="border-border bg-card overflow-hidden shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Nouvelles publications</p>
                  <p className="text-sm text-muted-foreground">Dans le fil d'actualité</p>
                </div>
                <Switch
                  checked={notifications.posts}
                  onCheckedChange={(checked) => setNotifications({...notifications, posts: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Commentaires</p>
                  <p className="text-sm text-muted-foreground">Sur vos publications</p>
                </div>
                <Switch
                  checked={notifications.comments}
                  onCheckedChange={(checked) => setNotifications({...notifications, comments: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Événements</p>
                  <p className="text-sm text-muted-foreground">Nouveaux événements et rappels</p>
                </div>
                <Switch
                  checked={notifications.events}
                  onCheckedChange={(checked) => setNotifications({...notifications, events: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Suggestions d'activités</p>
                  <p className="text-sm text-muted-foreground">Recommandations IA Nesti</p>
                </div>
                <Switch
                  checked={notifications.activities}
                  onCheckedChange={(checked) => setNotifications({...notifications, activities: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="border-border bg-card overflow-hidden shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Confidentialité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-left">
                <div>
                  <p className="font-medium text-foreground">Visibilité du profil</p>
                  <p className="text-sm text-muted-foreground">Gérer qui peut voir votre profil</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-left">
                <div>
                  <p className="font-medium text-foreground">Mes données</p>
                  <p className="text-sm text-muted-foreground">Télécharger ou supprimer</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="border-border bg-card overflow-hidden shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Nesti v1.0.0
              </p>
              <p className="text-xs text-muted-foreground">
                © 2024 Nesti - Tous droits réservés
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
