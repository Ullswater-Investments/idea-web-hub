import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DocDiferenciacion = () => (
  <section className="py-16"><div className="container mx-auto px-4">
    <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 11</Badge>
    <h2 className="text-3xl font-bold mb-6">Diferenciación Competitiva</h2>
    <Card><CardContent className="pt-6"><p className="text-muted-foreground">A diferencia de plataformas cerradas que capturan datos del agricultor, telenatura-x garantiza soberanía total. El agricultor decide quién, cuándo y para qué accede a sus datos.</p></CardContent></Card>
  </div></section>
);