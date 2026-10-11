const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route('**/api/upload', route => route.fulfill({ json: { id: "test-id" } }));
  await page.route('**/worker.js', route => route.fulfill({ status: 200, body: "" }));
  await page.goto('http://localhost:8000/app.html');
  await page.getByText('compose text').click();
  await page.locator('textarea').fill('test');
  await page.getByText('ENCRYPT →').click();
  await page.getByText('QR', { exact: true }).click();
  const imgLocator = page.locator('img[alt="QR Code"]');
  await imgLocator.waitFor({ state: 'visible' });
  const src = await imgLocator.getAttribute('src');
  if (src && src.startsWith('data:image/gif;base64,')) {
    console.log("SUCCESS: QR Code rendered safely with DataURL.");
  } else {
    console.error("FAIL: Invalid QR Code rendering:", src);
    process.exit(1);
  }
  await browser.close();
})();
