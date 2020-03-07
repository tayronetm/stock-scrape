const puppeteer = require("puppeteer");
const jsonServer = require('json-server');
const server = jsonServer.create()
var express = require('express');
var app = express();

let scrape = async () => {
  console.log("Iniciando sistema...");
  // console.log('Execuntando', indice)
  for (let i = 0; i < 10; i++) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("Abrindo site...");
  await page.goto("https://markets.businessinsider.com/cryptocurrencies");

  //EVALUATE SERVE PARA EXECUTAR O DETERMINADO COMANDO DENTRO
  //E DIRETAMENTE NO BROWSER LOGS EXCUTADOS AQUI SERAO EXIBIDOS NO BROWSER
  const result = await page.evaluate(() => {
    let tables = document.querySelectorAll(".table-small");
    let value = tables[1];

    let tbody = value.querySelector("tbody");
    let tr = tbody.querySelectorAll("tr");
    const stock = [{}];


    // PRICE => TR TD[] DIV SPAN
    // NAME => TR TD A
    tr.forEach(tr => {
      tr.querySelectorAll("td a").forEach(tda => {
        const span = tr.querySelectorAll("td div span")[0];
        stock.push({
          name: tda.innerText,
          price: span.innerText
        });
      });
    });
    return stock;
  });
  console.log("Raspando dados...");
  
    // browser.close();
  return result;
}
};
scrape().then(value => {
  console.log("*******Resultado********", value);
  app.use('/', jsonServer.router('db.json'))
  app.listen(3000)
  app.post('/stocks', (req, res) => {
     res.send(value)
  })
  server.post('/stocks', function (req, res, next) {
    req.method = 'POST'
    req.query = value
    next()
  })
})
