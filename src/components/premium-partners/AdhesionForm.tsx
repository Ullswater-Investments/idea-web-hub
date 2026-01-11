import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Building2, Mail, MessageSquare, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { toast } from 'sonner';

export const AdhesionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    email: '',
    motivation: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.organization || !formData.email) {
      toast.error('Por favor, complete todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Solicitud enviada correctamente');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Acceso Exclusivo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Únase al <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Programa Premium</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Complete el formulario y nuestro equipo se pondrá en contacto en menos de 24h
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
            <CardContent className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Organization */}
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-slate-300 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      Nombre de la Organización *
                    </Label>
                    <Input
                      id="organization"
                      placeholder="Ej: Asociación Nacional de..."
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-400" />
                      Email Corporativo *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contacto@suorganizacion.eu"
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  {/* Motivation */}
                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-slate-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      ¿Por qué quiere unirse al programa?
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder="Cuéntenos brevemente sobre su organización y sus objetivos..."
                      rows={4}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 h-12 text-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Solicitar Acceso Premium
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  {/* Privacy note */}
                  <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Sus datos están protegidos bajo GDPR. No compartimos información con terceros.
                  </p>
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">¡Solicitud Recibida!</h3>
                  <p className="text-slate-400 mb-6">
                    Gracias por su interés en el Programa Premium Partners. <br />
                    Nuestro equipo revisará su solicitud y le contactará en menos de 24 horas.
                  </p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    Ref: PP-{Date.now().toString(36).toUpperCase()}
                  </Badge>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            '70+ Partners Activos',
            '7 Países UE',
            '30.000€ Subvención',
            '24h Respuesta',
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
