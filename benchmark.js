const { performance } = require('perf_hooks');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const env = {
  BLOBS: {
    list: async ({ limit, cursor }) => {
      await sleep(10);
      const objects = [];
      for(let i = 0; i < limit; i++) {
        objects.push({ key: `key-${i}` });
      }
      return { objects, truncated: false };
    },
    delete: async (key) => {
      await sleep(10);
    }
  },
  META: {
    get: async (key) => {
      await sleep(5);
      return Math.random() > 0.5 ? "meta" : null;
    }
  }
};

async function sweepOrphans_baseline(env) {
  let cursor;
  let scanned = 0;
  do {
    const page = await env.BLOBS.list({ limit: 200, cursor });
    for (const obj of page.objects) {
      scanned++;
      const meta = await env.META.get(obj.key);
      if (!meta) await env.BLOBS.delete(obj.key);
    }
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor && scanned < 200); // modified safety cap for benchmark
}

async function sweepOrphans_optimized(env) {
  let cursor;
  let scanned = 0;
  do {
    const page = await env.BLOBS.list({ limit: 200, cursor });

    const batchSize = 50;
    for (let i = 0; i < page.objects.length; i += batchSize) {
      const chunk = page.objects.slice(i, i + batchSize);
      scanned += chunk.length;

      const promises = chunk.map(async (obj) => {
        const meta = await env.META.get(obj.key);
        if (!meta) {
          await env.BLOBS.delete(obj.key);
        }
      });

      await Promise.allSettled(promises);
    }

    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor && scanned < 200);
}

async function run() {
  const start1 = performance.now();
  await sweepOrphans_baseline(env);
  const end1 = performance.now();
  console.log(`Baseline: ${(end1 - start1).toFixed(2)} ms`);

  const start2 = performance.now();
  await sweepOrphans_optimized(env);
  const end2 = performance.now();
  console.log(`Optimized: ${(end2 - start2).toFixed(2)} ms`);
}

run();
