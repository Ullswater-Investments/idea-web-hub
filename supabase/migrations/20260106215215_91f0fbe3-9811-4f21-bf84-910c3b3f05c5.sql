-- Asignar provider_org_id a los servicios premium usando PROCUREDATA Core
UPDATE value_services 
SET provider_org_id = '22222222-0000-0000-0000-000000000004'
WHERE provider_org_id IS NULL;