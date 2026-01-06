-- Insertar datos demo para audit_logs
INSERT INTO public.audit_logs (organization_id, action, actor_email, resource, details, ip_address)
VALUES
  ('11111111-2222-3333-4444-000000000001', 'DATA_DOWNLOAD', 'demo@retailgiant.com', 'dataset_emissions_q4_2025', '{"file_size": "2.4MB", "format": "CSV"}', '192.168.1.45'),
  ('11111111-2222-3333-4444-000000000001', 'CONTRACT_APPROVED', 'demo@retailgiant.com', 'contract_456', '{"provider": "NovaTech", "value": "1,200 EUROe"}', '192.168.1.45'),
  ('11111111-2222-3333-4444-000000000002', 'ACCESS_GRANTED', 'admin@greenfinance.com', 'api_key_prod', '{"scope": "read", "expires": "2026-06-01"}', '10.0.0.12'),
  ('11111111-2222-3333-4444-000000000002', 'WALLET_CONNECTED', 'admin@greenfinance.com', 'pontus_x_wallet', '{"address": "0x7b3...8f2d"}', '192.168.1.45'),
  ('11111111-2222-3333-4444-000000000003', 'DATA_PUBLISH', 'data@logisticsai.com', 'logistics_manifest_2026', '{"records": 15420, "verified": true}', '192.168.1.45'),
  ('11111111-2222-3333-4444-000000000004', 'DATA_REQUEST', 'compras@ecotech.es', 'supplier_data_import', '{"supplier": "Tornillería TÉCNICA", "fields": 12}', '85.62.14.203'),
  ('11111111-2222-3333-4444-000000000001', 'CONFIG_UPDATE', 'demo@retailgiant.com', 'erp_sap_config', '{"field": "endpoint_url", "action": "modified"}', '192.168.1.45'),
  ('11111111-2222-3333-4444-000000000005', 'DATA_UPLOAD', 'analyst@agridata.eu', 'crop_yields_2025', '{"records": 8240, "format": "JSON"}', '91.23.145.78'),
  ('11111111-2222-3333-4444-000000000003', 'ACCESS_REVOKED', 'security@logisticsai.com', 'api_key_staging', '{"reason": "rotation_policy"}', '10.0.0.55');