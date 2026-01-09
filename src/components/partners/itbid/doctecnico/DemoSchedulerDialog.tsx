import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

interface DemoSchedulerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const availableDates = [
  new Date(2026, 0, 12), // Lunes 12 Enero
  new Date(2026, 0, 13), // Martes 13 Enero
  new Date(2026, 0, 14), // Miércoles 14 Enero
  new Date(2026, 0, 15), // Jueves 15 Enero
];

const timeSlots = [
  { id: "10-11", label: "10:00 - 11:00" },
  { id: "11-12", label: "11:00 - 12:00" },
  { id: "12-13", label: "12:00 - 13:00" },
];

const isDateAvailable = (date: Date) => {
  return availableDates.some(
    (d) =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
  );
};

export const DemoSchedulerDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: DemoSchedulerDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsLoading(true);

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const timeLabel = timeSlots.find((t) => t.id === selectedTime)?.label || selectedTime;

      const { error } = await supabase.functions.invoke("send-demo-request", {
        body: {
          selectedDate: formattedDate,
          selectedTime: timeLabel,
        },
      });

      if (error) throw error;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0891b2", "#d946ef", "#84cc16"],
      });

      toast({
        title: "¡Solicitud enviada!",
        description: `Demo programada para el ${format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} de ${timeLabel}`,
      });

      onSuccess();
      onOpenChange(false);
      setSelectedDate(undefined);
      setSelectedTime("");
    } catch (error) {
      console.error("Error sending demo request:", error);
      toast({
        title: "Error al enviar solicitud",
        description: "Por favor, inténtalo de nuevo o contacta directamente con el equipo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
            Programar Demo Técnica
          </DialogTitle>
          <DialogDescription>
            Selecciona una fecha y franja horaria para la demostración del Gateway ITBID-X
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Calendar */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Fechas disponibles: 12-15 Enero 2026
            </Label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => !isDateAvailable(date)}
                defaultMonth={new Date(2026, 0, 1)}
                locale={es}
                className={cn("p-3 pointer-events-auto rounded-md border")}
              />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <Label className="text-sm font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[hsl(var(--itbid-cyan))]" />
              Franja horaria (60 minutos)
            </Label>
            <RadioGroup
              value={selectedTime}
              onValueChange={setSelectedTime}
              className="grid grid-cols-3 gap-3"
            >
              {timeSlots.map((slot) => (
                <div key={slot.id}>
                  <RadioGroupItem
                    value={slot.id}
                    id={slot.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={slot.id}
                    className={cn(
                      "flex items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                      "peer-data-[state=checked]:border-[hsl(var(--itbid-cyan))] peer-data-[state=checked]:bg-[hsl(var(--itbid-cyan)/0.1)]"
                    )}
                  >
                    <span className="text-sm font-medium">{slot.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Summary */}
          {selectedDate && selectedTime && (
            <div className="rounded-lg bg-[hsl(var(--itbid-cyan)/0.1)] p-4 border border-[hsl(var(--itbid-cyan)/0.3)]">
              <p className="text-sm font-medium text-center">
                📅 {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                <br />
                🕐 {timeSlots.find((t) => t.id === selectedTime)?.label} (CET)
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime || isLoading}
            className="gap-2 bg-[hsl(var(--itbid-cyan))] hover:bg-[hsl(var(--itbid-cyan)/0.9)]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Confirmar Reserva
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
