import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DocHojaDeRuta = () => (
  <section className="py-16"><div className="container mx-auto px-4">
    <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 9</Badge>
    <h2 className="text-3xl font-bold mb-6">Hoja de Ruta</h2>
    <Card><CardContent className="pt-6"><p className="text-muted-foreground">Q1 2025: Piloto con 10 explotaciones. Q2 2025: Integración con cooperativas. Q3 2025: Conexión con certificadoras. Q4 2025: Lanzamiento comercial.</p></CardContent></Card>
  </div></section>
);