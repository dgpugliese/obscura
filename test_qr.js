const qrcode = require('qrcode-generator');
const qr = qrcode(0, "M");
qr.addData("https://example.com");
qr.make();
console.log(qr.createDataURL(5, 2));
