import { useState } from "react";
import { Plus, CheckCircle2, Circle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface Task {
  id: number;
  title: string;
  assignedTo: string;
  assignedToInitials: string;
  deadline?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inProgress" | "done";
  color: string;
}

export function TasksPage() {
  const [filter, setFilter] = useState<"all" | "todo" | "inProgress" | "done">("all");

  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Faire les courses pour le dîner de samedi",
      assignedTo: "Sophie",
      assignedToInitials: "S",
      deadline: "Aujourd'hui",
      priority: "high",
      status: "todo",
      color: "from-cyan-400 to-emerald-400",
    },
    {
      id: 2,
      title: "Préparer présentation sur les dinosaures",
      assignedTo: "Léa",
      assignedToInitials: "L",
      deadline: "Lundi",
      priority: "medium",
      status: "todo",
      color: "from-pink-400 to-orange-400",
    },
    {
      id: 3,
      title: "Réviser les mathématiques",
      assignedTo: "Jules",
      assignedToInitials: "J",
      deadline: "Demain",
      priority: "high",
      status: "inProgress",
      color: "from-amber-400 to-yellow-400",
    },
    {
      id: 4,
      title: "Appeler le plombier",
      assignedTo: "Pierre",
      assignedToInitials: "P",
      deadline: "Cette semaine",
      priority: "medium",
      status: "inProgress",
      color: "from-blue-400 to-purple-400",
    },
    {
      id: 5,
      title: "Ranger le garage",
      assignedTo: "Pierre",
      assignedToInitials: "P",
      priority: "low",
      status: "done",
      color: "from-blue-400 to-purple-400",
    },
  ]);

  const filteredTasks = tasks.filter((task) => filter === "all" || task.status === filter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "from-red-400 to-orange-400";
      case "medium":
        return "from-amber-400 to-yellow-400";
      case "low":
        return "from-emerald-400 to-cyan-400";
      default:
        return "from-slate-400 to-slate-500";
    }
  };

  const columns = [
    { id: "todo", title: "À faire", icon: Circle },
    { id: "inProgress", title: "En cours", icon: Clock },
    { id: "done", title: "Terminé", icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "todo", "inProgress", "done"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-2xl text-sm whitespace-nowrap transition-all ${
                filter === status
                  ? "bg-gradient-to-r from-cyan-500 to-emerald-400 text-white shadow-lg"
                  : "glass border border-white/40 text-slate-600 hover:border-cyan-300/40"
              }`}
            >
              {status === "all" && "Toutes"}
              {status === "todo" && "À faire"}
              {status === "inProgress" && "En cours"}
              {status === "done" && "Terminées"}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban View - Mobile Optimized */}
      <div className="space-y-6">
        {columns.map((column) => {
          const Icon = column.icon;
          const columnTasks = filteredTasks.filter((task) => task.status === column.id);

          return (
            <Card key={column.id} className="glass-strong border-white/40 rounded-3xl overflow-hidden shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-slate-800 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-cyan-500" strokeWidth={1.5} />
                    {column.title}
                    <Badge variant="outline" className="ml-1 text-xs px-2 py-0 h-5 border-cyan-300 text-cyan-700 rounded-lg">
                      {columnTasks.length}
                    </Badge>
                  </CardTitle>
                  {column.id === "todo" && (
                    <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white rounded-xl border-0 shadow-md h-8 px-3">
                      <Plus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {columnTasks.length > 0 ? (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-2xl glass border border-white/40 hover:border-cyan-300/40 transition-all cursor-pointer ${
                        task.status === "done" ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Priority Indicator */}
                        <div className={`w-1 h-14 rounded-full bg-gradient-to-b ${getPriorityColor(task.priority)} flex-shrink-0`} />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm text-slate-800 mb-2 ${task.status === "done" ? "line-through" : ""}`}>
                            {task.title}
                          </h4>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {task.deadline && (
                                <Badge variant="outline" className="text-xs px-2 py-0 h-5 border-slate-300 text-slate-600 rounded-lg">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {task.deadline}
                                </Badge>
                              )}
                            </div>
                            
                            <Avatar className="w-7 h-7 border border-white shadow-sm">
                              <AvatarFallback className={`bg-gradient-to-br ${task.color} text-white text-xs`}>
                                {task.assignedToInitials}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-500 text-sm">
                    Aucune tâche
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Task Button - Fixed at bottom */}
      <Button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white py-7 rounded-3xl shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 border-0">
        <Plus className="w-5 h-5 mr-2" />
        Ajouter une tâche
      </Button>
    </div>
  );
}
