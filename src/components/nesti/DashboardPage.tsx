import { useState } from "react";
import { Plus, Calendar as CalendarIcon, CheckCircle2, Heart, Sparkles, MapPin, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

export function DashboardPage() {
  // Mock data
  const todayEvents = [
    {
      id: 1,
      time: "14:00",
      title: "Rendez-vous dentiste",
      location: "Cabinet Dr. Dupont",
      participants: ["Sophie", "Jules"],
      color: "from-cyan-400 to-blue-400",
    },
    {
      id: 2,
      time: "18:30",
      title: "Cours de piano - Léa",
      location: "École de musique",
      participants: ["Léa"],
      color: "from-purple-400 to-pink-400",
    },
  ];

  const pendingTasks = [
    { id: 1, text: "Faire les courses", assignedTo: "S", deadline: "Aujourd'hui", done: false },
    { id: 2, text: "Préparer le dîner", assignedTo: "P", deadline: "Aujourd'hui", done: false },
    { id: 3, text: "Réviser mathématiques", assignedTo: "L", deadline: "Demain", done: true },
  ];

  const quickActions = [
    { id: 1, label: "Nouvel événement", icon: CalendarIcon, color: "from-cyan-400 to-emerald-400" },
    { id: 2, label: "Nouvelle tâche", icon: CheckCircle2, color: "from-purple-400 to-pink-400" },
    { id: 3, label: "Chat famille", icon: Heart, color: "from-orange-400 to-amber-400" },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Card */}
      <div className="glass-strong p-6 rounded-3xl border border-white/40 bg-gradient-to-br from-white/80 to-cyan-50/50">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl text-slate-800">Bonjour Sophie ! 👋</h2>
            <p className="text-sm text-slate-600 mt-1">Vendredi 24 Octobre 2025</p>
          </div>
          <Sparkles className="w-8 h-8 text-amber-400" strokeWidth={1.5} />
        </div>
        <p className="text-sm text-slate-600 mt-4">
          Vous avez {todayEvents.length} événements aujourd'hui et {pendingTasks.filter(t => !t.done).length} tâches en attente.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className="glass p-4 rounded-2xl border border-white/40 hover:scale-105 transition-transform duration-300 active:scale-95"
            >
              <div className={`w-12 h-12 mx-auto mb-2 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <p className="text-xs text-slate-700 text-center leading-tight">{action.label}</p>
            </button>
          );
        })}
      </div>

      {/* Today's Events */}
      <Card className="glass-strong border-white/40 rounded-3xl overflow-hidden shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-cyan-500" strokeWidth={1.5} />
              Aujourd'hui
            </CardTitle>
            <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white rounded-xl border-0 shadow-md h-8 px-3">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayEvents.length > 0 ? (
            todayEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-2xl glass border border-white/40 hover:border-cyan-300/40 transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    <span className="text-xs">{event.time.split(':')[0]}h</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-slate-800 mb-1">{event.title}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm">
              Aucun événement prévu aujourd'hui
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card className="glass-strong border-white/40 rounded-3xl overflow-hidden shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />
              Tâches en cours
            </CardTitle>
            <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-600 hover:to-cyan-500 text-white rounded-xl border-0 shadow-md h-8 px-3">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {pendingTasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-3 rounded-2xl glass border border-white/40 flex items-center gap-3 transition-all ${
                task.done ? "opacity-60" : "hover:border-emerald-300/40"
              }`}
            >
              <button 
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${
                  task.done 
                    ? "bg-gradient-to-br from-emerald-400 to-cyan-400 border-emerald-400" 
                    : "border-slate-300 hover:border-emerald-400"
                }`}
              >
                {task.done && <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${task.done ? "line-through text-slate-500" : "text-slate-700"}`}>
                  {task.text}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs px-2 py-0 h-5 border-cyan-300 text-cyan-700 rounded-lg">
                    {task.deadline}
                  </Badge>
                </div>
              </div>
              <Avatar className="w-7 h-7 border border-white">
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xs">
                  {task.assignedTo}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Family Tip */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm border border-amber-200/40">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-lg">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm text-amber-900 mb-1">Astuce du jour</h4>
            <p className="text-xs text-amber-800/80 leading-relaxed">
              Pensez à synchroniser vos agendas en famille pour éviter les conflits d'horaires !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
