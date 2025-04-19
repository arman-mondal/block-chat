import React, { useState, useEffect } from "react";
import { getBalance } from "../web3/web3"; // Assuming you'll have this function in your web3.js file
import { RefreshCw } from "lucide-react";

interface WalletBalanceProps {
  address: string | null;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ address }) => {
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    if (address) {
      fetchBalance();
    }
  }, [address]);
  
  const fetchBalance = async () => {
    if (!address) return;
    
    try {
      setLoading(true);
      const balanceValue = await getBalance(address);
      setBalance(balanceValue || "0");
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!address) return null;
  
  return (
    <div className="flex items-center bg-slate-700 px-3 py-1 rounded-lg text-sm ml-2">
      {loading ? (
        <RefreshCw size={14} className="animate-spin mr-1 text-slate-300" />
      ) : (
        <span className="mr-1 text-indigo-300">Ξ</span>
      )}
      <span>{balance} ETH</span>
      <button 
        onClick={fetchBalance} 
        className="ml-2 p-1 hover:bg-slate-600 rounded-full transition-colors"
        title="Refresh balance"
      >
        <RefreshCw size={12} className="text-slate-300" />
      </button>
    </div>
  );
};

export default WalletBalance;