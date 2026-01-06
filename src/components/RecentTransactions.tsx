import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, ArrowUpRight, ArrowDownRight, Clock, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Transaction {
  id: string;
  created_at: string;
  status: string;
  consumer_org_id: string;
  subject_org_id: string;
  asset: {
    price: number;
    currency: string;
    product?: {
      name: string;
      category: string;
    };
  } | null;
  consumer_org?: { name: string };
  subject_org?: { name: string };
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  activeOrgId: string | undefined;
  isLoading?: boolean;
  isDemo?: boolean;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  initiated: { label: "Iniciada", variant: "outline" },
  pending_subject: { label: "Pendiente", variant: "secondary" },
  pending_holder: { label: "Pendiente", variant: "secondary" },
  approved: { label: "Aprobada", variant: "default" },
  completed: { label: "Completada", variant: "default" },
  denied_subject: { label: "Rechazada", variant: "destructive" },
  denied_holder: { label: "Rechazada", variant: "destructive" },
  cancelled: { label: "Cancelada", variant: "outline" },
};

export function RecentTransactions({ transactions, activeOrgId, isLoading, isDemo }: RecentTransactionsProps) {
  const recentTransactions = transactions.slice(0, 6);

  const formatCurrency = (amount: number, currency: string = "EUR") => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transacciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recentTransactions.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Transacciones Recientes
            {isDemo && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                <Info className="h-3 w-3 mr-1" />
                Demo
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Clock className="h-10 w-10 mb-3 opacity-50" />
            <p className="font-medium">Sin transacciones recientes</p>
            <p className="text-sm">Las operaciones aparecerán aquí</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          Transacciones Recientes
          {isDemo && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Info className="h-3 w-3 mr-1" />
              Demo
            </Badge>
          )}
        </CardTitle>
        <Link to="/requests">
          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
            Ver Todas <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Contraparte</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Importe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((tx) => {
              const isConsumer = tx.consumer_org_id === activeOrgId;
              const counterparty = isConsumer ? tx.subject_org?.name : tx.consumer_org?.name;
              const amount = tx.asset?.price || 0;
              const status = statusConfig[tx.status] || { label: tx.status, variant: "outline" as const };
              
              return (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    {format(new Date(tx.created_at), "dd MMM", { locale: es })}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {tx.asset?.product?.name || "Producto"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {counterparty || "—"}
                  </TableCell>
                  <TableCell>
                    {isConsumer ? (
                      <Badge variant="outline" className="gap-1 text-red-600 border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900">
                        <ArrowDownRight className="h-3 w-3" />
                        Compra
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1 text-green-600 border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900">
                        <ArrowUpRight className="h-3 w-3" />
                        Venta
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${isConsumer ? "text-red-600" : "text-green-600"}`}>
                    {isConsumer ? "-" : "+"}{formatCurrency(amount, tx.asset?.currency)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
