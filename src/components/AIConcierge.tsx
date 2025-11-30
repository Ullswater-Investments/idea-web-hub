import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hola 👋 Soy tu asistente de datos. ¿Buscas algún dataset específico o necesitas ayuda con una transacción?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("logística") || lowerMessage.includes("transporte") || lowerMessage.includes("rutas")) {
      return "Para optimización logística, te sugiero combinar el dataset 'Tráfico DGT Tiempo Real' con 'Ubicación Almacenes Zona Centro'. Tienen una coincidencia del 95% con tu búsqueda. 📊";
    }

    if (lowerMessage.includes("precio") || lowerMessage.includes("coste") || lowerMessage.includes("barato")) {
      return "Tenemos opciones flexibles. Puedes filtrar por 'Open Data' para ver 15 datasets gratuitos, o buscar suscripciones mensuales desde 50€. 💰";
    }

    if (lowerMessage.includes("contrato") || lowerMessage.includes("legal")) {
      return "Todas las transacciones en PROCUREDATA usan el estándar ODRL 2.0. El contrato inteligente se genera automáticamente al iniciar la solicitud. 📜";
    }

    if (lowerMessage.includes("esg") || lowerMessage.includes("sostenibilidad") || lowerMessage.includes("carbono")) {
      return "Nuestro hub de sostenibilidad rastrea emisiones Scope 3 de proveedores certificados. Consulta la sección 'Sostenibilidad' para ver reportes ESG auditados. 🌱";
    }

    if (lowerMessage.includes("iot") || lowerMessage.includes("sensor") || lowerMessage.includes("telemetría")) {
      return "Disponemos de datasets IoT en tiempo real para mantenimiento predictivo. Visita 'Oportunidades' para ver demandas activas de telemetría industrial. 🔧";
    }

    return "Entendido. Estoy analizando el catálogo para encontrar la mejor coincidencia... Por favor, prueba a buscar por sector (ej: Energía, Retail) para ser más preciso. 🔍";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simular delay de respuesta
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: getAIResponse(userMessage.content),
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botón Flotante */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 animate-pulse hover:animate-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Ventana de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-t-4 border-t-primary">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600">
                      <AvatarFallback className="bg-transparent text-white">
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">AI Data Assistant</CardTitle>
                      <CardDescription className="text-xs">Powered by PROCUREDATA</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Mensajes */}
                <ScrollArea ref={scrollAreaRef} className="h-[400px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 shrink-0">
                            <AvatarFallback className="bg-transparent text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg px-3 py-2 max-w-[80%] ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <span className="text-[10px] opacity-60 mt-1 block">
                            {message.timestamp.toLocaleTimeString("es-ES", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="h-8 w-8 bg-primary shrink-0">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                              TÚ
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}

                    {/* Indicador de "Escribiendo..." */}
                    {isTyping && (
                      <div className="flex gap-2 justify-start">
                        <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 shrink-0">
                          <AvatarFallback className="bg-transparent text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input de Mensaje */}
                <div className="border-t p-4 bg-background">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Escribe tu pregunta..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isTyping}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={isTyping || !inputValue.trim()} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
