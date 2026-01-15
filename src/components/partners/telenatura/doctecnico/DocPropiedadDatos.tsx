import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Database, Eye, RefreshCcw } from "lucide-react";

const principles = [
  { icon: Database, title: "Soberanía Absoluta", description: "El dato NUNCA sale de la explotación agrícola para ser almacenado en un servidor central." },
  { icon: Eye, title: "Acceso vs. Posesión", description: "El agricultor otorga 'permiso de acceso' (visitar el dato), NO 'entrega el dato'." },
  { icon: Lock, title: "Control Criptográfico", description: "El agricultor mantiene las llaves criptográficas. Nadie accede sin autorización firmada." },
  { icon: RefreshCcw, title: "Revocación Instantánea", description: "Si el agricultor revoca el acceso, los consumidores dejan de ver el dato instantáneamente." },
];

export const DocPropiedadDatos = () => (
  <section className="py-16 bg-muted/30">
    <div className="container mx-auto px-4">
      <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 2</Badge>
      <h2 className="text-3xl font-bold mb-6">Propiedad y Control de los Datos</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {principles.map((p) => (
          <Card key={p.title}><CardContent className="pt-6 flex gap-4"><p.icon className="h-8 w-8 text-[hsl(var(--telenatura-green))] shrink-0" /><div><h3 className="font-semibold mb-2">{p.title}</h3><p className="text-muted-foreground text-sm">{p.description}</p></div></CardContent></Card>
        ))}
      </div>
    </div>
  </section>
);
