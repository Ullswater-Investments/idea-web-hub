-- Crear tabla webhooks
CREATE TABLE public.webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  secret TEXT NOT NULL,
  events TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para webhooks
CREATE POLICY "Users can view their org webhooks"
  ON public.webhooks FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage their org webhooks"
  ON public.webhooks FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id FROM user_profiles WHERE user_id = auth.uid()
    ) AND has_role(auth.uid(), organization_id, 'admin')
  );

-- Trigger para updated_at
CREATE TRIGGER update_webhooks_updated_at
  BEFORE UPDATE ON public.webhooks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insertar datos demo para webhooks
INSERT INTO public.webhooks (organization_id, url, secret, events, is_active)
VALUES
  ('11111111-2222-3333-4444-000000000001', 'https://api.retailgiant.com/webhooks/procuredata', 'whsec_demo123456789abcdef', ARRAY['transaction.approved', 'data.available', 'payment.completed'], true),
  ('11111111-2222-3333-4444-000000000001', 'https://hooks.slack.com/services/T00/B00/notifications', 'whsec_slack987654321fedcba', ARRAY['transaction.approved'], true),
  ('11111111-2222-3333-4444-000000000002', 'https://greenfinance.com/api/webhooks/data-events', 'whsec_greenfinance_abcdef123', ARRAY['data.available', 'contract.signed'], true);