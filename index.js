// index.js
import { loadWalletsAndProxies } from './core/loader.js';
import { runMiner } from './core/miner.js';
import { printBanner, updateDashboard, logActivity } from './ui/terminal.js';
import fs from 'fs';

const main = async () => {
  printBanner();

  const accounts = loadWalletsAndProxies();
  if (accounts.length === 0) {
    console.log('Tidak ada akun ditemukan di wallets.txt.');
    return;
  }

  for (const acc of accounts) {
    updateDashboard(acc);
    try {
      const result = await runMiner(acc);
      logActivity(result);
    } catch (err) {
      console.log(`\n[!] Gagal akun ${acc.token.slice(0, 20)}...: ${err.message}`);
      logActivity({ status: 'ERROR', token: acc.token, message: err.message });
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\nSemua akun selesai diproses.');
};

main();
