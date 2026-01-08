import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { ArrowDownToLine, ArrowUpFromLine, Building2, Lock, FileCode, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const odrlExamples = [
  { label: "Lectura de stock", enabled: true },
  { label: "Horario 8:00-18:00", enabled: true },
  { label: "Fines de planificación", enabled: true },
  { label: "Reventa del dato", enabled: false },
];

export const ArchitectureSection = () => {
  const [policies, setPolicies] = useState(odrlExamples);

  const togglePolicy = (index: number) => {
    setPolicies((prev) =>
      prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p))
    );
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4">
              <FileCode className="h-4 w-4" />
              <span className="text-sm font-medium">Arquitectura Técnica</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">El Gateway ITBID</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un conector IDS/Gaia-X integrado en la infraestructura de ITBID
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Gateway Diagram */}
          <FadeIn>
            <Card className="p-8 h-full">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-8">ITBID Gateway</h3>
                
                <div className="relative w-full max-w-sm">
                  {/* Consumer Connector */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <div className="flex-1 text-right">
                      <p className="font-medium text-sm">Datos Externos</p>
                      <p className="text-xs text-muted-foreground">Certificados, Alertas</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowDownToLine className="h-5 w-5 text-primary" />
                      <div className="w-24 h-12 rounded-lg bg-primary/20 border-2 border-primary flex items-center justify-center">
                        <span className="text-xs font-medium">Consumer</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Central Gateway */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full py-6 px-4 rounded-xl bg-gradient-to-r from-primary/20 to-orange-500/20 border-2 border-primary/50 text-center mb-6"
                  >
                    <Lock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-bold">ITBID-X Connector</p>
                    <p className="text-xs text-muted-foreground">Políticas ODRL · Auditoría · Cifrado</p>
                  </motion.div>

                  {/* Provider Connector */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-12 rounded-lg bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                        <span className="text-xs font-medium">Provider</span>
                      </div>
                      <ArrowUpFromLine className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Datos Agregados</p>
                      <p className="text-xs text-muted-foreground">Si el cliente autoriza</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Data Embassy */}
          <FadeIn delay={0.2}>
            <Card className="p-8 h-full bg-gradient-to-br from-primary/5 to-orange-500/5">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Embajada de Datos para PYMEs</CardTitle>
                    <p className="text-sm text-muted-foreground">Servicio "Data Embassy"</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <p className="text-muted-foreground">
                  Muchos proveedores PYME no tienen capacidad tecnológica para gestionar 
                  su propio servidor Gaia-X. ITBID ofrece:
                </p>
                <ul className="space-y-3">
                  {[
                    "Custodia de datos en contenedor seguro y aislado (Sandbox)",
                    "El proveedor mantiene las llaves criptográficas",
                    "Control total sobre políticas de acceso",
                    "ITBID provee la infraestructura técnica",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* ODRL Policy Editor */}
        <FadeIn delay={0.3}>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Editor de Políticas ODRL</CardTitle>
                <Badge variant="outline">Demo Interactiva</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Define contratos de datos con control granular
              </p>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm mb-4">
                <p className="text-muted-foreground mb-2">// Ejemplo de política</p>
                <p>"Permito a <span className="text-primary">Cliente X</span> ver mi nivel de stock..."</p>
              </div>
              <div className="space-y-3">
                {policies.map((policy, index) => (
                  <div
                    key={policy.label}
                    className="flex items-center justify-between p-3 rounded-lg bg-background border"
                  >
                    <span className="text-sm">{policy.label}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={policy.enabled ? "default" : "destructive"} className="text-xs">
                        {policy.enabled ? "Permitido" : "Prohibido"}
                      </Badge>
                      <Switch
                        checked={policy.enabled}
                        onCheckedChange={() => togglePolicy(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
