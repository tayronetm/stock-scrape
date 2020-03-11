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
        console.log(indice+1)
        // request.post(`http://localhost:3000/stocks/${indice}`).form(
        //   {
        //     "name": res.name,
        //     "price": res.price,
        //     "last": Date.now()
        //   }
        // )
        request.put(`http://localhost:9000/stocks/${indice+1}`).form(
          {
            "name": res.name,
            "price": res.price,
            "last": Date.now()
          }
        )
      })
    });
  }
}, 10000);
