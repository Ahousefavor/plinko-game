import { sendDimecoin } from './dimecoin';

const adminWalletAddress = process.env.ADMIN_WALLET_ADDRESS;

// Fund the game with Dimecoin
export async function fundGame(amount: number) {
  await sendDimecoin(adminWalletAddress, 'game-wallet-address', amount);
}