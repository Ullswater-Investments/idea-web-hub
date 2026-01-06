-- Añadir columnas de preferencias de notificaciones a privacy_preferences
ALTER TABLE public.privacy_preferences 
ADD COLUMN IF NOT EXISTS email_notifications boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS push_notifications boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS in_app_notifications boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS notify_data_requests boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS notify_payments boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS notify_contracts boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS notify_system boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS notify_marketing boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS weekly_digest boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS instant_alerts boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS quiet_hours_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS quiet_hours_start time DEFAULT '22:00',
ADD COLUMN IF NOT EXISTS quiet_hours_end time DEFAULT '08:00';