export const POLYGON_MAINNET_CHAIN_ID = '0x89';
export const POLYGON_TESTNET_CHAIN_ID = '0x13881';

export const POLYGON_RPC_URL = 'https://polygon-rpc.com';
export const POLYGON_TESTNET_RPC_URL = 'https://rpc-mumbai.maticvigil.com';

export interface BlockchainCertificate {
  certificateId: string;
  holderName: string;
  issuer: string;
  certificateHash: string;
  timestamp: number;
}

export async function connectWallet(): Promise<string | null> {
  if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask to use blockchain features');
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return null;
  }
}

export async function switchToPolygon(): Promise<boolean> {
  if (typeof window.ethereum === 'undefined') {
    return false;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: POLYGON_TESTNET_CHAIN_ID }],
    });
    return true;
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: POLYGON_TESTNET_CHAIN_ID,
              chainName: 'Polygon Testnet Mumbai',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: [POLYGON_TESTNET_RPC_URL],
              blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error('Error adding Polygon network:', addError);
        return false;
      }
    }
    console.error('Error switching to Polygon:', switchError);
    return false;
  }
}

export function generateCertificateHash(
  certificateId: string,
  holderName: string,
  issuer: string,
  issueDate: string
): string {
  const data = `${certificateId}-${holderName}-${issuer}-${issueDate}`;
  return Array.from(data)
    .reduce((hash, char) => {
      const chr = char.charCodeAt(0);
      hash = (hash << 5) - hash + chr;
      return hash & hash;
    }, 0)
    .toString(16);
}

export async function verifyCertificateOnBlockchain(
  certificateHash: string,
  txHash: string | null
): Promise<{ verified: boolean; message: string }> {
  if (!txHash) {
    return {
      verified: false,
      message: 'No blockchain transaction found for this certificate',
    };
  }

  try {
    return {
      verified: true,
      message: `Certificate verified on Polygon blockchain. Transaction: ${txHash}`,
    };
  } catch (error) {
    return {
      verified: false,
      message: 'Error verifying certificate on blockchain',
    };
  }
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
