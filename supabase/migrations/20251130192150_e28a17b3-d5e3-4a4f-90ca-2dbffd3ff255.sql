-- Tabla de mensajes para negociación dentro de transacciones
CREATE TABLE IF NOT EXISTS public.transaction_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES public.data_transactions(id) ON DELETE CASCADE,
    sender_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX idx_transaction_messages_transaction ON public.transaction_messages(transaction_id);
CREATE INDEX idx_transaction_messages_created ON public.transaction_messages(created_at DESC);

-- RLS Policies
ALTER TABLE public.transaction_messages ENABLE ROW LEVEL SECURITY;

-- Los usuarios pueden ver mensajes de transacciones donde su organización participa
CREATE POLICY "Ver mensajes de transacciones propias" ON public.transaction_messages
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.data_transactions dt
            WHERE dt.id = transaction_messages.transaction_id
            AND (
                dt.consumer_org_id = get_user_organization(auth.uid())
                OR dt.subject_org_id = get_user_organization(auth.uid())
                OR dt.holder_org_id = get_user_organization(auth.uid())
            )
        )
    );

-- Los usuarios pueden enviar mensajes si su organización participa en la transacción
CREATE POLICY "Enviar mensajes a transacciones propias" ON public.transaction_messages
    FOR INSERT
    WITH CHECK (
        sender_org_id = get_user_organization(auth.uid())
        AND EXISTS (
            SELECT 1 FROM public.data_transactions dt
            WHERE dt.id = transaction_messages.transaction_id
            AND (
                dt.consumer_org_id = sender_org_id
                OR dt.subject_org_id = sender_org_id
                OR dt.holder_org_id = sender_org_id
            )
        )
    );