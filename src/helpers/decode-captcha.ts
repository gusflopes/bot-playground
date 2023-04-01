import { createWorker } from 'tesseract.js';

export const decodeCaptcha = async (fileBuffer: Buffer): Promise<string> => {
  const worker = await createWorker({
    logger: m => console.log(m),
    // : '/tmp/lat.traineddata',

  })
  await worker.loadLanguage('lat');
  await worker.initialize('lat')
  const { data: { text } } = await worker.recognize(fileBuffer)
  await worker.terminate()
  const result = text.replace(/\n/g, "").substring(0, 4)
  // console.log(text)
  // console.log(result)
  return result

}
