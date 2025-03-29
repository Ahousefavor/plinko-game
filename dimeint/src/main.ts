import { register, login, deposit, withdraw } from './backend/user';
import { playGame, withdrawWinnings } from './game';
import { fundGame } from './backend/admin';

async function main() {
  const username = 'player1';
  const password = 'password123';

  await register(username, password);
  const user = await login(username, password);

  await deposit(username, 100); // Deposit 100 Dimecoin

  await playGame(username, 10); // Play game with 10 Dimecoin bet

  await withdrawWinnings(username, 50, 'external-wallet-address'); // Withdraw 50 Dimecoin to external wallet

  await fundGame(1000); // Admin funds the game with 1000 Dimecoin
}

main().catch(console.error);