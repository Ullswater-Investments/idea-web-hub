import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DemoRequest {
  selectedDate: string;
  selectedTime: string;
}

const formatDateInSpanish = (dateStr: string): string => {
  const date = new Date(dateStr + "T12:00:00");
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { selectedDate, selectedTime }: DemoRequest = await req.json();

    if (!selectedDate || !selectedTime) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const formattedDate = formatDateInSpanish(selectedDate);

    const emailResponse = await resend.emails.send({
      from: "PROCUREDATA <onboarding@resend.dev>",
      to: ["eduardo@agileprocurement.es"],
      subject: "🗓️ Nueva Solicitud de Demo Técnica - ITBID",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0891b2, #d946ef); padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .meeting-box { background: white; border: 2px solid #0891b2; border-radius: 10px; padding: 20px; margin: 20px 0; }
            .meeting-box h2 { color: #0891b2; margin-top: 0; }
            .detail { display: flex; align-items: center; margin: 10px 0; font-size: 16px; }
            .detail-icon { margin-right: 10px; }
            .footer { background: #1f2937; color: #9ca3af; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; }
            .cta { background: #0891b2; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Nueva Solicitud de Demo Técnica</h1>
            </div>
            <div class="content">
              <p>Hola Eduardo,</p>
              <p>Los directores de <strong>ITBID</strong> han solicitado una demostración técnica del <strong>Gateway ITBID-X</strong> a través del portal PROCUREDATA.</p>
              
              <div class="meeting-box">
                <h2>📅 Detalles de la Reunión Solicitada</h2>
                <div class="detail">
                  <span class="detail-icon">📆</span>
                  <strong>Fecha:</strong>&nbsp; ${formattedDate}
                </div>
                <div class="detail">
                  <span class="detail-icon">🕐</span>
                  <strong>Horario:</strong>&nbsp; ${selectedTime} (CET)
                </div>
                <div class="detail">
                  <span class="detail-icon">⏱️</span>
                  <strong>Duración:</strong>&nbsp; 60 minutos
                </div>
              </div>

              <p><strong>Próximos pasos:</strong></p>
              <ol>
                <li>Confirma la disponibilidad para la fecha y hora seleccionada</li>
                <li>Genera un enlace de reunión (Google Meet, Teams, Zoom)</li>
                <li>Envía la confirmación con el enlace a los representantes de ITBID</li>
              </ol>

              <p style="margin-top: 25px;">Atentamente,<br><strong>Sistema PROCUREDATA</strong></p>
            </div>
            <div class="footer">
              <p>Este email ha sido generado automáticamente por el sistema de reservas de PROCUREDATA.</p>
              <p>© 2025 PROCUREDATA × ITBID</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Demo request email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-demo-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
