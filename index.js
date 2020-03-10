const scrapper = require ('./crypto-scrapy');
const request = require('postman-request');
var isLoading = false;
var results = 0
setInterval(() => {
  if (!isLoading) {
    isLoading = true;
    scrapper.scrape((a, b, c) => {
      results++;
      console.log(JSON.parse(c).result, `*******Resultado - ${results}********`);
      isLoading = false;
      JSON.parse(c).result.rows.map((res, indice) => {
        request.post('http://localhost:3000/stocks').form(
          {
            "name": res.name,
            "price": res.price,
            "last": Date.now()
          }
        )
        console.log(`Deletando indice ${indice}`)
        request.del(`http://localhost:3000/stocks/1`).form({})
      })
    });
  }
}, 5000);
