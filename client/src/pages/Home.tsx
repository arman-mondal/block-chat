import { useState, useEffect } from "react";
import { MessageSquare, Shield, Zap, ChevronRight, Menu, X, Globe, Lock, Coffee, Github, Twitter } from "lucide-react";
import { useWallet } from "../hooks/WalletProvider";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const {isConnected,connectWallet}=useWallet();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(isConnected);
  
  // Handle responsive menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
useEffect(()=>{
setWalletConnected(isConnected);
},[isConnected])
const nav=useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="px-4 py-4 md:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center">
          <MessageSquare className="text-indigo-500 mr-2" />
          <span className="text-xl font-bold">BlockChat</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a>
          <a href="#roadmap" className="hover:text-indigo-400 transition-colors">Roadmap</a>
          <a href="#community" className="hover:text-indigo-400 transition-colors">Community</a>
        </div>
        
        {/* Connect Wallet Button - Desktop */}
        <div className="hidden md:block">
          {walletConnected ? (
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
              <Shield size={16} className="mr-2" /> Connected
            </button>
          ) : (
            <button 
              onClick={connectWallet}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 py-4">
          <div className="flex flex-col space-y-4 px-6">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a>
            <a href="#roadmap" className="hover:text-indigo-400 transition-colors">Roadmap</a>
            <a href="#community" className="hover:text-indigo-400 transition-colors">Community</a>
            
            {/* Connect Wallet Button - Mobile */}
            {isConnected ? (
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                <Shield size={16} className="mr-2" /> Connected
              </button>
            ) : (
              <button 
                onClick={connectWallet}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="px-4 md:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Decentralized Chat for the Web3 Era</h1>
          <p className="text-slate-300 text-lg mb-8">
            Secure, private, and censorship-resistant messaging powered by blockchain technology.
            Own your data and connect with friends across the decentralized web.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={()=>{
nav("/chat");
            }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors">
              Launch App <ChevronRight size={20} className="ml-2" />
            </button>
            <button className="border border-indigo-600 text-indigo-400 hover:bg-indigo-600/10 px-6 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">BlockChat Preview</h3>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-3 ml-8">
                <p className="text-sm">Hey, have you checked out this new Web3 chat app?</p>
                <p className="text-xs text-slate-400 text-right">10:42 AM</p>
              </div>
              <div className="bg-indigo-600 rounded-lg p-3 mr-8">
                <p className="text-sm">Yes! I love how it's fully decentralized and I own my data!</p>
                <p className="text-xs text-indigo-300 text-right">10:45 AM</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-3 ml-8">
                <p className="text-sm">The encryption is really impressive too. No one can read our messages.</p>
                <p className="text-xs text-slate-400 text-right">10:47 AM</p>
              </div>
              <div className="mt-4 flex">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 flex-grow text-sm"
                />
                <button className="bg-indigo-600 ml-2 p-2 rounded-lg">
                  <Zap size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="px-4 md:px-8 py-16 bg-slate-800">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-700 p-6 rounded-xl">
            <div className="bg-indigo-600/20 p-3 rounded-lg inline-block mb-4">
              <Lock size={24} className="text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
            <p className="text-slate-300">Your conversations are fully encrypted. Only you and your intended recipients can read your messages.</p>
          </div>
          
          <div className="bg-slate-700 p-6 rounded-xl">
            <div className="bg-indigo-600/20 p-3 rounded-lg inline-block mb-4">
              <Globe size={24} className="text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Decentralized Network</h3>
            <p className="text-slate-300">Built on blockchain technology, no single entity controls the network or can censor your communications.</p>
          </div>
          
          <div className="bg-slate-700 p-6 rounded-xl">
            <div className="bg-indigo-600/20 p-3 rounded-lg inline-block mb-4">
              <Coffee size={24} className="text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Token-Powered Economy</h3>
            <p className="text-slate-300">Earn tokens for contributing to the network. Use tokens to access premium features or trade them.</p>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="px-4 md:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold">1</div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-slate-300">Link your Web3 wallet to create your unique identity on the BlockChat network.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold">2</div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">Find Friends & Communities</h3>
              <p className="text-slate-300">Search for friends by their wallet address or ENS name, or join public communities based on your interests.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold">3</div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">Start Chatting Securely</h3>
              <p className="text-slate-300">Send encrypted messages, files, and tokens directly to friends or participate in community discussions.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-4 md:px-8 py-16 bg-indigo-600">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Future of Communication?</h2>
          <p className="text-lg mb-8">Experience true ownership of your conversations and digital identity.</p>
          <button onClick={()=>{
            nav('/chat')
          }} className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition-colors">
            Launch BlockChat
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="px-4 md:px-8 py-12 bg-slate-900 border-t border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <MessageSquare className="text-indigo-500 mr-2" />
            <span className="text-xl font-bold">BlockChat</span>
          </div>
          
          <div className="flex flex-wrap gap-6 mb-6 md:mb-0 justify-center">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Docs</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Community</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Token</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Roadmap</a>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
        <div className="text-center text-slate-400 text-sm mt-8">
          &copy; {new Date().getFullYear()} BlockChat. All rights reserved.
        </div>
      </footer>
    </div>
  );
}