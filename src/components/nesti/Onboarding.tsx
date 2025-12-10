import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Check, Users, Sparkles, Calendar, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import nestiLogo from "figma:asset/bc152d65360f7c7224736e313603b3d66553bb79.png";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    sports: [] as string[],
    hobbies: [] as string[],
    vacations: [] as string[],
  });
  const [nestName, setNestName] = useState("");

  const steps = [
    {
      title: "Bienvenue dans Nesti",
      subtitle: "Votre assistant familial inclusif",
      description: "Organisez votre vie familiale, découvrez des activités adaptées et restez connectés.",
      icon: "🏡",
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <motion.div
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <img src={nestiLogo} alt="Nesti" className="w-full h-full object-contain drop-shadow-lg" />
          </motion.div>
        </div>
      ),
    },
    {
      title: "Créez votre Nest",
      subtitle: "Donnez un nom à votre famille",
      description: "C'est votre espace privé et chaleureux où vous partagerez vos meilleurs moments.",
      icon: "👨‍👩‍👧‍👦",
      illustration: (
        <div className="w-full max-w-xs mx-auto">
          <div className="relative">
            <Users className="w-32 h-32 mx-auto text-primary/30 mb-6" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center"
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </div>
      ),
      form: (
        <div className="space-y-4 mt-6">
          <div>
            <Label htmlFor="nestName" className="text-foreground">Nom de votre nest</Label>
            <Input
              id="nestName"
              value={nestName}
              onChange={(e) => setNestName(e.target.value)}
              placeholder="Ex: Famille Martin, Les Dupont..."
              className="mt-2 bg-background border-border text-foreground text-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Personnalisez vos préférences",
      subtitle: "Aidez Nesti à vous connaître",
      description: "Sélectionnez vos centres d'intérêt pour recevoir des suggestions d'activités adaptées.",
      icon: "✨",
      illustration: (
        <div className="w-full max-w-xs mx-auto">
          <Sparkles className="w-32 h-32 mx-auto text-primary/30 mb-6" />
        </div>
      ),
      form: (
        <div className="space-y-6 mt-6">
          {/* Sports */}
          <div>
            <Label className="text-foreground mb-3 block">🏃 Sports & Activités physiques</Label>
            <div className="flex flex-wrap gap-2">
              {["Football", "Natation", "Tennis", "Yoga", "Vélo", "Danse"].map((sport) => (
                <button
                  key={sport}
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      sports: preferences.sports.includes(sport)
                        ? preferences.sports.filter((s) => s !== sport)
                        : [...preferences.sports, sport],
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    preferences.sports.includes(sport)
                      ? "bg-success text-white shadow-md scale-105"
                      : "bg-muted text-muted-foreground hover:bg-success/20"
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div>
            <Label className="text-foreground mb-3 block">🎨 Loisirs créatifs</Label>
            <div className="flex flex-wrap gap-2">
              {["Lecture", "Cuisine", "Jardinage", "Art", "Musique", "Photo"].map((hobby) => (
                <button
                  key={hobby}
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      hobbies: preferences.hobbies.includes(hobby)
                        ? preferences.hobbies.filter((h) => h !== hobby)
                        : [...preferences.hobbies, hobby],
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    preferences.hobbies.includes(hobby)
                      ? "bg-secondary text-white shadow-md scale-105"
                      : "bg-muted text-muted-foreground hover:bg-secondary/20"
                  }`}
                >
                  {hobby}
                </button>
              ))}
            </div>
          </div>

          {/* Vacations */}
          <div>
            <Label className="text-foreground mb-3 block">🏖️ Types de vacances</Label>
            <div className="flex flex-wrap gap-2">
              {["Plage", "Montagne", "Ville", "Campagne"].map((vacation) => (
                <button
                  key={vacation}
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      vacations: preferences.vacations.includes(vacation)
                        ? preferences.vacations.filter((v) => v !== vacation)
                        : [...preferences.vacations, vacation],
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    preferences.vacations.includes(vacation)
                      ? "bg-accent text-white shadow-md scale-105"
                      : "bg-muted text-muted-foreground hover:bg-accent/20"
                  }`}
                >
                  {vacation}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Badge className="bg-primary/10 text-primary text-sm px-3 py-2">
              {preferences.sports.length + preferences.hobbies.length + preferences.vacations.length} préférences sélectionnées
            </Badge>
          </div>
        </div>
      ),
    },
    {
      title: "Tout est prêt !",
      subtitle: "Commencez l'aventure Nesti",
      description: "Vous pouvez maintenant inviter des membres, planifier vos activités et découvrir des suggestions personnalisées.",
      icon: "🎉",
      illustration: (
        <div className="w-full max-w-xs mx-auto space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          
          <div className="space-y-2 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Users className="w-4 h-4 text-primary" />
              <span>Nest: <strong className="text-foreground">{nestName || "Votre famille"}</strong></span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>
                <strong className="text-foreground">
                  {preferences.sports.length + preferences.hobbies.length + preferences.vacations.length}
                </strong> préférences configurées
              </span>
            </motion.div>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = currentStep === 1 ? nestName.trim().length > 0 : true;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-br from-cream via-white to-sky-blue/10 flex flex-col">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Étape {currentStep + 1} / {steps.length}
          </span>
          {currentStep > 0 && !isLastStep && (
            <button
              onClick={() => onComplete()}
              className="text-sm text-primary hover:underline"
            >
              Passer
            </button>
          )}
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Illustration */}
            <div className="py-8">
              {currentStepData.illustration}
            </div>

            {/* Text Content */}
            <div className="text-center space-y-3">
              <div className="text-5xl mb-4">{currentStepData.icon}</div>
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {currentStepData.title}
              </h2>
              <p className="text-lg text-primary font-medium">
                {currentStepData.subtitle}
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                {currentStepData.description}
              </p>
            </div>

            {/* Form */}
            {currentStepData.form && (
              <div className="max-w-md mx-auto">
                {currentStepData.form}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-border px-6 py-4">
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-border rounded-2xl"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Retour
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex-1 rounded-2xl ${
              isLastStep
                ? "bg-gradient-to-r from-success to-primary hover:opacity-90"
                : "bg-primary hover:bg-primary/90"
            } text-white shadow-lg disabled:opacity-50`}
          >
            {isLastStep ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Commencer
              </>
            ) : (
              <>
                Suivant
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
