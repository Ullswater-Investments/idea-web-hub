-- Crear enum para tipos de organización
CREATE TYPE public.organization_type AS ENUM ('consumer', 'provider', 'data_holder');

-- Crear enum para roles de usuario (CRÍTICO: separado por seguridad)
CREATE TYPE public.app_role AS ENUM ('admin', 'approver', 'viewer', 'api_configurator');

-- Tabla de organizaciones participantes
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tax_id TEXT NOT NULL UNIQUE,
  type organization_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de perfiles de usuario (vinculados a organizaciones)
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  full_name TEXT,
  position TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, organization_id)
);

-- Tabla de roles de usuario (CRÍTICO: separada por seguridad anti-escalación)
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, organization_id, role)
);

-- Función de seguridad para verificar roles (SECURITY DEFINER evita recursión RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _organization_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND organization_id = _organization_id
      AND role = _role
  )
$$;

-- Función para obtener la organización del usuario
CREATE OR REPLACE FUNCTION public.get_user_organization(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id
  FROM public.user_profiles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Habilitar RLS en todas las tablas
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para organizations
CREATE POLICY "Los usuarios pueden ver organizaciones"
ON public.organizations
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Solo admins pueden insertar organizaciones"
ON public.organizations
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'));

CREATE POLICY "Solo admins pueden actualizar organizaciones"
ON public.organizations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), public.get_user_organization(auth.uid()), 'admin'));

-- Políticas RLS para user_profiles
CREATE POLICY "Los usuarios pueden ver perfiles de su organización"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- Políticas RLS para user_roles (solo admins pueden gestionar roles)
CREATE POLICY "Los usuarios pueden ver roles de su organización"
ON public.user_roles
FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Solo admins pueden gestionar roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), organization_id, 'admin'));

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Función trigger para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Por ahora no creamos perfil automáticamente
  -- El usuario deberá vincularse a una organización después del registro
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();