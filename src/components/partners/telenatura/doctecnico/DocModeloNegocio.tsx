import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DocModeloNegocio = () => (
  <section className="py-16"><div className="container mx-auto px-4">
    <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 7</Badge>
    <h2 className="text-3xl font-bold mb-6">Modelo de Negocio</h2>
    <Card><CardContent className="pt-6"><p className="text-muted-foreground">TeleNatura actúa como orquestador del espacio de datos. Modelo de suscripción por parcela/sensor conectado, con comisiones por transacciones de datos entre participantes.</p></CardContent></Card>
  </div></section>
);
