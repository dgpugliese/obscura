const { webcrypto } = require('crypto');

async function sha256Hex_old(bytes) {
  const h = new Uint8Array(await webcrypto.subtle.digest("SHA-256", bytes));
  let s = "";
  for (let i = 0; i < h.length; i++) s += h[i].toString(16).padStart(2, "0");
  return s;
}

async function sha256Hex_new(bytes) {
  const h = new Uint8Array(await webcrypto.subtle.digest("SHA-256", bytes));
  return Array.from(h).map(x => x.toString(16).padStart(2, "0")).join('');
}

async function run() {
  const data = new Uint8Array(1024 * 1024); // 1MB
  // warmup
  for (let i = 0; i < 100; i++) {
    await sha256Hex_old(data);
    await sha256Hex_new(data);
  }

  const startOld = performance.now();
  for (let i = 0; i < 10000; i++) {
    await sha256Hex_old(data);
  }
  const timeOld = performance.now() - startOld;

  const startNew = performance.now();
  for (let i = 0; i < 10000; i++) {
    await sha256Hex_new(data);
  }
  const timeNew = performance.now() - startNew;

  console.log(`Old: ${timeOld}ms`);
  console.log(`New: ${timeNew}ms`);
}

run();
