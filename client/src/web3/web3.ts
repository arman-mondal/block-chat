import { BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found!");
    return;
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner(); // ✅ Await here
  const address = await signer.getAddress();

  return { provider, signer, address };
}
export async function getBalance(address: string) {
    if (!window.ethereum) {
        alert("MetaMask not found!");
        return;
    }
    
    const provider = new BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    return balance.toString();
    }

    