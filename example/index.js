console.log("Hello World!")

// #!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs')
const { createWorker } = require('tesseract.js');

// const [,, imagePath] = process.argv;
// const image = path.resolve(__dirname, (imagePath || '../../tests/assets/images/cosmic.png'));
const image = './captcha.png'
const captchaImage = fs.readFileSync(image);

console.log(`Recognizing ${image}`);

(async () => {
  const worker = await createWorker({
    logger: m => console.log(m),
  });
  await worker.loadLanguage('lat');
  await worker.initialize('lat');
  const { data: { text } } = await worker.recognize(captchaImage);
  console.log(text);
  await worker.terminate();
})();
