-- Crear función para configurar automáticamente el usuario demo
CREATE OR REPLACE FUNCTION setup_demo_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Solo actuar si es el usuario demo
  IF NEW.email = 'demo@procuredata.app' THEN
    
    -- CREAR PERFILES para múltiples organizaciones
    
    -- Perfil 1: NovaTech (Consumer)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (NEW.id, '11111111-1111-1111-1111-000000000002', 'Usuario Demo', 'Responsable de Compras')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (NEW.id, '11111111-1111-1111-1111-000000000002', 'user')
    ON CONFLICT DO NOTHING;

    -- Perfil 2: ACME (Holder)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (NEW.id, '11111111-1111-1111-1111-000000000001', 'Usuario Demo', 'Responsable de Datos')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (NEW.id, '11111111-1111-1111-1111-000000000001', 'admin')
    ON CONFLICT DO NOTHING;

    -- Perfil 3: Tornillería (Provider)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (NEW.id, '11111111-1111-1111-1111-111111111001', 'Usuario Demo', 'Administrador')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (NEW.id, '11111111-1111-1111-1111-111111111001', 'admin')
    ON CONFLICT DO NOTHING;

    -- Perfil 4: Fabricaciones Reunidas (Consumer)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (NEW.id, '11111111-1111-1111-1111-000000000004', 'Usuario Demo', 'Analista')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (NEW.id, '11111111-1111-1111-1111-000000000004', 'user')
    ON CONFLICT DO NOTHING;

    -- Perfil 5: Gestión Logística (Holder)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (NEW.id, '11111111-1111-1111-1111-000000000003', 'Usuario Demo', 'Gestor de Datos')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (NEW.id, '11111111-1111-1111-1111-000000000003', 'admin')
    ON CONFLICT DO NOTHING;

    -- Perfil 6: Soluciones Químicas (Provider)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (NEW.id, '11111111-1111-1111-1111-111111111002', 'Usuario Demo', 'Representante')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (NEW.id, '11111111-1111-1111-1111-111111111002', 'admin')
    ON CONFLICT DO NOTHING;

  END IF;
  
  RETURN NEW;
END;
$$;

-- Crear trigger para ejecutar la función cuando se registre un usuario
DROP TRIGGER IF EXISTS on_demo_user_created ON auth.users;
CREATE TRIGGER on_demo_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION setup_demo_user();

-- Agregar constraint único compuesto en user_profiles para evitar duplicados
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_user_org_unique;
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_user_org_unique 
  UNIQUE (user_id, organization_id);

-- Agregar constraint único compuesto en user_roles para evitar duplicados  
ALTER TABLE user_roles DROP CONSTRAINT IF EXISTS user_roles_user_org_role_unique;
ALTER TABLE user_roles ADD CONSTRAINT user_roles_user_org_role_unique 
  UNIQUE (user_id, organization_id, role);