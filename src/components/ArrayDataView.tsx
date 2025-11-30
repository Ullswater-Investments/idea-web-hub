import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight, Database, TrendingUp, TrendingDown, Activity, Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ArrayDataViewProps {
  data: any[];
  schemaType: string;
}

export const ArrayDataView = ({ data, schemaType }: ArrayDataViewProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();
  const itemsPerPage = 10;

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay datos disponibles en formato array
      </div>
    );
  }

  // Calculate statistics for numeric fields
  const stats = useMemo(() => {
    if (data.length === 0) return {};
    
    const numericFields = Object.keys(data[0]).filter(key => 
      typeof data[0][key] === 'number'
    );

    return numericFields.reduce((acc, field) => {
      const values = data.map(item => item[field]).filter(v => typeof v === 'number');
      if (values.length === 0) return acc;

      acc[field] = {
        avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
        max: Math.max(...values),
        min: Math.min(...values),
      };
      return acc;
    }, {} as Record<string, { avg: string; max: number; min: number }>);
  }, [data]);

  // Detect time series data
  const timeField = useMemo(() => {
    const firstItem = data[0];
    const timeKeys = Object.keys(firstItem).filter(key => 
      key.includes('date') || key.includes('time') || key === 'hour' || key === 'timestamp'
    );
    return timeKeys[0];
  }, [data]);

  const numericField = useMemo(() => {
    const firstItem = data[0];
    return Object.keys(firstItem).find(key => typeof firstItem[key] === 'number');
  }, [data]);

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const headers = Object.keys(data[0]);

  return (
    <div className="space-y-6">
      {/* Summary Cards for IoT/Numeric Data */}
      {Object.keys(stats).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(stats).slice(0, 3).map(([field, stat]) => (
            <Card key={field}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {field.replace(/_/g, ' ').toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Promedio:</span>
                    <span className="text-lg font-bold">{stat.avg}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-green-600 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> Max: {stat.max}</span>
                    <span className="text-red-600 flex items-center"><TrendingDown className="h-3 w-3 mr-1"/> Min: {stat.min}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Chart for Time Series Data */}
      {timeField && numericField && (
        <Card>
          <CardHeader>
            <CardTitle>Tendencia Temporal</CardTitle>
            <CardDescription>Evolución de {numericField.replace(/_/g, ' ')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey={timeField} hide={isMobile} />
                  <YAxis hide={isMobile} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={numericField} 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Datos Detallados</CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="mt-1">
                  <Database className="h-3 w-3 mr-1" />
                  {data.length} registros totales
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            // --- VISTA MÓVIL (Cards) ---
            <div className="space-y-4">
              {paginatedData.map((row, idx) => (
                <div key={idx} className="border rounded-lg p-4 bg-card shadow-sm space-y-2">
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <span className="font-bold text-sm text-primary">#{idx + 1 + (currentPage * itemsPerPage)}</span>
                    {timeField && <span className="text-xs text-muted-foreground flex items-center"><Calendar className="h-3 w-3 mr-1"/> {new Date(row[timeField]).toLocaleDateString()}</span>}
                  </div>
                  {headers.filter(h => h !== timeField).slice(0, 5).map((header) => (
                    <div key={header} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{header.replace(/_/g, ' ')}:</span>
                      <span className="font-medium truncate max-w-[150px]">{String(row[header])}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            // --- VISTA DESKTOP (Tabla) ---
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHead key={header} className="font-semibold">
                        {header.replace(/_/g, ' ').toUpperCase()}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row, idx) => (
                    <TableRow key={idx}>
                      {headers.map((header) => (
                        <TableCell key={header}>
                          {typeof row[header] === 'object' 
                            ? JSON.stringify(row[header]) 
                            : typeof row[header] === 'number'
                            ? row[header].toLocaleString('es-ES', { maximumFractionDigits: 2 })
                            : row[header]?.toString().includes('T')
                            ? new Date(row[header]).toLocaleString('es-ES')
                            : row[header]?.toString() || '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Paginación Común */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground hidden sm:block">
                Página {currentPage + 1} de {totalPages}
              </p>
              <div className="flex gap-2 w-full sm:w-auto justify-center">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}>
                  <ChevronLeft className="h-4 w-4" /> <span className="sr-only sm:not-sr-only sm:ml-2">Anterior</span>
                </Button>
                <span className="sm:hidden flex items-center text-sm">{currentPage + 1} / {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1}>
                  <span className="sr-only sm:not-sr-only sm:mr-2">Siguiente</span> <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
