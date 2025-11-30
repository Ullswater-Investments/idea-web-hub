-- Tabla de Wishlist (Favoritos)
CREATE TABLE IF NOT EXISTS public.user_wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES public.data_assets(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, asset_id)
);

-- Habilitar RLS
ALTER TABLE public.user_wishlist ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios pueden gestionar su propia wishlist
CREATE POLICY "Users can manage their own wishlist" 
ON public.user_wishlist
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Índices para mejorar performance
CREATE INDEX idx_user_wishlist_user ON public.user_wishlist(user_id);
CREATE INDEX idx_user_wishlist_asset ON public.user_wishlist(asset_id);