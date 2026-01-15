import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building, Microscope, Award } from "lucide-react";

const participants = [
  { icon: Users, role: "Agricultores", description: "Propietarios de los datos de sus parcelas y sensores." },
  { icon: Building, role: "Cooperativas", description: "Agregadores de datos que facilitan el acceso a mercados." },
  { icon: Microscope, role: "Técnicos Agrícolas", description: "Consumidores de datos para asesoramiento especializado." },
  { icon: Award, role: "Certificadoras", description: "Entidades que verifican cumplimiento de normativas ecológicas." },
];

export const DocParticipantes = () => (
  <section className="py-16"><div className="container mx-auto px-4">
    <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Sección 5</Badge>
    <h2 className="text-3xl font-bold mb-6">Participantes del Ecosistema</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {participants.map((p) => (
        <Card key={p.role}><CardContent className="pt-6 text-center"><p.icon className="h-10 w-10 mx-auto text-[hsl(var(--telenatura-green))] mb-3" /><h3 className="font-semibold">{p.role}</h3><p className="text-muted-foreground text-sm mt-2">{p.description}</p></CardContent></Card>
      ))}
    </div>
  </div></section>
);