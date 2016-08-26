import request from "request";
import cheerio from "cheerio";
import fs from "fs";

let API_BASE = "https://api.myjson.com/bins/186hf";
let url = "http://abokifx.com";

function scrape() {
  request(url, function(error, response, html) {
    if (!error) {

      let $ = cheerio.load(html);
      $(".entry-content table tbody").first().filter(function() {
        let data = $(this);
        let recentData = data.contents().children().map(function(i, el) {
          return $(this).html();
        }).get();
        let USD = $(recentData[9]).text();
        let GBP = $(recentData[10]).text();
        let EUR = $(recentData[11]).text();

        const result = {
          "usd": USD,
          "gbp": GBP,
          "eur": EUR
        };
        const writableStream = fs.createWriteStream("rates.json");
        writableStream.write(JSON.stringify(result, null, 2), "UTF8");
        writableStream.end();
        writableStream.on('finish', async function() {
          console.log("Write completed to rates file.");
        });
        writableStream.on('error', function(err) {
          console.log("error writing main json", err.stack);
        });
        // try {
        //   request.put({ url: API_BASE, body: result, json: true }, function(error, response, body) {
        //     if (error) {
        //       return console.error('upload failed:', error);
        //     }
        //     console.log('Upload successful!  Server responded with:', body);
        //   });
        // } catch (e) {
        //   console.log("error occured sending json", e);
        // }
      });
    }
  });
}

function westernUnionScrape() {
  request(url, function(error, response, html) {
    if (!error) {

      let $ = cheerio.load(html);
      $(".entry-content table tbody tr").next().next().next().filter(function() {
        let data = $(this);
        let recentData = data.contents().map(function(i, el) {
          return $(this).html();
        }).get();
        console.log(recentData[1])
          // let USD = $(recentData[9]).text();
          // let GBP = $(recentData[10]).text();
          // let EUR = $(recentData[11]).text();

        // const result = {
        //   "usd": USD,
        //   "gbp": GBP,
        //   "eur": EUR
        // };

        // fs.writeFileSync(`./app/util/rates.json`, JSON.stringify(result, null, 2), { encoding: 'utf8' });
      });
    }
  });
}

export default { scrape, westernUnionScrape }
