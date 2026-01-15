import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Shield } from "lucide-react";

export const DocResumenEjecutivo = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 1</Badge>
      <h2 className="text-3xl font-bold mb-6">Resumen Ejecutivo</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card><CardContent className="pt-6"><Sprout className="h-8 w-8 text-[hsl(var(--telenatura-green))] mb-4" /><h3 className="font-semibold mb-2">Federación vs Centralización</h3><p className="text-muted-foreground">Los datos agrícolas permanecen en origen. Solo se comparte acceso, nunca posesión.</p></CardContent></Card>
        <Card><CardContent className="pt-6"><Shield className="h-8 w-8 text-[hsl(var(--telenatura-green))] mb-4" /><h3 className="font-semibold mb-2">Soberanía Garantizada</h3><p className="text-muted-foreground">El agricultor mantiene control criptográfico total sobre quién accede a sus datos.</p></CardContent></Card>
      </div>
    </div>
  </section>
);
