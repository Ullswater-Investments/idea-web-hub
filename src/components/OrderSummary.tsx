import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

interface OrderSummaryProps {
  asset: any;
  step?: number;
}

export function OrderSummary({ asset, step }: OrderSummaryProps) {
  if (!asset) {
    return (
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <p className="text-sm">Selecciona un producto para ver el resumen</p>
        </CardContent>
      </Card>
    );
  }
  
  const price = asset.price || 0;
  const isFree = price === 0;
  const tax = isFree ? 0 : price * 0.21;
  const total = price + tax;
  const providerName = asset.org?.name || asset.provider_name || "Proveedor";

  return (
    <Card className="bg-slate-50/50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800 shadow-lg sticky top-24">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Resumen del Pedido</CardTitle>
          {step && (
            <Badge variant="outline" className="text-xs">
              Paso {step}/5
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 text-sm pt-6">
        {/* Producto */}
        <div className="space-y-2 pb-4 border-b">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground line-clamp-2">{asset.name || asset.asset_name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                por <span className="font-medium">{providerName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Desglose de Precios */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Licencia Base</span>
            {isFree ? (
              <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 dark:bg-green-950/20">
                GRATIS
              </Badge>
            ) : (
              <span className="font-medium">{price.toFixed(2)} €</span>
            )}
          </div>
          
          {!isFree && (
            <>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">IVA (21%)</span>
                <span className="text-muted-foreground">{tax.toFixed(2)} €</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-base font-bold pt-2">
                <span>Total</span>
                <span className="text-primary">{total.toFixed(2)} €</span>
              </div>

              {asset.pricing_model === 'subscription' && (
                <p className="text-xs text-muted-foreground text-center pt-1">
                  Facturación {asset.billing_period === 'monthly' ? 'mensual' : 'anual'}
                </p>
              )}
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex-col gap-3 pt-4 border-t bg-background/50">
        <div className="flex items-center gap-2 text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 p-2.5 rounded-md w-full justify-center border border-green-200 dark:border-green-900">
          <ShieldCheck className="h-3.5 w-3.5" /> 
          <span className="font-medium">Garantía de Calidad de Datos</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
          <Lock className="h-3 w-3" /> 
          <span>Transacción Segura con ODRL 2.0</span>
        </div>

        {!isFree && (
          <p className="text-[10px] text-center text-muted-foreground mt-1 leading-tight">
            Los precios incluyen acceso completo a la API, soporte técnico 24/7 y SLA garantizado del 99.9%
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
