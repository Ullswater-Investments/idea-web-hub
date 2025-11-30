import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Code2 } from "lucide-react";
import { toast } from "sonner";

interface CodeIntegrationModalProps {
  assetId: string;
  apiKey?: string;
  productName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function CodeIntegrationModal({ 
  assetId, 
  apiKey = "sk_live_...", 
  productName, 
  open, 
  onOpenChange,
  trigger 
}: CodeIntegrationModalProps) {
  const snippets = {
    curl: `curl -X GET "https://api.procuredata.app/v1/assets/${assetId}/stream" \\
  -H "Authorization: Bearer ${apiKey}"`,
    python: `import pandas as pd
import requests

url = "https://api.procuredata.app/v1/assets/${assetId}/stream"
headers = {"Authorization": "Bearer ${apiKey}"}

response = requests.get(url, headers=headers)
df = pd.DataFrame(response.json()['data'])
print(df.head())`,
    node: `const axios = require('axios');

async function fetchData() {
  const { data } = await axios.get('https://api.procuredata.app/v1/assets/${assetId}/stream', {
    headers: { 'Authorization': 'Bearer ${apiKey}' }
  });
  console.log(data);
}

fetchData();`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Código copiado al portapapeles");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      {!trigger && !open && (
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Code2 className="h-4 w-4" /> Integrar API
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Integración API {productName ? `- ${productName}` : ""}</DialogTitle>
          <DialogDescription>
            Utiliza estos snippets para consumir los datos directamente en tus aplicaciones.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="curl">cURL</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="node">Node.js</TabsTrigger>
          </TabsList>
          
          {Object.entries(snippets).map(([lang, code]) => (
            <TabsContent key={lang} value={lang} className="mt-4">
              <div className="relative rounded-md bg-slate-950 p-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-2 h-8 w-8 text-slate-400 hover:bg-slate-800 hover:text-white"
                  onClick={() => copyToClipboard(code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="overflow-x-auto text-sm font-mono text-slate-50">
                  <code>{code}</code>
                </pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
