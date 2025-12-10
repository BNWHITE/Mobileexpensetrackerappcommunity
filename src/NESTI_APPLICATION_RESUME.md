# NESTI - Résumé Complet de l'Application
## Documentation Technique et Fonctionnelle

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture Technique](#architecture-technique)
3. [Design System & Identité Visuelle](#design-system--identité-visuelle)
4. [Flux de Navigation](#flux-de-navigation)
5. [Pages & Fonctionnalités Détaillées](#pages--fonctionnalités-détaillées)
6. [Système de Rôles & Permissions](#système-de-rôles--permissions)
7. [Composants & Patterns UI](#composants--patterns-ui)
8. [Données de Démo](#données-de-démo)
9. [Principes Éthiques & Conformité](#principes-éthiques--conformité)
10. [Technologies Utilisées](#technologies-utilisées)

---

## 🎯 VUE D'ENSEMBLE

### Concept
**NESTI** est une application de réseau social familial (tribal) conçue pour connecter les familles et faciliter l'organisation de la vie quotidienne. C'est un espace privé et chaleureux où les membres d'une famille (appelée "Nest") peuvent :
- Partager des moments et des publications
- Organiser des événements et des tâches
- Découvrir des activités adaptées à leurs besoins spécifiques (notamment accessibilité et handicap)
- Obtenir des suggestions personnalisées via une IA
- Gérer les membres de la famille avec des rôles et permissions

### Positionnement
- **Mobile-first** : Interface optimisée pour smartphone (max-width: 428px)
- **Inclusif** : Activités adaptées handicap/accessibilité
- **Éthique** : Conformité RGPD, EU AI Act, neutralité visible
- **Personnalisé** : IA adaptative basée sur les préférences familiales
- **Privé** : Contrôle parental complet, espace familial sécurisé

---

## 🏗️ ARCHITECTURE TECHNIQUE

### Structure des Fichiers
```
/
├── App.tsx                          # Point d'entrée principal
├── styles/
│   └── globals.css                  # Design system & tokens
├── components/
│   ├── figma/
│   │   └── ImageWithFallback.tsx   # Composant image protégé
│   ├── nesti/                       # Composants pages NESTI
│   │   ├── SplashScreen.tsx        # Écran d'accueil animé
│   │   ├── Onboarding.tsx          # Onboarding 4 étapes
│   │   ├── MainLayout.tsx          # Layout avec bottom nav
│   │   ├── FeedPage.tsx            # Fil d'actualité
│   │   ├── AgendaPage.tsx          # Agenda & Tâches combinés
│   │   ├── MyNestPage.tsx          # Gestion membres & nests
│   │   ├── DiscoveriesPage.tsx     # Découvertes activités IA
│   │   ├── ChatPage.tsx            # Chat IA Nesti
│   │   └── SettingsPage.tsx        # Paramètres & préférences
│   └── ui/                          # Bibliothèque de composants UI
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── tabs.tsx
│       └── [50+ composants UI]
└── assets/
    └── figma:asset/                 # Logo Nesti (import virtuel)
```

### Flux de l'Application (App.tsx)
```typescript
[SplashScreen] 
    ↓ (onContinue)
[Onboarding - 4 étapes]
    ↓ (onComplete)
[MainLayout avec navigation]
    ├── FeedPage
    ├── AgendaPage
    ├── MyNestPage
    ├── DiscoveriesPage
    ├── ChatPage
    └── SettingsPage (via avatar)
```

### Gestion de l'État
- **React Hooks** : useState pour la gestion locale
- **Navigation** : Système custom avec état `currentPage` et `currentScreen`
- **Mode sombre** : Toggle dynamique avec classe `.dark` sur `document.documentElement`
- **Pas de routing** : Navigation par état React (mono-page)

---

## 🎨 DESIGN SYSTEM & IDENTITÉ VISUELLE

### Palette de Couleurs (Logo NESTI)

#### Couleurs Principales
```css
--forest-green: #2D5F5D     /* Vert forêt - Couleur primaire */
--sage-green: #4A8B7A       /* Vert sauge - Succès */
--coral-orange: #E87461     /* Orange corail - Accent */
--sky-blue: #6AADBA         /* Bleu ciel - Secondaire */
--golden-yellow: #E8B558    /* Jaune doré - Warning */
--cream: #F5F1E8            /* Crème - Muted */
--warm-orange: #F4976C      /* Orange chaud - Grand-parents */
```

#### Mode Clair
```css
--background: #FAFAF9       /* Fond principal */
--foreground: #1F2937       /* Texte principal */
--card: #FFFFFF             /* Cartes blanches */
--border: rgba(45, 95, 93, 0.1)  /* Bordures subtiles */
```

#### Mode Sombre
```css
--background: #0F1419       /* Fond sombre */
--foreground: #F3F4F6       /* Texte clair */
--card: #1A1F28             /* Cartes sombres */
--border: rgba(106, 173, 186, 0.15)  /* Bordures adaptées */
```

### Couleurs de Rôles
```css
--role-admin: #2D5F5D       /* Vert forêt */
--role-parent: #4A8B7A      /* Vert sauge */
--role-adult: #6AADBA       /* Bleu ciel */
--role-teen: #E8B558        /* Jaune doré */
--role-grandparent: #F4976C /* Orange chaud */
--role-guest: #9CA3AF       /* Gris */
```

### Typographie
```css
/* Headings */
font-family: 'Poppins', sans-serif
h1: 1.875rem (30px) | 700 weight
h2: 1.5rem (24px) | 600 weight
h3: 1.25rem (20px) | 600 weight
h4: 1.125rem (18px) | 500 weight

/* Body */
font-family: 'Inter', sans-serif
p: 1rem (16px) | 400 weight | line-height 1.6
```

### Radius (Arrondis)
```css
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px
--radius-2xl: 32px
--radius-full: 9999px
```

### Animations
```css
/* Predefined animations */
@keyframes fadeIn         /* Apparition fondue */
@keyframes slideUp        /* Glissement vers le haut */
@keyframes scaleIn        /* Agrandissement */

/* Utility classes */
.animate-fadeIn
.animate-slideUp
.animate-scaleIn
```

### Utilitaires
```css
.glass                    /* Effet glassmorphism */
.mobile-container         /* Conteneur mobile (max-width: 428px) */
.role-badge-{role}        /* Badges de rôle colorés */
```

---

## 🗺️ FLUX DE NAVIGATION

### 1. SplashScreen (Écran d'accueil)
**Durée** : Instantané jusqu'au clic utilisateur

**Contenu** :
- Logo NESTI animé (flottement vertical)
- Titre "NESTI" en Poppins
- Tagline : "Votre réseau familial chaleureux"
- Bouton CTA : "Commencer"
- Sous-texte : "Connectez, partagez, célébrez ensemble"

**Animations** :
- Logo : Animation de flottement (y: 0 → -10 → 0, infini)
- Éléments : Fade-in séquencé avec délais progressifs
- Fond : Gradient cream → blanc → sky-blue/10

**Transition** : Clic sur "Commencer" → Onboarding

---

### 2. Onboarding (4 Étapes)

#### Structure Commune
- **Progress Bar** : Affichage "Étape X / 4" avec barre de progression animée
- **Bouton "Passer"** : Visible aux étapes 2-3 (skip vers app)
- **Navigation** : Boutons "Retour" et "Suivant" en bas
- **Animations** : Transitions horizontales entre étapes (slide left/right)

#### Étape 1 : Bienvenue
**Objectif** : Introduction à l'application

**Contenu** :
- Logo NESTI animé (rotation légère)
- Icône : 🏡
- Titre : "Bienvenue dans Nesti"
- Sous-titre : "Votre assistant familial inclusif"
- Description : "Organisez votre vie familiale, découvrez des activités adaptées et restez connectés."

**Interaction** : Bouton "Suivant" uniquement

#### Étape 2 : Création du Nest
**Objectif** : Nommer la famille

**Contenu** :
- Illustration : Icône Users + Cœur animé
- Icône : 👨‍👩‍👧‍👦
- Titre : "Créez votre Nest"
- Sous-titre : "Donnez un nom à votre famille"
- Formulaire : Input "Nom de votre nest" (ex: Famille Martin)

**Validation** : Obligatoire (bouton "Suivant" désactivé si vide)

#### Étape 3 : Préférences
**Objectif** : Personnalisation IA

**Contenu** :
- Illustration : Icône Sparkles
- Icône : ✨
- Titre : "Personnalisez vos préférences"
- Sous-titre : "Aidez Nesti à vous connaître"

**Sélections multiples** :
1. **Sports** (vert sauge) : Football, Natation, Tennis, Yoga, Vélo, Danse
2. **Loisirs créatifs** (bleu ciel) : Lecture, Cuisine, Jardinage, Art, Musique, Photo
3. **Types de vacances** (orange corail) : Plage, Montagne, Ville, Campagne

**Badge** : Compteur de préférences sélectionnées

#### Étape 4 : Confirmation
**Objectif** : Récapitulatif et lancement

**Contenu** :
- Icône check animée (scale spring animation)
- Icône : 🎉
- Titre : "Tout est prêt !"
- Sous-titre : "Commencez l'aventure Nesti"
- Récapitulatif :
  - Nom du nest
  - Nombre de préférences configurées
- Bouton : "Commencer" (gradient vert)

**Transition** : Clic sur "Commencer" → MainLayout (Feed)

---

### 3. MainLayout (Navigation Principale)

#### Structure
```
┌─────────────────────────┐
│   Top Header            │ ← Sticky
├─────────────────────────┤
│                         │
│   Page Content          │ ← Scrollable
│   (Feed, Agenda, etc.)  │
│                         │
├─────────────────────────┤
│   Bottom Navigation     │ ← Sticky
└─────────────────────────┘
```

#### Top Header (Sticky)
**Contenu** :
- **Gauche** : Logo NESTI (10x10) + Nom du nest
- **Droite** :
  - Toggle mode sombre/clair (Lune/Soleil)
  - Notifications (Badge avec compteur)
  - Avatar utilisateur (clic → Paramètres)

**Données affichées** :
- Nom du nest : "Famille Martin"
- Nom utilisateur : "Sophie"
- Rôle : "admin"
- Notifications : 3 non lues

#### Bottom Navigation (5 onglets)
```
[Accueil] [Agenda] [Mon Nest] [Découvertes] [Nesti IA]
   🏠      📅        👥          🧭           💬
```

**États** :
- **Actif** : Fond primary, texte blanc, scale 105%, shadow
- **Inactif** : Texte muted, fond transparent, hover muted

**Navigation** : Clic sur un onglet change `currentPage` dans l'état React

---

## 📱 PAGES & FONCTIONNALITÉS DÉTAILLÉES

### 🏠 PAGE 1 : FEED (Fil d'actualité)

#### Composants Principaux

##### 1. Compositeur Rapide
**Position** : En haut de page

**Contenu** :
- Avatar utilisateur
- Placeholder : "Quoi de neuf dans votre nest ?"
- Actions rapides (icônes) :
  - 📷 Photo
  - 📅 Événement
  - 📍 Lieu
  - 👥 Taguer des membres

**Interaction** : Clic ouvre modal de création de post (non implémentée)

##### 2. Publications (Feed Cards)

**Types de publications** :

###### a) Anniversaire
```
┌─────────────────────────────────┐
│ [Avatar] Maman • Il y a 2h      │
│ 🎂 ANNIVERSAIRE                  │
│ Emma fête ses 15 ans aujourd'hui!│
│                                  │
│ "Joyeux anniversaire à notre    │
│  grande fille ! Nous sommes      │
│  tellement fiers de toi 💝"      │
│                                  │
│ ❤️ 18  👍 12  🎉 5               │
│ 💬 2 commentaires                │
│                                  │
│ [Grand-mère] : "Joyeux..."      │
│ [Papa] : "Happy birthday..."     │
└─────────────────────────────────┘
```

###### b) Événement (Vacances)
```
┌─────────────────────────────────┐
│ [Avatar] Papa • Hier             │
│ 🏖️ VACANCES                      │
│ Vacances d'été en famille        │
│                                  │
│ 📅 15-29 Juillet 2025            │
│ 📍 Île de Ré, France             │
│ 👥 Papa, Maman, Emma, Lucas      │
│                                  │
│ ❤️ 15  👍 8                      │
└─────────────────────────────────┘
```

###### c) Achievement (Sport)
```
┌─────────────────────────────────┐
│ [Avatar] Lucas • Il y a 3 jours  │
│ ⚽ SPORT                          │
│ Match de foot - Victoire 3-2 ! ⚽ │
│ J'ai marqué le but de la         │
│ victoire à la dernière minute !  │
│                                  │
│ ❤️ 10  👍 20  🏆 12               │
│ 💬 2 commentaires                │
└─────────────────────────────────┘
```

###### d) Activité créative
```
┌─────────────────────────────────┐
│ [Avatar] Maman • Il y a 5 jours  │
│ 🎨 ACTIVITÉ                      │
│ Atelier peinture familial ce     │
│ dimanche 🎨                      │
│ On a passé un super moment       │
│ créatif tous ensemble !          │
│                                  │
│ ❤️ 20  👍 15                     │
└─────────────────────────────────┘
```

**Interactions** :
- Boutons de réaction : Like (👍), Heart (❤️), Party (🎉), Trophy (🏆)
- Section commentaires expandable
- Bouton partage
- Badge de rôle coloré sur avatar

**Données de démo** : 4 posts variés

---

### 📅 PAGE 2 : AGENDA & TÂCHES (Combiné)

#### Structure en Onglets
```
[Aujourd'hui] [Semaine] [Mois] [Prochainement]
```

#### Vue "Aujourd'hui" (Défaut)

##### Événements & Tâches Mixés (Timeline)
```
09:00 🏥 RDV médecin Emma
      📍 Cabinet Dr. Moreau (1,2 km)
      👥 Emma, Maman

14:00 ✅ Courses supermarché
      🎯 Priorité haute | Assigné à: Maman
      ☐ Lait, pain, fruits
      ☐ Produits d'entretien

16:00 ⚽ Match de foot Emma
      📍 Stade municipal (3,5 km)
      👥 Emma, Papa

18:00 ✅ Préparer dîner
      🎯 Priorité moyenne | Assigné à: Papa
      ☑️ Acheter ingrédients (fait)
      ☐ Cuisiner

19:30 🎂 Dîner d'anniversaire Emma
      📍 Restaurant La Table Ronde (2,8 km)
      👥 Toute la famille
```

**Composants** :

##### 1. Card Événement
**Éléments** :
- Heure (grande, à gauche)
- Icône catégorie (emoji)
- Titre événement
- Badge couleur (secondary, success, accent selon type)
- Localisation + distance
- Liste participants avec avatars
- Badge "Dans X heures" si proche

**Interaction** : Clic ouvre détails/édition (non implémenté)

##### 2. Card Tâche
**Éléments** :
- Checkbox principale
- Titre tâche
- Avatar assigné
- Badge priorité (haute: rouge, moyenne: orange, basse: vert)
- Sous-tâches avec checkboxes
- Indicateur progression (X/Y complétées)

**Interaction** : 
- Toggle checkbox barre le texte
- Clic sur carte ouvre détails

##### 3. Section "Événements à venir"
**Contenu** :
- Cards horizontales scrollables
- Vacances, rentrée scolaire, réunions
- Affichage date, type, participants, icône

**Exemple** :
```
┌────────────────────┐  ┌────────────────────┐
│ 🏖️ Vacances        │  │ 🎒 Rentrée         │
│ Bretagne           │  │ scolaire Lucas     │
│ 15-29 Juillet      │  │ 2 Septembre        │
│ 👥 4 participants  │  │ 👥 1 participant   │
└────────────────────┘  └────────────────────┘
```

#### Bouton FAB (Floating Action)
**Position** : Bas droite
**Icône** : Plus (+)
**Action** : Créer événement ou tâche

**Données de démo** : 5 événements/tâches pour aujourd'hui + 3 à venir

---

### 👥 PAGE 3 : MON NEST (Gestion Membres)

#### Section 1 : En-tête Nest
```
┌─────────────────────────────────┐
│           👨‍👩‍👧‍👦                  │
│       Famille Martin            │
│       Créé en Janvier 2024      │
│       5 membres                 │
│                                 │
│  [Modifier]  [Inviter membre]   │
└─────────────────────────────────┘
```

#### Section 2 : Liste des Membres
**Card par membre** :
```
┌─────────────────────────────────┐
│ [Avatar] Sophie Martin          │
│           sophie@martin.com      │
│           👑 Admin               │
│           Membre depuis          │
│           Janvier 2024           │
│                                  │
│  (Vous - pas de gestion)        │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ [Avatar] Pierre Martin          │
│           pierre@martin.com      │
│           👨‍👩‍👧 Parent            │
│           Membre depuis          │
│           Janvier 2024           │
│                                  │
│  [✏️ Modifier] [✉️ Message]      │
│  [🛡️ Permissions] [🗑️ Retirer]   │
└─────────────────────────────────┘
```

**Membres listés** :
1. Sophie Martin (Admin) - Vous
2. Pierre Martin (Parent)
3. Emma Martin (Teen)
4. Lucas Martin (Teen)
5. Grand-mère Marie (Grandparent)

**Permissions Admin** :
- Modifier le rôle
- Envoyer message
- Gérer permissions
- Retirer du nest

#### Section 3 : Nests Connectés
**Cards de nests amis** :
```
┌─────────────────────────────────┐
│ [Avatar FD] Famille Dubois      │
│              5 membres           │
│              Amis proches        │
│              Connecté depuis     │
│              il y a 3 mois       │
│                                  │
│  [Voir]  [Message]               │
└─────────────────────────────────┘
```

**Nests connectés** :
1. Famille Dubois (5 membres, Amis proches)
2. Les Cousins (8 membres, Famille élargie)

#### Section 4 : Actions Administratives
**Boutons** :
- **Inviter membre** : Modal avec formulaire (email + rôle)
- **Paramètres Nest** : Nom, photo, règles
- **Connecter à un nest** : Rechercher et envoyer demande

**Rôles disponibles** :
- 👑 Admin (contrôle total)
- 👨‍👩‍👧 Parent (gestion contenu)
- 🧑 Majeur (adulte indépendant)
- 👦 Ado (contrôle parental)
- 👴 Grand-parent (accès complet, pas de gestion)
- 👥 Invité (lecture seule)

---

### 🧭 PAGE 4 : DÉCOUVERTES (Activités IA)

#### Section 1 : En-tête avec Filtres
```
┌─────────────────────────────────┐
│  Découvertes personnalisées      │
│  Basées sur vos préférences      │
│                                  │
│  [Tous] [Sport] [Culture]       │
│  [Nature] [Cuisine] [...]        │
│                                  │
│  🔍 [Rechercher...]  [⚙️ Filtres]│
└─────────────────────────────────┘
```

#### Section 2 : Tabs par Catégorie
```
[Pour Vous] [Sport] [Culture] [Nature] [Famille]
```

#### Section 3 : Cards Activités (Scrollable)

**Card Activité Type** :
```
┌─────────────────────────────────┐
│ ⚽                                │
│ Match de football amateur        │
│                                  │
│ 📍 Stade Municipal, Paris 15e    │
│    2,3 km                        │
│ 📅 Ce samedi 15h00               │
│ 💰 Gratuit                       │
│ ⭐ 4.5 (23 avis)                 │
│                                  │
│ Match amical inter-quartiers.    │
│ Tous niveaux bienvenus !         │
│                                  │
│ 🏷️ [Famille] [Sport] [Gratuit]  │
│                                  │
│ 🤖 Correspondance IA : 95%       │
│                                  │
│ [❤️ Sauvegarder] [➕ Ajouter]    │
└─────────────────────────────────┘
```

**Activités de démo (6+)** :

1. **Football amateur**
   - Sport | Stade Municipal | 2,3 km
   - Samedi 15h | Gratuit | ⭐ 4.5
   - Match : 95%

2. **Cours de cuisine végétarienne**
   - Cuisine | Atelier Gourmand | 4,1 km
   - Mercredi 18h30 | 35€/pers | ⭐ 4.8
   - Match : 92%

3. **Exposition Art Moderne**
   - Culture | Centre Pompidou | 5,8 km
   - Jusqu'au 30 juin | 12€ (gratuit -18ans) | ⭐ 4.7
   - Match : 88%

4. **Randonnée Fontainebleau**
   - Nature | Fontainebleau, 77 | 52 km
   - Dimanche 10h | Gratuit | ⭐ 4.9
   - Match : 90%

5. **Atelier jardinage enfants**
   - Jardinage | Jardin du Marais | 3,2 km
   - Samedi 14h | 10€/enfant | ⭐ 4.6
   - Match : 87%

6. **Concert Jazz en plein air**
   - Musique | Parc de Bercy | 6,5 km
   - Vendredi 20h | Gratuit | ⭐ 4.8
   - Match : 91%

#### Fonctionnalités Spéciales

##### Score de Correspondance IA
- Calcul basé sur :
  - Préférences onboarding
  - Historique activités
  - Profils membres (handicap, âge, etc.)
  - Distance & budget
- Affichage : Badge "🤖 Correspondance : XX%"

##### Accessibilité & Handicap
**Tags spéciaux** :
- ♿ Accessible PMR
- 👂 Sourd/Malentendant
- 👁️ Non-voyant/Malvoyant
- 🧠 Adapté TDAH
- 🤝 Sensibilité sensorielle

##### Actions
- **❤️ Sauvegarder** : Ajout favoris
- **➕ Ajouter** : Ajout direct à l'agenda
- **📤 Partager** : Partage dans nest ou à d'autres nests

---

### 💬 PAGE 5 : CHAT NESTI IA

#### En-tête Chat
```
┌─────────────────────────────────┐
│ [🌟 Avatar]  Nesti IA           │
│              Assistant familial  │
└─────────────────────────────────┘
```

#### Message de Bienvenue
```
┌─────────────────────────────────┐
│         🌟                       │
│    Bienvenue ! 👋                │
│                                  │
│ Je suis Nesti, votre assistant   │
│ familial IA. Posez-moi vos       │
│ questions sur les activités,     │
│ l'organisation familiale, ou     │
│ demandez-moi conseil !           │
└─────────────────────────────────┘
```

#### Actions Rapides (Pills horizontales)
```
[🎨 Activités créatives] [⚽ Sports] 
[🍽️ Restaurants] [🎭 Culture]
```

#### Conversation de Démo

**Message 1 (User)** :
> "Bonjour Nesti ! Peux-tu me suggérer une activité calme pour Lucas aujourd'hui ? Il a du mal à se concentrer ces derniers jours."

**Réponse IA** :
```
┌─────────────────────────────────┐
│ [🌟] Nesti IA                   │
│                                  │
│ Bonjour Sophie ! 👋 Bien sûr,   │
│ je comprends. D'après son profil │
│ TDAH, voici 3 activités calmes   │
│ et adaptées pour Lucas :         │
│                                  │
│ ┌─────────────────────────────┐ │
│ │ 🌳 Parc sensoriel de Bercy  │ │
│ │ Environnement calme avec    │ │
│ │ zones sensorielles          │ │
│ │ 📍 3,2 km • Gratuit • ⭐ 4.8│ │
│ │ [Calme] [Adapté TDAH]       │ │
│ └─────────────────────────────┘ │
│                                  │
│ ┌─────────────────────────────┐ │
│ │ 📚 Bibliothèque Louise      │ │
│ │    Michel                   │ │
│ │ Espace jeunesse avec        │ │
│ │ coussins et jeux calmes     │ │
│ │ 📍 1,8 km • Gratuit • ⭐ 4.6│ │
│ │ [Silencieux] [Lecture]      │ │
│ └─────────────────────────────┘ │
│                                  │
│ ┌─────────────────────────────┐ │
│ │ 🧩 Atelier puzzle géant     │ │
│ │ Session de 1h avec puzzles  │ │
│ │ adaptatifs                  │ │
│ │ 📍 4,5 km • 8€ • ⭐ 4.9     │ │
│ │ [Concentration] [Petit...]  │ │
│ └─────────────────────────────┘ │
│                                  │
│ [👍 Utile] [👎]                 │
└─────────────────────────────────┘
```

**Message 2 (User)** :
> "Super ! Et pour Emma qui s'ennuie un peu ces vacances ?"

**Réponse IA** :
```
Emma adore la nature d'après vos 
préférences ! Voici ce que je propose :

🦜 Observation oiseaux au Parc
   Initiation ornithologie avec guide
   📅 Samedi 10h • 📍 2,1 km • 12€
   [Nature] [Pédagogique]

🌿 Création d'herbier collectif
   Collecte et identification plantes
   📅 Dimanche 14h • 📍 3,5 km • 15€
   [Créatif] [Nature]

🗺️ Chasse au trésor botanique
   Jeu de piste nature en famille
   📅 Mercredi 15h • 📍 5 km • Gratuit
   [Aventure] [Famille]
```

**Message 3 (User)** :
> "Parfait ! Peux-tu ajouter la chasse au trésor à notre calendrier familial ?"

**Réponse IA** :
```
✅ J'ai ajouté "Chasse au trésor 
botanique" au calendrier familial :

📅 Mercredi 27 Janvier, 15h00
📍 Parc de Vincennes (5 km)
👥 Participants suggérés : 
   Toute la famille

Voulez-vous que j'envoie une 
notification aux membres du nest ?

[✅ Oui, notifier] [✋ Non merci]
```

#### Capacités de l'IA

##### 1. Personnalisation
- Connaît les membres (prénoms, âges, besoins)
- Adapte aux handicaps/besoins spéciaux (ex: TDAH Lucas)
- Utilise préférences onboarding
- Contexte familial (vacances, école, etc.)

##### 2. Suggestions Intelligentes
- Cards d'activités dans les réponses
- Filtrage par profil (calme pour TDAH, nature pour Emma)
- Distance et prix adaptés
- Tags de filtrage pertinents

##### 3. Actions Directes
- Ajout au calendrier
- Envoi notifications
- Réservations (placeholder)
- Partage suggestions

##### 4. Feedback
- Boutons 👍 Utile / 👎 sur chaque réponse IA
- Amélioration continue des suggestions

#### Barre de Saisie (Sticky Bottom)
```
┌─────────────────────────────────┐
│ [💬 Votre message...]       [🎤] │
│                             [📤] │
└─────────────────────────────────┘
```

---

### ⚙️ PAGE 6 : PARAMÈTRES

#### Structure en Tabs
```
[👤 Profil] [✨ IA Nesti] [🎨 App]
```

---

#### TAB 1 : PROFIL

##### Section : Photo de profil
```
┌─────────────────────────────────┐
│         [Avatar 96x96]           │
│         avec 📷 bouton           │
│         👑 Badge Admin           │
└─────────────────────────────────┘
```

##### Section : Informations personnelles
**Champs éditables** :
- Nom complet : "Sophie Martin"
- Email : "sophie@martin.com"
- Téléphone : (optionnel)
- Date de naissance : (optionnel)

##### Section : Notifications
**Toggles (Switch)** :
- ✅ Nouvelles publications
- ✅ Commentaires sur mes posts
- ✅ Événements & rappels
- ❌ Suggestions d'activités

##### Section : Sécurité & Vie privée
**Options** :
- Changer mot de passe
- Authentification 2FA
- Qui peut voir mon profil
- Données RGPD (export, suppression)

##### Section : Contrôle parental
**Si role = parent/admin** :
- Activer filtres de contenu
- Approuver publications enfants
- Gérer temps d'écran
- Historique activités

---

#### TAB 2 : IA NESTI (Préférences)

##### Section : Centres d'intérêt
**Sports & Activités physiques** 🏃
- Sélections multiples avec pills colorées
- Options : Football, Basketball, Tennis, Natation, Cyclisme, Yoga, Course, Danse
- Actuellement : [Football] [Natation] [Tennis]

**Loisirs créatifs** 🎨
- Options : Lecture, Cuisine, Jardinage, Art, Musique, Photographie, Bricolage, Jeux
- Actuellement : [Lecture] [Cuisine] [Jardinage] [Art]

**Types de vacances** 🏖️
- Options : Plage, Montagne, Ville, Campagne, Aventure
- Actuellement : [Plage] [Montagne]

**Centres culturels** 🎭
- Options : Musées, Concerts, Théâtre, Cinéma, Festivals, Expositions
- Actuellement : [Musées] [Concerts] [Théâtre]

##### Section : Préférences de distance
**Slider** :
- Rayon de recherche : 1 km → 50 km
- Actuel : 10 km

##### Section : Budget
**Slider** :
- Budget moyen par activité : 0€ → 200€
- Actuel : 50€

##### Section : Accessibilité
**Besoins spécifiques** (multi-sélection) :
- ♿ Mobilité réduite (PMR)
- 👂 Sourd/Malentendant
- 👁️ Non-voyant/Malvoyant
- 🧠 TDAH / Troubles attention
- 🎭 Autisme / Sensibilité sensorielle
- ❤️ Cardiopathie
- 🧩 Autre (préciser)

**Profils membres actuels** :
- Lucas : TDAH (actif)

##### Section : Langue & Voix IA
- Langue : Français 🇫🇷
- Voix : Féminine / Masculine / Neutre
- Vitesse de parole : Normale

##### Bouton : **Réinitialiser préférences**

---

#### TAB 3 : APP (Paramètres d'application)

##### Section : Apparence
**Mode d'affichage** :
- Toggle Switch "Mode sombre"
- État actuel : Clair/Sombre

**Thème de couleur** :
- Option : Thème par défaut (NESTI)
- Locked car identité visuelle fixe

**Taille du texte** :
- Petit | Moyen (actuel) | Grand | Très grand

##### Section : Langue & Région
- Langue de l'app : Français 🇫🇷
- Format de date : jj/mm/aaaa
- Fuseau horaire : Europe/Paris (GMT+1)

##### Section : Données & Stockage
**Statistiques** :
- Espace utilisé : 45 MB
- Photos : 30 MB
- Messages : 10 MB
- Cache : 5 MB

**Actions** :
- [Vider le cache]
- [Télécharger mes données (RGPD)]

##### Section : Notifications Push
**Permissions système** :
- État : Autorisées ✅
- [Gérer dans les paramètres système]

##### Section : Confidentialité & Éthique
**Chartes affichées** :
- 🔒 Conformité RGPD
- 🇪🇺 EU AI Act
- ⚖️ Charte de neutralité
- 👨‍👩‍👧‍👦 Contrôle parental

**Actions** :
- [Lire les CGU]
- [Politique de confidentialité]
- [Centre de confidentialité]

##### Section : À propos
- Version : 1.0.0 (Build 2024.01)
- [Licences open source]
- [Nous contacter]
- [Centre d'aide]

##### Danger Zone
- 🗑️ **Supprimer mon compte**
- ⚠️ **Quitter le nest**

---

## 👥 SYSTÈME DE RÔLES & PERMISSIONS

### Les 6 Rôles

#### 1. 👑 ADMIN (Administrateur)
**Couleur** : Vert forêt (#2D5F5D)

**Permissions** :
- ✅ Contrôle total du nest
- ✅ Créer, modifier, supprimer le nest
- ✅ Inviter/retirer des membres
- ✅ Changer les rôles de tous
- ✅ Modérer tout le contenu
- ✅ Gérer les nests connectés
- ✅ Accès paramètres nest complets
- ✅ Export données
- ✅ Contrôle parental sur mineurs

**Limitations** :
- ❌ Ne peut pas se rétrograder si dernier admin

**Interface** :
- Badge "Admin" sur avatar
- Icônes de gestion visibles partout
- Section admin dans Paramètres

---

#### 2. 👨‍👩‍👧 PARENT
**Couleur** : Vert sauge (#4A8B7A)

**Permissions** :
- ✅ Inviter des membres
- ✅ Créer événements & tâches
- ✅ Modérer contenu des enfants (<18 ans)
- ✅ Gérer agenda familial
- ✅ Contrôle parental sur ses enfants
- ✅ Approuver publications enfants
- ✅ Gérer temps d'écran enfants
- ⚠️ Modifier rôles (sauf admin)

**Limitations** :
- ❌ Retirer un admin
- ❌ Supprimer le nest
- ❌ Modifier paramètres critiques

**Interface** :
- Badge "Parent" sur avatar
- Outils contrôle parental actifs
- Validation de contenu enfants

---

#### 3. 🧑 ADULTE (Majeur indépendant)
**Couleur** : Bleu ciel (#6AADBA)

**Permissions** :
- ✅ Créer publications, événements
- ✅ Commenter & réagir librement
- ✅ Gérer ses propres tâches
- ✅ Inviter (avec approbation admin)
- ✅ Suggérer activités

**Limitations** :
- ❌ Modifier contenu d'autrui
- ❌ Gérer les membres
- ❌ Contrôle parental

**Interface** :
- Badge "Majeur" discret
- Accès complet lecture/écriture
- Pas d'outils admin

---

#### 4. 👦 ADO (Mineur 13-17 ans)
**Couleur** : Jaune doré (#E8B558)

**Permissions** :
- ✅ Créer publications (avec modération)
- ✅ Commenter & réagir
- ✅ Participer à l'agenda
- ✅ Chat IA (logs accessibles aux parents)
- ⚠️ Contenu soumis à validation parentale

**Limitations** :
- ❌ Inviter des membres
- ❌ Quitter le nest seul
- ❌ Modifier paramètres sensibles
- 🔒 Contrôle parental actif

**Interface** :
- Badge "Ado" visible
- Indicateurs "En attente validation"
- Filtres de contenu automatiques

---

#### 5. 👴 GRAND-PARENT
**Couleur** : Orange chaud (#F4976C)

**Permissions** :
- ✅ Créer publications, événements
- ✅ Commenter & réagir
- ✅ Accès complet lecture
- ✅ Chat IA
- ✅ Suggérer activités

**Limitations** :
- ❌ Gérer les membres
- ❌ Modifier contenu d'autrui
- ⚠️ Pas de contrôle parental

**Interface** :
- Badge "Grand-parent" chaleureux
- Interface simplifiée (optionnel)
- Accès complet mais sans gestion

---

#### 6. 👥 INVITÉ (Guest)
**Couleur** : Gris (#9CA3AF)

**Permissions** :
- ✅ Voir les publications publiques
- ✅ Commenter si autorisé
- ⚠️ Lecture seule par défaut

**Limitations** :
- ❌ Créer du contenu
- ❌ Voir contenu privé
- ❌ Accès agenda limité
- ❌ Pas de chat IA
- ⏱️ Accès temporaire

**Interface** :
- Badge "Invité" discret
- Bannière "Accès limité"
- Prompt pour rejoindre le nest

---

### Matrice de Permissions

| Fonctionnalité | Admin | Parent | Adulte | Ado | G-parent | Invité |
|---|---|---|---|---|---|---|
| Créer post | ✅ | ✅ | ✅ | ⚠️ | ✅ | ❌ |
| Commenter | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Créer événement | ✅ | ✅ | ✅ | ⚠️ | ✅ | ❌ |
| Créer tâche | ✅ | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| Inviter membre | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Retirer membre | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ |
| Changer rôle | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ |
| Chat IA | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Découvertes | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Paramètres nest | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ |
| Contrôle parental | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

**Légende** :
- ✅ : Accès complet
- ⚠️ : Accès limité/conditionnel
- ❌ : Pas d'accès

---

## 🧩 COMPOSANTS & PATTERNS UI

### Bibliothèque de Composants (50+)

#### Composants Formulaires
```tsx
<Input />              // Champs texte
<Textarea />           // Zone texte multiligne
<Select />             // Menu déroulant
<Checkbox />           // Case à cocher
<Switch />             // Toggle on/off
<RadioGroup />         // Boutons radio
<Slider />             // Curseur valeur
<Label />              // Étiquette
```

#### Composants Navigation
```tsx
<Tabs />               // Onglets horizontaux
<TabsList />
<TabsTrigger />
<TabsContent />
<Breadcrumb />         // Fil d'ariane
<Pagination />         // Pagination
<NavigationMenu />     // Menu de navigation
```

#### Composants Affichage
```tsx
<Card />               // Carte conteneur
<CardHeader />
<CardTitle />
<CardContent />
<Avatar />             // Avatar utilisateur
<AvatarFallback />
<Badge />              // Badge étiquette
<Separator />          // Séparateur horizontal
<Skeleton />           // Placeholder chargement
```

#### Composants Interaction
```tsx
<Button />             // Bouton
<Dialog />             // Modal
<DialogContent />
<Drawer />             // Tiroir slide-up
<Popover />            // Info-bulle
<Tooltip />            // Tooltip
<Sheet />              // Panneau latéral
<AlertDialog />        // Modal confirmation
```

#### Composants Feedback
```tsx
<Alert />              // Bannière alerte
<Progress />           // Barre progression
<toast />              // Notification toast (sonner)
```

#### Composants Avancés
```tsx
<Calendar />           // Calendrier date picker
<Accordion />          // Accordéon expandable
<Collapsible />        // Section pliable
<HoverCard />          // Carte au survol
<ContextMenu />        // Menu contextuel
<DropdownMenu />       // Menu déroulant
<Command />            // Palette de commandes
```

### Patterns de Design

#### 1. Cards avec Shadow
```tsx
<Card className="border-border overflow-hidden shadow-md bg-card">
  <CardContent className="p-6">
    {/* Contenu */}
  </CardContent>
</Card>
```

#### 2. Avatar avec Badge de Rôle
```tsx
<Avatar className="w-10 h-10 border-2 border-primary/20">
  <AvatarFallback className="role-badge-admin text-white">
    {name.charAt(0)}
  </AvatarFallback>
</Avatar>
```

#### 3. Boutons Groupés
```tsx
<div className="flex gap-3">
  <Button variant="outline">Annuler</Button>
  <Button className="flex-1 bg-primary">Confirmer</Button>
</div>
```

#### 4. Section avec Separator
```tsx
<div className="space-y-4">
  <h3>Section Title</h3>
  <Separator />
  <div>{/* Content */}</div>
</div>
```

#### 5. Pills de Sélection
```tsx
<button
  className={`px-4 py-2 rounded-full transition-all ${
    selected 
      ? "bg-success text-white shadow-md scale-105"
      : "bg-muted text-muted-foreground hover:bg-success/20"
  }`}
>
  {label}
</button>
```

#### 6. Timeline d'Événements
```tsx
<div className="relative pl-8 border-l-2 border-border">
  <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full" />
  <div className="pb-6">
    {/* Event content */}
  </div>
</div>
```

---

## 📊 DONNÉES DE DÉMO

### Famille de Démo : "Famille Martin"

#### Membres (5)
1. **Sophie Martin** (Vous)
   - Rôle : Admin 👑
   - Email : sophie@martin.com
   - Depuis : Janvier 2024

2. **Pierre Martin**
   - Rôle : Parent 👨‍👩‍👧
   - Email : pierre@martin.com
   - Depuis : Janvier 2024

3. **Emma Martin** (15 ans)
   - Rôle : Ado 👦
   - Email : emma@martin.com
   - Depuis : Février 2024
   - Intérêts : Nature, sport

4. **Lucas Martin** (12 ans)
   - Rôle : Ado 👦
   - Email : lucas@martin.com
   - Depuis : Février 2024
   - Besoins : TDAH (activités calmes adaptées)

5. **Grand-mère Marie**
   - Rôle : Grand-parent 👴
   - Email : marie@martin.com
   - Depuis : Mars 2024

#### Préférences Familiales
**Sports** : Football, Natation, Tennis
**Loisirs** : Lecture, Cuisine, Jardinage, Art
**Vacances** : Plage, Montagne
**Culture** : Musées, Concerts, Théâtre
**Régime** : Végétarien (option)

---

### Publications Feed (4)
1. **Anniversaire Emma** (il y a 2h)
   - Auteur : Maman
   - Type : Célébration 🎂
   - Réactions : 18 ❤️, 12 👍, 5 🎉
   - Commentaires : 2

2. **Vacances Île de Ré** (hier)
   - Auteur : Papa
   - Type : Événement 🏖️
   - Dates : 15-29 Juillet 2025
   - Participants : Famille complète

3. **Victoire foot Lucas** (il y a 3 jours)
   - Auteur : Lucas
   - Type : Achievement ⚽
   - Réactions : 20 👍, 10 ❤️, 12 🏆
   - Commentaires : 2

4. **Atelier peinture** (il y a 5 jours)
   - Auteur : Maman
   - Type : Activité 🎨
   - Réactions : 15 👍, 20 ❤️

---

### Agenda Aujourd'hui (5 items)
1. **09:00** - RDV médecin Emma 🏥
   - Lieu : Cabinet Dr. Moreau (1,2 km)
   - Participants : Emma, Maman

2. **14:00** - Courses supermarché ✅
   - Assigné : Maman | Priorité haute
   - Sous-tâches : 2

3. **16:00** - Match de foot Emma ⚽
   - Lieu : Stade municipal (3,5 km)
   - Participants : Emma, Papa

4. **18:00** - Préparer dîner ✅
   - Assigné : Papa | Priorité moyenne
   - Progression : 1/2

5. **19:30** - Dîner d'anniversaire 🎂
   - Lieu : Restaurant La Table Ronde (2,8 km)
   - Participants : Toute la famille

---

### Activités Découvertes (6+)
1. **Football amateur** (95% match)
2. **Cuisine végétarienne** (92% match)
3. **Exposition Art Moderne** (88% match)
4. **Randonnée Fontainebleau** (90% match)
5. **Jardinage enfants** (87% match)
6. **Concert Jazz** (91% match)

---

### Conversation IA (6 messages)
1. User : Demande activité calme pour Lucas (TDAH)
2. IA : 3 suggestions adaptées TDAH
3. User : Demande activités nature pour Emma
4. IA : 3 suggestions nature/aventure
5. User : Ajouter au calendrier
6. IA : Confirmation ajout + proposition notification

---

### Nests Connectés (2)
1. **Famille Dubois**
   - 5 membres
   - Amis proches
   - Depuis 3 mois

2. **Les Cousins**
   - 8 membres
   - Famille élargie
   - Depuis 6 mois

---

## ⚖️ PRINCIPES ÉTHIQUES & CONFORMITÉ

### 1. RGPD (Règlement Général sur la Protection des Données)

#### Droits des Utilisateurs
- ✅ **Droit d'accès** : Export de toutes les données personnelles
- ✅ **Droit de rectification** : Modification des informations
- ✅ **Droit à l'oubli** : Suppression complète du compte
- ✅ **Droit de portabilité** : Export format structuré
- ✅ **Droit d'opposition** : Refus profilage IA

#### Implémentation
**Paramètres > App > Données & Stockage** :
- Bouton "Télécharger mes données"
- Bouton "Supprimer mon compte" (Danger Zone)
- Logs de consentement tracés
- Politique de confidentialité accessible

#### Collecte de Données
**Minimale** :
- Nom, email (obligatoire)
- Téléphone, âge (optionnel)
- Préférences (consent explicite)
- Localisation (uniquement si activités)

**Transparence** :
- Message clair sur usage des données
- Consentement granulaire (notifications, IA, etc.)
- Révocable à tout moment

---

### 2. EU AI Act (Loi Européenne sur l'IA)

#### Classification
**Système IA à Risque Minimal** :
- Suggestion d'activités
- Personnalisation de contenu
- Pas de décisions critiques

#### Obligations
- ✅ **Transparence IA** : Badge "🤖 Suggéré par IA" visible
- ✅ **Explicabilité** : Score de correspondance justifiable
- ✅ **Surveillance humaine** : Admin peut override suggestions
- ✅ **Robustesse** : Tests sur biais et discrimination

#### Affichage dans l'App
**Chat IA** :
- Badge "Assistant familial IA"
- Clause "Suggestions générées par IA, vérifiez avant utilisation"

**Découvertes** :
- Score "Correspondance IA : XX%"
- Filtres manuels disponibles
- Possibilité désactiver suggestions IA

---

### 3. Neutralité Visible & Éthique

#### Pas de Manipulation
- ❌ Pas de dark patterns
- ❌ Pas de gamification addictive
- ❌ Pas de vente de données
- ❌ Pas de publicités ciblées

#### Design Éthique
- ✅ Boutons d'action clairs (pas de confusion)
- ✅ Suppression facilitée (pas cachée)
- ✅ Temps d'écran visible (optionnel)
- ✅ Pause/notification control

#### Monétisation Transparente
**Modèle freemium** (placeholder) :
- Version gratuite : Fonctionnalités essentielles
- Version premium : Activités illimitées, stats avancées
- Pas de paiement caché

---

### 4. Contrôle Parental Complet

#### Pour Parents & Admins
**Paramètres > Profil > Contrôle Parental** :
- ✅ Filtrage contenu (violence, mature)
- ✅ Approbation publications enfants (<18 ans)
- ✅ Logs activités (historique navigation)
- ✅ Temps d'écran (limites optionnelles)
- ✅ Blocage contacts (liste noire/blanche)

#### Modération Automatique
- Posts d'ados → "En attente validation parent"
- Mots-clés inappropriés → Blocage automatique
- Signalement possible par membres

#### Interface Enfant
**Adaptée à l'âge** :
- Badges "Ado" visibles
- Indication "Besoin approbation parent"
- Pas de fonctionnalités dangereuses accessibles

---

### 5. Accessibilité & Inclusion

#### Design Inclusif
- ✅ **Contraste élevé** : Mode sombre/clair
- ✅ **Tailles de texte** : Ajustable (Petit → Très grand)
- ✅ **Polices lisibles** : Inter (sans-serif)
- ✅ **Icônes + Texte** : Jamais icône seule

#### Activités Adaptées
**Tags handicap disponibles** :
- ♿ Accessible PMR
- 👂 Sourd/Malentendant
- 👁️ Non-voyant/Malvoyant
- 🧠 TDAH
- 🎭 Autisme / Sensibilité sensorielle
- ❤️ Cardiopathie

**Filtrage IA intelligent** :
- Profilage membres (ex: Lucas = TDAH)
- Suggestions adaptées automatiquement
- Mention explicite "Adapté à [besoin]"

---

### 6. Sécurité & Confidentialité

#### Authentification
- Mot de passe sécurisé (min 8 caractères)
- 2FA optionnel (recommandé)
- Sessions sécurisées

#### Données Sensibles
- ⚠️ **Pas de collecte PII excessive**
- ⚠️ Pas de données médicales détaillées (juste tags accessibilité)
- ⚠️ Chiffrement des communications

#### Visibilité
**Paramètres par défaut** :
- Nest = Privé (famille seule)
- Publications = Nest seulement
- Profil = Membres du nest
- Localisation = Jamais en temps réel

---

## 🛠️ TECHNOLOGIES UTILISÉES

### Frontend
- **React 18+** : Framework UI
- **TypeScript** : Typage fort
- **Vite** : Build tool rapide

### Styling
- **Tailwind CSS v4** : Utility-first CSS
- **CSS Custom Properties** : Variables de design
- **Google Fonts** : Poppins + Inter

### Animations
- **Motion/React** (ex-Framer Motion) : Animations fluides
  - Import : `import { motion } from "motion/react"`
  - Usage : `<motion.div>`, transitions, gestures

### Icônes
- **lucide-react** : Bibliothèque d'icônes moderne
  - 1000+ icônes
  - Exemple : `<Home />`, `<Calendar />`, `<Sparkles />`

### Composants UI
- **Shadcn/ui** pattern : Composants copiés (pas dépendance)
- **Radix UI primitives** : Accessibilité native
- **sonner** : Toast notifications

### Assets
- **figma:asset** : Import virtuel d'assets Figma
  - Logo NESTI : `figma:asset/bc152d65360f7c7224736e313603b3d66553bb79.png`

### État & Logique
- **React Hooks** : useState, useEffect
- **Pas de Redux/Context** : Application simple

---

## 📦 STRUCTURE DES DONNÉES

### Types TypeScript Principaux

#### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "parent" | "adult" | "teen" | "grandparent" | "guest";
  avatar: string; // Initiales ou URL
  joinedDate: string;
  nestId: string;
}
```

#### Nest
```typescript
interface Nest {
  id: string;
  name: string; // "Famille Martin"
  createdDate: string;
  members: User[];
  connectedNests: ConnectedNest[];
  preferences: NestPreferences;
}
```

#### Post
```typescript
interface Post {
  id: number;
  type: "birthday" | "event" | "achievement" | "activity";
  author: string;
  authorAvatar: string;
  authorRole: UserRole;
  time: string;
  nest: string;
  title: string;
  content: string;
  reactions: {
    likes?: number;
    hearts?: number;
    party?: number;
    trophy?: number;
  };
  comments: Comment[];
  event?: EventDetails; // Si type = event
}
```

#### Event
```typescript
interface Event {
  id: number;
  type: "event" | "task";
  time: string;
  title: string;
  location?: string;
  distance?: string;
  participants?: string[];
  color?: "primary" | "secondary" | "accent" | "success";
  icon?: string;
  // Si task
  assignedTo?: string;
  priority?: "high" | "medium" | "low";
  completed?: boolean;
  subtasks?: Subtask[];
}
```

#### Activity (Découvertes)
```typescript
interface Activity {
  id: number;
  title: string;
  category: string;
  type: string;
  image: string; // Emoji ou URL
  location: string;
  distance: string;
  date: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  aiMatch: number; // 0-100%
  accessibility?: string[]; // Tags handicap
}
```

#### AIMessage
```typescript
interface AIMessage {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  suggestions?: ActivitySuggestion[];
  action?: "calendar_added" | "notification_sent";
  helpful?: boolean; // User feedback
}
```

---

## 🚀 FLUX D'UTILISATION COMPLET

### Premier Lancement

1. **SplashScreen** (2 secondes)
   - Aperçu logo + branding
   - Clic "Commencer"

2. **Onboarding Étape 1** : Bienvenue
   - Découverte concept NESTI
   - Clic "Suivant"

3. **Onboarding Étape 2** : Création Nest
   - Input "Famille Martin"
   - Clic "Suivant"

4. **Onboarding Étape 3** : Préférences
   - Sélection : Football, Natation, Lecture, Cuisine, Plage
   - Clic "Suivant"

5. **Onboarding Étape 4** : Confirmation
   - Récap : Nest + préférences
   - Clic "Commencer"

6. **Arrivée sur Feed**
   - 4 posts de démo affichés
   - Bottom nav active sur "Accueil"

---

### Scénario Typique : Organiser une Activité

#### 1. Découvrir Activité
- Clic onglet "Découvertes" (🧭)
- Scroll dans activités suggérées
- Aperçu "Chasse au trésor botanique" (91% match)
- Lecture détails : Gratuit, 5 km, Mercredi 15h

#### 2. Demander Conseil IA
- Clic onglet "Nesti IA" (💬)
- Saisie : "C'est bien pour toute la famille ?"
- IA répond :
  > "Oui ! Activité parfaite pour :
  > - Lucas (calme, nature)
  > - Emma (aventure)
  > - Toute la famille (intergénérationnel)
  > Voulez-vous l'ajouter à l'agenda ?"

#### 3. Ajouter à l'Agenda
- Clic "Oui, ajouter"
- IA confirme : "✅ Ajouté au calendrier familial"
- Clic onglet "Agenda" (📅)
- Vérification : Événement visible "Mercredi 15h"

#### 4. Notifier la Famille
- Retour Chat IA
- IA propose : "Envoyer notification ?"
- Clic "Oui, notifier"
- Tous les membres reçoivent alerte

#### 5. Jour J : Participation
- Mercredi matin : Notification "Dans 3h : Chasse au trésor"
- Clic notification → Détails événement
- Bouton "Itinéraire" (ouvre Maps)
- Après activité : Option "Créer post souvenir"

---

### Scénario : Contrôle Parental

#### 1. Lucas Crée un Post
- Lucas (12 ans, ado) rédige :
  > "J'ai eu 18/20 en maths ! 🎉"
- Clic "Publier"
- Statut : "⏳ En attente validation parent"

#### 2. Notification Parent
- Sophie (admin) reçoit notification
- Clic → Aperçu post de Lucas
- Options :
  - ✅ Approuver
  - ✏️ Modifier
  - ❌ Refuser

#### 3. Approbation
- Sophie clique "Approuver"
- Post apparaît dans le Feed
- Lucas reçoit notification : "✅ Votre post est publié !"

#### 4. Historique Activité
- Sophie va dans "Paramètres > Contrôle Parental"
- Onglet "Historique Lucas"
- Voit :
  - Posts créés (3 cette semaine)
  - Messages IA (demandes activités foot)
  - Temps d'écran (45 min/jour)

---

## 🎯 POINTS CLÉS DE L'APPLICATION

### Forces

1. **Design System Cohérent**
   - Palette couleurs harmonieuse (logo NESTI)
   - Typographie soignée (Poppins + Inter)
   - Composants réutilisables (50+)

2. **UX Mobile-First**
   - Navigation bottom tabs intuitive
   - Conteneur max-width 428px
   - Thumbs-friendly (zones d'action basses)

3. **Personnalisation IA**
   - Suggestions basées préférences
   - Adaptation besoins spéciaux (TDAH, handicap)
   - Score de correspondance transparent

4. **Inclusivité & Accessibilité**
   - Tags handicap sur activités
   - Mode sombre
   - Tailles de texte ajustables
   - Contraste élevé

5. **Éthique & Conformité**
   - RGPD : Export/suppression données
   - EU AI Act : Transparence IA
   - Contrôle parental complet
   - Pas de dark patterns

6. **Contenu de Démo Riche**
   - 4 posts variés (Feed)
   - 5 événements/tâches (Agenda)
   - 6+ activités (Découvertes)
   - Conversation IA réaliste (6 messages)
   - Famille complète (5 membres)

---

### Limitations (Pour Information)

**Actuelles** :
- ❌ Pas de backend (données en dur)
- ❌ Pas d'authentification réelle
- ❌ Pas de persistance (reload = reset)
- ❌ Pas de notifications push
- ❌ Pas de géolocalisation réelle

**Pour Production** :
- Intégration Supabase (backend)
- Auth + sessions
- Base de données relationnelle
- API IA (OpenAI, Claude, etc.)
- Service de notifications
- API Maps (Google, Mapbox)

---

## 📐 ARCHITECTURE VISUELLE

### Schéma de Navigation
```
          [SplashScreen]
                ↓
          [Onboarding]
           (4 étapes)
                ↓
          ┌────────────────┐
          │  MainLayout    │
          │                │
          │  [Top Header]  │
          │  - Logo        │
          │  - Dark mode   │
          │  - Notifs      │
          │  - Avatar      │
          │                │
          │  [Content]     │
          │  ↓             │
          │  Pages         │
          │                │
          │  [Bottom Nav]  │
          │  ╔═══╦═══╦═══╗│
          │  ║ 🏠║📅║👥 ║│
          │  ╠═══╬═══╬═══╣│
          │  ║ 🧭║💬║    ║│
          │  ╚═══╩═══╩═══╝│
          └────────────────┘
```

### Hiérarchie de Composants
```
App.tsx
├── SplashScreen
├── Onboarding
│   ├── Étape 1 (Bienvenue)
│   ├── Étape 2 (Nest)
│   ├── Étape 3 (Préférences)
│   └── Étape 4 (Confirmation)
└── MainLayout
    ├── TopHeader
    │   ├── Logo + NestName
    │   ├── DarkModeToggle
    │   ├── NotificationBell
    │   └── UserAvatar
    ├── PageContent
    │   ├── FeedPage
    │   │   ├── QuickComposer
    │   │   └── PostCards (x4)
    │   ├── AgendaPage
    │   │   ├── Tabs (Aujourd'hui/Semaine/Mois)
    │   │   ├── EventCards (x5)
    │   │   └── UpcomingEvents (x3)
    │   ├── MyNestPage
    │   │   ├── NestHeader
    │   │   ├── MembersList (x5)
    │   │   └── ConnectedNests (x2)
    │   ├── DiscoveriesPage
    │   │   ├── Filters
    │   │   ├── Tabs (Pour Vous/Sport/Culture...)
    │   │   └── ActivityCards (x6+)
    │   ├── ChatPage
    │   │   ├── WelcomeMessage
    │   │   ├── QuickActions (x4)
    │   │   ├── Messages (x6)
    │   │   └── InputBar
    │   └── SettingsPage
    │       ├── Tabs (Profil/IA/App)
    │       ├── ProfileTab
    │       ├── AIPreferencesTab
    │       └── AppSettingsTab
    └── BottomNavigation (x5 items)
```

---

## 💡 INNOVATION & DIFFÉRENCIATION

### Points Uniques de NESTI

1. **Focus Famille & Accessibilité**
   - Seul réseau social familial avec tags handicap natifs
   - Personnalisation IA pour besoins spéciaux
   - Interface adaptée intergénérationnel

2. **IA Éthique & Transparente**
   - Score de correspondance explicite
   - Pas de boîte noire
   - Contrôle humain toujours possible

3. **Contrôle Parental Intégré**
   - Pas une app enfant séparée
   - Validation native des posts ados
   - Historique accessible parents

4. **"Nest" Concept**
   - Terminologie chaleureuse (vs "Groupe")
   - Nests connectés (vs amis individuels)
   - Approche tribale/communautaire

5. **Agenda + Découvertes Couplé**
   - IA suggère → Ajout direct agenda
   - Pas de friction entre découverte et planification
   - Partage familial automatique

---

## 🎬 PRÊT POUR DÉMO INVESTISSEURS

### Scénario de Présentation (5 min)

**Slide 1** : Logo + Tagline (15s)
> "NESTI - Votre réseau familial chaleureux"

**Slide 2** : SplashScreen → Onboarding (30s)
- Montrer les 4 étapes
- Insister sur personnalisation IA

**Slide 3** : Feed (30s)
- 4 posts variés (anniversaire, vacances, sport)
- Réactions & commentaires
- Rôles colorés

**Slide 4** : Agenda (30s)
- Mix événements/tâches
- Affichage timeline aujourd'hui
- Événements à venir

**Slide 5** : Mon Nest (20s)
- 5 membres avec rôles différents
- Nests connectés
- Gestion admin

**Slide 6** : Découvertes (45s)
- 6 activités avec score IA
- Tags accessibilité (Lucas TDAH)
- Filtres & catégories

**Slide 7** : Chat IA (60s) **★ Point Fort**
- Conversation réaliste (Lucas activité calme)
- Suggestions adaptées TDAH
- Ajout direct calendrier
- Notification automatique

**Slide 8** : Paramètres (20s)
- Mode sombre/clair
- Préférences IA détaillées
- RGPD & conformité

**Slide 9** : Valeurs & Vision (30s)
- Éthique, RGPD, EU AI Act
- Accessibilité & inclusion
- Contrôle parental complet

**Slide 10** : Next Steps (20s)
- Backend Supabase
- Tests utilisateurs
- Roadmap fonctionnalités

---

## 🔧 MAINTENANCE & ÉVOLUTION

### Fichiers à Ne Jamais Modifier
```
/components/figma/ImageWithFallback.tsx
```
→ Fichier système protégé

### Pour Ajouter une Page
1. Créer `/components/nesti/NouvelePage.tsx`
2. Importer dans `/App.tsx`
3. Ajouter case dans `renderPage()`
4. (Optionnel) Ajouter onglet dans `MainLayout` bottom nav

### Pour Modifier le Design System
→ Éditer `/styles/globals.css`
- Variables `:root` et `.dark`
- Tokens Tailwind dans `@theme inline`

### Pour Ajouter des Données de Démo
→ Éditer directement dans les composants pages
- `FeedPage.tsx` : Array `posts`
- `AgendaPage.tsx` : Arrays `events`, `upcomingEvents`
- `MyNestPage.tsx` : Arrays `members`, `connectedNests`
- `DiscoveriesPage.tsx` : Array `activities`
- `ChatPage.tsx` : Array `messages`

---

## 📞 SUPPORT & DOCUMENTATION

### Ressources Externes
- **Tailwind CSS v4** : https://tailwindcss.com/docs
- **Motion (Framer Motion)** : https://motion.dev/docs/react
- **Lucide Icons** : https://lucide.dev/icons/
- **Shadcn/ui** : https://ui.shadcn.com/

### Composants UI Personnalisés
→ Tous dans `/components/ui/`
→ Basés sur Radix UI primitives

---

## 🏁 CONCLUSION

NESTI est une **application familiale complète** conçue avec :
- ✅ **8 pages fonctionnelles** (Splash, Onboarding 4 étapes, Feed, Agenda, Mon Nest, Découvertes, Chat IA, Paramètres)
- ✅ **Design system moderne** basé sur le logo (5 couleurs principales)
- ✅ **Navigation mobile intuitive** (bottom tabs 5 onglets)
- ✅ **Mode sombre/clair** dynamique
- ✅ **Système de rôles** (6 types avec permissions)
- ✅ **IA personnalisée** avec transparence
- ✅ **Contenu de démo riche** (5 membres, 20+ items)
- ✅ **Conformité éthique** (RGPD, EU AI Act)
- ✅ **Accessibilité** (handicap, TDAH, tags spéciaux)

**Prêt pour démo investisseurs** avec scénarios réalistes et flux complets.

---

*Document généré le 10 Décembre 2024*  
*Version : NESTI 1.0.0*  
*Auteur : Architecture complète de l'application*
