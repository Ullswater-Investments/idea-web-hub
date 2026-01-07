import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, ChevronDown, ChevronUp, Trophy, Building2, ServerCrash, Users2, Scale, ShieldAlert } from "lucide-react";
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
    title: "Gestión de Casos Complejos y Propiedad",
    icon: <Building2 className="h-6 w-6" />,
    content: [
      "Fusiones y Adquisiciones (M&A): Transferencia de activos y DID mediante 'Escritura Digital' blockchain.",
      "Insolvencia: Sistema marca perfil con alerta de riesgo; Data Holder suspende entrega hasta autorización.",
      "Conflictos de Veracidad: Se activa 'Disputa de Veracidad' con intervención de Trusted Data Holder neutral."
    ],
    quiz: {
      question: "¿Qué documento transfiere activos digitales en una fusión empresarial?",
      options: ["Contrato ODRL", "Escritura Digital blockchain", "Certificado ISO", "Token EUROe"],
      correctIndex: 1
    }
  },
  {
    id: 2,
    title: "Resiliencia ante Fallos Sistémicos",
    icon: <ServerCrash className="h-6 w-6" />,
    content: [
      "Caída de IA: ARIA cuenta con modelo de respaldo para mantener funciones críticas.",
      "Desaparición de Data Holder: Restauración desde 'Almacén de Resiliencia' cifrado a nuevo nodo.",
      "Modo Offline: Conectores EDC operan con validaciones locales NFC/Bluetooth hasta sincronización.",
      "Derecho al Olvido: Al borrar dato del Data Holder, el hash blockchain apunta a recurso inexistente."
    ],
    quiz: {
      question: "¿Cómo se cumple el GDPR 'derecho al olvido' con blockchain?",
      options: ["Borrando el hash", "Modificando la blockchain", "El hash apunta a recurso inexistente", "Creando nuevo hash"],
      correctIndex: 2
    }
  },
  {
    id: 3,
    title: "Gobernanza de la Comunidad y Ética",
    icon: <Users2 className="h-6 w-6" />,
    content: [
      "Portal de Gobernanza: Usuarios Pro tienen derecho a voto en desarrollo de nuevas funcionalidades.",
      "Comité de Ética del Dato: Media en disputas sobre precios abusivos o uso indebido de IA.",
      "Autonomía de Nodos: Cualquier organización puede hospedar su propio nodo para control total."
    ],
    quiz: {
      question: "¿Quién media en disputas sobre uso indebido de algoritmos de IA?",
      options: ["Portal de Gobernanza", "Comité de Ética del Dato", "Data Holder", "ARIA"],
      correctIndex: 1
    }
  },
  {
    id: 4,
    title: "Escenarios Legales y Regulatorios Límites",
    icon: <Scale className="h-6 w-6" />,
    content: [
      "AI Act: ProcureData asume responsabilidad técnica de ARIA con seguros de responsabilidad civil digital.",
      "Cambios GDPR: Motor ODRL dinámico actualiza reglas centralizadamente para cumplimiento instantáneo.",
      "Jurisdicción Internacional: Por defecto aplica UE y arbitraje digital del ecosistema."
    ],
    quiz: {
      question: "¿Qué jurisdicción aplica por defecto en disputas internacionales?",
      options: ["Del país del vendedor", "Del país del comprador", "Unión Europea", "Estados Unidos"],
      correctIndex: 2
    }
  },
  {
    id: 5,
    title: "El Escudo de Resiliencia",
    icon: <ShieldAlert className="h-6 w-6" />,
    content: [
      "Inmutabilidad blockchain + flexibilidad de nubes soberanas = mercado siempre abierto.",
      "Garantía: Independientemente del entorno físico o geopolítico, el mercado permanece veraz y seguro.",
      "Filosofía: Pase lo que pase, el espacio de datos de compras sigue operativo."
    ],
    quiz: {
      question: "¿Qué combina el 'Escudo de Resiliencia' para garantizar continuidad?",
      options: ["IA y Machine Learning", "Blockchain inmutable y nubes soberanas", "ERPs y APIs", "Wallets y tokens"],
      correctIndex: 1
    }
  }
];

export default function DocumentoExplicativo10() {
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
          <Badge variant="secondary" className="ml-auto">Documento 10 de 15</Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📄 Documento Explicativo 10</h1>
          <p className="text-xl text-muted-foreground mb-4">Resiliencia, Gobernanza y Escenarios Extremos</p>
          <p className="text-sm text-muted-foreground mb-6">Gestión de situaciones críticas, fallos sistémicos y conflictos legales complejos.</p>
          
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
                <h3 className="text-xl font-bold mb-2">¡Documento 10 Completado!</h3>
                <p className="text-muted-foreground mb-4">Dominas la resiliencia y gobernanza del ecosistema.</p>
                <div className="flex gap-4 justify-center">
                  <Link to="/user-guide"><Button variant="outline">Volver a la Guía</Button></Link>
                  <Link to="/documento-explicativo-11"><Button>Siguiente Documento →</Button></Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
