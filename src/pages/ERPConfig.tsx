import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Server, Shield, Database, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ERPConfig() {
  const { activeOrg } = useOrganizationContext();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("erp");

  // Estado del formulario (simplificado para el ejemplo)
  const [formData, setFormData] = useState({
    name: "",
    api_endpoint: "",
    auth_token: "",
    auth_method: "bearer",
    // Campos nuevos
    protocol_url: "",
    management_url: "",
    public_key: "" // DID
  });

  // Fetch de configuraciones existentes
  const { data: configs } = useQuery({
    queryKey: ["erp-configs", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return [];
      const { data, error } = await supabase
        .from("erp_configurations")
        .select("*")
        .eq("organization_id", activeOrg.id);
      if (error) throw error;
      return data;
    },
    enabled: !!activeOrg,
  });

  // Mutación para guardar
  const saveMutation = useMutation({
    mutationFn: async (type: string) => {
      if (!activeOrg) throw new Error("No org");
      
      const payload: any = {
        organization_id: activeOrg.id,
        config_name: formData.name,
        config_type: type,
        is_active: true,
        endpoint_url: formData.api_endpoint,
        auth_method: formData.auth_method as any
      };

      // Mapeo de campos según tipo
      if (type === 'erp') {
        payload.auth_token_encrypted = formData.auth_token;
      } else if (type === 'edc') {
        payload.protocol_url = formData.protocol_url;
        payload.management_url = formData.management_url;
        payload.auth_token_encrypted = formData.auth_token; // EDC API Key
      } else if (type === 'wallet') {
        payload.public_key = formData.public_key; // DID
        payload.endpoint_url = formData.api_endpoint; // Verifiable Credential Service
      }

      const { error } = await supabase.from("erp_configurations").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Configuración guardada correctamente");
      queryClient.invalidateQueries({ queryKey: ["erp-configs"] });
      setFormData({ name: "", api_endpoint: "", auth_token: "", auth_method: "bearer", protocol_url: "", management_url: "", public_key: "" });
    },
    onError: (err: any) => toast.error("Error al guardar: " + err.message)
  });

  const handleSave = () => saveMutation.mutate(activeTab);

  return (
    <div className="container py-8 space-y-8 fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integraciones Externas</h2>
        <p className="text-muted-foreground">Gestiona la conectividad con ERPs, Dataspaces y Wallets.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="erp">ERP (Legacy)</TabsTrigger>
          <TabsTrigger value="edc">EDC Connector</TabsTrigger>
          <TabsTrigger value="wallet">SSI Wallet</TabsTrigger>
        </TabsList>

        {/* --- TAB 1: ERP CONFIG --- */}
        <TabsContent value="erp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Server className="h-5 w-5" /> Configuración ERP</CardTitle>
              <CardDescription>Conexión API REST estándar para sistemas legacy (SAP, Oracle, Microsoft).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Nombre de la Conexión</Label>
                <Input placeholder="Ej: SAP Producción" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label>API Endpoint (Webhook)</Label>
                <Input placeholder="https://api.empresa.com/v1/ingest" value={formData.api_endpoint} onChange={e => setFormData({...formData, api_endpoint: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Método de Autenticación</Label>
                  <Select value={formData.auth_method} onValueChange={v => setFormData({...formData, auth_method: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="api_key">API Key</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Token / Key</Label>
                  <Input type="password" value={formData.auth_token} onChange={e => setFormData({...formData, auth_token: e.target.value})} />
                </div>
              </div>
              <Button onClick={handleSave} disabled={saveMutation.isPending} className="w-full">
                <Save className="mr-2 h-4 w-4" /> Guardar Configuración ERP
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB 2: EDC CONNECTOR --- */}
        <TabsContent value="edc">
          <Card className="border-blue-200 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <Database className="h-5 w-5" /> Eclipse Dataspace Connector
              </CardTitle>
              <CardDescription>Configura tu nodo para participar en espacios de datos soberanos (Gaia-X / IDSA).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Nombre del Nodo</Label>
                <Input placeholder="Ej: Nodo IDSA Madrid" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label>Management API URL</Label>
                <Input placeholder="http://edc-control-plane:8181/management" value={formData.management_url} onChange={e => setFormData({...formData, management_url: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label>DSP Protocol URL</Label>
                <Input placeholder="http://edc-control-plane:8282/protocol" value={formData.protocol_url} onChange={e => setFormData({...formData, protocol_url: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label>API Key (X-Api-Key)</Label>
                <Input type="password" value={formData.auth_token} onChange={e => setFormData({...formData, auth_token: e.target.value})} />
              </div>
              <Button onClick={handleSave} disabled={saveMutation.isPending} className="w-full bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" /> Conectar Nodo EDC
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB 3: SSI WALLET --- */}
        <TabsContent value="wallet">
          <Card className="border-purple-200 dark:border-purple-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                <Shield className="h-5 w-5" /> Identidad Soberana (SSI)
              </CardTitle>
              <CardDescription>Gestión de DIDs y Credenciales Verificables.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="default" className="bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-900">
                <AlertCircle className="h-4 w-4 text-purple-600" />
                <AlertTitle className="text-purple-800 dark:text-purple-400">Seguridad de Claves Privadas</AlertTitle>
                <AlertDescription className="text-purple-700 dark:text-purple-300 text-xs">
                  Las claves privadas nunca se almacenan en la base de datos estándar. Se gestionan a través de Supabase Vault o HSM externo. Aquí solo registras el DID público.
                </AlertDescription>
              </Alert>
              
              <div className="grid gap-2">
                <Label>DID (Decentralized Identifier)</Label>
                <Input placeholder="did:web:procuredata.app:company-xyz" value={formData.public_key} onChange={e => setFormData({...formData, public_key: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label>VC Service Endpoint</Label>
                <Input placeholder="https://wallet.procuredata.app/api/vc" value={formData.api_endpoint} onChange={e => setFormData({...formData, api_endpoint: e.target.value})} />
              </div>
              
              <Button onClick={handleSave} disabled={saveMutation.isPending} className="w-full bg-purple-600 hover:bg-purple-700">
                <Save className="mr-2 h-4 w-4" /> Registrar Wallet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lista de configuraciones activas */}
      {configs && configs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Integraciones Activas</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {configs.map((config: any) => (
              <Card key={config.id} className="overflow-hidden">
                <div className={`h-2 w-full ${config.config_type === 'edc' ? 'bg-blue-500' : config.config_type === 'wallet' ? 'bg-purple-500' : 'bg-primary'}`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{config.config_name}</CardTitle>
                    {config.is_active && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  </div>
                  <CardDescription className="uppercase text-xs font-bold">{config.config_type || 'erp'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground truncate">{config.endpoint_url || config.management_url || config.public_key}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
