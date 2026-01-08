import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Key, Link2, FolderOpen, Check, X, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Key,
    title: "Identidad Soberana (SSI)",
    description: "Identificadores Descentralizados (DIDs) que permiten a cada organización probar su identidad sin depender de autoridades centralizadas.",
    color: "itbid-cyan",
    features: ["DID:ethr estándar W3C", "Verificación on-chain", "Credenciales Verificables"]
  },
  {
    icon: Link2,
    title: "Conectores de Datos (EDC)",
    description: "Eclipse Dataspace Connector para comunicación segura entre participantes del espacio de datos.",
    color: "itbid-lime",
    features: ["Protocolo IDS/AAS", "Negociación automatizada", "Transfer push/pull"]
  },
  {
    icon: FolderOpen,
    title: "Catálogos Federados",
    description: "Metadatos publicados siguiendo vocabulario DCAT que permiten descubrimiento de activos de datos.",
    color: "itbid-purple",
    features: ["Vocabulario DCAT-AP", "Búsqueda federada", "Clasificación semántica"]
  }
];

const comparison = [
  { feature: "Control sobre acceso", traditional: false, federated: true },
  { feature: "Trazabilidad inmutable", traditional: false, federated: true },
  { feature: "Interoperabilidad nativa", traditional: false, federated: true },
  { feature: "Cumplimiento GDPR", traditional: "Parcial", federated: true },
  { feature: "Revocación instantánea", traditional: false, federated: true },
  { feature: "Dependencia de terceros", traditional: true, federated: false },
];

export const GaiaXContext = () => {
  return (
    <div className="py-20 px-4 bg-muted/30 border-b relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[hsl(var(--itbid-lime)/0.08)] to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-l from-[hsl(var(--itbid-purple)/0.08)] to-transparent rounded-full blur-3xl" />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[hsl(var(--itbid-cyan)/0.3)]"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 12}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--itbid-lime))] uppercase tracking-wider px-3 py-1 rounded-full bg-[hsl(var(--itbid-lime)/0.1)] border border-[hsl(var(--itbid-lime)/0.2)]"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="w-3 h-3" />
            02 — Contexto Tecnológico
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-light mt-4 itbid-gradient-gray">
            ¿Qué es Gaia-X?
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            Gaia-X es la iniciativa europea para crear una infraestructura de datos federada, 
            segura y soberana. Define estándares que permiten a las organizaciones compartir 
            datos manteniendo el control total sobre su información.
          </p>
        </motion.div>

        {/* Three Pillars with enhanced design */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={`h-full border-2 border-[hsl(var(--${pillar.color})/0.2)] hover:border-[hsl(var(--${pillar.color})/0.5)] transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(var(--${pillar.color})/0.1)] overflow-hidden group`}>
                  {/* Top gradient bar */}
                  <div className={`h-1 bg-gradient-to-r from-[hsl(var(--${pillar.color}))] to-[hsl(var(--${pillar.color})/0.5)]`} />
                  
                  <CardHeader className="relative">
                    {/* Background glow on hover */}
                    <div className={`absolute inset-0 bg-[hsl(var(--${pillar.color})/0.03)] opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
                    <motion.div 
                      className={`p-4 rounded-2xl bg-[hsl(var(--${pillar.color})/0.1)] w-fit relative`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <pillar.icon className={`h-7 w-7 text-[hsl(var(--${pillar.color}))]`} />
                    </motion.div>
                    <CardTitle className="text-lg mt-2">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{pillar.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.features.map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="outline" 
                          className={`text-xs border-[hsl(var(--${pillar.color})/0.3)] bg-[hsl(var(--${pillar.color})/0.05)] hover:bg-[hsl(var(--${pillar.color})/0.1)] transition-colors`}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-2 border-[hsl(var(--itbid-cyan)/0.2)]">
            <CardHeader className="bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.05)] to-[hsl(var(--itbid-purple)/0.05)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[hsl(var(--itbid-cyan)/0.1)]">
                  <Globe className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                </div>
                <CardTitle>Data Lake Tradicional vs Espacio Federado</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left py-4 px-6 font-semibold">Característica</th>
                      <th className="text-center py-4 px-6 font-semibold text-muted-foreground">
                        <div className="flex flex-col items-center gap-1">
                          <span>Data Lake</span>
                          <span className="text-xs font-normal text-muted-foreground/60">Tradicional</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-[hsl(var(--itbid-lime))]">
                        <div className="flex flex-col items-center gap-1">
                          <span>Espacio Federado</span>
                          <span className="text-xs font-normal text-[hsl(var(--itbid-lime))]">Gaia-X</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <motion.tr 
                        key={row.feature} 
                        className={`border-b last:border-b-0 ${i % 2 === 0 ? "bg-muted/20" : ""} hover:bg-muted/40 transition-colors`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <td className="py-4 px-6 font-medium">{row.feature}</td>
                        <td className="py-4 px-6 text-center">
                          {row.traditional === true ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10">
                              <Check className="h-4 w-4 text-amber-500" />
                            </div>
                          ) : row.traditional === false ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-destructive/10">
                              <X className="h-4 w-4 text-destructive" />
                            </div>
                          ) : (
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30">
                              {row.traditional}
                            </Badge>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {row.federated === true ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--itbid-lime)/0.1)]">
                              <Check className="h-4 w-4 text-[hsl(var(--itbid-lime))]" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                              <X className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
