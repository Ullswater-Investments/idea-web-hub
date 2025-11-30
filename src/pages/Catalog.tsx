import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Star, Leaf, ShieldCheck, Search, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MarketplaceListing {
  asset_id: string;
  product_id: string;
  product_name: string;
  product_description: string;
  category: string;
  version: string;
  provider_id: string;
  provider_name: string;
  seller_category: string | null;
  kyb_verified: boolean;
  pricing_model: string;
  price: number;
  currency: string;
  billing_period: string | null;
  has_green_badge: boolean;
  energy_renewable_percent: number | null;
  reputation_score: number;
  review_count: number;
  created_at: string;
}

const Catalog = () => {
  const navigate = useNavigate();
  const { activeOrg } = useOrganizationContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sustainabilityFilter, setSustainabilityFilter] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  const { data: listings, isLoading } = useQuery({
    queryKey: ["marketplace-listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplace_listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as MarketplaceListing[];
    },
  });

  const isProvider = activeOrg?.type === 'provider' || activeOrg?.type === 'data_holder';

  // Filtrado
  const filteredListings = listings?.filter((listing) => {
    const matchesSearch = 
      listing.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.provider_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice = 
      priceFilter === "all" ||
      (priceFilter === "free" && listing.pricing_model === "free") ||
      (priceFilter === "paid" && listing.pricing_model !== "free");

    const matchesSustainability = !sustainabilityFilter || listing.has_green_badge;

    const matchesRating = listing.reputation_score >= minRating;

    return matchesSearch && matchesPrice && matchesSustainability && matchesRating;
  });

  const renderStars = (score: number) => {
    const stars = [];
    const roundedScore = Math.round(score);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i < roundedScore ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
        />
      );
    }
    return stars;
  };

  const formatPrice = (listing: MarketplaceListing) => {
    if (listing.pricing_model === "free") {
      return <span className="text-2xl font-bold text-green-600">Gratis</span>;
    }
    
    const priceStr = `${listing.price} ${listing.currency}`;
    const periodStr = listing.billing_period ? `/${listing.billing_period}` : "";
    
    return (
      <div className="text-right">
        <span className="text-2xl font-bold text-primary">{priceStr}</span>
        {periodStr && <span className="text-sm text-muted-foreground">{periodStr}</span>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {isProvider ? 'Mi Catálogo de Productos' : 'Marketplace de Datos'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isProvider 
              ? 'Gestiona los productos que ofreces en el marketplace'
              : 'Explora productos de datos de proveedores verificados'
            }
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por producto, proveedor o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Todos los precios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los precios</SelectItem>
              <SelectItem value="free">Solo Gratis</SelectItem>
              <SelectItem value="paid">De Pago</SelectItem>
            </SelectContent>
          </Select>

          <Select value={minRating.toString()} onValueChange={(v) => setMinRating(Number(v))}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Reputación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Todas</SelectItem>
              <SelectItem value="4">4+ estrellas</SelectItem>
              <SelectItem value="5">5 estrellas</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={sustainabilityFilter ? "default" : "outline"}
            onClick={() => setSustainabilityFilter(!sustainabilityFilter)}
            className="w-full md:w-auto"
          >
            <Leaf className="mr-2 h-4 w-4" />
            Solo ESG
          </Button>

          {isProvider && (
            <Button onClick={() => navigate("/catalog/new")} className="w-full md:w-auto">
              <Package className="mr-2 h-4 w-4" />
              Crear Producto
            </Button>
          )}
        </div>
      </div>

      {/* Listado */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredListings && filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card
              key={listing.asset_id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              onClick={() => navigate(`/catalog/product/${listing.product_id}`)}
            >
              <div className="h-2 bg-gradient-to-r from-primary to-primary/50" />
              
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                      {listing.product_name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {listing.category && (
                        <Badge variant="secondary" className="text-xs">
                          {listing.category}
                        </Badge>
                      )}
                      <span className="text-xs">v{listing.version}</span>
                    </CardDescription>
                  </div>
                  <Package className="h-6 w-6 text-primary shrink-0" />
                </div>

                {/* Proveedor y Badges */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm font-medium truncate">{listing.provider_name}</span>
                  {listing.kyb_verified && (
                    <span title="Verificado KYB">
                      <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                    </span>
                  )}
                  {listing.has_green_badge && (
                    <span title="Certificado ESG">
                      <Leaf className="h-4 w-4 text-green-600 shrink-0" />
                    </span>
                  )}
                </div>

                {/* Reputación */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">{renderStars(listing.reputation_score)}</div>
                  {listing.review_count > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ({listing.review_count})
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                  {listing.product_description || "Sin descripción"}
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between pt-4 border-t">
                <div className="flex-1">
                  {formatPrice(listing)}
                </div>
                <Button variant={isProvider ? "outline" : "default"} size="sm">
                  {isProvider ? "Gestionar" : "Solicitar"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchTerm || priceFilter !== "all" || sustainabilityFilter || minRating > 0
                ? 'No se encontraron productos con esos filtros'
                : 'No hay productos disponibles'}
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              {isProvider 
                ? 'Comienza a ofrecer tus datos en el marketplace'
                : 'Aún no hay productos de datos en el catálogo'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Catalog;