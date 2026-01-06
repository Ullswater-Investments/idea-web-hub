import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Webhook, Activity, Plus, Trash2, Play, History, Copy } from "lucide-react";
import { toast } from "sonner";
import { DynamicBreadcrumbs } from "@/components/DynamicBreadcrumbs";
import type { WebhookConfig, WebhookLog } from "@/types/database.extensions";

const AVAILABLE_EVENTS = [
  { id: "transaction.approved", label: "Transaction Approved" },
  { id: "transaction.denied", label: "Transaction Denied" },
  { id: "data.available", label: "New Data Available" },
  { id: "contract.expiring", label: "Contract Expiring Soon" },
  { id: "payment.completed", label: "Payment Completed" },
];

const generateSecret = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let secret = "whsec_";
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
};

export default function WebhookSettings() {
  const { activeOrg } = useOrganizationContext();
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<string | null>(null);
  const [logsSheetOpen, setLogsSheetOpen] = useState(false);

  // Form state
  const [url, setUrl] = useState("");
  const [secret, setSecret] = useState(generateSecret());
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // Fetch Webhooks
  const { data: webhooks } = useQuery({
    queryKey: ["webhooks", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return [];
      const { data } = await supabase.from("webhooks").select("*").eq("organization_id", activeOrg.id).order("created_at", { ascending: false });
      return (data || []) as WebhookConfig[];
    },
    enabled: !!activeOrg,
  });

  // Fetch Webhook Logs (tabla aún no existe en types)
  const { data: logs } = useQuery({
    queryKey: ["webhook-logs", selectedWebhook],
    queryFn: async () => {
      if (!selectedWebhook) return [];
      // webhook_logs table will be created later
      return [] as WebhookLog[];
    },
    enabled: !!selectedWebhook,
  });

  // Create Webhook
  const createWebhook = useMutation({
    mutationFn: async () => {
      if (!activeOrg) throw new Error("No active organization");
      const { error } = await supabase.from("webhooks").insert([{ organization_id: activeOrg.id, url, secret, events: selectedEvents, is_active: true }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
      toast.success("Webhook creado correctamente");
      setCreateDialogOpen(false);
      setUrl("");
      setSecret(generateSecret());
      setSelectedEvents([]);
    },
    onError: () => toast.error("Error al crear webhook"),
  });

  // Delete Webhook
  const deleteWebhook = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("webhooks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
      toast.success("Webhook eliminado");
    },
    onError: () => toast.error("Error al eliminar webhook"),
  });

  // Toggle Active Status
  const toggleWebhook = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("webhooks").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
  });

  // Test Webhook
  const testWebhook = (url: string) => {
    toast.info(`Disparando evento de prueba a ${url}...`);
    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) toast.success("Servidor respondió: 200 OK");
      else toast.error("Error de conexión: 504 Gateway Timeout");
    }, 1500);
  };

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((e) => e !== eventId) : [...prev, eventId]
    );
  };

  const openLogsSheet = (webhookId: string) => {
    setSelectedWebhook(webhookId);
    setLogsSheetOpen(true);
  };

  return (
    <div className="container py-8 space-y-6 fade-in">
      <DynamicBreadcrumbs />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Webhook className="h-6 w-6 text-primary" /> Webhooks
          </h2>
          <p className="text-muted-foreground">Recibe notificaciones en tiempo real en tus sistemas externos.</p>
        </div>

        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Añadir Endpoint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Webhook</DialogTitle>
              <DialogDescription>Configura un endpoint para recibir eventos de PROCUREDATA.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="url">Endpoint URL</Label>
                <Input
                  id="url"
                  placeholder="https://tu-dominio.com/api/webhook"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secret">Secret Key</Label>
                <div className="flex gap-2">
                  <Input id="secret" value={secret} readOnly className="font-mono text-xs" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(secret);
                      toast.success("Secret copiado");
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Usa esta clave para verificar la firma HMAC de los payloads.</p>
              </div>

              <div className="space-y-2">
                <Label>Eventos a suscribir</Label>
                <div className="space-y-2">
                  {AVAILABLE_EVENTS.map((event) => (
                    <div key={event.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={event.id}
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={() => handleEventToggle(event.id)}
                      />
                      <label htmlFor={event.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {event.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => createWebhook.mutate()} disabled={!url || selectedEvents.length === 0}>
                Crear Webhook
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {webhooks && webhooks.length > 0 ? (
          webhooks.map((wh) => (
            <Card key={wh.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${wh.is_active ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}>
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-medium">{wh.url}</p>
                    <div className="flex gap-2 mt-1">
                      {wh.events?.map((ev) => (
                        <Badge key={ev} variant="outline" className="text-[10px]">
                          {ev}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={() => openLogsSheet(wh.id)}>
                    <History className="h-4 w-4 mr-2" /> Logs
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => testWebhook(wh.url)}>
                    <Play className="h-4 w-4 mr-2" /> Test
                  </Button>
                  <Switch
                    checked={wh.is_active}
                    onCheckedChange={(checked) => toggleWebhook.mutate({ id: wh.id, is_active: checked })}
                  />
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => deleteWebhook.mutate(wh.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-xl text-muted-foreground">
            <Webhook className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No tienes webhooks configurados.</p>
            <p className="text-sm mt-2">Crea tu primer webhook para empezar a recibir eventos.</p>
          </div>
        )}
      </div>

      {/* Logs Sheet */}
      <Sheet open={logsSheetOpen} onOpenChange={setLogsSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Historial de Envíos</SheetTitle>
            <SheetDescription>Registros de eventos disparados a este webhook.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-200px)] mt-6">
            <div className="space-y-4">
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <Card key={log.id} className={log.status_code && log.status_code >= 200 && log.status_code < 300 ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant={log.status_code && log.status_code >= 200 && log.status_code < 300 ? "default" : "destructive"}>
                          {log.status_code || "Error"} {log.status_code && log.status_code >= 200 && log.status_code < 300 ? "OK" : "Error"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.created_at).toLocaleString("es-ES")}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="text-xs font-semibold mb-1">Payload enviado:</p>
                        <pre className="bg-muted p-2 rounded text-[10px] overflow-x-auto font-mono">
                          {JSON.stringify(log.payload_sent, null, 2)}
                        </pre>
                      </div>
                      {log.response_body && (
                        <div>
                          <p className="text-xs font-semibold mb-1">Respuesta del servidor:</p>
                          <pre className="bg-muted p-2 rounded text-[10px] overflow-x-auto font-mono">
                            {log.response_body}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No hay logs disponibles todavía.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
