import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { ref, onChildAdded, push, set, update } from "firebase/database";
import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import { connectWallet } from "../web3/web3";
import { 
  MessageSquare, Send, Clock,  Settings, LogOut, Search, 
  Users, X, Copy, Check,  Smartphone,  Shield
} from "lucide-react";
import { useWallet } from "../hooks/WalletProvider";
import { uploadImage } from "../utils/imgUploader";

interface Message {
  sender: string;
  message: string;
  timestamp: number;
}

interface User {
  address: string;
  lastSeen: number;
  isOnline: boolean;
  username?: string;
  profilePic?: string;
}

interface SettingsState {
  darkMode: boolean;
  notifications: boolean;
  messagePreview: boolean;
  autoConnect: boolean;
  language: string;
  username: string;
}

function ChatPage() {
    const {WalletAddress} = useWallet();
  const [address, setAddress] = useState<string | null>(WalletAddress);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("account");
  const [settings, setSettings] = useState<SettingsState>({
    darkMode: true,
    notifications: true,
    messagePreview: true,
    autoConnect: false,
    language: "en",
    username:`${address?.slice(0, 6)}...${address?.slice(-4)}`,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const firestore = getFirestore();
  
  useEffect(() => {
    const messagesRef = ref(db, "messages");
    
    onChildAdded(messagesRef, (snapshot) => {
      setChat((prev) => [...prev, snapshot.val()]);
    });
    
    // Fetch online users
    const usersRef = ref(db, "users");
    onChildAdded(usersRef, (snapshot) => {
      const userData = snapshot.val() as User;
      setOnlineUsers((prev) => [...prev, userData]);
    });
  }, []);
  
  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);
  
  const handleSend = async () => {
    if (!message.trim() || !address) return;
    
    const messagesRef = ref(db, "messages");
    await push(messagesRef, {
      sender: address,
      message,
      timestamp: Date.now(),
    });
    
    setMessage("");
  };
  
  const connect = async () => {
    try {
      const wallet = await connectWallet();
        if (!wallet) return;
        const { address } = wallet;
      setAddress(address);
      
      // Set default username from address
      setSettings(prev => ({
        ...prev,
        username: `${address.slice(0, 6)}...${address.slice(-4)}`,
        profilePic: null // Placeholder for profile picture
      }));
      
      // Save user to Firebase
      const userRef = ref(db, `users/${address}`);
      await set(userRef, {
        address,
        lastSeen: Date.now(),
        isOnline: true,
        username: `${address.slice(0, 6)}...${address.slice(-4)}`,
        profilePic: null // Placeholder for profile picture,

      });
      
      // Also save to Firestore
      try {
        await addDoc(collection(firestore, "users"), {
          address,
          lastSeen: Date.now(),
          isOnline: true,
          username: `${address.slice(0, 6)}...${address.slice(-4)}`,
            profilePic: null // Placeholder for profile picture
        });
      } catch (error) {
        console.error("Error adding user to Firestore:", error);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  
  // Add disconnect wallet function
  const disconnectWallet = async () => {
    if (address) {
      try {
        // Update user status in Firebase
        const userRef = ref(db, `users/${address}`);
        await update(userRef, {
          lastSeen: Date.now(),
          isOnline: false
        });
        
        // Try to update in Firestore too
        try {
          // This is a simple approach - you might need to query by address first in a real app
          const userDocRef = doc(firestore, "users", address);
          await updateDoc(userDocRef, {
            lastSeen: Date.now(),
            isOnline: false
          });
        } catch (error) {
          console.error("Error updating user in Firestore:", error);
        }
        
        // Clear local state
        setAddress(null);
        setActiveChatUser(null);
        setShowSettings(false);
        
        // You might also need to call a disconnect method from your web3 provider
        // This depends on which wallet and web3 library you're using
        // For example with MetaMask and ethers.js:
        // If you have a custom disconnectWallet function in your web3.js:
        // await disconnectWallet();
        
        console.log("Wallet disconnected successfully");
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
      }
    }
  };
  
  const copyAddressToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const saveSettings = async () => {
    if (address) {
      try {
        // Update user settings in Firebase
        const userRef = ref(db, `users/${address}`);
        await update(userRef, {
          username: settings.username
        });
        
        // Try to update in Firestore too
        try {
          const userDocRef = doc(firestore, "users", address);
          await updateDoc(userDocRef, {
            username: settings.username
          });
        } catch (error) {
          console.error("Error updating user in Firestore:", error);
        }
        
        // Close settings modal
        setShowSettings(false);
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    }
  };
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare className="text-indigo-500 mr-2" />
          <span className="text-xl font-bold">BlockChat</span>
        </div>
        
        {address ? (
          <div className="flex items-center">
            <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
            <span className="mr-2 text-sm hidden md:inline">Connected:</span>
            <span className="bg-slate-700 px-3 py-1 rounded-lg text-sm font-mono">
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
            </span>
            <button 
              onClick={() => setShowSettings(true)}
              className="ml-2 p-1 hover:bg-slate-700 rounded-full"
              title="Settings"
            >
              <Settings size={16} className="text-slate-300" />
            </button>
            <button 
              onClick={disconnectWallet}
              className="ml-2 p-1 hover:bg-slate-700 rounded-full"
              title="Disconnect wallet"
            >
              <LogOut size={16} className="text-slate-300" />
            </button>
          </div>
        ) : (
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors flex items-center"
            onClick={connect}
          >
            Connect Wallet
          </button>
        )}
      </header>
      
      {!address ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 max-w-md w-full text-center">
            <MessageSquare className="text-indigo-500 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-4">Welcome to BlockChat</h2>
            <p className="text-slate-300 mb-6">Connect your wallet to start secure, decentralized messaging on the blockchain.</p>
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors w-full"
              onClick={connect}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className={`bg-slate-800 border-r border-slate-700 ${isSidebarOpen ? 'w-64' : 'w-16'} flex flex-col transition-all duration-300`}>
            <div className="p-3 border-b border-slate-700 flex items-center">
              <button onClick={toggleSidebar} className="p-1 hover:bg-slate-700 rounded-md">
                {isSidebarOpen ? <Users size={20} /> : <Users size={20} />}
              </button>
              {isSidebarOpen && (
                <span className="ml-2 font-medium">Contacts</span>
              )}
            </div>
            
            {isSidebarOpen && (
              <div className="p-3">
                <div className="relative mb-4">
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto">
              {onlineUsers
              .filter((user) => user.address !== address)
              .map((user, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveChatUser(user.address)}
                  className={`flex items-center p-3 hover:bg-slate-700 cursor-pointer ${activeChatUser === user.address ? 'bg-slate-700' : ''}`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                    {user.profilePic ? <img className="rounded-full" src={user.profilePic} /> : user.address && user.address.slice(2, 4).toUpperCase() }
                  </div>
                  {isSidebarOpen && (
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          {user.username || `${user.address.slice(0, 6)}...${user.address.slice(-4)}`}
                        </span>
                        <span className="text-xs text-slate-400">
                          {user.isOnline ? (
                            <span className="flex items-center">
                              <span className="bg-green-500 w-2 h-2 rounded-full mr-1"></span>
                              Online
                            </span>
                          ) : (
                            formatTime(user.lastSeen)
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-slate-700">
              {isSidebarOpen ? (
                <div className="flex justify-between">
                 
                  <button 
                    className="p-2 hover:bg-slate-700 rounded-md"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings size={20} className="text-slate-300" />
                  </button>
                  <button 
                    className="p-2 hover:bg-slate-700 rounded-md"
                    onClick={disconnectWallet}
                  >
                    <LogOut size={20} className="text-slate-300" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 items-center">
                 
                  <button 
                    className="p-2 hover:bg-slate-700 rounded-md"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings size={20} className="text-slate-300" />
                  </button>
                  <button 
                    className="p-2 hover:bg-slate-700 rounded-md"
                    onClick={disconnectWallet}
                  >
                    <LogOut size={20} className="text-slate-300" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-3 bg-slate-800 border-b border-slate-700 flex items-center">
              {activeChatUser ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                    {onlineUsers.find((a)=>a.address===activeChatUser)?.profilePic ? <img className="rounded-full" src={onlineUsers.find((a)=>a.address===activeChatUser)?.profilePic} /> : activeChatUser && activeChatUser.slice(2, 4).toUpperCase() }
                  </div>
                  <div>
                    <div className="font-medium">
                     {onlineUsers.find((a)=>a.address===activeChatUser)?.username || `${activeChatUser.slice(0, 6)}...${activeChatUser.slice(-4)}`}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center">
                      <span className="bg-green-500 w-2 h-2 rounded-full mr-1"></span>
                      Online
                    </div>
                  </div>
                </>
              ) : (
                <div className="font-medium">Select a chat</div>
              )}
            </div>
            
            {/* Messages */}
          {activeChatUser && (
            <>
              <div 
              className="flex-1 overflow-y-auto p-4"
              ref={chatContainerRef}
            >
              {chat.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <MessageSquare size={48} className="mb-4 opacity-50" />
                  <p>No messages yet</p>
                  <p className="text-sm mt-2">Start the conversation!</p>
                </div>
              ) : (
                chat.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`mb-4 max-w-3/4 ${msg.sender === address ? 'ml-auto' : ''}`}
                  >
                    <div className={`rounded-lg p-3 ${
                      msg.sender === address 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-slate-700 text-white rounded-bl-none'
                    }`}>
                      {msg.message}
                    </div>
                    <div className={`text-xs mt-1 flex items-center ${
                      msg.sender === address ? 'justify-end' : ''
                    }`}>
                      <Clock size={12} className="mr-1 text-slate-400" />
                      <span className="text-slate-400">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t border-slate-700 bg-slate-800">
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button 
                  onClick={handleSend} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
            </>
          )}
          </div>
        </div>
      )}
      
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl max-w-md w-full max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h3 className="text-lg font-bold">Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-slate-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Tabs */}
            <div className="flex border-b border-slate-700">
              <button 
                className={`flex-1 py-3 text-center ${activeSettingsTab === 'account' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-slate-400'}`}
                onClick={() => setActiveSettingsTab('account')}
              >
                Account
              </button>
            
              <button 
                className={`flex-1 py-3 text-center ${activeSettingsTab === 'security' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-slate-400'}`}
                onClick={() => setActiveSettingsTab('security')}
              >
                Security
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-4">
              {/* Account Tab */}
              {activeSettingsTab === 'account' && (
                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Connected Wallet
                    </label>
                    <div className="flex items-center bg-slate-900 p-3 rounded-lg">
                      <span className="font-mono text-sm flex-1 truncate">
                        {address}
                      </span>
                      <button 
                        onClick={copyAddressToClipboard}
                        className="p-2 hover:bg-slate-700 rounded-lg ml-2"
                        title="Copy address"
                      >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      This is your unique identifier on the blockchain.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={settings.username}
                      onChange={(e) => setSettings({...settings, username: e.target.value})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Set a custom username"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      This will be displayed to other users instead of your wallet address.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Profile Picture
                    </label>
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                        {onlineUsers.find((a)=>a.address===address)?.profilePic ? <img className="rounded-full" src={onlineUsers.find((a)=>a.address===address)?.profilePic} /> : address && address.slice(2, 4).toUpperCase()   }
                      </div>
                      <input 
                        type="file" 
                        id="fileInput"
                        accept="image/*"
                        className="bg-slate-700 border hidden border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                                await uploadImage(e.target.files[0]).then((url) => {
                                const userRef = ref(db, `users/${address}`);
                                update(userRef, {
                                    profilePic: url
                                });
                                // Try to update in Firestore too
                                try {
                                   if(firestore && address){
                                    const userDocRef = doc(firestore, "users", address);
                                    updateDoc(userDocRef, {
                                        profilePic: url
                                    });
                                   }
                                } catch (error) {
                                    console.error("Error updating user in Firestore:", error);
                                }
                                setSettings(prev => ({
                                    ...prev,
                                    profilePic: url
                                }));
                                }
                                ).catch((error) => {
                                console.error("Error uploading image:", error);
                                }
                                
                                );
                            }
                        }

                    }
                        />
                      <button onClick={async()=>{
document.getElementById("fileInput")?.click();

                      }} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors">
                        Upload Image
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Maximum size: 2MB. Supported formats: JPG, PNG, GIF.
                    </p>
                  </div>
                  
                  <button 
                    onClick={disconnectWallet}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors w-full mt-4"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
              
              {/* Preferences Tab */}
            
              
              {/* Security Tab */}
              {activeSettingsTab === 'security' && (
                <div>
                  <div className="mb-6">
                    <h4 className="font-medium mb-4">Connection Details</h4>
                    <div className="bg-slate-900 p-3 rounded-lg mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Network</span>
                        <span>Ethereum Mainnet</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Connection Type</span>
                        <span className="flex items-center">
                          <Smartphone size={14} className="mr-1" /> Mobile
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Login</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <Shield className="text-indigo-400 mr-2" size={20} />
                      <h4 className="font-medium">Security Settings</h4>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-slate-700">
                      <div>
                        <h4 className="font-medium">End-to-End Encryption</h4>
                        <p className="text-sm text-slate-400">All messages are encrypted</p>
                      </div>
                      <div className="bg-green-600 text-white text-xs py-1 px-2 rounded">
                        Enabled
                      </div>
                    </div>
                    
                  
                    
                   
                  </div>
                  
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors w-full">
                    Clear Chat History
                  </button>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-700 flex justify-end">
              <button 
                onClick={() => setShowSettings(false)}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={saveSettings}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
                >
                Save
                </button>
            </div>
            </div>
        </div>
        )}
        </div>

    );
}
export default ChatPage;
