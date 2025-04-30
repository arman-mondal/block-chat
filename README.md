
# **Decentralized Chat Application - Powered by Web3 & Ethereum**

Welcome to the future of messaging — introducing our decentralized chat application built on **Web3** and powered by **Ethereum**. Unlike traditional chat apps, your conversations here aren’t stored on centralized servers. There’s no middleman, no tracking, and no data harvesting. **Your messages are encrypted, private, and controlled entirely by you**.

By leveraging **Ethereum’s blockchain**, our platform ensures **trustless communication** and **secure peer-to-peer exchange**, with zero compromise on privacy. Say goodbye to centralized control — your conversations stay between you and your intended recipients, with full control over your data.

---

## **Key Features**

- 🔐 **End-to-End Encryption**: Your messages are encrypted and only accessible by you and your intended recipients.
- 🌐 **Decentralized Infrastructure**: No centralized servers. No middlemen. No tracking.
- 💬 **Secure Messaging**: Send encrypted messages, share files, and transfer tokens with complete privacy.
- ⚡ **Token-Powered Economy**: Earn tokens for contributing to the network, unlocking premium features and trading freely.
- 🔗 **Ethereum Blockchain**: Trustless and secure, your communication is under your control.

---

## **Getting Started**

### 1. **Connect Your Web3 Wallet**
   - To begin, connect your **Web3 wallet** (such as MetaMask) to create your **unique identity** on the network.

### 2. **Find Friends or Join Communities**
   - You can search for friends by their **wallet address** or **ENS** name.
   - Alternatively, join **open communities** aligned with your interests.

### 3. **Start Chatting Securely**
   - Send **encrypted messages**, share **files**, or transfer **tokens** — all interactions are private and secure.

---

## **Tech Stack**

| Component              | Technology                                   |
|------------------------|----------------------------------------------|
| **Frontend**           | React, Tailwind CSS, Web3 (MetaMask, RainbowKit) |
| **Blockchain**         | Ethereum, Solidity                           |
| **Messaging Protocol** | IPFS, XMTP, Libp2p                          |
| **Token Economy**      | ERC-20                                       |
| **Hosting & DevOps**   | Vercel, IPFS Hosting                        |

---

## **Progress During Hackathon**

Here’s the breakdown of the process and milestones achieved during the hackathon:

### ⚡ **Hackathon Process – Web3 Chat App (React + Ethereum)**

**1. Setup (1–2 hrs)**  
- Initialize the React app using **Vite** or **CRA**.
- Install essential dependencies: `ethers`, `wagmi`, `rainbowkit`, `web3modal`.
- Build basic UI components: **chat window**, **input field**, and **connect wallet button**.

**2. Smart Contracts (2–3 hrs)**  
- Write a simple **Solidity contract** for sending messages (optional: emit events only).
- Use **Hardhat** to deploy the contract to a testnet (like **Sepolia** or **Polygon Mumbai**).

**3. Messaging Logic (3–4 hrs)**  
- Implement the logic to **send and read encrypted messages** via the smart contract or store message references on **IPFS**.
- Use **XMTP** or **Libp2p** for decentralized messaging, if you skip the smart contract approach.
- Fetch chat history by reading events or fetching from decentralized storage.

**4. Token System (Optional, 1–2 hrs)**  
- Implement **ERC-20 token rewards** for user activity (optional).

**5. Final Touches (2 hrs)**  
- Add **ENS support** for wallet address mapping.
- Polish the **UI** using **Tailwind CSS**.
- Write the **README** and prepare the **demo video** for submission.

---

## **How to Run Locally**

1. Clone the repository:

```bash
git clone https://github.com/your-username/decentralized-chat-app.git
cd decentralized-chat-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up the environment:

Create a `.env.local` file at the root of the project and add your Web3 provider and Ethereum keys:

```env
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=your_contract_address
WEB3_PROVIDER_URL=your_provider_url
```

4. Run the development server:

```bash
npm run dev
```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

---

## **How It Works**

1. **Decentralized Messaging**: Messages are encrypted and stored using **IPFS** or **smart contracts**, ensuring that no centralized entity controls the data.
2. **Token Economy**: Earn tokens for engaging with the platform and unlocking premium features.
3. **Privacy First**: Messages are encrypted and controlled only by the users, ensuring a completely private chat experience.

---

## **Contributing**

We welcome contributions to improve **BlockTalk**. If you have suggestions or feature requests, feel free to:

- Fork the repository
- Create a new branch
- Submit a pull request

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

**BlockTalk** — Reimagining private messaging for the decentralized world. 🔐🌐
