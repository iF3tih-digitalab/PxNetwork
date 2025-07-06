// ui/terminal.js
import chalk from 'chalk';
import fs from 'fs';
const LOG_DIR = './logs';
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

export function printBanner() {
  console.clear();
  console.log(chalk.cyanBright('========================================'));
  console.log(chalk.greenBright('🚀 PX NETWORK AUTO MINING BOT - JALANCUAN'));
  console.log(chalk.cyanBright('========================================\n'));
}

export function updateDashboard(account) {
  console.log(`${chalk.yellow('[>]')} ${account.token.slice(0, 20)}...` +
    (account.proxy ? chalk.gray(` via ${account.proxy}`) : ''));
}

export function logActivity({ status, token, message, result }) {
  const logMsg = `[${new Date().toLocaleString()}] ${status} - ${token.slice(0, 15)}... | ${message || result}`;
  console.log(status === 'OK' ? chalk.green(logMsg) : chalk.red(logMsg));
  const filename = `${LOG_DIR}/activity.log`;
  fs.appendFileSync(filename, logMsg + '\n');
}
