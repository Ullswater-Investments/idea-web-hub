import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DocResponsabilidadLegal = () => (
  <section className="py-16 bg-muted/30"><div className="container mx-auto px-4">
    <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 6</Badge>
    <h2 className="text-3xl font-bold mb-6">Responsabilidad Legal</h2>
    <Card><CardContent className="pt-6"><p className="text-muted-foreground">Cada intercambio de datos queda registrado en contratos digitales firmados criptográficamente. El framework legal cumple con Gaia-X Trust Framework, GDPR y eIDAS para firma electrónica.</p></CardContent></Card>
  </div></section>
);
