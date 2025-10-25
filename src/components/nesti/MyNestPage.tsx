import { useState } from "react";
import { Plus, Mail, Shield, UserX, Edit, Users as UsersIcon, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";

export function MyNestPage() {
  const [isAdmin] = useState(true);

  const members = [
    {
      id: 1,
      name: "Sophie Martin",
      role: "admin",
      email: "sophie@martin.com",
      avatar: "SM",
      joinedDate: "Janvier 2024",
      canManage: false, // Can't manage yourself
    },
    {
      id: 2,
      name: "Pierre Martin",
      role: "parent",
      email: "pierre@martin.com",
      avatar: "PM",
      joinedDate: "Janvier 2024",
      canManage: true,
    },
    {
      id: 3,
      name: "Emma Martin",
      role: "teen",
      email: "emma@martin.com",
      avatar: "EM",
      joinedDate: "Février 2024",
      canManage: true,
    },
    {
      id: 4,
      name: "Lucas Martin",
      role: "teen",
      email: "lucas@martin.com",
      avatar: "LM",
      joinedDate: "Février 2024",
      canManage: true,
    },
    {
      id: 5,
      name: "Grand-mère Marie",
      role: "grandparent",
      email: "marie@martin.com",
      avatar: "GM",
      joinedDate: "Mars 2024",
      canManage: true,
    },
  ];

  const connectedNests = [
    {
      id: 1,
      name: "Famille Dubois",
      members: 5,
      avatar: "FD",
      connection: "Amis proches",
      since: "Il y a 3 mois",
    },
    {
      id: 2,
      name: "Les Cousins",
      members: 8,
      avatar: "LC",
      connection: "Famille élargie",
      since: "Il y a 6 mois",
    },
  ];

  const getRoleInfo = (role: string) => {
    const roles = {
      admin: { label: "Admin", icon: "👑", color: "role-badge-admin" },
      parent: { label: "Parent", icon: "👨‍👩‍👧", color: "role-badge-parent" },
      adult: { label: "Majeur", icon: "🧑", color: "role-badge-adult" },
      teen: { label: "Ado", icon: "👦", color: "role-badge-teen" },
      grandparent: { label: "Grand-parent", icon: "👴", color: "role-badge-grandparent" },
      guest: { label: "Invité", icon: "👥", color: "role-badge-guest" },
    };
    return roles[role as keyof typeof roles] || roles.guest;
  };

  return (
    <div className="px-4 py-6 space-y-4 pb-24">
      {/* Nest Header */}
      <Card className="border-border overflow-hidden shadow-md bg-card">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-forest-green to-sage-green rounded-3xl flex items-center justify-center text-white text-2xl">
              <UsersIcon className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Famille Martin</h2>
            <p className="text-muted-foreground mb-4">Notre petit nid chaleureux 🏡</p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <UsersIcon className="w-4 h-4" />
                {members.length} membres
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {connectedNests.length} nests connectés
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Membres du nest</h3>
          {isAdmin && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                  <Plus className="w-4 h-4 mr-1" />
                  Inviter
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card max-w-sm mx-4">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Inviter un membre</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@exemple.com"
                      className="mt-2 bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-foreground">Rôle</Label>
                    <Select>
                      <SelectTrigger className="mt-2 bg-background border-border text-foreground">
                        <SelectValue placeholder="Choisir un rôle" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="parent">👨‍👩‍👧 Parent</SelectItem>
                        <SelectItem value="adult">🧑 Majeur</SelectItem>
                        <SelectItem value="teen">👦 Ado (13-17 ans)</SelectItem>
                        <SelectItem value="grandparent">👴 Grand-parent</SelectItem>
                        <SelectItem value="guest">👥 Invité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                    <Mail className="w-4 h-4 mr-2" />
                    Envoyer l'invitation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="space-y-3">
          {members.map((member) => {
            const roleInfo = getRoleInfo(member.role);
            
            return (
              <Card key={member.id} className="border-border bg-card overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className={`${roleInfo.color} text-white`}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground text-sm truncate">
                          {member.name}
                        </h4>
                        <Badge className={`${roleInfo.color} text-white text-xs px-2 py-0.5`}>
                          {roleInfo.icon} {roleInfo.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                      <p className="text-xs text-muted-foreground">Membre depuis {member.joinedDate}</p>
                    </div>

                    {isAdmin && member.canManage && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive">
                          <UserX className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {member.id === 1 && (
                      <Badge variant="outline" className="border-warning text-warning text-xs">
                        Vous
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Connected Nests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Nests connectés</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-xl border-border text-foreground">
                <Plus className="w-4 h-4 mr-1" />
                Connecter
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card max-w-sm mx-4">
              <DialogHeader>
                <DialogTitle className="text-foreground">Se connecter à un nest</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="search" className="text-foreground">Rechercher un nest</Label>
                  <Input 
                    id="search" 
                    type="text" 
                    placeholder="Nom du nest ou email"
                    className="mt-2 bg-background border-border text-foreground"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                  Rechercher
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {connectedNests.map((nest) => (
            <Card key={nest.id} className="border-border bg-card overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-secondary text-white">
                      {nest.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      {nest.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {nest.members} membres • {nest.connection}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Connectés {nest.since}
                    </p>
                  </div>

                  <Button variant="ghost" size="sm" className="text-secondary hover:bg-secondary/10 rounded-xl">
                    Voir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Permissions Info */}
      {isAdmin && (
        <Card className="border-border bg-primary/5 overflow-hidden">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  Gestion du nest
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  En tant qu'admin, vous pouvez inviter et gérer les membres, 
                  définir les permissions et configurer le nest.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
