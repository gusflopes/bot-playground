import { By, WebDriver } from 'selenium-webdriver';

export async function localizarEmpresa(driver: WebDriver, searchParam: string) {
  await driver.findElement(By.linkText("Selecionar Empresa")).click();
  const elements1 = await driver.findElements(By.css("tr .gridResultado1"));
  const elements2 = await driver.findElements(By.css("tr .gridResultado2"));
  // .then((r) => console.log(`linha 15: ${r.length}`));
  const elements = [...elements1, ...elements2];
  console.log(`total: ${elements.length}`);
  console.log(elements[0].findElement);

  let result;

  for (let e of elements) {
    const text = await e.getText();
    console.log(text);
    if (text.includes(searchParam)) {
      console.log("ESTE É O CORRETO!");
      result = e;
    }
    console.log("-----");
  }
  return result;
}