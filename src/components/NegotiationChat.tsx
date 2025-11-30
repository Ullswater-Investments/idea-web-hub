import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Message {
  id: string;
  transaction_id: string;
  sender_org_id: string;
  content: string;
  created_at: string;
  sender?: {
    name: string;
  };
}

export function NegotiationChat({ transactionId }: { transactionId: string }) {
  const { activeOrg } = useOrganizationContext();
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Fetch mensajes
  const { data: messages, isLoading } = useQuery({
    queryKey: ["chat", transactionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transaction_messages")
        .select(`
          *,
          sender:organizations!transaction_messages_sender_org_id_fkey(name)
        `)
        .eq("transaction_id", transactionId)
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      return data as Message[];
    },
    refetchInterval: 5000, // Polling cada 5 segundos
  });

  // Enviar mensaje
  const sendMessage = async () => {
    if (!newMessage.trim() || !activeOrg) return;
    
    const { error } = await supabase.from("transaction_messages").insert({
      transaction_id: transactionId,
      sender_org_id: activeOrg.id,
      content: newMessage.trim(),
    });

    if (error) {
      toast.error("Error al enviar mensaje");
      return;
    }
    
    setNewMessage("");
    queryClient.invalidateQueries({ queryKey: ["chat", transactionId] });
  };

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Card className="h-[600px] flex flex-col shadow-md border-l-4 border-l-primary/20">
      <CardHeader className="py-3 border-b bg-muted/20">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" /> 
          Sala de Negociación
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {isLoading && (
              <p className="text-center text-xs text-muted-foreground italic mt-10">
                Cargando conversación...
              </p>
            )}
            {!isLoading && messages?.length === 0 && (
              <p className="text-center text-xs text-muted-foreground italic mt-10">
                Inicia la conversación para negociar los términos...
              </p>
            )}
            {messages?.map((msg) => {
              const isMe = msg.sender_org_id === activeOrg?.id;
              return (
                <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback className={isMe ? "bg-primary text-primary-foreground" : "bg-muted"}>
                      {isMe ? "YO" : msg.sender?.name?.substring(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    isMe ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}>
                    <p>{msg.content}</p>
                    <span className="text-[10px] opacity-70 block text-right mt-1">
                      {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <div className="p-3 border-t bg-background flex gap-2">
          <Input 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Escribe un mensaje..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button size="icon" onClick={sendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
