-- Corregir función setup_demo_user() reemplazando 'user' por 'viewer'
-- El enum app_role solo acepta: 'admin', 'approver', 'viewer', 'api_configurator'

CREATE OR REPLACE FUNCTION public.setup_demo_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Solo actuar si es el usuario demo
  IF NEW.email = 'demo@procuredata.app' THEN
    
    -- CREAR PERFILES para múltiples organizaciones
    INSERT INTO user_profiles (user_id, organization_id, full_name, position) VALUES
    (NEW.id, '11111111-1111-1111-1111-000000000002', 'Usuario Demo', 'Responsable de Compras'),
    (NEW.id, '11111111-1111-1111-1111-000000000001', 'Usuario Demo', 'Responsable de Datos'),
    (NEW.id, '11111111-1111-1111-1111-111111111001', 'Usuario Demo', 'Administrador'),
    (NEW.id, '11111111-1111-1111-1111-000000000004', 'Usuario Demo', 'Analista'),
    (NEW.id, '11111111-1111-1111-1111-000000000003', 'Usuario Demo', 'Gestor de Datos'),
    (NEW.id, '11111111-1111-1111-1111-111111111002', 'Usuario Demo', 'Representante')
    ON CONFLICT (user_id, organization_id) DO NOTHING;
    
    -- CREAR ROLES (CORREGIDO: viewer en lugar de user)
    INSERT INTO user_roles (user_id, organization_id, role) VALUES
    (NEW.id, '11111111-1111-1111-1111-000000000002', 'viewer'),  -- NovaTech (Consumer)
    (NEW.id, '11111111-1111-1111-1111-000000000001', 'admin'),   -- ACME (Holder)
    (NEW.id, '11111111-1111-1111-1111-111111111001', 'admin'),   -- Tornillería (Provider)
    (NEW.id, '11111111-1111-1111-1111-000000000004', 'viewer'),  -- Fabricaciones Reunidas (Consumer)
    (NEW.id, '11111111-1111-1111-1111-000000000003', 'admin'),   -- Gestión Logística (Holder)
    (NEW.id, '11111111-1111-1111-1111-111111111002', 'admin')    -- Soluciones Químicas (Provider)
    ON CONFLICT (user_id, organization_id, role) DO NOTHING;

    -- INSERTAR TRANSACCIONES DEMO
    INSERT INTO data_transactions (
      id, consumer_org_id, subject_org_id, holder_org_id, asset_id,
      purpose, justification, status, access_duration_days, requested_by
    ) VALUES
    ('55555555-5555-5555-5555-000000000001', '11111111-1111-1111-1111-000000000002', '11111111-1111-1111-1111-111111111001', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000001', 'Alta de nuevo proveedor en sistema ERP', 'Necesitamos incorporar a Tornillería TÉCNICA como proveedor para nueva línea de producción', 'pending_subject', 90, NEW.id),
    ('55555555-5555-5555-5555-000000000002', '11111111-1111-1111-1111-000000000004', '11111111-1111-1111-1111-111111111002', '11111111-1111-1111-1111-000000000003', '33333333-3333-3333-3333-000000000003', 'Validación de proveedor químico para certificación ISO', 'Necesitamos verificar datos del proveedor para cumplir con normativa ISO 14001', 'pending_holder', 60, NEW.id),
    ('55555555-5555-5555-5555-000000000003', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-111111111006', '11111111-1111-1111-1111-000000000007', '33333333-3333-3333-3333-000000000004', 'Evaluación de proveedor biotecnológico', 'Análisis de capacidades técnicas para proyecto de bioenergía renovable', 'completed', 120, NEW.id),
    ('55555555-5555-5555-5555-000000000004', '11111111-1111-1111-1111-000000000002', '11111111-1111-1111-1111-111111111003', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000002', 'Homologación de proveedor electrónico', 'Validación de proveedor de componentes electrónicos para nueva línea IoT', 'initiated', 90, NEW.id),
    ('55555555-5555-5555-5555-000000000005', '11111111-1111-1111-1111-000000000004', '11111111-1111-1111-1111-111111111001', '11111111-1111-1111-1111-000000000001', '33333333-3333-3333-3333-000000000001', 'Alta urgente de proveedor metalúrgico', 'Necesitamos dar de alta a Tornillería TÉCNICA de forma urgente', 'approved', 180, NEW.id)
    ON CONFLICT (id) DO NOTHING;

    -- INSERTAR DATOS DE PROVEEDORES
    INSERT INTO supplier_data (id, transaction_id, company_name, tax_id, legal_name, fiscal_address, contact_person_name, contact_person_email) VALUES
    ('66666666-6666-6666-6666-000000000001', '55555555-5555-5555-5555-000000000003', 'Biocen S.A.', 'A66778899', 'Biocen Sociedad Anónima', '{"country": "ES", "streetType": "Parque", "streetName": "Científico", "streetNumber": "100"}'::jsonb, 'Jorge Hidalgo', 'jorge.hidalgo@biocen.es'),
    ('66666666-6666-6666-6666-000000000002', '55555555-5555-5555-5555-000000000001', 'Tornillería TÉCNICA S.A.', 'A12345678', 'Tornillería TÉCNICA S.A.', '{"country": "ES", "streetType": "Calle", "streetName": "Principal", "streetNumber": "42"}'::jsonb, 'Laura Martín', 'laura.martin@tornilleria.es'),
    ('66666666-6666-6666-6666-000000000003', '55555555-5555-5555-5555-000000000002', 'Soluciones Químicas del Sur S.L.', 'B98765432', 'Soluciones Químicas del Sur S.L.U.', '{"country": "ES", "streetType": "Avenida", "streetName": "de la Innovación", "streetNumber": "88"}'::jsonb, 'Elena Blanco', 'elena.blanco@solquimica.es'),
    ('66666666-6666-6666-6666-000000000004', '55555555-5555-5555-5555-000000000005', 'Tornillería TÉCNICA S.A.', 'A12345678', 'Tornillería TÉCNICA S.A.', '{"country": "ES", "streetType": "Calle", "streetName": "Principal", "streetNumber": "42"}'::jsonb, 'Laura Martín', 'laura.martin@tornilleria.es')
    ON CONFLICT (id) DO NOTHING;

  END IF;
  
  RETURN NEW;
END;
$function$;