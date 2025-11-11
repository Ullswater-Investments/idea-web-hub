# ARQUITECTURA PROCUREDATA - FASE 1 COMPLETADA

## ✅ Implementación Actual

### 1. Base de Datos

#### Tablas Creadas:
- **organizations**: Organizaciones participantes (consumer, provider, data_holder)
- **user_profiles**: Perfiles de usuario vinculados a organizaciones
- **user_roles**: Sistema de roles separado para seguridad

#### Enums:
- **organization_type**: 'consumer', 'provider', 'data_holder'
- **app_role**: 'admin', 'approver', 'viewer', 'api_configurator'

#### Funciones de Seguridad:
- `has_role()`: Verifica roles con SECURITY DEFINER (evita recursión RLS)
- `get_user_organization()`: Obtiene organización del usuario
- `update_updated_at_column()`: Actualiza timestamps automáticamente

#### Políticas RLS Implementadas:
- ✅ Todos los usuarios autenticados pueden ver organizaciones
- ✅ Solo admins pueden crear/modificar organizaciones
- ✅ Los usuarios pueden ver perfiles de su organización
- ✅ Los usuarios pueden gestionar su propio perfil
- ✅ Los usuarios pueden ver roles de su organización
- ✅ Solo admins pueden gestionar roles

### 2. Autenticación

#### Hook useAuth:
- ✅ Gestión de sesiones con Supabase Auth
- ✅ signUp() con redirect automático
- ✅ signIn() con navegación a dashboard
- ✅ signOut() con limpieza de sesión
- ✅ Listeners de cambio de estado de auth
- ✅ Notificaciones con toast

#### Configuración:
- ✅ Auto-confirmación de email (modo desarrollo)
- ✅ Registro habilitado
- ✅ Usuarios anónimos deshabilitados

### 3. Routing y Páginas

#### Rutas Implementadas:
- `/` → Redirige a `/dashboard`
- `/auth` → Página de login/registro (tabs)
- `/dashboard` → Dashboard principal (protegido)
- `/*` → Página 404

#### Componentes:
- **ProtectedRoute**: Protege rutas que requieren autenticación
- **AuthProvider**: Proveedor de contexto de autenticación
- **Auth**: Página de login/registro con tabs
- **Dashboard**: Dashboard principal con estado del sistema

### 4. Diseño

#### Sistema de Tokens (index.css):
- Colores semánticos en HSL para light/dark mode
- Variables CSS para todos los componentes
- Tokens de sidebar configurados

## 📋 Próximos Pasos (Fases Pendientes)

### FASE 2: Catálogo de Datos ✅ COMPLETADA
- [x] Tabla `data_products` - Productos de datos con esquema y versiones
- [x] Tabla `data_assets` - Activos disponibles por proveedor
- [x] Tabla `catalog_metadata` - Metadatos, tags y categorías
- [x] Página `/catalog` con búsqueda y filtros
- [x] Página `/catalog/product/:id` con detalle completo
- [x] Filtros por categoría y búsqueda por nombre
- [x] Visualización de proveedores y disponibilidad
- [x] Datos de prueba cargados
- [x] Integración completa con RLS

### FASE 3: Motor de Gobernanza ✅ COMPLETADA
- [x] Tabla `data_transactions` con máquina de estados (8 estados)
- [x] Tabla `approval_history` con acciones pre_approve/approve/deny
- [x] Tabla `data_policies` con políticas ODRL 2.0 en JSON
- [x] Wizard de solicitud (5 pasos) con validación Zod
- [x] Dashboard contextual `/requests` con tabs por rol
- [x] Sistema de aprobaciones multi-actor (Subject → Holder)
- [x] Generación automática de políticas ODRL
- [x] Función DB `get_pending_transactions()` para consultas eficientes
- [x] RLS policies completas para multi-tenancy
- [x] Integración completa con catálogo (botón "Solicitar Datos" funcional)

### FASE 4: Visualización y Exportación (2 semanas) - PRÓXIMO
- [ ] Página `/data/view/:transaction_id`
- [ ] Página `/data/export/:transaction_id`
- [ ] Integración básica con ERP

### FASE 5: Configuración de Sistemas (2 semanas)
- [ ] Tabla `erp_configurations`
- [ ] Página `/settings/api-config`
- [ ] Test de conexión (Edge Function)
- [ ] Mapeo de campos JSON

### FASE 6: Integraciones Externas (3-4 semanas)
- [ ] Integración con EDC (Eclipse Dataspace Connector)
- [ ] Integración con SSI Wallet
- [ ] Edge Functions:
  - `edc-connector-orchestrator`
  - `ssi-wallet-manager`
  - `catalog-sync`

## 🔐 Seguridad Implementada

### Medidas de Seguridad:
1. **Roles en tabla separada**: Previene escalación de privilegios
2. **RLS en todas las tablas**: Aislamiento multi-tenant
3. **Funciones SECURITY DEFINER**: Evitan recursión en policies
4. **Validación server-side**: No confiamos en cliente
5. **Autenticación requerida**: Todas las rutas críticas protegidas

### Advertencias Importantes:
- ⚠️ Nunca verificar roles desde localStorage/sessionStorage
- ⚠️ Siempre usar `has_role()` para verificación de permisos
- ⚠️ No exponer auth.users directamente (usar user_profiles)
- ⚠️ Mantener user_id NOT NULL en tablas con RLS

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 📊 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn
│   ├── ProtectedRoute.tsx
│   └── NavLink.tsx
├── hooks/
│   └── useAuth.tsx      # Hook de autenticación
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts     # Types auto-generados
├── pages/
│   ├── Index.tsx        # Redirect a dashboard
│   ├── Auth.tsx         # Login/Registro
│   ├── Dashboard.tsx    # Dashboard principal
│   ├── Catalog.tsx      # Catálogo de datos
│   ├── ProductDetail.tsx # Detalle de producto
│   ├── Requests.tsx     # Gestión de solicitudes
│   ├── RequestWizard.tsx # Wizard de solicitud (5 pasos)
│   └── NotFound.tsx
├── App.tsx
├── index.css            # Design system
└── main.tsx

supabase/
└── config.toml
```

## 🎯 Estado Actual

**Fase 1 (Fundación): ✅ 100% COMPLETA**
- Base de datos configurada
- Autenticación funcional
- Routing implementado
- Sistema de roles operativo
- Seguridad RLS activa

**Fase 2 (Catálogo de Datos): ✅ 100% COMPLETA**
- Tablas de productos, activos y metadatos creadas
- Página de catálogo con búsqueda y filtros
- Página de detalle de producto con proveedores
- Datos de prueba cargados (4 productos, 5 activos)
- RLS policies implementadas

**Fase 3 (Motor de Gobernanza): ✅ 100% COMPLETA**
- Tablas de transacciones, historial y políticas creadas
- Wizard de solicitud de 5 pasos con validación
- Dashboard de solicitudes contextual por rol
- Sistema de aprobaciones Subject → Holder
- Generación automática de políticas ODRL 2.0
- Máquina de estados con 8 estados
- Función DB para consultas eficientes
- Integración completa con catálogo

**Próximo Objetivo**: Iniciar Fase 4 (Visualización y Exportación)
