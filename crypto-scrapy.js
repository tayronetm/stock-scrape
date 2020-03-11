
const request = require('postman-request');
const URI = 'https://billboard.service.cryptowat.ch/assets?quote=usd&limit=5&sort=volume';

exports.scrape = async (callback) => {
  return request(URI, callback);
}

