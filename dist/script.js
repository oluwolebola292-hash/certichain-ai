// Mock Data & Config
const CONFIG = {
    contractAddress: "0x71C...9A23",
    networkName: "Sepolia Testnet",
    simulatedFee: "20",
    feeRecipient: "0x5a8d23746f0854d414e241396ec805c3a0a6aa81",
    botName: "KOINOPHOBIA AI",
};

const KNOWLEDGE_BASE = {
    "zk-snark": "Zero-Knowledge Succinct Non-Interactive Argument of Knowledge (ZK-SNARK) allows one party to prove to another that they know a value x, without conveying any information apart from the fact that they know the value x.",
    "yul": "Yul is an intermediate language that can be compiled to EVM bytecode. It is often used in inline assembly within Solidity to optimize gas costs or perform low-level operations not possible in pure Solidity.",
    "flash loan": "Flash loans are uncollateralized loans that must be borrowed and repaid within the same transaction. They are primarily used for arbitrage, collateral swapping, and self-liquidation.",
    "rust": "Rust is a systems programming language focused on safety and performance. It is the primary language for smart contract development on the Solana blockchain (via the Anchor framework) and Near Protocol.",
    "solidity": "Solidity is an object-oriented, high-level language for implementing smart contracts. It is statically typed, supports inheritance, libraries and complex user-defined types.",
    "default": "To become exceptional in Web3, you need to master advanced topics. Ask me about 'ZK-SNARKs', 'Yul Assembly', 'Flash Loans', or 'Rust for Solana'.",
    "hello": "Welcome to KOINOPHOBIA. I am ready to help you achieve exceptional status in Web3 engineering. What topic shall we tackle first?",
};

class App {
    constructor() {
        this.state = {
            walletConnected: false,
            address: null,
            balance: "0.00",
            mintedCerts: [],
            isMinting: false,
            selectedChain: 'BNB'
        };

        this.elements = {
            connectBtn: document.getElementById('connect-wallet-btn'),
            walletText: document.getElementById('wallet-text'),
            networkBadge: document.getElementById('network-badge'),
            chatForm: document.getElementById('chat-form'),
            chatInput: document.getElementById('chat-input'),
            chatContainer: document.getElementById('chat-container'),
            walletAssets: document.getElementById('wallet-assets'),
            mintedSection: document.getElementById('minted-section')
        };

        this.init();
    }

    init() {
        this.addEventListeners();
        this.checkIfWalletInstalled();
    }

    addEventListeners() {
        this.elements.connectBtn.addEventListener('click', () => this.handleConnect());
        this.elements.chatForm.addEventListener('submit', (e) => this.handleChatSubmit(e));
        
        // Keyboard shortcut for focus
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.elements.chatInput.focus();
            }
        });
    }

    checkIfWalletInstalled() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('Wallet detected');
        }
    }

    async handleConnect() {
        if (this.state.walletConnected) {
            // Disconnect (Simulated)
            this.state.walletConnected = false;
            this.state.address = null;
            this.updateUI();
            return;
        }

        // Simulate connection delay
        this.elements.connectBtn.disabled = true;
        this.elements.walletText.innerText = "Connecting...";

        try {
            // Try real connection if available, otherwise mock
            let address;
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    address = accounts[0];
                } catch (err) {
                    console.warn("Real wallet connect failed, falling back to mock", err);
                    address = this.generateMockAddress();
                }
            } else {
                await new Promise(r => setTimeout(r, 1000)); // Fake delay
                address = this.generateMockAddress();
            }

            this.state.walletConnected = true;
            this.state.address = address;
            this.updateUI();
            this.addBotMessage("Wallet connected successfully! Your progress is now being tracked on-chain.");

        } catch (error) {
            console.error(error);
            this.elements.walletText.innerText = "Error";
        } finally {
            this.elements.connectBtn.disabled = false;
        }
    }

    generateMockAddress() {
        const chars = '0123456789ABCDEF';
        let addr = '0x';
        for(let i=0; i<40; i++) addr += chars[Math.floor(Math.random() * 16)];
        return addr;
    }

    updateUI() {
        if (this.state.walletConnected) {
            const shortAddr = `${this.state.address.substring(0,6)}...${this.state.address.substring(38)}`;
            this.elements.walletText.innerText = shortAddr;
            this.elements.connectBtn.classList.add('bg-slate-800', 'ring-2', 'ring-green-500', 'ring-offset-2');
            this.elements.networkBadge.classList.replace('hidden', 'flex');
        } else {
            this.elements.walletText.innerText = "Connect Wallet";
            this.elements.connectBtn.classList.remove('bg-slate-800', 'ring-2', 'ring-green-500', 'ring-offset-2');
            this.elements.networkBadge.classList.replace('flex', 'hidden');
        }
    }

    handleChatSubmit(e) {
        e.preventDefault();
        const msg = this.elements.chatInput.value.trim();
        if (!msg) return;

        // Add User Message
        this.addUserMessage(msg);
        this.elements.chatInput.value = '';

        // Simulate AI thinking and responding
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.getAIResponse(msg.toLowerCase());
            this.addBotMessage(response);
        }, 1500);
    }

    getAIResponse(input) {
        for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
            if (input.includes(key)) return value;
        }
        return KNOWLEDGE_BASE['default'];
    }

    addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'flex gap-4 flex-row-reverse animate-slide-up';
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-600 text-xs font-bold">ME</div>
            <div class="flex-1 flex justify-end">
                <div class="bg-blue-600 p-4 rounded-2xl rounded-tr-none text-white text-sm leading-relaxed max-w-[90%] shadow-md shadow-blue-100">
                    ${text}
                </div>
            </div>
        `;
        this.elements.chatContainer.appendChild(div);
        this.scrollToBottom();
    }

    addBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'flex gap-4 animate-slide-up';
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
            <div class="flex-1">
                <div class="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-700 text-sm leading-relaxed max-w-[90%]">
                    ${text}
                </div>
            </div>
        `;
        this.elements.chatContainer.appendChild(div);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.className = 'flex gap-4 animate-fade-in';
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
            <div class="flex items-center bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;
        this.elements.chatContainer.appendChild(div);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    scrollToBottom() {
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    }

    selectChain(chain, btn) {
        this.state.selectedChain = chain;
        
        // Update UI
        document.querySelectorAll('.chain-sel-btn').forEach(b => {
            b.className = 'chain-sel-btn py-1.5 rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-500 hover:border-slate-300 transition-all';
        });

        // Style active button based on chain
        let activeClass = '';
        if (chain === 'BNB') activeClass = 'border-yellow-500 bg-yellow-50 text-yellow-700';
        if (chain === 'SOL') activeClass = 'border-purple-500 bg-purple-50 text-purple-700';
        if (chain === 'BASE') activeClass = 'border-blue-600 bg-blue-50 text-blue-700';

        btn.className = `chain-sel-btn active py-1.5 rounded border ${activeClass} text-[10px] font-bold transition-all shadow-sm`;
    }

    async mintCert(type) {
        if (!this.state.walletConnected) {
            this.addBotMessage("Please connect your wallet first to mint certifications.");
            // Shake the connect button
            this.elements.connectBtn.classList.add('animate-pulse');
            setTimeout(() => this.elements.connectBtn.classList.remove('animate-pulse'), 1000);
            return;
        }

        const btn = event.currentTarget;
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-green-700 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Minting...
        `;

        this.addBotMessage(`Initiating transaction on ${this.state.selectedChain} Network... Please confirm in your wallet.`);

        // Simulate Blockchain Transaction
        console.log(`Processing Fee: ${CONFIG.simulatedFee} $NODE`);
        console.log(`Sending ${CONFIG.simulatedFee / 2} $NODE to Treasury: ${CONFIG.feeRecipient}`);
        
        await new Promise(r => setTimeout(r, 2000));

        // Success State
        btn.innerHTML = "Minted Successfully!";
        btn.classList.remove('bg-white', 'text-green-700', 'border-green-200');
        btn.classList.add('bg-green-600', 'text-white', 'border-transparent');
        
        this.state.mintedCerts.push(type);
        this.addMintedAsset(type);
        this.triggerConfetti();
        
        this.addBotMessage(`🎉 Congratulations! You have successfully minted the "Blockchain Basics" Certification on ${this.state.selectedChain}. TX Hash: ${this.generateMockAddress()}`);
    }

    addMintedAsset(type) {
        this.elements.mintedSection.classList.remove('hidden');
        
        const chain = this.state.selectedChain;
        let chainColor = "from-yellow-400 to-orange-500"; // Default BNB
        if (chain === 'SOL') chainColor = "from-purple-500 to-indigo-600";
        if (chain === 'BASE') chainColor = "from-blue-500 to-cyan-500";

        const div = document.createElement('div');
        div.className = 'flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 animate-fade-in';
        div.innerHTML = `
            <div class="h-10 w-10 rounded bg-gradient-to-br ${chainColor} flex items-center justify-center text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <p class="text-sm font-semibold text-slate-900">Blockchain Basics</p>
                <p class="text-[10px] text-slate-500 uppercase tracking-wider">Verified on ${chain}</p>
            </div>
        `;
        this.elements.walletAssets.appendChild(div);
    }

    triggerConfetti() {
        // Simple CSS/JS confetti effect
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '2px';
            confetti.style.zIndex = '100';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: `translate3d(0,0,0) rotateX(0) rotateY(0)` },
                { transform: `translate3d(${Math.random()*100 - 50}px, 100vh, 0) rotateX(${Math.random()*360}deg) rotateY(${Math.random()*360}deg)` }
            ], {
                duration: Math.random() * 2000 + 1500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }
}

// Initialize App
const app = new App();
// Expose for onclick handlers
window.app = app;