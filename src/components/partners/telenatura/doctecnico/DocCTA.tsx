import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf } from "lucide-react";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

export const DocCTA = () => (
  <section className="py-16 bg-gradient-to-br from-[hsl(var(--telenatura-green)/0.05)] to-background">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        <ProcuredataLogo size="sm" />
        <span className="text-2xl text-muted-foreground">×</span>
        <span className="text-xl font-bold telenatura-gradient flex items-center gap-2"><Leaf className="h-5 w-5" />TeleNatura EBT</span>
      </div>
      <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Próximos Pasos</Badge>
      <h2 className="text-3xl font-bold mb-4">¿Listo para conectar tu explotación?</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Contacta con nuestro equipo para una demostración personalizada.</p>
      <Button className="bg-[hsl(var(--telenatura-green))] hover:bg-[hsl(var(--telenatura-green)/0.9)]">Solicitar Demo <ArrowRight className="ml-2 h-4 w-4" /></Button>
      <p className="text-sm text-muted-foreground mt-8">© 2025 TeleNatura EBT × PROCUREDATA | Documento Técnico v1.0</p>
    </div>
  </section>
);
