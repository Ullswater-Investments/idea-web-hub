-- Eliminar política restrictiva actual
DROP POLICY IF EXISTS "Los usuarios pueden ver transacciones de su organización" ON data_transactions;

-- Crear nueva política que verifica roles en cualquier organización del usuario
CREATE POLICY "Los usuarios pueden ver transacciones de sus organizaciones"
ON data_transactions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND (
      user_roles.organization_id = data_transactions.consumer_org_id
      OR user_roles.organization_id = data_transactions.subject_org_id
      OR user_roles.organization_id = data_transactions.holder_org_id
    )
  )
);

-- Actualizar política de UPDATE
DROP POLICY IF EXISTS "Los actors pueden actualizar transacciones relacionadas" ON data_transactions;

CREATE POLICY "Los actors pueden actualizar transacciones relacionadas"
ON data_transactions
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND (
      user_roles.organization_id = data_transactions.consumer_org_id
      OR user_roles.organization_id = data_transactions.subject_org_id
      OR user_roles.organization_id = data_transactions.holder_org_id
    )
  )
);