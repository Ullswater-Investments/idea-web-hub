-- Extender tabla erp_configurations para soportar nuevos tipos de conectores
ALTER TABLE erp_configurations 
ADD COLUMN IF NOT EXISTS config_type TEXT DEFAULT 'erp',
ADD COLUMN IF NOT EXISTS public_key TEXT,
ADD COLUMN IF NOT EXISTS protocol_url TEXT,
ADD COLUMN IF NOT EXISTS management_url TEXT;

-- Comentario para documentación
COMMENT ON COLUMN erp_configurations.config_type IS 'Tipo de integración: erp (Legacy), edc (Dataspace), wallet (SSI Identity)';