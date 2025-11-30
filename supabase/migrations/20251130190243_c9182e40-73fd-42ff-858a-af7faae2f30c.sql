-- Crear tabla para oportunidades de negocio (Request for Data)
CREATE TABLE IF NOT EXISTS public.marketplace_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consumer_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  description TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.marketplace_opportunities ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden ver oportunidades activas
CREATE POLICY "Todos pueden ver oportunidades activas"
ON public.marketplace_opportunities
FOR SELECT
USING (status = 'active');

-- Política: Consumer orgs pueden insertar sus propias oportunidades
CREATE POLICY "Consumers pueden crear oportunidades"
ON public.marketplace_opportunities
FOR INSERT
WITH CHECK (consumer_org_id = get_user_organization(auth.uid()));

-- Política: Owners pueden actualizar sus propias oportunidades
CREATE POLICY "Owners pueden actualizar sus oportunidades"
ON public.marketplace_opportunities
FOR UPDATE
USING (consumer_org_id = get_user_organization(auth.uid()));

-- Trigger para actualizar updated_at
CREATE TRIGGER update_marketplace_opportunities_updated_at
BEFORE UPDATE ON public.marketplace_opportunities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para mejorar performance
CREATE INDEX idx_marketplace_opportunities_consumer ON public.marketplace_opportunities(consumer_org_id);
CREATE INDEX idx_marketplace_opportunities_category ON public.marketplace_opportunities(category);
CREATE INDEX idx_marketplace_opportunities_status ON public.marketplace_opportunities(status);