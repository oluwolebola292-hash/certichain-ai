# Certifi.ai - On-Chain AI Study Companion

Certifi.ai is a Web3-enabled educational platform that combines an AI study assistant with on-chain certification. Users can chat with an AI to learn about blockchain topics and mint certificates to their crypto wallet upon completion.

## Features

-   **AI Chat Interface**: Interactive study companion powered by simulated AI logic (extensible to real LLMs).
-   **Web3 Integration**: Connects to crypto wallets (MetaMask, etc.) or simulates connection for users without extensions.
-   **On-Chain Certification**: "Mint" certificates as verified digital assets (simulated for prototype).
-   **Responsive Design**: Built with Tailwind CSS for a modern, mobile-first Clean Light theme.

## Tech Stack

-   **Frontend**: Vanilla JavaScript, HTML5
-   **Styling**: Tailwind CSS (CDN)
-   **Web3**: Ethers.js (CDN)
-   **Fonts**: Inter (Google Fonts)

## Getting Started

1.  Open `index.html` in your browser.
    -   Recommended: Use a local server (e.g., `python3 -m http.server`, `npx serve`, or VS Code Live Server) to ensure all assets load correctly, though it works directly from the file system too.
2.  Click **Connect Wallet** in the top right.
    -   If you have a wallet extension (e.g., MetaMask), it will prompt you.
    -   If not, it simulates a connection with a mock address.
3.  Chat with the AI:
    -   Try asking "What is a Smart Contract?" or "Explain Gas Fees".
4.  Mint a Certificate:
    -   In the right sidebar, click **Mint on Blockchain** under the "Blockchain Basics" card.
    -   Watch the transaction simulation and receive your "Verified on Ethereum" badge.

## Project Structure

-   `index.html`: Main application entry point and layout.
-   `script.js`: Application logic, state management, and Web3 simulations.
-   `README.md`: Project documentation.