import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Wallet, Landmark, CheckCircle2, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentGatewayProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  asset: any;
}

export function PaymentGateway({ open, onClose, onConfirm, asset }: PaymentGatewayProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const price = asset?.price || 0;
  const tax = price * 0.21;
  const total = price + tax;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Esperar para mostrar éxito y ejecutar la acción real
    await new Promise(resolve => setTimeout(resolve, 1500));
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Confirmar Pago y Licencia
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-4"
          >
            <CheckCircle2 className="h-16 w-16 text-green-600 animate-bounce" />
            <h3 className="text-2xl font-bold">¡Pago Completado!</h3>
            <p className="text-muted-foreground">Redirigiendo...</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Lado Izquierdo: Resumen */}
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold">Resumen del Pedido</h3>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Producto</span>
                    <span className="font-medium truncate max-w-[180px]">{asset?.name || "Dataset"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proveedor</span>
                    <span className="font-medium truncate max-w-[180px]">{asset?.provider_name || "N/A"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{price.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>IVA (21%)</span>
                    <span>{tax.toFixed(2)} €</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-3 rounded border border-green-100">
                <CheckCircle2 className="h-4 w-4" /> 
                Garantía de Calidad de Datos ODRL 2.0
              </div>
            </div>

            {/* Lado Derecho: Métodos de Pago */}
            <div>
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="card">
                    <CreditCard className="h-4 w-4 mr-1" />
                    Tarjeta
                  </TabsTrigger>
                  <TabsTrigger value="wallet">
                    <Wallet className="h-4 w-4 mr-1" />
                    Wallet
                  </TabsTrigger>
                  <TabsTrigger value="transfer">
                    <Landmark className="h-4 w-4 mr-1" />
                    Transfer
                  </TabsTrigger>
                </TabsList>

                {/* Tarjeta */}
                <TabsContent value="card" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Número de Tarjeta</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiración</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
                </TabsContent>

                {/* Wallet */}
                <TabsContent value="wallet" className="space-y-4 mt-4">
                  <div className="bg-primary/10 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">Saldo disponible</p>
                    <p className="text-2xl font-bold">€85,420.00</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    El pago se realizará desde tu wallet organizacional.
                  </p>
                </TabsContent>

                {/* Transferencia */}
                <TabsContent value="transfer" className="space-y-4 mt-4">
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
                    <p><strong>Beneficiario:</strong> PROCUREDATA S.L.</p>
                    <p><strong>IBAN:</strong> ES91 2100 0418 4502 0005 1332</p>
                    <p><strong>BIC:</strong> CAIXESBBXXX</p>
                    <p><strong>Concepto:</strong> REF-{asset?.id?.substring(0, 8)}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tras realizar la transferencia, el acceso se activará en 24-48h.
                  </p>
                </TabsContent>
              </Tabs>

              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando pago seguro..." : `Pagar ${total.toFixed(2)} €`}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
