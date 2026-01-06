import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface UserPreferences {
  // Privacidad
  profile_visible: boolean;
  show_access_history: boolean;
  access_alerts: boolean;
  anonymous_research: boolean;
  // Canales de notificación
  email_notifications: boolean;
  push_notifications: boolean;
  in_app_notifications: boolean;
  // Tipos de alertas
  notify_data_requests: boolean;
  notify_payments: boolean;
  notify_contracts: boolean;
  notify_system: boolean;
  notify_marketing: boolean;
  // Frecuencia
  weekly_digest: boolean;
  instant_alerts: boolean;
  quiet_hours_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  profile_visible: true,
  show_access_history: true,
  access_alerts: true,
  anonymous_research: false,
  email_notifications: true,
  push_notifications: true,
  in_app_notifications: true,
  notify_data_requests: true,
  notify_payments: true,
  notify_contracts: true,
  notify_system: true,
  notify_marketing: false,
  weekly_digest: false,
  instant_alerts: true,
  quiet_hours_enabled: false,
  quiet_hours_start: "22:00",
  quiet_hours_end: "08:00",
};

export const usePrivacyPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  // Load preferences on mount
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const loadPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from("privacy_preferences")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error loading preferences:", error);
          return;
        }

        if (data) {
          setPreferences({
            profile_visible: data.profile_visible ?? true,
            show_access_history: data.show_access_history ?? true,
            access_alerts: data.access_alerts ?? true,
            anonymous_research: data.anonymous_research ?? false,
            email_notifications: data.email_notifications ?? true,
            push_notifications: data.push_notifications ?? true,
            in_app_notifications: data.in_app_notifications ?? true,
            notify_data_requests: data.notify_data_requests ?? true,
            notify_payments: data.notify_payments ?? true,
            notify_contracts: data.notify_contracts ?? true,
            notify_system: data.notify_system ?? true,
            notify_marketing: data.notify_marketing ?? false,
            weekly_digest: data.weekly_digest ?? false,
            instant_alerts: data.instant_alerts ?? true,
            quiet_hours_enabled: data.quiet_hours_enabled ?? false,
            quiet_hours_start: data.quiet_hours_start ?? "22:00",
            quiet_hours_end: data.quiet_hours_end ?? "08:00",
          });
        }
      } catch (err) {
        console.error("Failed to load preferences:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user?.id]);

  // Update a single preference with optimistic UI
  const updatePreference = useCallback(
    async <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      if (!user?.id) {
        toast.error("Debes iniciar sesión para guardar preferencias");
        return;
      }

      const previousValue = preferences[key];

      // Optimistic update
      setPreferences((prev) => ({ ...prev, [key]: value }));

      try {
        const { error } = await supabase.from("privacy_preferences").upsert(
          {
            user_id: user.id,
            [key]: value,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          }
        );

        if (error) {
          // Rollback on error
          setPreferences((prev) => ({ ...prev, [key]: previousValue }));
          toast.error("Error al guardar configuración");
          console.error("Preference update error:", error);
          return;
        }

        toast.success("Configuración actualizada");
      } catch (err) {
        // Rollback on error
        setPreferences((prev) => ({ ...prev, [key]: previousValue }));
        toast.error("Error al guardar configuración");
        console.error("Failed to update preference:", err);
      }
    },
    [user?.id, preferences]
  );

  return {
    preferences,
    loading,
    updatePreference,
  };
};
