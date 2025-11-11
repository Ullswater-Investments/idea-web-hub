-- Corregir roles y perfiles del usuario demo con organizaciones reales
DO $$
DECLARE
  demo_user_id uuid;
  org_acme uuid;
  org_novatech uuid;
  org_tornilleria uuid;
  org_gestion uuid;
  org_fabricaciones uuid;
  org_innovatec uuid;
BEGIN
  -- Buscar el ID del usuario demo
  SELECT id INTO demo_user_id 
  FROM auth.users 
  WHERE email = 'demo@procuredata.app';

  IF demo_user_id IS NULL THEN
    RAISE NOTICE 'Usuario demo no encontrado';
    RETURN;
  END IF;

  -- Obtener IDs de organizaciones demo
  SELECT id INTO org_acme FROM organizations WHERE name = 'ACME Industrial S.L.' AND is_demo = true;
  SELECT id INTO org_novatech FROM organizations WHERE name = 'NovaTech Solutions S.L.' AND is_demo = true;
  SELECT id INTO org_tornilleria FROM organizations WHERE name = 'Tornillería TÉCNICA S.A.' AND is_demo = true;
  SELECT id INTO org_gestion FROM organizations WHERE name = 'Gestión Logística Global S.A.' AND is_demo = true;
  SELECT id INTO org_fabricaciones FROM organizations WHERE name = 'Fabricaciones Reunidas S.A.U.' AND is_demo = true;
  SELECT id INTO org_innovatec FROM organizations WHERE name = 'Innovatec Componentes S.L.' AND is_demo = true;

  -- Eliminar roles y perfiles corruptos existentes
  DELETE FROM user_roles WHERE user_id = demo_user_id;
  DELETE FROM user_profiles WHERE user_id = demo_user_id;
  
  RAISE NOTICE 'Eliminados roles y perfiles corruptos';

  -- Recrear perfiles para 6 organizaciones representativas
  INSERT INTO user_profiles (user_id, organization_id, full_name, position)
  VALUES
    (demo_user_id, org_acme, 'Usuario Demo', 'Evaluador del Sistema'),
    (demo_user_id, org_novatech, 'Usuario Demo', 'Evaluador del Sistema'),
    (demo_user_id, org_tornilleria, 'Usuario Demo', 'Evaluador del Sistema'),
    (demo_user_id, org_gestion, 'Usuario Demo', 'Evaluador del Sistema'),
    (demo_user_id, org_fabricaciones, 'Usuario Demo', 'Evaluador del Sistema'),
    (demo_user_id, org_innovatec, 'Usuario Demo', 'Evaluador del Sistema');

  -- Insertar roles correctos según tipo de organización
  -- Consumers: viewer, Holders/Providers: admin
  INSERT INTO user_roles (user_id, organization_id, role)
  VALUES
    (demo_user_id, org_acme, 'admin'),           -- data_holder
    (demo_user_id, org_novatech, 'viewer'),      -- consumer
    (demo_user_id, org_tornilleria, 'admin'),    -- provider
    (demo_user_id, org_gestion, 'admin'),        -- data_holder
    (demo_user_id, org_fabricaciones, 'viewer'), -- consumer
    (demo_user_id, org_innovatec, 'admin');      -- provider
  
  RAISE NOTICE 'Usuario demo corregido exitosamente con 6 perfiles y roles válidos';
END $$;