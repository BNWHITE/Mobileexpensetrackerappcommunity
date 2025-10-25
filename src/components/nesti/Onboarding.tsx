import { useState } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ChevronRight, ChevronLeft, Users, Settings, Shield, Check, Heart, Leaf } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import nestiLogo from "figma:asset/30630fb08ddc307e291924bf6c94cf58379bb04d.png";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Heart,
      title: "Bienvenue dans Nesti",
      description: "Un espace chaleureux et serein pour organiser votre vie familiale",
      badge: null,
      color: "from-pink-400 to-orange-400",
    },
    {
      icon: Leaf,
      title: "Vous gardez le contrôle",
      description:
        "Configurez l'application selon VOS valeurs. Activez ou désactivez chaque fonctionnalité.",
      badge: "100% Personnalisable",
      color: "from-emerald-400 to-cyan-400",
    },
    {
      icon: Shield,
      title: "Transparence & Éthique",
      description:
        "Notre IA est un assistant technique, pas un conseiller. Conformité RGPD & EU AI Act garantie.",
      badge: null,
      color: "from-cyan-400 to-blue-400",
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="mobile-container min-h-screen flex flex-col items-center justify-between p-6 py-12">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <img 
          src={nestiLogo} 
          alt="Nesti Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center space-y-8"
            >
              {/* Icon with gradient background */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center"
              >
                <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${slides[currentSlide].color} p-[2px] shadow-xl`}>
                  <div className="w-full h-full rounded-3xl glass-strong flex items-center justify-center">
                    {React.createElement(slides[currentSlide].icon, { 
                      className: "w-14 h-14 text-slate-700", 
                      strokeWidth: 1.5 
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Badge */}
              {slides[currentSlide].badge && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white px-5 py-1.5 rounded-full border-0 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    {slides[currentSlide].badge}
                  </Badge>
                </motion.div>
              )}

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl text-slate-800 px-4"
              >
                {slides[currentSlide].title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base text-slate-600 leading-relaxed px-6"
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* RGPD Badges for last slide */}
              {currentSlide === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3 justify-center flex-wrap px-6"
                >
                  <Badge variant="outline" className="px-4 py-2 rounded-2xl border-cyan-300 text-cyan-700">
                    <Shield className="w-4 h-4 mr-2" />
                    RGPD
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 rounded-2xl border-emerald-300 text-emerald-700">
                    <Check className="w-4 h-4 mr-2" />
                    EU AI Act
                  </Badge>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom section */}
      <div className="w-full max-w-md space-y-6">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-gradient-to-r from-cyan-500 to-emerald-400 w-8" 
                  : "bg-slate-300 w-2"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <Button
            variant="ghost"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-slate-600 rounded-2xl"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour
          </Button>

          <Button 
            onClick={nextSlide} 
            className="bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white px-8 py-6 rounded-2xl shadow-lg shadow-cyan-500/30 border-0"
          >
            {currentSlide === slides.length - 1 ? "C'est parti" : "Suivant"}
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>

        {/* Skip */}
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={onComplete} 
            className="text-slate-500 text-sm"
          >
            Passer l'introduction
          </Button>
        </div>
      </div>
    </div>
  );
}
