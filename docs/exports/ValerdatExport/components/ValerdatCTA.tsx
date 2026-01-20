import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Mail, FileText, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ValerdatCTA = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          {/* Header */}
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            Próximos Pasos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Interesado en un proyecto similar?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            PROCUREDATA puede ser tu habilitador técnico para proyectos de adquisición 
            de datos industriales con cumplimiento GDPR, gobernanza ODRL y trazabilidad blockchain.
          </p>

          {/* Action Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Solicitar Demo</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Agenda una demostración personalizada de las capacidades PROCUREDATA
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  asChild
                >
                  <Link to="/partners">
                    Agendar Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Explorar Catálogo</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Descubre los datasets disponibles en el marketplace federado
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  asChild
                >
                  <Link to="/catalog">
                    Ver Catálogo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Contactar</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Habla con nuestro equipo sobre tu proyecto de datos
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => window.open('mailto:info@agileprocurement.io', '_blank')}
                >
                  Contactar
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Related Documents */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="font-semibold text-white mb-4">Documentación Relacionada</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link to="/docs/tecnico">
                  <FileText className="h-4 w-4 mr-2" />
                  Memoria Técnica
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link to="/architecture">
                  <FileText className="h-4 w-4 mr-2" />
                  Arquitectura
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link to="/whitepaper">
                  <FileText className="h-4 w-4 mr-2" />
                  White Paper
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link to="/services">
                  <FileText className="h-4 w-4 mr-2" />
                  Catálogo de Servicios
                </Link>
              </Button>
            </div>
          </div>

          {/* Footer Credit */}
          <div className="mt-10 pt-6 border-t border-white/20">
            <p className="text-sm text-blue-200">
              Documento elaborado por <strong>PROCUREDATA</strong> para <strong>VALERDAT S.L.</strong>
            </p>
            <p className="text-xs text-blue-300 mt-2">
              Proyecto financiado por NextGenerationEU - Kit Espacios de Datos
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValerdatCTA;
