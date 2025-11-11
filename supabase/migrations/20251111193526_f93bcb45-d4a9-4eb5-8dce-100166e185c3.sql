-- Enum para estados de transacciones
CREATE TYPE public.transaction_status AS ENUM (
  'initiated',
  'pending_subject',
  'pending_holder',
  'approved',
  'denied_subject',
  'denied_holder',
  'completed',
  'cancelled'
);

-- Enum para tipos de acciones de aprobación
CREATE TYPE public.approval_action AS ENUM (
  'pre_approve',
  'approve',
  'deny',
  'cancel'
);

-- Tabla de transacciones de datos (NÚCLEO del motor de gobernanza)
CREATE TABLE public.data_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID NOT NULL REFERENCES public.data_assets(id) ON DELETE CASCADE,
  consumer_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  subject_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  holder_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  status transaction_status NOT NULL DEFAULT 'initiated',
  purpose TEXT NOT NULL,
  access_duration_days INTEGER NOT NULL DEFAULT 90,
  justification TEXT NOT NULL,
  requested_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de historial de aprobaciones
CREATE TABLE public.approval_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id) ON DELETE CASCADE,
  actor_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  action approval_action NOT NULL,
  actor_user_id UUID NOT NULL REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de políticas ODRL (almacenadas como JSON)
CREATE TABLE public.data_policies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.data_transactions(id) ON DELETE CASCADE UNIQUE,
  odrl_policy_json JSONB NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.data_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approval_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_policies ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para data_transactions
CREATE POLICY "Los usuarios pueden ver transacciones de su organización"
ON public.data_transactions
FOR SELECT
TO authenticated
USING (
  consumer_org_id = public.get_user_organization(auth.uid()) OR
  subject_org_id = public.get_user_organization(auth.uid()) OR
  holder_org_id = public.get_user_organization(auth.uid())
);

CREATE POLICY "Los consumers pueden crear transacciones"
ON public.data_transactions
FOR INSERT
TO authenticated
WITH CHECK (
  consumer_org_id = public.get_user_organization(auth.uid()) AND
  requested_by = auth.uid()
);

CREATE POLICY "Los actors pueden actualizar transacciones relacionadas"
ON public.data_transactions
FOR UPDATE
TO authenticated
USING (
  subject_org_id = public.get_user_organization(auth.uid()) OR
  holder_org_id = public.get_user_organization(auth.uid()) OR
  consumer_org_id = public.get_user_organization(auth.uid())
);

-- Políticas RLS para approval_history
CREATE POLICY "Los usuarios pueden ver historial de su organización"
ON public.approval_history
FOR SELECT
TO authenticated
USING (
  actor_org_id = public.get_user_organization(auth.uid()) OR
  EXISTS (
    SELECT 1 FROM public.data_transactions
    WHERE data_transactions.id = approval_history.transaction_id
    AND (
      data_transactions.consumer_org_id = public.get_user_organization(auth.uid()) OR
      data_transactions.subject_org_id = public.get_user_organization(auth.uid()) OR
      data_transactions.holder_org_id = public.get_user_organization(auth.uid())
    )
  )
);

CREATE POLICY "Los usuarios pueden insertar aprobaciones"
ON public.approval_history
FOR INSERT
TO authenticated
WITH CHECK (
  actor_org_id = public.get_user_organization(auth.uid()) AND
  actor_user_id = auth.uid()
);

-- Políticas RLS para data_policies
CREATE POLICY "Los usuarios pueden ver políticas de sus transacciones"
ON public.data_policies
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.data_transactions
    WHERE data_transactions.id = data_policies.transaction_id
    AND (
      data_transactions.consumer_org_id = public.get_user_organization(auth.uid()) OR
      data_transactions.subject_org_id = public.get_user_organization(auth.uid()) OR
      data_transactions.holder_org_id = public.get_user_organization(auth.uid())
    )
  )
);

-- Triggers para actualizar updated_at
CREATE TRIGGER update_data_transactions_updated_at
BEFORE UPDATE ON public.data_transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para mejorar rendimiento
CREATE INDEX idx_data_transactions_consumer ON public.data_transactions(consumer_org_id);
CREATE INDEX idx_data_transactions_subject ON public.data_transactions(subject_org_id);
CREATE INDEX idx_data_transactions_holder ON public.data_transactions(holder_org_id);
CREATE INDEX idx_data_transactions_status ON public.data_transactions(status);
CREATE INDEX idx_approval_history_transaction ON public.approval_history(transaction_id);
CREATE INDEX idx_data_policies_transaction ON public.data_policies(transaction_id);

-- Función para obtener transacciones pendientes por rol
CREATE OR REPLACE FUNCTION public.get_pending_transactions(_user_id uuid)
RETURNS TABLE (
  transaction_id uuid,
  role_in_transaction text,
  asset_name text,
  consumer_name text,
  subject_name text,
  holder_name text,
  status transaction_status,
  purpose text,
  created_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH user_org AS (
    SELECT organization_id FROM public.user_profiles WHERE user_id = _user_id LIMIT 1
  )
  SELECT 
    dt.id as transaction_id,
    CASE 
      WHEN dt.consumer_org_id = (SELECT organization_id FROM user_org) THEN 'consumer'
      WHEN dt.subject_org_id = (SELECT organization_id FROM user_org) THEN 'subject'
      WHEN dt.holder_org_id = (SELECT organization_id FROM user_org) THEN 'holder'
    END as role_in_transaction,
    dp.name as asset_name,
    c.name as consumer_name,
    s.name as subject_name,
    h.name as holder_name,
    dt.status,
    dt.purpose,
    dt.created_at
  FROM public.data_transactions dt
  JOIN public.data_assets da ON dt.asset_id = da.id
  JOIN public.data_products dp ON da.product_id = dp.id
  JOIN public.organizations c ON dt.consumer_org_id = c.id
  JOIN public.organizations s ON dt.subject_org_id = s.id
  JOIN public.organizations h ON dt.holder_org_id = h.id
  WHERE 
    dt.consumer_org_id = (SELECT organization_id FROM user_org) OR
    dt.subject_org_id = (SELECT organization_id FROM user_org) OR
    dt.holder_org_id = (SELECT organization_id FROM user_org)
  ORDER BY dt.created_at DESC;
$$;