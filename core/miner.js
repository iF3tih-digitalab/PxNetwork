// core/miner.js
import fetch from 'node-fetch';
import fs from 'fs';

const COOLDOWN_FILE = './data/last_mining.json';
const COOLDOWN_HOURS = 24;

function loadCooldowns() {
  if (!fs.existsSync(COOLDOWN_FILE)) return {};
  return JSON.parse(fs.readFileSync(COOLDOWN_FILE, 'utf-8'));
}

function saveCooldowns(cooldowns) {
  fs.writeFileSync(COOLDOWN_FILE, JSON.stringify(cooldowns, null, 2));
}

export async function runMiner({ token, proxy }) {
  const cooldowns = loadCooldowns();
  const now = Date.now();

  if (cooldowns[token]) {
    const last = new Date(cooldowns[token]);
    const diffHrs = (now - last.getTime()) / 1000 / 60 / 60;
    if (diffHrs < COOLDOWN_HOURS) {
      return { status: 'SKIPPED', token, message: `Cooldown ${diffHrs.toFixed(1)} jam` };
    }
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'User-Agent': 'Dart/3.7 (dart:io)',
    'Accept-Encoding': 'gzip'
  };

  const response = await fetch('https://api.pxmine.com/api/v2/mining/start', { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const body = await response.text();

  cooldowns[token] = new Date().toISOString();
  saveCooldowns(cooldowns);

  return { status: 'OK', token, result: body };
}
