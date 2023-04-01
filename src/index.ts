console.log("Hello World!")
console.log("Mensagem do Gustavo!")
// import { readFileSync } from 'node:fs'
// import { decodeCaptcha } from './helpers/decode-captcha'
import { NFSeJob } from './pmcg/index';

export interface NFSe {
  tomador: {
    cpfCnpj: string;
    name: string;
    cep: string;
    numero: string;
    email: string;
  },
  descricao: string;
  // aqui precisa ser um array de itens
  item: string;
  quantidade: number;
  valor: string; // in cents
}

const nfse: NFSe = {
  tomador: {
    cpfCnpj: "73013650125",
    name: "GUSTAVO FERREIRA LOPES",
    cep: "79041-080",
    numero: "2520",
    email: "gusflopes86@gmail.com",
  },
  valor: "100", // in cents
  item: "Item Teste",
  descricao: "Nota Fiscal emitida como teste",
  quantidade: 1,
};

(async function () {
  // // DecodeImage
  // const fileBuffer = readFileSync('tmp/captcha.png')
  // const result = await decodeCaptcha(fileBuffer)
  // console.log(`Resultado é: ${result}`)

  // Selenium Job
  await NFSeJob(nfse)
})()
