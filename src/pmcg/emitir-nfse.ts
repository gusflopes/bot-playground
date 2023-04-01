import { By, Key, WebDriver, until } from "selenium-webdriver";
import { NFSe } from "..";
import { centsToReals } from '../helpers/cents-to-reals';
import { later } from '../helpers/later';

export const emitirNotaFiscal = async (nfse: NFSe, driver: WebDriver) => {


  // Emitir NFSe
  await driver.findElement(By.linkText("Emitir Nota Fiscal")).click();
  // Selecionar Cliente
  await driver.wait(until.elementLocated(By.id("rTomCpfCnpjSel")));
  await driver
    .findElement(By.id("rTomCpfCnpjSel"))
    .sendKeys(nfse.tomador.cpfCnpj);
  await driver.findElement(By.id("rTomRazaoSocial")).click();
  await later(5000);
  await driver
    .findElement(By.id("rTomRazaoSocial"))
    .sendKeys(Key.HOME, Key.chord(Key.SHIFT, Key.END), nfse.tomador.name);
  await driver
    .findElement(By.id("rTomCep"))
    .sendKeys(Key.HOME, Key.chord(Key.SHIFT, Key.END), nfse.tomador.cep);
  await driver.findElement(By.id("rTomNumero")).click();
  await later(3000);
  await driver
    .findElement(By.id("rTomNumero"))
    .sendKeys(Key.HOME, Key.chord(Key.SHIFT, Key.END), nfse.tomador.numero);
  await driver
    .findElement(By.id("rTomEmail"))
    .sendKeys(Key.HOME, Key.chord(Key.SHIFT, Key.END), nfse.tomador.email);

  await later(1500);
  // avanncar
  const btnAvancar = await driver.findElement(
    By.xpath(`//*[@id="btnAvancar"]`)
  );
  // console.log(btnAvancar)
  await btnAvancar.click();
  await later(3000);
  // await driver.findElement(By.id("btnAvancar")).click()
  // Selecionar Código de Atividade
  await driver.wait(until.elementLocated(By.id("rCodAtv")));
  await driver.findElement(By.id("rCodAtv")).click();
  {
    await later(1500);
    await driver
      .findElement(By.css("#rCodAtv > option:nth-child(2)"))
      .click();
  }
  await later(3000);
  await driver.findElement(By.id("btnAvancar")).click();

  // Dados da Nota Fiscal
  await driver.findElement(By.id("rDescrNota")).click();
  await driver.findElement(By.id("rDescrNota")).sendKeys(nfse.descricao);
  await driver.findElement(By.id("rItemDescricao")).sendKeys(nfse.item);
  await driver.findElement(By.id("rItemQtd")).click();
  await driver.findElement(By.id("rItemQtd")).sendKeys(nfse.quantidade);
  await driver.findElement(By.id("rItemValUnit")).click();
  await driver.findElement(By.id("rItemValUnit")).sendKeys(centsToReals(nfse.valor));
  await driver.findElement(By.css(".body")).click();
  // await later(1000);;

  let startLoop = Date.now();
  while (true) {
    console.log("ainda não");
    const btnStyle = await (
      await driver.findElement(By.id("btnAdd"))
    ).getAttribute("style");
    if (
      btnStyle ===
      `background: url("imagens/Ok_16x16.png"); width: 18px; height: 18px;`
    ) {
      console.log("pronto para clicar");
      break;
    }
    if (Date.now() - startLoop > 5000) {
      console.log("timeout");
      break;
    }
  }

  await driver.findElement(By.id("btnAdd")).click();

  console.log("Pronto para emitir a Nota Fiscal!");
  await later(10000);
}