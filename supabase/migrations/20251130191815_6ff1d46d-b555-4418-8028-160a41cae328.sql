-- Script de Generación Masiva de Datos Sintéticos para PROCUREDATA (CORREGIDO)
-- Genera: 50 Organizaciones, 150 Oportunidades, 200 Productos/Assets, 300 Transacciones

DO $$
DECLARE
    demo_user_id UUID;
    new_org_id UUID;
    new_prod_id UUID;
    new_asset_id UUID;
    new_trans_id UUID;
    consumer_org_id_var UUID;
    subject_org_id_var UUID;
    
    sectors text[] := ARRAY['Automotive', 'Energy', 'Healthcare', 'Finance', 'Retail', 'Logistics', 'Smart City', 'Agriculture', 'Manufacturing', 'Telecom'];
    
    prefixes text[] := ARRAY['Nexus', 'Alpha', 'Omega', 'Global', 'Prime', 'Data', 'Quantum', 'Hyper', 'Eco', 'Urban', 'Fin', 'Med', 'Agri', 'Auto'];
    suffixes text[] := ARRAY['Systems', 'Analytics', 'Labs', 'Dynamics', 'Corp', 'Solutions', 'Insights', 'Network', 'Partners', 'Ventures'];
    
    actions text[] := ARRAY['Buscamos', 'Necesitamos', 'Requerimos', 'Compra de', 'Licencia para', 'Ingesta de'];
    data_types text[] := ARRAY['Telemetry', 'Transactions', 'Sensor Logs', 'User Behavior', 'Geospatial Data', 'Market Trends', 'Clinical Trials', 'Weather History', 'Supply Chain Logs'];
    adj text[] := ARRAY['Real-time', 'Historical', 'Anonymized', 'Raw', 'Cleaned', 'Aggregated', 'High-frequency'];
    
    budgets text[] := ARRAY['1k - 5k €', '5k - 10k €', '10k - 50k €', '+50k €', 'Presupuesto Abierto', 'A negociar'];
    
    i integer;
    random_sector text;
    random_price numeric;
    random_model text;
    
BEGIN
    -- Obtener el usuario demo existente
    SELECT user_id INTO demo_user_id 
    FROM public.user_profiles 
    WHERE full_name = 'Usuario Demo' 
    LIMIT 1;
    
    IF demo_user_id IS NULL THEN
        RAISE EXCEPTION 'Usuario demo no encontrado. Ejecuta primero el setup del usuario demo.';
    END IF;
    
    RAISE NOTICE '🚀 Iniciando Inyección Masiva de Datos Sintéticos...';
    RAISE NOTICE 'Usando usuario demo: %', demo_user_id;

    -- =========================================================================
    -- 1. GENERAR 50 ORGANIZACIONES (Actores del Mercado)
    -- =========================================================================
    FOR i IN 1..50 LOOP
        random_sector := sectors[1 + floor(random() * array_length(sectors, 1))];
        
        INSERT INTO public.organizations (
            name, 
            type, 
            tax_id,
            is_demo, 
            sector,
            seller_category, 
            kyb_verified, 
            marketplace_description
        ) VALUES (
            prefixes[1 + floor(random() * array_length(prefixes, 1))] || ' ' || 
            suffixes[1 + floor(random() * array_length(suffixes, 1))] || ' #' || (i + 1000),
            (ARRAY['consumer', 'provider', 'data_holder'])[1 + floor(random() * 3)]::organization_type,
            'B' || lpad((20000000 + i)::text, 8, '0'),
            true,
            random_sector,
            (ARRAY['enterprise', 'startup', 'sme'])[1 + floor(random() * 3)],
            (random() > 0.2),
            'Empresa líder en innovación tecnológica enfocada en el sector ' || random_sector || '.'
        ) RETURNING id INTO new_org_id;

        -- Asociar el usuario demo a esta organización
        INSERT INTO public.user_profiles (user_id, organization_id, full_name, position)
        VALUES (demo_user_id, new_org_id, 'Usuario Demo', 'Gestor de Datos')
        ON CONFLICT (user_id, organization_id) DO NOTHING;
        
        INSERT INTO public.user_roles (user_id, organization_id, role)
        VALUES (demo_user_id, new_org_id, 'viewer'::app_role)
        ON CONFLICT (user_id, organization_id, role) DO NOTHING;

        -- Crear Wallet con fondos
        INSERT INTO public.wallets (organization_id, address, balance)
        VALUES (new_org_id, '0x' || md5(random()::text), floor(random() * 100000));
        
        -- 30% tienen reporte ESG
        IF (random() > 0.7) THEN
            INSERT INTO public.esg_reports (
                organization_id, 
                report_year, 
                scope1_total_tons, 
                scope2_total_tons,
                energy_renewable_percent,
                certifications
            )
            VALUES (
                new_org_id, 
                2024, 
                floor(random() * 500)::numeric, 
                floor(random() * 300)::numeric,
                floor(random() * 100)::numeric,
                ARRAY['ISO 14001', 'ISO 50001']
            ) ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;

    RAISE NOTICE '✅ Paso 1/4: 50 Organizaciones creadas';

    -- =========================================================================
    -- 2. GENERAR 150 OPORTUNIDADES (El Tablón de Demandas)
    -- =========================================================================
    FOR i IN 1..150 LOOP
        random_sector := sectors[1 + floor(random() * array_length(sectors, 1))];
        
        INSERT INTO public.marketplace_opportunities (
            consumer_org_id,
            title,
            description,
            budget_range,
            category,
            expires_at,
            status
        )
        SELECT 
            id,
            actions[1 + floor(random() * array_length(actions, 1))] || ' ' || 
            adj[1 + floor(random() * array_length(adj, 1))] || ' ' || 
            data_types[1 + floor(random() * array_length(data_types, 1))],
            'Estamos desarrollando un modelo de IA para ' || random_sector || 
            ' y necesitamos datasets de alta calidad para entrenamiento. Preferencia por formatos JSON/Parquet.',
            budgets[1 + floor(random() * array_length(budgets, 1))],
            random_sector,
            NOW() + (floor(random() * 60) || ' days')::interval,
            (ARRAY['active', 'active', 'active', 'closed'])[1 + floor(random() * 4)]
        FROM public.organizations 
        WHERE type = 'consumer' AND is_demo = true 
        ORDER BY random() LIMIT 1;
    END LOOP;

    RAISE NOTICE '✅ Paso 2/4: 150 Oportunidades creadas';

    -- =========================================================================
    -- 3. GENERAR 200 PRODUCTOS Y ASSETS (El Catálogo)
    -- =========================================================================
    FOR i IN 1..200 LOOP
        random_sector := sectors[1 + floor(random() * array_length(sectors, 1))];
        random_model := (ARRAY['free', 'subscription', 'one_time', 'usage'])[1 + floor(random() * 4)];
        
        IF random_model = 'free' THEN 
            random_price := 0;
        ELSE 
            random_price := (floor(random() * 500) + 10) * 10; 
        END IF;

        -- Crear Producto Padre
        INSERT INTO public.data_products (
            name, 
            description, 
            category, 
            version
        ) VALUES (
            data_types[1 + floor(random() * array_length(data_types, 1))] || ' ' || random_sector || ' Pack',
            'Dataset completo y verificado para analítica avanzada en el sector ' || random_sector,
            random_sector,
            'v' || floor(random()*5 + 1) || '.0'
        ) RETURNING id INTO new_prod_id;

        -- Seleccionar Proveedor Random (que sea provider o data_holder)
        SELECT id INTO new_org_id 
        FROM public.organizations 
        WHERE type IN ('provider', 'data_holder') AND is_demo = true 
        ORDER BY random() LIMIT 1;

        -- Crear Activo (Listing)
        INSERT INTO public.data_assets (
            product_id, 
            subject_org_id, 
            holder_org_id,
            is_public_marketplace,
            pricing_model, 
            price, 
            currency, 
            billing_period,
            status,
            custom_metadata
        ) VALUES (
            new_prod_id, 
            new_org_id, 
            new_org_id,
            true,
            random_model,
            random_price,
            'EUR',
            CASE WHEN random_model = 'subscription' THEN 'monthly' ELSE NULL END,
            'available',
            jsonb_build_object(
                'sample_data', ARRAY[
                    jsonb_build_object('id', 1, 'value', 23.5, 'status', 'OK', 'ts', '2024-01-01T10:00:00Z'),
                    jsonb_build_object('id', 2, 'value', 24.1, 'status', 'OK', 'ts', '2024-01-01T10:05:00Z'),
                    jsonb_build_object('id', 3, 'value', 22.8, 'status', 'WARN', 'ts', '2024-01-01T10:10:00Z')
                ],
                'format', 'JSON',
                'update_frequency', 'real-time'
            )
        ) RETURNING id INTO new_asset_id;
    END LOOP;

    RAISE NOTICE '✅ Paso 3/4: 200 Productos/Assets creados';

    -- =========================================================================
    -- 4. GENERAR 300 TRANSACCIONES HISTÓRICAS (Reputación)
    -- =========================================================================
    FOR i IN 1..300 LOOP
        -- Seleccionar Activo Random
        SELECT da.id, da.subject_org_id, da.holder_org_id, da.price 
        INTO new_asset_id, subject_org_id_var, new_org_id, random_price
        FROM public.data_assets da
        WHERE da.is_public_marketplace = true 
        ORDER BY random() LIMIT 1;

        -- Seleccionar Consumer Random
        SELECT id INTO consumer_org_id_var
        FROM public.organizations 
        WHERE type = 'consumer' AND is_demo = true 
        ORDER BY random() LIMIT 1;

        -- Insertar Transacción Completada
        INSERT INTO public.data_transactions (
            consumer_org_id, 
            subject_org_id, 
            holder_org_id, 
            asset_id, 
            status, 
            purpose,
            justification,
            payment_status, 
            created_at,
            requested_by,
            access_duration_days,
            metadata
        ) VALUES (
            consumer_org_id_var,
            subject_org_id_var,
            new_org_id,
            new_asset_id,
            'completed'::transaction_status,
            'Adquisición de datos para análisis predictivo',
            'Necesario para modelo de Machine Learning en desarrollo',
            'paid',
            NOW() - (floor(random() * 180) || ' days')::interval,
            demo_user_id,
            90,
            jsonb_build_object(
                'priority', (ARRAY['Media', 'Alta', 'Crítica'])[1 + floor(random() * 3)],
                'tags', ARRAY['Analytics', 'ML'],
                'ticket_id', 'TRX-' || lpad((i + 10000)::text, 6, '0')
            )
        ) RETURNING id INTO new_trans_id;

        -- Insertar Reseña (4 o 5 estrellas mayormente)
        INSERT INTO public.organization_reviews (
            transaction_id, 
            reviewer_org_id, 
            target_org_id, 
            rating, 
            comment, 
            created_at,
            metrics
        ) VALUES (
            new_trans_id, 
            consumer_org_id_var,
            subject_org_id_var,
            (ARRAY[3,4,4,5,5,5])[1 + floor(random() * 6)],
            (ARRAY['Excelente servicio.', 'Buena calidad de datos.', 'Integración sencilla.', 'Soporte rápido.', 'Datos muy útiles para nuestro proyecto.'])[1 + floor(random() * 5)],
            NOW() - (floor(random() * 180) || ' days')::interval,
            jsonb_build_object('data_quality', floor(random() * 5), 'delivery_speed', floor(random() * 5))
        ) ON CONFLICT DO NOTHING;
    END LOOP;

    RAISE NOTICE '✅ Paso 4/4: 300 Transacciones con Reviews creadas';
    RAISE NOTICE '🎉 GENERACIÓN COMPLETADA: Tu marketplace ahora tiene cientos de registros activos!';
END $$;