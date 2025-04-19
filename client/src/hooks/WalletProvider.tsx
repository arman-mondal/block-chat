import { BrowserProvider } from 'ethers';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface WalletContextProps {
    isConnected: boolean;
    connectWallet: () => void;
    WalletAddress: string | null;
    Provider: BrowserProvider | null;
    Signer: any;

}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [WalletAddress, setWalletAddress] = useState<string | null>(null);
    const [Provider, setProvider] = useState<BrowserProvider | null>(null);
    const [Signer, setSigner] = useState<any>(null);

   async function connectWallet() {
     if (!window.ethereum) {
       alert("MetaMask not found!");
       return;
     }
   
     const provider = new BrowserProvider(window.ethereum);
     await provider.send("eth_requestAccounts", []);
   
     const signer = await provider.getSigner(); // ✅ Await here
     const address = await signer.getAddress();
        setIsConnected(true);
        setWalletAddress(address);
        setProvider(provider);
        setSigner(signer);
        console.log("Wallet Address: ", address);
        console.log("Provider: ", provider);
        console.log("Signer: ", signer);
        console.log("Wallet Connected");
   
     return { provider, signer, address };
   }
   

    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts && accounts.length > 0) {
                    const provider = new BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const address = await signer.getAddress();
                    setWalletAddress(address);
                    setProvider(provider);
                    setSigner(signer);
                    console.log("Wallet Address: ", address);
                    console.log("Provider: ", provider);
                    console.log("Signer: ", signer);
                    console.log("Wallet Connected");
                    
                    setIsConnected(true);
                } else {
                    connectWallet();
                }
            }
        };

        checkConnection();
    }, []);

    return (
        <WalletContext.Provider value={{ isConnected, connectWallet,WalletAddress, Provider, Signer }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = (): WalletContextProps => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};