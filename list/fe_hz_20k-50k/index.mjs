import puppeteer from 'puppeteer';
import chrome from 'chrome-cookies-secure';
import fs from 'fs';

async function saveToFile(text) {
  fs.writeFileSync(`./list.json`, text);
}

// Get current computer user's chrome cookies
const getCookies = (url) => new Promise((resolve) => {
  chrome.getCookies(`https://${new URL(url).hostname}/`, 'puppeteer', function (err, cookies) {
    if (err) {
      console.log(err, 'error');
      return
    }
    resolve(cookies);
  })
});


(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  const url = `https://www.zhipin.com/web/geek/job?query=%E5%89%8D%E7%AB%AF&city=101210100&salary=406&page=1`;
  const cookies = await getCookies(url)
  await page.setCookie(...cookies)
  // Navigate the page to a URL
  await page.goto(url);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  for (let index = 1; index < 3; index++) {
    const result = await page.evaluate((page) => {
      const query = encodeURIComponent('前端');
      const pageSize = 30;

      const api = `https://www.zhipin.com/wapi/zpgeek/search/joblist.json?scene=1&query=${query}&city=101210100&experience=&payType=&partTime=&degree=&industry=&scale=&stage=&position=&jobType=&salary=406&multiBusinessDistrict=&multiSubway=&page=${page}&pageSize=${pageSize}`;
      return fetch(api, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6",
          "cache-control": "no-cache",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": `https://www.zhipin.com/web/geek/job?query=${query}&city=101210100&salary=406&page=1`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      }).then(d => d.json())
    }, index);

    
    console.log(result);
  }


  await browser.close();
})();