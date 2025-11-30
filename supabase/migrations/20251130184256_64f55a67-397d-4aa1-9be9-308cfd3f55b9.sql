-- ==============================================================================
-- FASE 7: COMERCIALIZACIÓN (MARKETPLACE)
-- ==============================================================================

-- BLOQUE 1: MONETIZACIÓN DE ACTIVOS
DO $$ BEGIN
    ALTER TABLE data_assets ADD COLUMN IF NOT EXISTS pricing_model TEXT DEFAULT 'free';
    ALTER TABLE data_assets ADD COLUMN IF NOT EXISTS price NUMERIC DEFAULT 0;
    ALTER TABLE data_assets ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'EUR';
    ALTER TABLE data_assets ADD COLUMN IF NOT EXISTS billing_period TEXT;
    ALTER TABLE data_assets ADD COLUMN IF NOT EXISTS is_public_marketplace BOOLEAN DEFAULT false;
    ALTER TABLE data_assets DROP CONSTRAINT IF EXISTS check_pricing_consistency;
    ALTER TABLE data_assets ADD CONSTRAINT check_pricing_consistency 
        CHECK ((pricing_model = 'free' AND price = 0) OR (pricing_model != 'free' AND price >= 0));
EXCEPTION WHEN others THEN RAISE NOTICE 'Error alterando data_assets: %', SQLERRM; END $$;

-- BLOQUE 2: GESTIÓN TRANSACCIONAL
DO $$ BEGIN
    ALTER TABLE data_transactions ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'na';
    ALTER TABLE data_transactions ADD COLUMN IF NOT EXISTS payment_provider_id TEXT;
    ALTER TABLE data_transactions ADD COLUMN IF NOT EXISTS invoice_url TEXT;
    ALTER TABLE data_transactions ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ;
EXCEPTION WHEN others THEN RAISE NOTICE 'Error alterando data_transactions: %', SQLERRM; END $$;

-- BLOQUE 3: REPUTACIÓN
CREATE TABLE IF NOT EXISTS organization_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES data_transactions(id),
    reviewer_org_id UUID NOT NULL REFERENCES organizations(id),
    target_org_id UUID NOT NULL REFERENCES organizations(id),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    metrics JSONB DEFAULT '{"data_quality": 0, "delivery_speed": 0}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(transaction_id, reviewer_org_id)
);

ALTER TABLE organization_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lecturas públicas de reviews" ON organization_reviews;
CREATE POLICY "Lecturas públicas de reviews" ON organization_reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Crear reviews propias" ON organization_reviews;
CREATE POLICY "Crear reviews propias" ON organization_reviews
  FOR INSERT WITH CHECK (
    reviewer_org_id IN (SELECT organization_id FROM user_profiles WHERE user_id = auth.uid())
  );

-- BLOQUE 4: PERFIL COMERCIAL
DO $$ BEGIN
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS marketplace_description TEXT;
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS seller_category TEXT;
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS kyb_verified BOOLEAN DEFAULT false;
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS stripe_connect_id TEXT;
EXCEPTION WHEN others THEN RAISE NOTICE 'Error alterando organizations: %', SQLERRM; END $$;

-- BLOQUE 5: VISTA ANALÍTICA
CREATE OR REPLACE VIEW marketplace_listings AS
SELECT 
    da.id AS asset_id,
    da.product_id,
    dp.name AS product_name,
    dp.description AS product_description,
    dp.category,
    dp.version,
    da.subject_org_id AS provider_id,
    org.name AS provider_name,
    org.seller_category,
    org.kyb_verified,
    da.pricing_model,
    da.price,
    da.currency,
    da.billing_period,
    COALESCE((SELECT report_year FROM esg_reports WHERE organization_id = org.id ORDER BY report_year DESC LIMIT 1), 0) > 0 AS has_green_badge,
    (SELECT energy_renewable_percent FROM esg_reports WHERE organization_id = org.id ORDER BY report_year DESC LIMIT 1) AS energy_renewable_percent,
    COALESCE((SELECT AVG(rating) FROM organization_reviews WHERE target_org_id = org.id), 0) AS reputation_score,
    (SELECT COUNT(*) FROM organization_reviews WHERE target_org_id = org.id) AS review_count,
    da.created_at
FROM data_assets da
JOIN data_products dp ON da.product_id = dp.id
JOIN organizations org ON da.subject_org_id = org.id
WHERE da.is_public_marketplace = true AND da.status = 'available';