import { motion } from "motion/react";
import { Button } from "../ui/button";
import nestiLogo from "figma:asset/bc152d65360f7c7224736e313603b3d66553bb79.png";

interface SplashScreenProps {
  onContinue: () => void;
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  return (
    <div className="mobile-container min-h-screen bg-gradient-to-br from-cream via-white to-sky-blue/10 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <div className="w-40 h-40 mx-auto">
            <img 
              src={nestiLogo} 
              alt="Nesti Logo" 
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* App Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl mb-3 text-forest-green"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          NESTI
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-sage-green mb-12 px-8"
        >
          Votre réseau familial chaleureux
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-forest-green hover:bg-sage-green text-white px-12 py-7 text-lg rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Commencer
          </Button>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-sm text-gray-500"
        >
          Connectez, partagez, célébrez ensemble
        </motion.p>
      </motion.div>
    </div>
  );
}
