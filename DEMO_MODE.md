# 🎭 Modo Demostración - PROCUREDATA

## Descripción General

El **Modo Demo** permite explorar todas las funcionalidades de PROCUREDATA sin afectar datos de producción. El usuario demo tiene acceso a múltiples organizaciones, permitiendo experimentar con los tres roles del sistema.

## Acceso Rápido

### Opción 1: Botón Demo (Recomendado)
1. Ir a la página de login: `/auth`
2. Hacer clic en el botón **🎭 Acceder a Versión Demo**
3. El sistema automáticamente:
   - Registra el usuario demo si no existe
   - Hace login automático
   - Configura 6 organizaciones con sus roles

### Opción 2: Credenciales Manuales
- **Email**: `demo@procuredata.app`
- **Contraseña**: `demo123456`

## Organizaciones Demo

El usuario demo tiene acceso a **6 organizaciones** para explorar todos los roles:

### Consumers (Consumidores de Datos)
1. **NovaTech Solutions S.L.**
   - Rol: Usuario
   - Puede crear solicitudes de datos

2. **Fabricaciones Reunidas S.A.U.**
   - Rol: Usuario
   - Puede crear solicitudes de datos

### Holders (Poseedores de Datos)
3. **ACME Industrial S.L.**
   - Rol: Admin
   - Puede aprobar como poseedor final
   - Tiene activos de datos disponibles

4. **Gestión Logística Global S.A.**
   - Rol: Admin
   - Puede aprobar como poseedor final
   - Tiene activos de datos disponibles

### Providers (Sujetos de Datos - Proveedores)
5. **Tornillería TÉCNICA S.A.**
   - Rol: Admin
   - Puede pre-aprobar como sujeto de datos

6. **Soluciones Químicas del Sur S.L.**
   - Rol: Admin
   - Puede pre-aprobar como sujeto de datos

## Flujo de Demostración Completo

### Escenario 1: Solicitud de Datos Completa

1. **Como Consumer (NovaTech)**:
   - Cambiar a organización: "NovaTech Solutions S.L."
   - Ir a `/catalog` y explorar activos disponibles
   - Solicitar datos de un proveedor (ej: Tornillería TÉCNICA)
   - Ver la transacción en estado `initiated`

2. **Como Subject (Tornillería)**:
   - Cambiar a organización: "Tornillería TÉCNICA S.A."
   - Ir a `/requests` 
   - Ver solicitudes pendientes de pre-aprobación
   - Pre-aprobar la solicitud → estado cambia a `pending_holder`

3. **Como Holder (ACME)**:
   - Cambiar a organización: "ACME Industrial S.L."
   - Ir a `/requests`
   - Ver solicitudes pendientes de aprobación final
   - Aprobar la solicitud → estado cambia a `approved`

4. **Volver a Consumer (NovaTech)**:
   - Ir a `/data-view`
   - Ver los datos del proveedor aprobados
   - Exportar a CSV
   - Enviar a ERP (si está configurado)

### Escenario 2: Configuración ERP

1. Cambiar a cualquier organización con rol Admin
2. Ir a `/settings/erp-config`
3. Crear nueva configuración ERP
4. Probar conexión
5. Enviar datos de transacciones completadas

## Indicadores Visuales

### Banner de Demostración
- Un banner amarillo aparece en la parte superior de todas las páginas
- Texto: "🎭 MODO DEMOSTRACIÓN - Los datos mostrados son sintéticos y no afectan al entorno de producción"

### Selector de Organización
- Ubicado en el header, al lado del email del usuario
- Muestra la organización activa y su rol
- Permite cambiar rápidamente entre organizaciones
- Las organizaciones demo tienen un badge "Demo"

## Datos Sintéticos Incluidos

### Organizaciones
- **30+ organizaciones demo** distribuidas en:
  - 9 Consumers
  - 9 Holders  
  - 12 Providers

### Productos de Datos
- "Alta de Proveedor - Datos Básicos"
- Esquema definido para información de proveedores

### Activos de Datos
- 10 activos vinculados a diferentes holders
- Metadatos de catálogo configurados
- Categorías y tags para búsqueda

### Transacciones
- Transacciones en diferentes estados:
  - `pending_subject`: Esperando pre-aprobación del proveedor
  - `pending_holder`: Esperando aprobación final del poseedor
  - `completed`: Transacción completada con datos disponibles
  - `approved`: Aprobada y lista para completar
  - `initiated`: Recién creada

### Datos de Proveedores
- Información completa de proveedores (supplier_data):
  - Nombre comercial y legal
  - NIF/CIF
  - Direcciones fiscal y legal
  - Contactos
  - Administradores legales

## Arquitectura Técnica

### Base de Datos
- Campo `is_demo` en tabla `organizations` identifica organizaciones demo
- Mismo esquema y RLS que producción
- Aislamiento lógico, no físico

### Autenticación
- Usuario demo creado automáticamente al hacer clic en el botón
- Trigger `on_demo_user_created` configura perfiles y roles automáticamente
- Constraints únicos previenen duplicados

### Contexto de Organización
- Hook `useOrganizationContext` gestiona la organización activa
- Estado almacenado en `sessionStorage`
- Cambio de contexto sin necesidad de logout/login

## Limitaciones del Modo Demo

1. **No se pueden eliminar organizaciones demo** (tienen `is_demo = true`)
2. **Los datos son sintéticos** - nombres, direcciones y contactos son ficticios
3. **El usuario demo no puede modificar su email o contraseña**
4. **Las notificaciones por email** se envían pero a direcciones ficticias

## Testing y Desarrollo

### Resetear Usuario Demo
Si necesitas resetear el usuario demo:

```sql
-- Eliminar perfiles y roles
DELETE FROM user_roles 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'demo@procuredata.app');

DELETE FROM user_profiles 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'demo@procuredata.app');

-- El trigger recreará automáticamente los perfiles en el próximo login
```

### Agregar Más Organizaciones Demo
Para agregar una nueva organización al usuario demo, editar la función `setup_demo_user()` en la migración.

## Soporte

Para preguntas sobre el modo demo:
1. Revisar este documento
2. Consultar `ARCHITECTURE.md` para detalles técnicos
3. Ver `scripts/setup-demo-user.sql` para el script manual de configuración

---

**Nota**: El modo demo está diseñado para evaluación y demostración. Para uso en producción, crear usuarios y organizaciones reales con datos verificados.
