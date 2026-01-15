import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DocTiposInformacion = () => (
  <section className="py-16 bg-muted/30"><div className="container mx-auto px-4">
    <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 10</Badge>
    <h2 className="text-3xl font-bold mb-6">Tipos de Información</h2>
    <Card><CardContent className="pt-6"><p className="text-muted-foreground">Variables climáticas, balance hídrico, humedad del suelo, estado fenológico, tratamientos fitosanitarios, trazabilidad de cosecha, certificaciones ecológicas.</p></CardContent></Card>
  </div></section>
);
