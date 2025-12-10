import { useState } from "react";
import { Plus, Calendar, Clock, MapPin, Users, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState("Aujourd'hui");

  const events = [
    {
      id: 1,
      type: "event",
      time: "09:00",
      title: "RDV médecin Emma",
      location: "Cabinet Dr. Moreau",
      distance: "1,2 km",
      participants: ["Emma", "Maman"],
      color: "secondary",
      icon: "🏥",
    },
    {
      id: 2,
      type: "task",
      time: "14:00",
      title: "Courses supermarché",
      assignedTo: "Maman",
      priority: "high",
      completed: false,
      subtasks: [
        { label: "Lait, pain, fruits", done: false },
        { label: "Produits d'entretien", done: false },
      ],
    },
    {
      id: 3,
      type: "event",
      time: "16:00",
      title: "Match de foot Emma",
      location: "Stade municipal",
      distance: "3,5 km",
      participants: ["Emma", "Papa"],
      color: "success",
      icon: "⚽",
    },
    {
      id: 4,
      type: "task",
      time: "18:00",
      title: "Préparer dîner",
      assignedTo: "Papa",
      priority: "medium",
      completed: false,
      subtasks: [
        { label: "Acheter ingrédients", done: true },
        { label: "Cuisiner", done: false },
      ],
    },
    {
      id: 5,
      type: "event",
      time: "19:30",
      title: "Dîner d'anniversaire Emma",
      location: "Restaurant La Table Ronde",
      distance: "2,8 km",
      participants: ["Toute la famille"],
      color: "accent",
      icon: "🎂",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Vacances Bretagne",
      date: "15-29 Juillet",
      type: "Vacances",
      participants: 4,
      icon: "🏖️",
    },
    {
      id: 2,
      title: "Rentrée scolaire Lucas",
      date: "2 Septembre",
      type: "École",
      participants: 1,
      icon: "🎒",
    },
    {
      id: 3,
      title: "Réunion parents-profs",
      date: "15 Septembre",
      type: "École",
      participants: 2,
      icon: "👨‍🏫",
    },
  ];

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-destructive text-white",
      medium: "bg-warning text-foreground",
      low: "bg-success text-white",
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      high: "Urgent",
      medium: "Moyen",
      low: "Bas",
    };
    return labels[priority as keyof typeof labels] || "Moyen";
  };

  return (
    <div className="px-4 py-6 space-y-4 pb-24">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {selectedDate}
          </h2>
          <p className="text-sm text-muted-foreground">Lundi 27 Janvier 2025</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-md">
          <Plus className="w-5 h-5 mr-2" />
          Ajouter
        </Button>
      </div>

      {/* Date Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["Hier", "Aujourd'hui", "Demain", "Semaine", "Mois"].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedDate(period)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedDate === period
                ? "bg-primary text-white shadow-md"
                : "bg-muted text-muted-foreground hover:bg-primary/10"
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted rounded-2xl p-1 mb-4">
          <TabsTrigger value="timeline" className="rounded-xl data-[state=active]:bg-card">
            📅 Timeline
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="rounded-xl data-[state=active]:bg-card">
            🔜 À venir
          </TabsTrigger>
        </TabsList>

        {/* TIMELINE VIEW */}
        <TabsContent value="timeline" className="space-y-3">
          {events.map((item) => {
            if (item.type === "event") {
              return (
                <Card key={item.id} className="border-l-4 border-l-secondary bg-card overflow-hidden shadow-md">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      {/* Time & Icon */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center text-2xl mb-1">
                          {item.icon}
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">{item.time}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        
                        <div className="space-y-1 text-sm text-muted-foreground mb-3">
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-secondary" />
                            {item.location} ({item.distance})
                          </p>
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-secondary" />
                            {Array.isArray(item.participants) ? item.participants.join(", ") : item.participants}
                          </p>
                        </div>

                        <Button variant="outline" size="sm" className="border-border rounded-xl text-xs">
                          <ChevronRight className="w-4 h-4 mr-1" />
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            } else {
              return (
                <Card key={item.id} className="border-l-4 border-l-success bg-card overflow-hidden shadow-md">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      {/* Checkbox & Time */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <button className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center mb-1">
                          {item.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-success" />
                          ) : (
                            <Circle className="w-6 h-6 text-muted-foreground" />
                          )}
                        </button>
                        <span className="text-xs font-medium text-muted-foreground">{item.time}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-semibold ${item.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {item.title}
                          </h3>
                          <Badge className={`${getPriorityColor(item.priority)} text-xs ml-2`}>
                            {getPriorityLabel(item.priority)}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                          Assigné à : 
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-sage-green text-white text-xs">
                              {item.assignedTo?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{item.assignedTo}</span>
                        </p>

                        {/* Subtasks */}
                        {item.subtasks && (
                          <div className="space-y-2 mb-3">
                            {item.subtasks.map((subtask, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Checkbox checked={subtask.done} className="border-border" />
                                <span className={`text-sm ${subtask.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                  {subtask.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-border rounded-xl text-xs">
                            Marquer terminé
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-xl text-xs">
                            Modifier
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }
          })}
        </TabsContent>

        {/* UPCOMING VIEW */}
        <TabsContent value="upcoming" className="space-y-3">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="border-border bg-card overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-warning/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {event.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      <Badge variant="outline" className="border-accent text-accent text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.participants} participant{event.participants > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-xl flex-shrink-0">
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Summary Card */}
      <Card className="border-border bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">Événements</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">2</p>
              <p className="text-xs text-muted-foreground">Tâches</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">1</p>
              <p className="text-xs text-muted-foreground">Urgent</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
