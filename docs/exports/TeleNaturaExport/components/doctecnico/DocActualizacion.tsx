import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DocActualizacion = () => (
  <section className="py-16 bg-muted/30"><div className="container mx-auto px-4">
    <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 4</Badge>
    <h2 className="text-3xl font-bold mb-6">Proceso de Actualización</h2>
    <Card><CardContent className="pt-6"><p className="text-muted-foreground">A diferencia del modelo tradicional de exportación batch, los datos de sensores IoT se actualizan en tiempo real. Los consumidores autorizados siempre acceden a la versión más reciente directamente desde el origen.</p></CardContent></Card>
  </div></section>
);