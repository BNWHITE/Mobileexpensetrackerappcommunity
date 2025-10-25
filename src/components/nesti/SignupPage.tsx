import { useState } from "react";
import { Mail, Eye, EyeOff, Sparkles, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import nestiLogo from "figma:asset/30630fb08ddc307e291924bf6c94cf58379bb04d.png";

interface SignupPageProps {
  onSignup: () => void;
  onLogin: () => void;
}

export function SignupPage({ onSignup, onLogin }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptTerms: false,
    ageConfirm: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.acceptTerms && formData.ageConfirm) {
      onSignup();
    }
  };

  return (
    <div className="mobile-container min-h-screen p-6 py-8">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-2">
          <img 
            src={nestiLogo} 
            alt="Nesti Logo" 
            className="w-16 h-16 object-contain"
          />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
            <span className="text-sm text-slate-600">Créons votre cocon familial</span>
          </div>
        </div>

        <div className="glass-strong p-6 rounded-3xl shadow-xl border border-white/40">
          <h1 className="text-2xl text-center mb-1 text-slate-800">Inscription</h1>
          <p className="text-center text-slate-600 text-sm mb-6">
            Commencez votre aventure familiale
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName" className="text-slate-700 text-sm">
                Prénom du parent administrateur *
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Votre prénom"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="mt-1.5 h-12 rounded-2xl glass border-slate-200/50 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName" className="text-slate-700 text-sm">
                Nom de famille (optionnel)
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Nom de famille"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1.5 h-12 rounded-2xl glass border-slate-200/50 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-slate-700 text-sm">Email *</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="pl-11 h-12 rounded-2xl glass border-slate-200/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-slate-700 text-sm">Mot de passe *</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="pr-11 h-12 rounded-2xl glass border-slate-200/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptTerms: checked as boolean })
                }
                className="mt-1 rounded-md border-cyan-300"
              />
              <Label htmlFor="terms" className="text-xs leading-relaxed cursor-pointer text-slate-600">
                J'ai lu et j'accepte les{" "}
                <button type="button" className="text-cyan-600 underline hover:text-cyan-700 decoration-cyan-400/40">
                  CGU
                </button>{" "}
                et la{" "}
                <button type="button" className="text-cyan-600 underline hover:text-cyan-700 decoration-cyan-400/40">
                  Charte de Neutralité
                </button>
              </Label>
            </div>

            {/* Age Confirmation */}
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="age"
                checked={formData.ageConfirm}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, ageConfirm: checked as boolean })
                }
                className="mt-1 rounded-md border-cyan-300"
              />
              <Label htmlFor="age" className="text-xs leading-relaxed cursor-pointer text-slate-600">
                Je certifie avoir plus de 18 ans
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white py-6 rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 border-0 mt-6"
              disabled={!formData.acceptTerms || !formData.ageConfirm}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Créer mon espace
            </Button>

            {/* Login Link */}
            <div className="text-center pt-2">
              <p className="text-slate-600 text-xs">
                Déjà un compte ?{" "}
                <button
                  type="button"
                  onClick={onLogin}
                  className="text-cyan-600 hover:text-cyan-700 transition-colors underline decoration-cyan-400/40 underline-offset-2"
                >
                  Se connecter
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm border border-amber-200/40 rounded-2xl">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Nesti est un outil d'organisation, pas un service de conseil familial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
