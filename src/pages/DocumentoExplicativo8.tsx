import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, ChevronDown, ChevronUp, Trophy, BarChart3, Brain, Sparkles, Settings, Bot } from "lucide-react";
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
    title: "Business Intelligence (BI) y Dashboards Estratégicos",
    icon: <BarChart3 className="h-6 w-6" />,
    content: [
      "Dashboards en Tiempo Real: Gráficos actualizados instantáneamente con cada transacción blockchain.",
      "Spend Analysis (Cubo de Gasto): Clasificación multidimensional por proveedor, categoría, sector y tiempo.",
      "Health Score: Indicador algorítmico de calidad, veracidad y frecuencia de actualización de datos.",
      "Lead Time Verificado: Tiempos de entrega reales registrados inmutablemente.",
      "Benchmarking Anónimo: Compara rendimiento con la media sectorial sin revelar datos confidenciales."
    ],
    quiz: {
      question: "¿Qué métrica mide la calidad y actualización de los datos de proveedores?",
      options: ["Spend Analysis", "Health Score", "Lead Time", "Benchmarking"],
      correctIndex: 1
    }
  },
  {
    id: 2,
    title: "Analítica Predictiva y Prescriptiva",
    icon: <Brain className="h-6 w-6" />,
    content: [
      "Forecasting de Demanda AI: Machine Learning para predecir stock basándose en históricos y señales.",
      "Monitor de Riesgo Proveedor: Vigilancia 24/7 de salud financiera con alertas tempranas.",
      "Simulador de Escenarios: Ajusta variables como 'Crecimiento' o 'Disrupción' para visualizar impactos."
    ],
    quiz: {
      question: "¿Qué herramienta permite simular el impacto de una crisis logística?",
      options: ["Forecasting AI", "Monitor de Riesgo", "Simulador de Escenarios", "Health Score"],
      correctIndex: 2
    }
  },
  {
    id: 3,
    title: "El Valor de los Datos Sintéticos",
    icon: <Sparkles className="h-6 w-6" />,
    content: [
      "Datos creados artificialmente que mantienen propiedades estadísticas sin información real.",
      "Privacidad Total: Sin relación 1:1 con la realidad, quedan fuera del ámbito GDPR.",
      "Entrenamiento de IA: Startups pueden entrenar modelos sin acceder a secretos industriales.",
      "Pruebas de Software: IT puede testear integraciones con volúmenes masivos sin riesgo."
    ],
    quiz: {
      question: "¿Por qué los datos sintéticos quedan fuera del GDPR?",
      options: ["Son gratuitos", "No tienen relación 1:1 con datos reales", "Están cifrados", "Son temporales"],
      correctIndex: 1
    }
  },
  {
    id: 4,
    title: "Gestión de la Calidad (Data Ops)",
    icon: <Settings className="h-6 w-6" />,
    content: [
      "Data Cleansing: Detección automática de errores, duplicados y formatos inconsistentes.",
      "Normalización: Conversión automática de unidades al estándar semántico JSON-LD.",
      "Linaje de Datos: Seguimiento completo de la procedencia de cada insight verificado."
    ],
    quiz: {
      question: "¿Qué proceso convierte automáticamente las unidades al estándar de la plataforma?",
      options: ["Data Cleansing", "Normalización", "Linaje de Datos", "Benchmarking"],
      correctIndex: 1
    }
  },
  {
    id: 5,
    title: "ARIA: Tu Analista de Datos Virtual",
    icon: <Bot className="h-6 w-6" />,
    content: [
      "Interfaz de lenguaje natural para acceder a la complejidad técnica.",
      "Consultas directas como '¿Quién es mi proveedor con mayor riesgo de retraso?'.",
      "Generación de informes: 'Genera un informe sobre mi ahorro de emisiones Scope 3'.",
      "Extrae insights de los módulos de BI y analítica de forma instantánea."
    ],
    quiz: {
      question: "¿Qué puedes pedirle directamente a ARIA?",
      options: ["Solo consultas técnicas", "Informes y análisis en lenguaje natural", "Solo datos históricos", "Solo precios"],
      correctIndex: 1
    }
  }
];

export default function DocumentoExplicativo8() {
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
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl">🎉</motion.div>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ x: 0, y: 0, opacity: 1, rotate: Math.random() * 360 }}
              animate={{ x: (Math.random() - 0.5) * 800, y: (Math.random() - 0.5) * 800, opacity: 0, rotate: Math.random() * 720 }}
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
          <Badge variant="secondary" className="ml-auto">Documento 8 de 15</Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📄 Documento Explicativo 8</h1>
          <p className="text-xl text-muted-foreground mb-4">Analítica Avanzada, BI y Datos Sintéticos</p>
          <p className="text-sm text-muted-foreground mb-6">Transformando datos brutos en inteligencia estratégica.</p>
          
          <div className="flex items-center gap-4 mb-2">
            <Progress value={progress} className="flex-1" />
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <p className="text-xs text-muted-foreground">{completedSections.length} de {sections.length} secciones completadas</p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const isCompleted = completedSections.includes(section.id);
            const userAnswer = quizAnswers[section.id];

            return (
              <Card key={section.id} className={`transition-all ${isCompleted ? 'border-green-500/50 bg-green-500/5' : ''}`}>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection(section.id)}>
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
                            <motion.div key={idx} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }} className="flex items-start gap-2">
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
                                  className={`justify-start h-auto py-3 px-4 ${showResult && isCorrect ? 'border-green-500 bg-green-500/10' : ''}`}
                                  onClick={() => handleQuizAnswer(section.id, idx)}
                                  disabled={showResult && isCorrect && isSelected}
                                >
                                  <span className="mr-2">{String.fromCharCode(65 + idx)}.</span>
                                  {option}
                                  {showResult && isSelected && (isCorrect ? <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" /> : <XCircle className="ml-auto h-4 w-4" />)}
                                </Button>
                              );
                            })}
                          </div>
                          {userAnswer !== null && userAnswer !== undefined && userAnswer !== section.quiz.correctIndex && (
                            <p className="text-sm text-muted-foreground mt-3">💡 Pista: Revisa la sección sobre {section.title.toLowerCase()}.</p>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50">
              <CardContent className="py-6 text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">¡Documento 8 Completado!</h3>
                <p className="text-muted-foreground mb-4">Dominas la analítica avanzada y los datos sintéticos.</p>
                <div className="flex gap-4 justify-center">
                  <Link to="/user-guide"><Button variant="outline">Volver a la Guía</Button></Link>
                  <Link to="/documento-explicativo-9"><Button>Siguiente Documento →</Button></Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
