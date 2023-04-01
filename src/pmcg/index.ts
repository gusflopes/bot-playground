import { writeFileSync } from 'node:fs';
import { Builder, By } from "selenium-webdriver";
import { decodeCaptcha } from '../helpers/decode-captcha';
import { later } from "../helpers/later";
import { NFSe } from '../index';
import { emitirNotaFiscal } from './emitir-nfse';
import { localizarEmpresa } from './localizar-empresa';

require("dotenv/config");

export const NFSeJob = async (nfse: NFSe) => {
  console.log(nfse)

  // Inicializar

  let driver = await new Builder().forBrowser("chrome").build();
  let vars: any = {};

  try {
    await driver.get("https://nfse.pmcg.ms.gov.br/NotaFiscal/index.php");
    // await driver.manage().window().setRect({ x: 1214, y: 729 });
    vars["root"] = await driver.getWindowHandle();
    await driver.switchTo().window(vars["root"]);
    await driver.switchTo().frame(1);
    await later(1500);
    await driver.findElement(By.css("#fundopopup")).click();
    await driver.findElement(By.linkText("Acesso ao Sistema")).click();

    await driver.findElement(By.id("rLogin")).sendKeys(process.env.USER_LOGIN!);
    await driver
      .findElement(By.id("rSenha"))
      .sendKeys(process.env.USER_PASSWORD!);



    let retry = 0;
    while (true) {
      try {
        await driver.findElement(By.id("rSelo")).isEnabled()
      } catch (err) {
        break;
      }
      retry++;
      await driver
        .findElement(By.id("rSenha"))
        .sendKeys(process.env.USER_PASSWORD!);

      // await driver.findElement(By.id("rSelo")).isEnabled();
      const catpcha = await driver.findElement(By.css(`td > img`))
      // console.log(catpcha)

      // Tirar uma screenshot do element com id rSelo e descobrir captcha usando tesseract
      const screenshot = await catpcha.takeScreenshot();
      writeFileSync('./tmp/captcha.png', screenshot, 'base64');

      // const buffer = Buffer.from(screenshot.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const buffer = Buffer.from(screenshot, 'base64');

      const captchaString = await decodeCaptcha(buffer)
      // const texto = await solveCaptcha(screenshot)

      console.log(`Tentativa nº ${retry}. Captcha: ${captchaString}`)
      await later(1000);
      await driver.findElement(By.id("rSelo")).sendKeys(captchaString);
      await later(1000);

      await driver.findElement(By.css("#btnEntrar")).click();
      await later(3000)

    }
    // continuar codigo

    // Fazer login


    // Selecionar Empresa
    const userToSelect = await localizarEmpresa(driver, "LOPES CONTABILIDADE")
    await userToSelect?.click();
    await later(1500);

    // Emitir Nota Fiscal
    await emitirNotaFiscal(nfse, driver)



    await later(15000)


    // Emitir nota fiscal
    await driver.quit()

  } catch (error) {
    console.log(error)
  }

}