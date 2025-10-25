import { useState } from "react";
import { Mail, Eye, EyeOff, Waves } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import nestiLogo from "figma:asset/30630fb08ddc307e291924bf6c94cf58379bb04d.png";

interface LoginPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function LoginPage({ onLogin, onSignup }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="mobile-container min-h-screen flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <img 
            src={nestiLogo} 
            alt="Nesti Logo" 
            className="w-20 h-20 object-contain"
          />
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-500" strokeWidth={1.5} />
            <span className="text-sm text-slate-600">Bon retour parmi nous</span>
          </div>
        </div>

        <div className="glass-strong p-8 rounded-3xl shadow-xl border border-white/40">
          <h1 className="text-3xl text-center mb-2 text-slate-800">Connexion</h1>
          <p className="text-center text-slate-600 mb-8">
            Retrouvez votre cocon familial
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="pl-12 h-14 rounded-2xl glass border-slate-200/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="password" className="text-slate-700">Mot de passe</Label>
                <button 
                  type="button"
                  className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                  Oublié ?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="pr-12 h-14 rounded-2xl glass border-slate-200/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white py-7 rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 border-0 mt-8"
            >
              Se connecter
            </Button>
          </form>

          {/* Signup Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 text-sm">
              Nouveau sur Nesti ?{" "}
              <button
                type="button"
                onClick={onSignup}
                className="text-cyan-600 hover:text-cyan-700 transition-colors underline decoration-cyan-400/40 underline-offset-2"
              >
                Créer un compte
              </button>
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <p className="text-center text-xs text-slate-500/60">
          Un espace sécurisé et serein pour votre famille
        </p>
      </div>
    </div>
  );
}
