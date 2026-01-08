import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Shield, Network, Cpu, Globe, Zap } from "lucide-react";
import itbidLogo from "@/assets/itbid-logo.png";

export const WhitepaperHero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-24 px-4 overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.08)] via-background to-[hsl(var(--itbid-purple)/0.08)]"
        animate={{
          background: [
            "linear-gradient(135deg, hsl(var(--itbid-cyan)/0.08) 0%, hsl(var(--background)) 50%, hsl(var(--itbid-purple)/0.08) 100%)",
            "linear-gradient(135deg, hsl(var(--itbid-purple)/0.08) 0%, hsl(var(--background)) 50%, hsl(var(--itbid-cyan)/0.08) 100%)",
            "linear-gradient(135deg, hsl(var(--itbid-cyan)/0.08) 0%, hsl(var(--background)) 50%, hsl(var(--itbid-purple)/0.08) 100%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.2)] to-[hsl(var(--itbid-cyan)/0.05)] blur-2xl"
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-[hsl(var(--itbid-purple)/0.2)] to-[hsl(var(--itbid-magenta)/0.05)] blur-2xl"
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-[hsl(var(--itbid-lime)/0.15)] to-transparent blur-xl"
        animate={{ y: [-30, 30, -30] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Tech Icons */}
      <motion.div
        className="absolute top-32 right-32 p-3 rounded-xl bg-[hsl(var(--itbid-cyan)/0.1)] border border-[hsl(var(--itbid-cyan)/0.2)]"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Network className="h-6 w-6 text-[hsl(var(--itbid-cyan))]" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-32 p-3 rounded-xl bg-[hsl(var(--itbid-purple)/0.1)] border border-[hsl(var(--itbid-purple)/0.2)]"
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Cpu className="h-6 w-6 text-[hsl(var(--itbid-purple))]" />
      </motion.div>
      <motion.div
        className="absolute top-48 left-1/4 p-3 rounded-xl bg-[hsl(var(--itbid-lime)/0.1)] border border-[hsl(var(--itbid-lime)/0.2)]"
        animate={{ y: [-15, 15, -15], rotate: [0, 3, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <Globe className="h-6 w-6 text-[hsl(var(--itbid-lime))]" />
      </motion.div>
      <motion.div
        className="absolute bottom-48 right-1/4 p-3 rounded-xl bg-[hsl(var(--itbid-magenta)/0.1)] border border-[hsl(var(--itbid-magenta)/0.2)]"
        animate={{ y: [12, -12, 12], rotate: [0, -3, 0] }}
        transition={{ duration: 5.5, repeat: Infinity }}
      >
        <Zap className="h-6 w-6 text-[hsl(var(--itbid-magenta))]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center max-w-3xl mx-auto z-10"
      >
        {/* Logos with glow effect */}
        <motion.div 
          className="flex items-center justify-center gap-6 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <span className="text-2xl font-bold procuredata-gradient">PROCUREDATA</span>
            <div className="absolute -inset-2 bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.2)] to-[hsl(var(--itbid-purple)/0.2)] blur-lg -z-10 rounded-lg" />
          </div>
          <motion.span 
            className="text-3xl text-muted-foreground"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ×
          </motion.span>
          <div className="relative">
            <img src={itbidLogo} alt="ITBID" className="h-10 object-contain" />
            <div className="absolute -inset-2 bg-[hsl(var(--itbid-cyan)/0.15)] blur-lg -z-10 rounded-lg" />
          </div>
        </motion.div>

        {/* Version Badges with animation */}
        <motion.div 
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Badge variant="outline" className="gap-1.5 px-3 py-1 border-[hsl(var(--itbid-cyan)/0.3)] bg-[hsl(var(--itbid-cyan)/0.05)]">
            <FileText className="h-3.5 w-3.5 text-[hsl(var(--itbid-cyan))]" />
            Whitepaper Técnico v1.0
          </Badge>
          <Badge variant="outline" className="gap-1.5 px-3 py-1 border-[hsl(var(--itbid-purple)/0.3)] bg-[hsl(var(--itbid-purple)/0.05)]">
            <Calendar className="h-3.5 w-3.5 text-[hsl(var(--itbid-purple))]" />
            Enero 2026
          </Badge>
        </motion.div>

        {/* Title with staggered animation */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span 
            className="itbid-gradient font-semibold inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ITBID-X
          </motion.span>
          <br />
          <motion.span 
            className="itbid-gradient-gray inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Hacia la Cadena de
          </motion.span>
          <br />
          <motion.span 
            className="itbid-gradient-gray inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Suministro Soberana
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Implementación de un Espacio de Datos Federado Gaia-X para la 
          Interoperabilidad Industrial Europea
        </motion.p>

        {/* Trust Indicators with hover effects */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))] border border-[hsl(var(--itbid-lime)/0.2)] cursor-pointer transition-shadow hover:shadow-lg hover:shadow-[hsl(var(--itbid-lime)/0.1)]"
          >
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Gaia-X Compliant</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] border border-[hsl(var(--itbid-cyan)/0.2)] cursor-pointer transition-shadow hover:shadow-lg hover:shadow-[hsl(var(--itbid-cyan)/0.1)]"
          >
            <span className="text-sm font-medium">IDSA Standard</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--itbid-purple)/0.1)] text-[hsl(var(--itbid-purple))] border border-[hsl(var(--itbid-purple)/0.2)] cursor-pointer transition-shadow hover:shadow-lg hover:shadow-[hsl(var(--itbid-purple)/0.1)]"
          >
            <span className="text-sm font-medium">Web3 Enabled</span>
          </motion.div>
        </motion.div>

        {/* Central decorative ring */}
        <motion.div
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[hsl(var(--itbid-cyan)/0.1)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-[hsl(var(--itbid-purple)/0.08)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.08)] via-transparent to-[hsl(var(--itbid-purple)/0.08)] blur-3xl"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--itbid-cyan))]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};
