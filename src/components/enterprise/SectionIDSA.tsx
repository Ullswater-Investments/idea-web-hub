import { Globe, ShieldCheck, Share2, Layers, Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const IDSAContractCode = () => {
  const [copied, setCopied] = useState(false);

  const contractJson = {
    "@context": [
      "https://w3id.org/idsa/contexts/context.jsonld",
      "http://www.w3.org/ns/odrl.jsonld"
    ],
    "@type": "ids:ContractAgreement",
    "@id": "https://w3id.org/procuredata/contract/7742-8851",
    "ids:provider": "did:ethr:0x7ecc...9821",
    "ids:consumer": "did:ethr:0x7ecc...1104",
    "ids:permission": [{
      "ids:action": "ids:USE",
      "ids:target": "https://catalog.procuredata.eu/asset/supplier-passport-v3",
      "ids:constraint": [
        {
          "@type": "ids:Constraint",
          "ids:leftOperand": "ids:PURPOSE",
          "ids:operator": "ids:EQ",
          "ids:rightOperand": "ids:SUPPLIER_ONBOARDING"
        },
        {
          "@type": "ids:Constraint",
          "ids:leftOperand": "ids:ELAPSED_TIME",
          "ids:operator": "ids:LT",
          "ids:rightOperand": "P30D"
        }
      ]
    }]
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(contractJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-muted dark:bg-card rounded-2xl border border-border overflow-hidden shadow-lg dark:shadow-2xl">
      {/* Header del Editor */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary dark:bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-600 dark:text-green-500" />
          <span className="text-xs font-mono text-muted-foreground">idsa_contract_agreement.jsonld</span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="p-1.5 rounded-lg hover:bg-muted dark:hover:bg-secondary transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-600 dark:text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>

      {/* Contenido del Código con Sintaxis Resaltada */}
      <div className="p-4 overflow-x-auto bg-muted/50 dark:bg-card">
        <pre className="text-xs font-mono leading-relaxed">
          <span className="text-muted-foreground">{"{"}</span>
          <div className="pl-4">
            <span className="text-purple-600 dark:text-purple-400">"@context"</span><span className="text-muted-foreground">: [</span>
          </div>
          <div className="pl-8">
            <span className="text-green-700 dark:text-green-400">"https://w3id.org/idsa/contexts/context.jsonld"</span><span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-8">
            <span className="text-green-700 dark:text-green-400">"http://www.w3.org/ns/odrl.jsonld"</span>
          </div>
          <div className="pl-4">
            <span className="text-muted-foreground">],</span>
          </div>
          <div className="pl-4">
            <span className="text-purple-600 dark:text-purple-400">"@type"</span><span className="text-muted-foreground">: </span><span className="text-green-700 dark:text-green-400">"ids:ContractAgreement"</span><span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-purple-600 dark:text-purple-400">"ids:provider"</span><span className="text-muted-foreground">: </span><span className="text-primary">"did:ethr:0x7ecc...9821"</span><span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-purple-600 dark:text-purple-400">"ids:consumer"</span><span className="text-muted-foreground">: </span><span className="text-primary">"did:ethr:0x7ecc...1104"</span><span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-purple-600 dark:text-purple-400">"ids:permission"</span><span className="text-muted-foreground">: [{"{"}</span>
          </div>
          <div className="pl-8">
            <span className="text-purple-600 dark:text-purple-400">"ids:action"</span><span className="text-muted-foreground">: </span><span className="text-blue-600 dark:text-blue-400">"ids:USE"</span><span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-8">
            <span className="text-purple-600 dark:text-purple-400">"ids:constraint"</span><span className="text-muted-foreground">: [</span>
          </div>
          <div className="pl-12">
            <span className="text-muted-foreground">{"{"}</span>
          </div>
          <div className="pl-16">
            <span className="text-purple-600 dark:text-purple-400">"ids:leftOperand"</span><span className="text-muted-foreground">: </span><span className="text-cyan-600 dark:text-cyan-400">"ids:PURPOSE"</span><span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-16">
            <span className="text-purple-600 dark:text-purple-400">"ids:rightOperand"</span><span className="text-muted-foreground">: </span><span className="text-cyan-600 dark:text-cyan-400">"ids:SUPPLIER_ONBOARDING"</span>
          </div>
          <div className="pl-12">
            <span className="text-muted-foreground">{"}"},</span>
          </div>
          <div className="pl-12">
            <span className="text-muted-foreground">{"{"}</span>
          </div>
          <div className="pl-16">
            <span className="text-purple-600 dark:text-purple-400">"ids:leftOperand"</span><span className="text-muted-foreground">: </span><span className="text-cyan-600 dark:text-cyan-400">"ids:ELAPSED_TIME"</span><span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-16">
            <span className="text-purple-600 dark:text-purple-400">"ids:operator"</span><span className="text-muted-foreground">: </span><span className="text-cyan-600 dark:text-cyan-400">"ids:LT"</span><span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-16">
            <span className="text-purple-600 dark:text-purple-400">"ids:rightOperand"</span><span className="text-muted-foreground">: </span><span className="text-yellow-600 dark:text-yellow-400">"P30D"</span>
          </div>
          <div className="pl-12">
            <span className="text-muted-foreground">{"}"}</span>
          </div>
          <div className="pl-8">
            <span className="text-muted-foreground">]</span>
          </div>
          <div className="pl-4">
            <span className="text-muted-foreground">{"}"}]</span>
          </div>
          <span className="text-muted-foreground">{"}"}</span>
        </pre>
      </div>

      {/* Pie de descripción técnica */}
      <div className="px-4 py-3 bg-secondary/50 dark:bg-muted/60 border-t border-border">
        <p className="text-[10px] font-mono text-muted-foreground italic">
          // Este contrato vincula el uso del Pasaporte de Proveedor V3 exclusivamente para "Alta de Proveedor" por 30 días máximo.
        </p>
      </div>
    </div>
  );
};

const SectionIDSA = () => {
  return (
    <motion.section 
      id="idsa-detail" 
      className="py-12 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-12">
        
        {/* Header de Sección */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Globe className="w-8 h-8 text-green-600 dark:text-green-500" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-green-600 dark:text-green-500 font-bold mb-1">Detalle Técnico Avanzado</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              III. Interoperabilidad y Soberanía (Modelo IDSA)
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Lado Izquierdo: Texto y Especificaciones */}
          <div className="flex-1 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              ProcureData no es una isla tecnológica. Nuestra arquitectura implementa el modelo de referencia de la
              <span className="text-foreground font-semibold"> IDSA</span>, el estándar europeo para el intercambio de datos 
              confiable y soberano. Esto garantiza que su infraestructura sea compatible por diseño con iniciativas 
              como <span className="text-blue-600 dark:text-blue-400">Gaia-X</span> y otros espacios de datos sectoriales en toda la Unión Europea.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
                <h4 className="text-green-600 dark:text-green-400 font-bold mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Soberanía Técnica
                </h4>
                <p className="text-sm text-muted-foreground">Control total sobre quién, cuándo y para qué se utilizan sus datos industriales.</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-xl shadow-sm">
                <h4 className="text-green-600 dark:text-green-400 font-bold mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Arquitectura RAM
                </h4>
                <p className="text-sm text-muted-foreground">Basado en el IDS Reference Architecture Model (IDS-RAM) para una federación segura.</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
              <h4 className="text-primary font-bold mb-2">Impacto de Negocio Enterprise</h4>
              <p className="text-foreground/80 italic">
                "Evite el cautiverio tecnológico (Vendor Lock-in). Al usar estándares IDSA, su empresa puede conectarse 
                instantáneamente con cualquier otro Data Space europeo, facilitando auditorías de cumplimiento y 
                expansión internacional sin costes adicionales de integración."
              </p>
            </div>
          </div>

          {/* Lado Derecho: Interfaz Gráfica Simulada (Diagrama de Roles) */}
          <div className="flex-1">
            <div className="relative p-8 bg-card border border-border rounded-3xl overflow-hidden shadow-lg dark:shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10">
                <Globe className="w-48 h-48 text-foreground" />
              </div>
              
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-8 text-center">
                Visualización de Roles e Intercambio Soberano
              </h3>

              <div className="grid grid-cols-3 gap-4 items-center relative z-10">
                {/* Consumer */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-blue-600/20 border border-blue-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 text-center">CONSUMER</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground text-center">Solicita Datos (CPO)</span>
                </div>

                {/* El Canal (EDC) */}
                <div className="relative h-2 bg-muted rounded-full">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <Share2 className="w-5 h-5 text-primary animate-pulse" />
                    <span className="text-[9px] font-mono text-primary mt-1">IDS Protocol</span>
                  </div>
                  <div className="h-full bg-gradient-to-r from-blue-500 via-primary to-purple-500 rounded-full animate-pulse"></div>
                </div>

                {/* Provider / Subject */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-purple-600/20 border border-purple-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <div className="text-xs font-bold text-purple-600 dark:text-purple-400 text-center">SUBJECT</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground text-center">Dueño del Dato</span>
                </div>
              </div>

              {/* Ficha Técnica Inferior de la Interfaz */}
              <div className="mt-12 p-4 bg-muted dark:bg-background/40 rounded-xl border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-green-600 dark:text-green-500">CONECTOR_EDC_V3.1</span>
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 text-[8px] rounded uppercase font-bold tracking-tighter">Soberanía Activa</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[95%]"></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-muted-foreground font-mono italic">
                    <span>Validating Trust...</span>
                    <span>95% Reliability Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspector de Contrato JSON-LD */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            Inspector de Contrato Soberano (JSON-LD)
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Ejemplo de Contrato de Acuerdo (Contract Agreement) generado automáticamente tras la negociación entre conectores EDC.
          </p>
          <IDSAContractCode />
        </div>

      </div>
    </motion.section>
  );
};

export default SectionIDSA;
