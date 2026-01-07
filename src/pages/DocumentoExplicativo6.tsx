import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, ChevronDown, ChevronUp, Trophy, Monitor, Users, Search, AlertTriangle, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: number;
  title: string;
  icon: React.ReactNode;
  content: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

const sections: Section[] = [
  {
    id: 1,
    title: "Navegación y Elementos de la Interfaz",
    icon: <Monitor className="h-6 w-6" />,
    content: [
      "Dashboard Principal: Centro de mando con balance de Wallet, Health Score y transacciones recientes.",
      "Barra Lateral (Sidebar): Acceso rápido a Marketplace, Catálogo de Servicios, Innovation Lab y Configuración.",
      "Centro de Notificaciones: Icono de campana para aprobaciones pendientes, mensajes y alertas.",
      "Selector de Organización: Alterna entre empresas sin cerrar sesión.",
      "Modo Visual: Soporta modo claro y oscuro configurable desde ajustes."
    ],
    quiz: {
      question: "¿Dónde puedes ver tu Health Score y balance de Wallet?",
      options: ["En la Barra Lateral", "En el Dashboard Principal", "En el Centro de Notificaciones", "En el Selector de Organización"],
      correctIndex: 1
    }
  },
  {
    id: 2,
    title: "Gestión de Equipos y Roles",
    icon: <Users className="h-6 w-6" />,
    content: [
      "El sistema utiliza Control de Acceso Basado en Roles (RBAC) para seguridad operativa.",
      "Administrador (Admin): Control total - invitar/eliminar usuarios, configurar ERP, gestionar Wallet.",
      "Aprobador (Approver): Autorizar o denegar solicitudes de intercambio de datos.",
      "Lector (Viewer): Solo consulta - marketplace e historial, sin pagos ni aprobaciones."
    ],
    quiz: {
      question: "¿Qué rol puede configurar integraciones ERP?",
      options: ["Viewer", "Approver", "Admin", "Todos los roles"],
      correctIndex: 2
    }
  },
  {
    id: 3,
    title: "Uso Eficiente del Marketplace",
    icon: <Search className="h-6 w-6" />,
    content: [
      "Filtro de Certificación: Segmenta por normativas ISO (9001, 14001) o certificaciones sectoriales.",
      "Badge Green Partner: Identifica proveedores con auditoría de sostenibilidad aprobada.",
      "Reputation Score: Ordena por valoración (1-5 estrellas) e historial de cumplimiento blockchain."
    ],
    quiz: {
      question: "¿Qué filtro identifica proveedores con sostenibilidad verificada?",
      options: ["Filtro de Certificación", "Badge Green Partner", "Reputation Score", "Filtro ISO"],
      correctIndex: 1
    }
  },
  {
    id: 4,
    title: "Resolución de Errores Comunes",
    icon: <AlertTriangle className="h-6 w-6" />,
    content: [
      "Fondos Insuficientes: Saldo EUROe menor al coste. Solución: recargar Wallet.",
      "Entidad No Verificada: Acceso bloqueado. Solución: subir CIF y documentación en Ajustes.",
      "Transacción en Espera: Falta aprobación del Provider o liberación del Data Holder.",
      "Error de API: Regenerar llave en panel de desarrollador y verificar endpoint.",
      "Límite de Peticiones: Esperar 60 segundos antes de reintentar."
    ],
    quiz: {
      question: "Si tu ERP no conecta por 'Invalid API Key', ¿qué debes hacer?",
      options: ["Esperar 60 segundos", "Recargar la Wallet", "Regenerar la llave API", "Contactar soporte"],
      correctIndex: 2
    }
  },
  {
    id: 5,
    title: "Canales de Soporte y Ayuda",
    icon: <Headphones className="h-6 w-6" />,
    content: [
      "ARIA (Asistente Virtual): Disponible 24/7 para dudas sobre servicios, precios y navegación.",
      "Centro de Ayuda: Documentación técnica completa y guías paso a paso en /docs.",
      "Soporte Técnico Nivel 1: Email a soporte@procuredata.eu con respuesta < 4 horas para Pro.",
      "Reporte de Errores: Botón en footer para enviar capturas y logs al equipo de ingeniería."
    ],
    quiz: {
      question: "¿Qué canal de soporte está disponible las 24 horas del día?",
      options: ["Soporte Técnico Nivel 1", "Centro de Ayuda", "ARIA (Asistente Virtual)", "Reporte de Errores"],
      correctIndex: 2
    }
  }
];

export default function DocumentoExplicativo6() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleSection = (id: number) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleQuizAnswer = (sectionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [sectionId]: answerIndex }));
    const section = sections.find(s => s.id === sectionId);
    if (section && answerIndex === section.quiz.correctIndex) {
      if (!completedSections.includes(sectionId)) {
        const newCompleted = [...completedSections, sectionId];
        setCompletedSections(newCompleted);
        if (newCompleted.length === sections.length) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
      }
    }
  };

  const progress = (completedSections.length / sections.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl"
          >
            🎉
          </motion.div>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ 
                x: 0, y: 0, opacity: 1,
                rotate: Math.random() * 360
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 800,
                opacity: 0,
                rotate: Math.random() * 720
              }}
              transition={{ duration: 2 + Math.random() * 2 }}
            >
              {["🎊", "⭐", "🏆", "✨", "💎"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/user-guide">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver a la Guía
            </Button>
          </Link>
          <Badge variant="secondary" className="ml-auto">
            Documento 6 de 15
          </Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📄 Documento Explicativo 6</h1>
          <p className="text-xl text-muted-foreground mb-4">
            Guía de Usuario, Interfaz y Soporte
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Manual de consulta rápida para navegación, gestión de usuarios y resolución de incidencias.
          </p>
          
          <div className="flex items-center gap-4 mb-2">
            <Progress value={progress} className="flex-1" />
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {completedSections.length} de {sections.length} secciones completadas
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const isCompleted = completedSections.includes(section.id);
            const userAnswer = quizAnswers[section.id];

            return (
              <Card key={section.id} className={`transition-all ${isCompleted ? 'border-green-500/50 bg-green-500/5' : ''}`}>
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-primary/10 text-primary'}`}>
                        {section.icon}
                      </div>
                      <span className="text-lg">{section.id}. {section.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </CardTitle>
                </CardHeader>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <div className="space-y-3 mb-6">
                          {section.content.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span className="text-muted-foreground">{item}</span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="font-medium mb-3">🧠 Quiz: {section.quiz.question}</p>
                          <div className="grid gap-2">
                            {section.quiz.options.map((option, idx) => {
                              const isSelected = userAnswer === idx;
                              const isCorrect = idx === section.quiz.correctIndex;
                              const showResult = userAnswer !== null && userAnswer !== undefined;

                              return (
                                <Button
                                  key={idx}
                                  variant={isSelected ? (isCorrect ? "default" : "destructive") : "outline"}
                                  className={`justify-start h-auto py-3 px-4 ${
                                    showResult && isCorrect ? 'border-green-500 bg-green-500/10' : ''
                                  }`}
                                  onClick={() => handleQuizAnswer(section.id, idx)}
                                  disabled={showResult && isCorrect && isSelected}
                                >
                                  <span className="mr-2">{String.fromCharCode(65 + idx)}.</span>
                                  {option}
                                  {showResult && isSelected && (
                                    isCorrect ? 
                                      <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" /> : 
                                      <XCircle className="ml-auto h-4 w-4" />
                                  )}
                                </Button>
                              );
                            })}
                          </div>
                          {userAnswer !== null && userAnswer !== undefined && userAnswer !== section.quiz.correctIndex && (
                            <p className="text-sm text-muted-foreground mt-3">
                              💡 Pista: Revisa la sección sobre {section.title.toLowerCase()}.
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>

        {completedSections.length === sections.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50">
              <CardContent className="py-6 text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">¡Documento 6 Completado!</h3>
                <p className="text-muted-foreground mb-4">
                  Ahora dominas la interfaz de usuario y el soporte de ProcureData.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link to="/user-guide">
                    <Button variant="outline">Volver a la Guía</Button>
                  </Link>
                  <Link to="/documento-explicativo-7">
                    <Button>Siguiente Documento →</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
