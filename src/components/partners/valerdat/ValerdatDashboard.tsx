import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Activity, 
  FileCheck, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Hash,
  Euro,
  Users,
  Briefcase
} from "lucide-react";

const ValerdatDashboard = () => {
  // Simulated activity data
  const activities = [
    { id: 1, action: "Dataset solicitado", asset: "Historial Pedidos B2B", status: "approved", time: "Hace 2h" },
    { id: 2, action: "Contrato ODRL firmado", asset: "Capacidad Productiva", status: "completed", time: "Hace 1d" },
    { id: 3, action: "Datos anonimizados", asset: "Proveedores Industriales", status: "completed", time: "Hace 2d" },
    { id: 4, action: "Ingesta completada", asset: "Certificaciones ISO", status: "completed", time: "Hace 3d" },
  ];

  // Budget breakdown
  const budget = [
    { concepto: "Personal Propio", importe: 5000, tipo: "interno" },
    { concepto: "Servicios PROCUREDATA", importe: 6000, tipo: "externo" },
    { concepto: "Datasets Industriales", importe: 3000, tipo: "externo" },
    { concepto: "Auditoría y Certificación", importe: 1000, tipo: "externo" },
  ];

  // Blockchain hashes
  const blockchainRecords = [
    { action: "Firma Contrato ODRL", hash: "0x7a3f2b1c8d9e...", block: "12,847,293" },
    { action: "Pago Servicio Anonimización", hash: "0x4e5f6a7b8c9d...", block: "12,847,501" },
    { action: "Entrega Dataset #1", hash: "0x1a2b3c4d5e6f...", block: "12,848,102" },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-2">03 —</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Dashboard de Seguimiento
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Simulación del panel de control para el seguimiento del proyecto VALERDAT, 
              incluyendo actividad, presupuesto y trazabilidad blockchain.
            </p>
          </div>

          {/* Activity Feed */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Actividad Reciente</CardTitle>
                <Badge variant="outline" className="ml-auto">
                  consumer_org_id = VALERDAT
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                  >
                    <div className={`p-2 rounded-full ${
                      activity.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.asset}</p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Process Flow Visualization */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Flujo de Procesamiento</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4 p-4">
                <div className="text-center flex-1">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <span className="text-2xl">📥</span>
                  </div>
                  <p className="font-medium text-sm">Input</p>
                  <p className="text-xs text-muted-foreground">Datos Crudos</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="text-center flex-1">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <p className="font-medium text-sm">Normalizer</p>
                  <p className="text-xs text-muted-foreground">JSON-LD</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="text-center flex-1">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <p className="font-medium text-sm">Anonimizador</p>
                  <p className="text-xs text-muted-foreground">GDPR Compliant</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="text-center flex-1">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-2xl">📤</span>
                  </div>
                  <p className="font-medium text-sm">Output</p>
                  <p className="text-xs text-muted-foreground">Datos Limpios</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Table */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Desglose Presupuestario</CardTitle>
                <Badge variant="outline" className="ml-auto">
                  Total: 15.000€
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Concepto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Importe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budget.map((item) => (
                    <TableRow key={item.concepto}>
                      <TableCell className="font-medium">{item.concepto}</TableCell>
                      <TableCell>
                        <Badge variant={item.tipo === 'interno' ? 'secondary' : 'outline'}>
                          <span className="flex items-center gap-1">
                            {item.tipo === 'interno' ? (
                              <Users className="h-3 w-3" />
                            ) : (
                              <Briefcase className="h-3 w-3" />
                            )}
                            {item.tipo === 'interno' ? 'Personal Propio' : 'Servicio Externo'}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {item.importe.toLocaleString('es-ES')} €
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Blockchain Audit Trail */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">Trazabilidad Blockchain</CardTitle>
                <Badge variant="outline" className="ml-auto bg-purple-50 text-purple-700 border-purple-200">
                  Pontus-X
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {blockchainRecords.map((record, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800"
                  >
                    <Hash className="h-5 w-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{record.action}</p>
                      <p className="text-xs font-mono text-muted-foreground">{record.hash}</p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      Block #{record.block}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground text-center">
                Todos los hitos del proyecto quedan notarizados en Pontus-X para auditoría de la subvención
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ValerdatDashboard;
