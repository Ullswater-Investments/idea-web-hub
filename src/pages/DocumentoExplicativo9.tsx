import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, ChevronDown, ChevronUp, Trophy, Code, Webhook, Package, ShieldCheck, Terminal } from "lucide-react";
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
    title: "Arquitectura de la API REST",
    icon: <Code className="h-6 w-6" />,
    content: [
      "Estándar REST con formato JSON-LD para interoperabilidad semántica (Linked Data).",
      "Producción: https://api.procuredata.eu/v1 | Sandbox: https://sandbox.api.procuredata.eu/v1",
      "Autenticación: API Keys de organización + tokens JWT en header Authorization: Bearer <token>.",
      "Rate Limiting: 1000 peticiones/minuto para Pro, error HTTP 429 si se excede."
    ],
    quiz: {
      question: "¿Qué error HTTP recibes al exceder el límite de peticiones?",
      options: ["401 Unauthorized", "404 Not Found", "429 Too Many Requests", "500 Server Error"],
      correctIndex: 2
    }
  },
  {
    id: 2,
    title: "Webhooks: Arquitectura Orientada a Eventos",
    icon: <Webhook className="h-6 w-6" />,
    content: [
      "Notificaciones en tiempo real sin polling constante a tus servidores.",
      "transaction.completed: Intercambio de datos finalizado con éxito.",
      "provider.approved: Un proveedor autorizó tu solicitud de acceso.",
      "kyb.status_changed: Validación legal aprobada o rechazada.",
      "wallet.low_balance: Saldo EUROe insuficiente para operar.",
      "Seguridad: Firma X-ProcureData-Signature con HMAC-SHA256 para verificar legitimidad."
    ],
    quiz: {
      question: "¿Qué evento se dispara cuando un proveedor aprueba tu solicitud?",
      options: ["transaction.completed", "provider.approved", "kyb.status_changed", "wallet.low_balance"],
      correctIndex: 1
    }
  },
  {
    id: 3,
    title: "SDKs y Librerías Oficiales",
    icon: <Package className="h-6 w-6" />,
    content: [
      "Kits de desarrollo que encapsulan llamadas API y gestión de firmas digitales.",
      "Lenguajes: JavaScript/TypeScript (Node.js/React), Python (analítica), Java (corporativo).",
      "Instalación: npm install @procuredata/sdk-js",
      "Componentes UI React: Botón 'Pagar con EUROe', visor 'Pasaporte Digital de Proveedor'."
    ],
    quiz: {
      question: "¿Qué lenguaje es ideal para entornos corporativos según los SDKs?",
      options: ["Python", "JavaScript", "Java", "TypeScript"],
      correctIndex: 2
    }
  },
  {
    id: 4,
    title: "Seguridad Avanzada y DevSecOps",
    icon: <ShieldCheck className="h-6 w-6" />,
    content: [
      "Zero Trust: Cada petición validada individualmente con tokens temporales.",
      "Row Level Security (RLS): Imposible leer datos de otra organización por diseño.",
      "Cifrado TLS 1.3 en tránsito y AES-256 en reposo.",
      "Secretos en HSM o bóvedas cifradas, nunca en texto plano."
    ],
    quiz: {
      question: "¿Qué garantiza que una empresa no pueda leer datos de otra?",
      options: ["Zero Trust", "Row Level Security (RLS)", "TLS 1.3", "HSM"],
      correctIndex: 1
    }
  },
  {
    id: 5,
    title: "Endpoints Críticos",
    icon: <Terminal className="h-6 w-6" />,
    content: [
      "GET /organizations/search: Buscar proveedores por sector o certificación.",
      "POST /transactions/initiate: Iniciar flujo de compra de activo de datos.",
      "GET /wallets/balance: Consultar saldo disponible en EUROe.",
      "GET /transactions/{id}/payload: Recuperar contenido final tras transacción completada."
    ],
    quiz: {
      question: "¿Qué endpoint usas para iniciar una compra de datos?",
      options: ["GET /organizations/search", "POST /transactions/initiate", "GET /wallets/balance", "GET /transactions/{id}/payload"],
      correctIndex: 1
    }
  }
];

export default function DocumentoExplicativo9() {
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
          <Badge variant="secondary" className="ml-auto">Documento 9 de 15</Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📄 Documento Explicativo 9</h1>
          <p className="text-xl text-muted-foreground mb-4">Integración Técnica y Seguridad para Desarrolladores</p>
          <p className="text-sm text-muted-foreground mb-6">Referencia técnica para equipos de IT: APIs, Webhooks, SDKs y seguridad.</p>
          
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
                <h3 className="text-xl font-bold mb-2">¡Documento 9 Completado!</h3>
                <p className="text-muted-foreground mb-4">Dominas la integración técnica y seguridad avanzada.</p>
                <div className="flex gap-4 justify-center">
                  <Link to="/user-guide"><Button variant="outline">Volver a la Guía</Button></Link>
                  <Link to="/documento-explicativo-10"><Button>Siguiente Documento →</Button></Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
