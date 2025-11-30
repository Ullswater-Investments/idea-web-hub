-- ============================================================
-- PROTOCOLO DE ROBUSTEZ: AUDITORÍA Y REFUERZO DE SEGURIDAD RLS
-- ============================================================

-- 1. AISLAMIENTO DE BILLETERAS
-- Verifica que usuarios solo vean wallets de sus organizaciones
DROP POLICY IF EXISTS "Usuarios pueden ver wallet de su org" ON public.wallets;
CREATE POLICY "Usuarios pueden ver wallet de su org" 
ON public.wallets 
FOR SELECT 
USING (
  organization_id IN (
    SELECT organization_id 
    FROM public.user_profiles 
    WHERE user_id = auth.uid()
  )
);

-- 2. PROTECCIÓN DE ESCRITURA EN BALANCE
-- NADIE puede actualizar el balance directamente desde el cliente
DROP POLICY IF EXISTS "Solo sistema puede modificar balance" ON public.wallets;
CREATE POLICY "Solo sistema puede modificar balance" 
ON public.wallets 
FOR UPDATE 
USING (false); -- Bloquea todas las actualizaciones desde cliente

-- Solo permitir actualizaciones de balance mediante funciones SECURITY DEFINER
-- (Edge Functions o Triggers del sistema)

-- 3. PRIVACIDAD DE NEGOCIACIÓN
-- Solo los actores de una transacción pueden ver los mensajes
DROP POLICY IF EXISTS "Ver mensajes de transacciones propias" ON public.transaction_messages;
CREATE POLICY "Ver mensajes de transacciones propias" 
ON public.transaction_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.data_transactions dt
    WHERE dt.id = transaction_messages.transaction_id
    AND (
      dt.consumer_org_id IN (
        SELECT organization_id FROM public.user_profiles WHERE user_id = auth.uid()
      )
      OR dt.subject_org_id IN (
        SELECT organization_id FROM public.user_profiles WHERE user_id = auth.uid()
      )
      OR dt.holder_org_id IN (
        SELECT organization_id FROM public.user_profiles WHERE user_id = auth.uid()
      )
    )
  )
);

-- 4. PROTECCIÓN DE TRANSACCIONES WALLET
-- Solo ver transacciones de wallets propias
DROP POLICY IF EXISTS "Ver transacciones de wallets propias" ON public.wallet_transactions;
CREATE POLICY "Ver transacciones de wallets propias" 
ON public.wallet_transactions 
FOR SELECT 
USING (
  from_wallet_id IN (
    SELECT wallets.id 
    FROM public.wallets 
    WHERE wallets.organization_id IN (
      SELECT organization_id FROM public.user_profiles WHERE user_id = auth.uid()
    )
  )
  OR to_wallet_id IN (
    SELECT wallets.id 
    FROM public.wallets 
    WHERE wallets.organization_id IN (
      SELECT organization_id FROM public.user_profiles WHERE user_id = auth.uid()
    )
  )
);

-- 5. BLOQUEAR INSERCIÓN/ACTUALIZACIÓN DE WALLET_TRANSACTIONS DESDE CLIENTE
DROP POLICY IF EXISTS "Solo sistema puede crear transacciones wallet" ON public.wallet_transactions;
CREATE POLICY "Solo sistema puede crear transacciones wallet" 
ON public.wallet_transactions 
FOR INSERT 
WITH CHECK (false); -- Bloquea todas las inserciones desde cliente

DROP POLICY IF EXISTS "Solo sistema puede modificar transacciones wallet" ON public.wallet_transactions;
CREATE POLICY "Solo sistema puede modificar transacciones wallet" 
ON public.wallet_transactions 
FOR UPDATE 
USING (false); -- Bloquea todas las actualizaciones desde cliente