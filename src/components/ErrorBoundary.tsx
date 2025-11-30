import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-muted/20 p-4 text-center">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg max-w-md border border-red-100 dark:border-red-900">
            <div className="bg-red-100 dark:bg-red-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Algo salió mal</h2>
            <p className="text-muted-foreground mb-6">
              El sistema ha detectado un error inesperado. Hemos notificado al equipo técnico.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs font-mono text-left mb-6 overflow-auto max-h-32 text-red-800 dark:text-red-400">
              {this.state.error?.message}
            </div>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full gap-2"
            >
              <RefreshCw className="h-4 w-4" /> Recargar Aplicación
            </Button>
            <Button 
              variant="link" 
              className="mt-2 text-muted-foreground"
              onClick={() => window.location.href = '/dashboard'}
            >
              Volver al Dashboard
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
