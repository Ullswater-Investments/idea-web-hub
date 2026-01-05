// src/types/web3.types.ts

export interface DecentralizedIdentifier {
  did: string;           // Formato: did:ethr:0x7ecc:0x...
  address: string;       // Dirección Ethereum 0x...
  chainId: string;       // Chain ID en Hex (ej: 0x7ecc)
  verified: boolean;     // Estado de verificación local
}

export interface WalletState {
  address: string | null;
  chainId: string | null;
  balance: string | null;      // Balance nativo (ej: GX)
  euroeBalance: string | null; // Balance del token EUROe
  did: string | null;
  isConnected: boolean;
}

export interface VerifiableCredential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: {
    id: string;
    [key: string]: unknown;
  };
  proof?: {
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue: string;
  };
}

export interface LineageEvent {
  id: string;
  date: string;
  actor: string;
  did: string;
  action: 'READ' | 'EXPORT' | 'PROCESS' | 'MODIFY';
  resource: string;
  hash: string;
  status: 'verified' | 'warning' | 'pending';
}

// Extensión del objeto Window para inyección de wallets (MetaMask, Rabby, etc.)
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}
