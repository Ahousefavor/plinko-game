import { createUser, getUser, updateUser } from './database';
import { generateWallet, getBalance, sendDimecoin } from './dimecoin';
import bcrypt from 'bcrypt';

// User registration
export async function register(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const wallet = await generateWallet();
  const user = await createUser({ username, password: hashedPassword, wallet });
  return user;
}

// User login
export async function login(username: string, password: string) {
  const user = await getUser(username);
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  } else {
    throw new Error('Invalid username or password');
  }
}

// Deposit Dimecoin
export async function deposit(username: string, amount: number) {
  const user = await getUser(username);
  await sendDimecoin('admin-wallet-address', user.wallet.address, amount);
  user.balance += amount;
  await updateUser(user);
}

// Withdraw Dimecoin
export async function withdraw(username: string, amount: number, externalAddress: string) {
  const user = await getUser(username);
  if (user.balance >= amount) {
    await sendDimecoin(user.wallet.address, externalAddress, amount);
    user.balance -= amount;
    await updateUser(user);
  } else {
    throw new Error('Insufficient balance');
  }
}

// Get user balance
export async function getBalance(username: string) {
  const user = await getUser(username);
  return user.balance;
}