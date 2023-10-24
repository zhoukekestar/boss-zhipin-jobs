import getList from '../../list/fe_hz_20k-50k/get.mjs'
import fs from 'fs'

async function fetchDetail (securityId) {
  return fetch(
    `https://www.zhipin.com/wapi/zpgeek/miniapp/job/detail.json?securityId=${securityId}&lid=53T2ONKOx1k.search.1&source=10&scene=&appId=10002`,
    {
      headers: {
        Host: 'www.zhipin.com',
        'content-type': 'application/x-www-form-urlencoded',
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
        wt2: 'Dc_fhgU2bL_lkN9RtsshVap-_W5vo9gcmbJCmPgFWUi92H65QlEHIf4jjo4gqtIST8fXY-hcHjYqYbwlL8J1ZOQ~~',
        scene: '1089',
        mpt: 'a4b5da004969161e40a7b657bc203dc4',
        miniappversion: '5.1900',
        'accept-language': 'en-US,en;q=0.9',
        platform: 'zhipin/mac',
        ver: '5.1900',
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac',
        referer:
          'https://servicewechat.com/wxa8da525af05281f3/469/page-frame.html',
        ua: '{"model":"MacBookPro14,1","platform":"mac"}',
        zpappid: '10002'
      }
    }
  ).then(d => d.json())
}

const sleep = t => new Promise((resolve) => setTimeout(resolve, t));

!(async () => {
  const list = await getList()

  for (let i = 0; i < list.length; i++) {
    const filePath = new URL(`./${i}.json`, import.meta.url);
    if (fs.existsSync(filePath)) continue;

    
    console.log(`Fetch ${i} Time: `, new Date().toISOString());

    const item = list[i]
    const detail = await fetchDetail(item)

    if (detail?.zpData?.securityId) {
        fs.writeFileSync(filePath, JSON.stringify(detail, null, 2));
        await sleep((3 + Math.random() * 3) * 1000);
    } else {
        console.log('已被屏蔽，请更换 IP')
    }
  }
})()
