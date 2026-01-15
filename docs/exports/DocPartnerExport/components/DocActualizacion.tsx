import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { RefreshCw, Clock, FileSpreadsheet, Zap, Database, CheckCircle2 } from "lucide-react";

const comparisonData = [
  {
    aspect: "Actualización",
    traditional: "Proceso batch semanal/mensual",
    federated: "Tiempo real (milisegundos)",
  },
  {
    aspect: "Formato",
    traditional: "Subir Excel/CSV manualmente",
    federated: "Conexión directa a la fuente",
  },
  {
    aspect: "Duplicación",
    traditional: "Múltiples copias desincronizadas",
    federated: "Fuente única de verdad",
  },
  {
    aspect: "Validez",
    traditional: "Dato puede estar obsoleto",
    federated: "Siempre actualizado",
  },
  {
    aspect: "Esfuerzo",
    traditional: "Manual, propenso a errores",
    federated: "Automatizado, trazable",
  },
  {
    aspect: "Auditoría",
    traditional: "Difícil reconstruir historial",
    federated: "Blockchain inmutable",
  },
];

const realTimeFeatures = [
  {
    icon: Zap,
    title: "Sin Procesos Batch",
    description: "No hay 'sincronización nocturna'. Cuando itbid consulta un certificado, lo hace contra el sistema del proveedor en ese preciso momento.",
  },
  {
    icon: Database,
    title: "Conexión a la Fuente",
    description: "El dato siempre está actualizado porque se lee directamente del sistema origen. No hay copias intermedias que puedan quedar obsoletas.",
  },
  {
    icon: RefreshCw,
    title: "Revocación Inmediata",
    description: "Si un proveedor retira un permiso, el efecto es instantáneo. No hay ventanas de tiempo donde el dato siga siendo accesible.",
  },
  {
    icon: Clock,
    title: "Historial Trazable",
    description: "Cada consulta queda registrada con timestamp. Se puede auditar exactamente qué dato se vio y cuándo.",
  },
];

export const DocActualizacion = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
              <RefreshCw className="h-3 w-3 mr-1" />
              Sección 4
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proceso de Actualización
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Al no haber duplicación de datos (no se suben Excels), no hay procesos de actualización "batch". 
              El dato siempre está actualizado porque se lee en la fuente.
            </p>
          </div>
        </FadeIn>

        {/* Comparison Table */}
        <FadeIn delay={0.1}>
          <Card className="mb-12 overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                Comparativa: Modelo Tradicional vs. Federado
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-4 font-semibold">Aspecto</th>
                      <th className="text-left p-4 font-semibold text-destructive">
                        ❌ Modelo Tradicional
                      </th>
                      <th className="text-left p-4 font-semibold text-[hsl(var(--itbid-lime))]">
                        ✓ Modelo Federado (itbid-x)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={row.aspect} className={index % 2 === 0 ? "bg-muted/10" : ""}>
                        <td className="p-4 font-medium">{row.aspect}</td>
                        <td className="p-4 text-muted-foreground">{row.traditional}</td>
                        <td className="p-4 text-muted-foreground">{row.federated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Real-time Features */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {realTimeFeatures.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center shrink-0">
                      <feature.icon className="h-6 w-6 text-[hsl(var(--itbid-cyan))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Key Insight */}
        <FadeIn delay={0.3}>
          <Card className="bg-gradient-to-r from-[hsl(var(--itbid-lime)/0.1)] to-[hsl(var(--itbid-cyan)/0.1)] border-[hsl(var(--itbid-lime)/0.3)]">
            <CardContent className="py-8">
              <div className="flex items-center gap-4 justify-center">
                <CheckCircle2 className="h-10 w-10 text-[hsl(var(--itbid-lime))] shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Implicación para itbid</h3>
                  <p className="text-muted-foreground max-w-2xl">
                    itbid no necesita mantener infraestructura de sincronización. Cuando un cliente consulta
                    el certificado ISO de un proveedor, la respuesta viene directamente del sistema del proveedor 
                    (o de la certificadora), garantizando validez al milisegundo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
