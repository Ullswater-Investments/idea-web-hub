-- Insertar datos demo para erp_configurations usando el tipo 'download' que existe en el enum
INSERT INTO public.erp_configurations (organization_id, config_name, config_type, endpoint_url, auth_method, is_active, last_test_status, last_test_date)
VALUES
  ('11111111-2222-3333-4444-000000000001', 'SAP S/4HANA Producción', 'download', 'https://sap.retailgiant.com/api/v1', 'bearer', true, 'success', now() - interval '2 hours'),
  ('11111111-2222-3333-4444-000000000001', 'Nodo EDC Madrid', 'upload', 'http://edc.procuredata.eu:8282/protocol', 'api_key', true, 'success', now() - interval '1 day'),
  ('11111111-2222-3333-4444-000000000002', 'Oracle ERP Cloud', 'download', 'https://oracle.greenfinance.com/rest/v2', 'bearer', true, 'pending', null);