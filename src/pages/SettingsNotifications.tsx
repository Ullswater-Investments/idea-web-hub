import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Bell, MessageSquare, FileKey, Coins, Blocks, Settings, Sparkles, Moon, Clock, Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { usePrivacyPreferences } from "@/hooks/usePrivacyPreferences";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsNotifications = () => {
  const navigate = useNavigate();
  const { preferences, loading, updatePreference } = usePrivacyPreferences();

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Preferencias de Notificaciones
          </h1>
          <p className="text-muted-foreground">
            Configura cómo y cuándo recibir alertas
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Canales de Entrega */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Canales de Entrega</CardTitle>
            <CardDescription>
              Elige cómo quieres recibir tus notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones por correo electrónico
                  </p>
                </div>
              </div>
              <Switch
                id="email"
                checked={preferences.email_notifications}
                onCheckedChange={(checked) => updatePreference("email_notifications", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <Label htmlFor="push" className="font-medium">Push (Navegador)</Label>
                  <p className="text-sm text-muted-foreground">
                    Alertas en tiempo real en tu navegador
                  </p>
                </div>
              </div>
              <Switch
                id="push"
                checked={preferences.push_notifications}
                onCheckedChange={(checked) => updatePreference("push_notifications", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <Label htmlFor="inapp" className="font-medium">In-App</Label>
                  <p className="text-sm text-muted-foreground">
                    Centro de notificaciones dentro de la plataforma
                  </p>
                </div>
              </div>
              <Switch
                id="inapp"
                checked={preferences.in_app_notifications}
                onCheckedChange={(checked) => updatePreference("in_app_notifications", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Alertas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tipos de Alertas</CardTitle>
            <CardDescription>
              Selecciona qué tipos de notificaciones quieres recibir
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <FileKey className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <Label htmlFor="data_requests" className="font-medium">Solicitudes de Datos</Label>
                  <p className="text-sm text-muted-foreground">
                    Cuando alguien solicita acceso a tus datos
                  </p>
                </div>
              </div>
              <Switch
                id="data_requests"
                checked={preferences.notify_data_requests}
                onCheckedChange={(checked) => updatePreference("notify_data_requests", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Coins className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <Label htmlFor="payments" className="font-medium">Pagos y Web3</Label>
                  <p className="text-sm text-muted-foreground">
                    Transacciones, pagos recibidos y eventos de wallet
                  </p>
                </div>
              </div>
              <Switch
                id="payments"
                checked={preferences.notify_payments}
                onCheckedChange={(checked) => updatePreference("notify_payments", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <Blocks className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <Label htmlFor="contracts" className="font-medium">Contratos Inteligentes</Label>
                  <p className="text-sm text-muted-foreground">
                    Eventos de blockchain y smart contracts
                  </p>
                </div>
              </div>
              <Switch
                id="contracts"
                checked={preferences.notify_contracts}
                onCheckedChange={(checked) => updatePreference("notify_contracts", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <Label htmlFor="system" className="font-medium">Sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Mantenimiento, actualizaciones y alertas del sistema
                  </p>
                </div>
              </div>
              <Switch
                id="system"
                checked={preferences.notify_system}
                onCheckedChange={(checked) => updatePreference("notify_system", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30">
                  <Sparkles className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <Label htmlFor="marketing" className="font-medium">Marketing y Novedades</Label>
                  <p className="text-sm text-muted-foreground">
                    Nuevos servicios, ofertas y actualizaciones de producto
                  </p>
                </div>
              </div>
              <Switch
                id="marketing"
                checked={preferences.notify_marketing}
                onCheckedChange={(checked) => updatePreference("notify_marketing", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Frecuencia */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Frecuencia</CardTitle>
            <CardDescription>
              Controla cuándo recibir las notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                  <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <Label htmlFor="instant" className="font-medium">Alertas Instantáneas</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibir notificaciones inmediatamente
                  </p>
                </div>
              </div>
              <Switch
                id="instant"
                checked={preferences.instant_alerts}
                onCheckedChange={(checked) => updatePreference("instant_alerts", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30">
                  <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <Label htmlFor="digest" className="font-medium">Resumen Semanal</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe un resumen de actividad cada lunes
                  </p>
                </div>
              </div>
              <Switch
                id="digest"
                checked={preferences.weekly_digest}
                onCheckedChange={(checked) => updatePreference("weekly_digest", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Horario Silencioso */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Horario Silencioso
            </CardTitle>
            <CardDescription>
              Pausa las notificaciones durante ciertas horas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="quiet" className="font-medium">Activar "No Molestar"</Label>
                <p className="text-sm text-muted-foreground">
                  No recibir notificaciones durante el horario configurado
                </p>
              </div>
              <Switch
                id="quiet"
                checked={preferences.quiet_hours_enabled}
                onCheckedChange={(checked) => updatePreference("quiet_hours_enabled", checked)}
              />
            </div>
            
            {preferences.quiet_hours_enabled && (
              <>
                <Separator />
                <div className="flex flex-col sm:flex-row gap-4 py-2">
                  <div className="flex items-center gap-3 flex-1">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label className="text-sm text-muted-foreground">Desde</Label>
                      <Select
                        value={preferences.quiet_hours_start}
                        onValueChange={(value) => updatePreference("quiet_hours_start", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, "0") + ":00";
                            return (
                              <SelectItem key={hour} value={hour}>
                                {hour}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label className="text-sm text-muted-foreground">Hasta</Label>
                      <Select
                        value={preferences.quiet_hours_end}
                        onValueChange={(value) => updatePreference("quiet_hours_end", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, "0") + ":00";
                            return (
                              <SelectItem key={hour} value={hour}>
                                {hour}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsNotifications;
