import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, MapPin, Users, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 24)); // October 24, 2025
  const [selectedDay, setSelectedDay] = useState(24);
  const [view, setView] = useState<"month" | "week" | "list">("month");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  // Mock events data
  const events: Record<number, Array<{ id: number; title: string; time: string; color: string; description?: string; location?: string; participants: string[] }>> = {
    24: [
      { id: 1, title: "Rendez-vous dentiste", time: "14:00", color: "bg-blue-500", location: "Cabinet Dr. Dupont", participants: ["SM", "JM"] },
      { id: 2, title: "Cours de piano", time: "18:30", color: "bg-purple-500", location: "École de musique", participants: ["LM"] },
    ],
    25: [
      { id: 3, title: "Match de foot", time: "15:00", color: "bg-green-500", location: "Stade municipal", participants: ["JM"] },
    ],
    26: [
      { id: 4, title: "Dîner famille", time: "19:30", color: "bg-orange-500", participants: ["SM", "PM", "LM", "JM"] },
    ],
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2025, 9, 24));
    setSelectedDay(24);
  };

  const renderCalendar = () => {
    const days = [];
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const isToday = dayNumber === 24 && currentDate.getMonth() === 9;
      const isSelected = dayNumber === selectedDay;
      const dayEvents = events[dayNumber] || [];

      days.push(
        <div
          key={i}
          onClick={() => isCurrentMonth && setSelectedDay(dayNumber)}
          className={`min-h-28 p-2 border border-slate-100 cursor-pointer transition-all ${
            !isCurrentMonth ? "bg-slate-50 text-slate-300" : "bg-white hover:bg-slate-50"
          } ${isSelected ? "ring-2 ring-teal-500" : ""}`}
        >
          {isCurrentMonth && (
            <>
              <div className={`text-sm mb-1 ${isToday ? "text-teal-600" : "text-slate-700"}`}>
                {dayNumber}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className={`text-xs px-2 py-1 ${event.color} text-white rounded truncate`}>
                    {event.time} {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-slate-500">+{dayEvents.length - 3} autres</div>
                )}
              </div>
            </>
          )}
        </div>
      );
    }

    return days;
  };

  const selectedDayEvents = events[selectedDay] || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Calendar */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Month Navigation */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl min-w-48 text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Aujourd'hui
                </Button>
                <div className="flex rounded-lg border">
                  <Button
                    variant={view === "month" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setView("month")}
                    className={view === "month" ? "bg-teal-500 hover:bg-teal-600 text-white" : ""}
                  >
                    Mois
                  </Button>
                  <Button
                    variant={view === "week" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setView("week")}
                    className={view === "week" ? "bg-teal-500 hover:bg-teal-600 text-white" : ""}
                  >
                    Semaine
                  </Button>
                  <Button
                    variant={view === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setView("list")}
                    className={view === "list" ? "bg-teal-500 hover:bg-teal-600 text-white" : ""}
                  >
                    Liste
                  </Button>
                </div>
                <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvel événement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Nouvel événement</DialogTitle>
                      <DialogDescription>Ajoutez un événement au calendrier familial</DialogDescription>
                    </DialogHeader>
                    <AddEventForm onClose={() => setIsAddEventOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden">
              {/* Day headers */}
              {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                <div key={day} className="bg-slate-50 p-2 text-center text-sm text-slate-600">
                  {day}
                </div>
              ))}
              {/* Calendar days */}
              {renderCalendar()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - Selected Day Details */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDay === 24 ? "Aujourd'hui" : `${selectedDay} ${monthNames[currentDate.getMonth()]}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-slate-600 mb-4">Aucun événement prévu</p>
                <Button
                  variant="outline"
                  onClick={() => setIsAddEventOpen(true)}
                  className="border-teal-500 text-teal-600 hover:bg-teal-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un événement
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDayEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${event.color} rounded-full`} />
                        <div>
                          <p className="text-sm text-teal-600">{event.time}</p>
                          <h4>{event.title}</h4>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4 text-slate-400" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                    
                    {event.description && (
                      <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                    )}
                    
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <div className="flex gap-1">
                        {event.participants.map((p, i) => (
                          <Avatar key={i} className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-teal-100 text-teal-700">
                              {p}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AddEventForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    participants: [] as string[],
    color: "bg-blue-500",
    notify: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre de l'événement *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Ex: Rendez-vous chez le médecin"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description">Description (optionnel)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Ajoutez des détails..."
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="date">Date *</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Heure début *</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="endTime">Heure fin *</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Lieu</Label>
        <div className="relative mt-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Ajoutez un lieu"
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="participants">Participants</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Sélectionnez les participants" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toute la famille</SelectItem>
            <SelectItem value="sm">Sophie Martin</SelectItem>
            <SelectItem value="pm">Pierre Martin</SelectItem>
            <SelectItem value="lm">Léa Martin</SelectItem>
            <SelectItem value="jm">Jules Martin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Couleur</Label>
        <div className="flex gap-2 mt-2">
          {["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500", "bg-red-500"].map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setFormData({ ...formData, color })}
              className={`w-8 h-8 ${color} rounded-full ${formData.color === color ? "ring-2 ring-offset-2 ring-slate-800" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="notify"
          checked={formData.notify}
          onChange={(e) => setFormData({ ...formData, notify: e.target.checked })}
          className="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-teal-500"
        />
        <Label htmlFor="notify" className="cursor-pointer">
          Envoyer une notification à tous les participants
        </Label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Annuler
        </Button>
        <Button type="submit" className="flex-1 bg-teal-500 hover:bg-teal-600 text-white">
          Créer l'événement
        </Button>
      </div>
    </form>
  );
}
