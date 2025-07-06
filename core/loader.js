// core/loader.js
import fs from 'fs';

export function loadWalletsAndProxies() {
  const walletFile = './data/wallets.txt';
  const proxyFile = './data/proxy.txt';

  const wallets = fs.existsSync(walletFile)
    ? fs.readFileSync(walletFile, 'utf-8').split(/\r?\n/).filter(x => x.trim())
    : [];

  const proxies = fs.existsSync(proxyFile)
    ? fs.readFileSync(proxyFile, 'utf-8').split(/\r?\n/).filter(x => x.trim())
    : [];

  return wallets.map((token, i) => ({
    token,
    proxy: proxies[i] || null
  }));
}
