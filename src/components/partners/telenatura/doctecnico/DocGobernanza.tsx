import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DocGobernanza = () => (
  <section className="py-16"><div className="container mx-auto px-4">
    <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 3</Badge>
    <h2 className="text-3xl font-bold mb-6">Gobernanza con ODRL</h2>
    <Card><CardContent className="pt-6"><p className="text-muted-foreground">Las políticas ODRL permiten definir reglas de uso de datos agrícolas: duración del acceso, propósito permitido (ej: solo para optimización de riego), restricciones geográficas y obligaciones de compensación.</p></CardContent></Card>
  </div></section>
);
