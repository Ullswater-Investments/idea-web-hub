import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight, Database, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface ArrayDataViewProps {
  data: any[];
  schemaType: string;
}

export const ArrayDataView = ({ data, schemaType }: ArrayDataViewProps) => {
  const [currentPage, setCurrentPage] = useState(0);
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
                  <div className="flex items-baseline gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-muted-foreground">Máximo:</span>
                    <span className="text-sm font-semibold text-green-600">{stat.max}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-xs text-muted-foreground">Mínimo:</span>
                    <span className="text-sm font-semibold text-red-600">{stat.min}</span>
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
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={timeField} 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    if (typeof value === 'string' && value.includes('T')) {
                      return new Date(value).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
                    }
                    return value;
                  }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Página {currentPage + 1} de {totalPages} · Mostrando {paginatedData.length} de {data.length} registros
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
