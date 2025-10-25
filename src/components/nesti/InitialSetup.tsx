import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Check, Users, Sparkles, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import nestiLogo from "figma:asset/30630fb08ddc307e291924bf6c94cf58379bb04d.png";

interface InitialSetupProps {
  onComplete: () => void;
}

export function InitialSetup({ onComplete }: InitialSetupProps) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    adults: "2",
    teens: "0",
    locationSharing: false,
    aiAssistant: false,
    discoveries: false,
    emailNotifications: false,
    discoveryMode: "none",
    discoveryThemes: {
      history: false,
      culture: false,
      personalities: false,
      events: false,
    },
    excludeThemes: {
      religious: false,
      political: false,
      lgbtq: false,
      other: "",
    },
  });

  const nextStep = () => {
    if (step === 2 && !config.discoveries) {
      setStep(4); // Skip discovery config if not enabled
    } else if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step === 4 && !config.discoveries) {
      setStep(2); // Skip back over discovery config
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="mobile-container min-h-screen flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-md glass-strong rounded-3xl shadow-xl p-6 border border-white/40">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={nestiLogo} 
            alt="Nesti Logo" 
            className="w-14 h-14 object-contain"
          />
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  s <= step
                    ? "bg-teal-500 text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl mb-2">Qui compose votre famille ?</h2>
                <p className="text-slate-600">
                  Ces informations nous aident à personnaliser votre expérience
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="adults">Nombre d'adultes</Label>
                  <Select
                    value={config.adults}
                    onValueChange={(value) => setConfig({ ...config, adults: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} {n === 1 ? "adulte" : "adultes"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="teens">Nombre d'adolescents (13-17 ans)</Label>
                  <Select
                    value={config.teens}
                    onValueChange={(value) => setConfig({ ...config, teens: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} {n === 0 ? "aucun" : n === 1 ? "adolescent" : "adolescents"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  ℹ️ Les membres de moins de 13 ans ne peuvent pas utiliser l'application (RGPD)
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl mb-2">Définissez vos préférences</h2>
                <p className="text-slate-600">
                  Vous pourrez tout modifier plus tard dans les paramètres
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="location">Partager ma localisation</Label>
                    <p className="text-sm text-slate-500">
                      Pour suggestions d'activités à proximité
                    </p>
                  </div>
                  <Switch
                    id="location"
                    checked={config.locationSharing}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, locationSharing: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="ai">Activer l'assistant IA</Label>
                    <p className="text-sm text-slate-500">Optionnel, pour reformuler les messages</p>
                  </div>
                  <Switch
                    id="ai"
                    checked={config.aiAssistant}
                    onCheckedChange={(checked) => setConfig({ ...config, aiAssistant: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="discoveries">Module "Découvertes culturelles"</Label>
                    <p className="text-sm text-slate-500">Contenu historique et culturel factuel</p>
                  </div>
                  <Switch
                    id="discoveries"
                    checked={config.discoveries}
                    onCheckedChange={(checked) => setConfig({ ...config, discoveries: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="email">Notifications par email</Label>
                    <p className="text-sm text-slate-500">Recevoir des rappels par email</p>
                  </div>
                  <Switch
                    id="email"
                    checked={config.emailNotifications}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, emailNotifications: checked })
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && config.discoveries && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl mb-2">Personnalisez le contenu "Découvertes"</h2>
                <p className="text-slate-600">
                  Ce module propose du contenu historique et culturel FACTUEL. Vous contrôlez
                  entièrement ce qui est affiché.
                </p>
              </div>

              <RadioGroup
                value={config.discoveryMode}
                onValueChange={(value) => setConfig({ ...config, discoveryMode: value })}
                className="space-y-4"
              >
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="none" id="none" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="none" className="cursor-pointer">
                      Outil d'organisation pure
                    </Label>
                    <p className="text-sm text-slate-500">
                      Aucun contenu culturel, calendrier uniquement
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="factual" id="factual" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="factual" className="cursor-pointer">
                      Découvertes historiques factuelles
                    </Label>
                    <p className="text-sm text-slate-500">
                      Faits historiques vérifiés, aucune opinion
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="custom" id="custom" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="custom" className="cursor-pointer">
                      Personnalisé
                    </Label>
                    <p className="text-sm text-slate-500 mb-4">
                      Choisissez exactement ce que vous voulez voir
                    </p>

                    {config.discoveryMode === "custom" && (
                      <div className="space-y-3 pl-4 border-l-2 border-teal-200 mt-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="history"
                            checked={config.discoveryThemes.history}
                            onCheckedChange={(checked) =>
                              setConfig({
                                ...config,
                                discoveryThemes: {
                                  ...config.discoveryThemes,
                                  history: checked as boolean,
                                },
                              })
                            }
                          />
                          <Label htmlFor="history" className="cursor-pointer">
                            Histoire & sciences
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="culture"
                            checked={config.discoveryThemes.culture}
                            onCheckedChange={(checked) =>
                              setConfig({
                                ...config,
                                discoveryThemes: {
                                  ...config.discoveryThemes,
                                  culture: checked as boolean,
                                },
                              })
                            }
                          />
                          <Label htmlFor="culture" className="cursor-pointer">
                            Diversité culturelle (factuel)
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="personalities"
                            checked={config.discoveryThemes.personalities}
                            onCheckedChange={(checked) =>
                              setConfig({
                                ...config,
                                discoveryThemes: {
                                  ...config.discoveryThemes,
                                  personalities: checked as boolean,
                                },
                              })
                            }
                          />
                          <Label htmlFor="personalities" className="cursor-pointer">
                            Personnalités inspirantes
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="events"
                            checked={config.discoveryThemes.events}
                            onCheckedChange={(checked) =>
                              setConfig({
                                ...config,
                                discoveryThemes: {
                                  ...config.discoveryThemes,
                                  events: checked as boolean,
                                },
                              })
                            }
                          />
                          <Label htmlFor="events" className="cursor-pointer">
                            Événements mondiaux
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </RadioGroup>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900">
                  ⚠️ Aucun contenu ne sera imposé. Vous pouvez tout désactiver à tout moment.
                </p>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl mb-2">Récapitulatif de vos choix</h2>
                <p className="text-slate-600">Vérifiez votre configuration avant de commencer</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Composition familiale</p>
                  <p>
                    {config.adults} {config.adults === "1" ? "adulte" : "adultes"},{" "}
                    {config.teens} {config.teens === "0" ? "aucun adolescent" : config.teens === "1" ? "adolescent" : "adolescents"}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Fonctionnalités activées</p>
                  <ul className="space-y-1">
                    {config.locationSharing && <li>• Partage de localisation</li>}
                    {config.aiAssistant && <li>• Assistant IA</li>}
                    {config.discoveries && <li>• Module Découvertes culturelles</li>}
                    {config.emailNotifications && <li>• Notifications email</li>}
                    {!config.locationSharing &&
                      !config.aiAssistant &&
                      !config.discoveries &&
                      !config.emailNotifications && (
                        <li className="text-slate-500">Aucune fonctionnalité optionnelle activée</li>
                      )}
                  </ul>
                </div>

                {config.discoveries && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Configuration Découvertes</p>
                    <p>
                      {config.discoveryMode === "none" && "Désactivé"}
                      {config.discoveryMode === "factual" && "Mode factuel complet"}
                      {config.discoveryMode === "custom" && "Mode personnalisé"}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <p className="text-sm text-teal-900">
                  ✓ Vous pourrez modifier tous ces paramètres à tout moment depuis la page
                  Paramètres
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            <ChevronLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>

          <Button onClick={nextStep} className="bg-teal-500 hover:bg-teal-600 text-white">
            {step === 4 ? "Valider et accéder à Nesti" : "Suivant"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}