-- Script para configurar el usuario demo con acceso multi-organización
-- IMPORTANTE: Este script debe ejecutarse DESPUÉS de que el usuario demo@procuredata.app se haya registrado

-- PASO 1: Registrar al usuario demo@procuredata.app con contraseña: demo123456
-- Usa el botón "🎭 Acceder a Versión Demo" en la página de login (esto intentará login y si no existe, pide registrarse primero)

-- PASO 2: Ejecutar este SQL para asignar perfiles y roles

-- Verificar que el usuario existe
DO $$
DECLARE
  demo_user_id uuid;
BEGIN
  -- Obtener el ID del usuario demo
  SELECT id INTO demo_user_id 
  FROM auth.users 
  WHERE email = 'demo@procuredata.app' 
  LIMIT 1;

  IF demo_user_id IS NULL THEN
    RAISE NOTICE 'ERROR: El usuario demo@procuredata.app no existe. Por favor regístralo primero.';
  ELSE
    RAISE NOTICE 'Usuario demo encontrado: %', demo_user_id;

    -- Eliminar perfiles y roles existentes del usuario demo (por si ya existen)
    DELETE FROM user_roles WHERE user_id = demo_user_id;
    DELETE FROM user_profiles WHERE user_id = demo_user_id;

    -- CREAR PERFILES para 3 organizaciones representativas
    
    -- Perfil 1: Como Consumer (NovaTech Solutions)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (
      demo_user_id,
      '11111111-1111-1111-1111-000000000002', -- NovaTech (Consumer)
      'Usuario Demo',
      'Responsable de Compras'
    );

    -- Perfil 2: Como Holder (ACME Industrial) 
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (
      demo_user_id,
      '11111111-1111-1111-1111-000000000001', -- ACME (Holder)
      'Usuario Demo',
      'Responsable de Datos'
    );

    -- Perfil 3: Como Subject/Provider (Tornillería TÉCNICA)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (
      demo_user_id,
      '11111111-1111-1111-1111-111111111001', -- Tornillería (Provider)
      'Usuario Demo',
      'Administrador'
    );

    -- ASIGNAR ROLES en cada organización
    
    -- Rol en NovaTech (Consumer) - puede crear solicitudes
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (demo_user_id, '11111111-1111-1111-1111-000000000002', 'user');

    -- Rol en ACME (Holder) - puede aprobar como holder
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (demo_user_id, '11111111-1111-1111-1111-000000000001', 'admin');

    -- Rol en Tornillería (Provider) - puede aprobar como subject
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (demo_user_id, '11111111-1111-1111-1111-111111111001', 'admin');

    -- Agregar acceso a más organizaciones para exploración completa
    
    -- Fabricaciones Reunidas (Consumer)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (demo_user_id, '11111111-1111-1111-1111-000000000004', 'Usuario Demo', 'Analista');
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (demo_user_id, '11111111-1111-1111-1111-000000000004', 'user');

    -- Gestión Logística (Holder)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (demo_user_id, '11111111-1111-1111-1111-000000000003', 'Usuario Demo', 'Gestor de Datos');
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (demo_user_id, '11111111-1111-1111-1111-000000000003', 'admin');

    -- Soluciones Químicas (Provider)
    INSERT INTO user_profiles (user_id, organization_id, full_name, position)
    VALUES (demo_user_id, '11111111-1111-1111-1111-111111111002', 'Usuario Demo', 'Representante');
    INSERT INTO user_roles (user_id, organization_id, role)
    VALUES (demo_user_id, '11111111-1111-1111-1111-111111111002', 'admin');

    RAISE NOTICE '✅ Usuario demo configurado con 6 organizaciones';
    RAISE NOTICE '   - 2 Consumers: NovaTech, Fabricaciones Reunidas';
    RAISE NOTICE '   - 2 Holders: ACME, Gestión Logística';  
    RAISE NOTICE '   - 2 Providers: Tornillería, Soluciones Químicas';
  END IF;
END $$;

-- VERIFICACIÓN: Ver los perfiles y roles creados
SELECT 
  up.full_name,
  o.name as organization,
  o.type as org_type,
  ur.role
FROM user_profiles up
JOIN organizations o ON up.organization_id = o.id
JOIN user_roles ur ON ur.user_id = up.user_id AND ur.organization_id = up.organization_id
WHERE up.user_id = (SELECT id FROM auth.users WHERE email = 'demo@procuredata.app' LIMIT 1)
ORDER BY o.type, o.name;
