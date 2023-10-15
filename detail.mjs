
import fs from 'fs';


let i = 0;
async function saveToFile(text) {
    fs.writeFileSync(`./detail${i++}.txt`, text);
}

async function fetchDetail(securityId) {
    return fetch(`https://www.zhipin.com/wapi/zpgeek/miniapp/job/detail.json?securityId=${securityId}&lid=53T2ONKOx1k.search.1&source=10&scene=&appId=10002`, {
        headers: {

            "Host": "www.zhipin.com",
            "content-type": "application/x-www-form-urlencoded",
            "accept": "*/*",
            "x-requested-with": "XMLHttpRequest",
            "wt2": "Dc_fhgU2bL_lkN9RtsshVap-_W5vo9gcmbJCmPgFWUi92H65QlEHIf4jjo4gqtIST8fXY-hcHjYqYbwlL8J1ZOQ~~",
            "scene": "1089",
            "mpt": "a4b5da004969161e40a7b657bc203dc4",
            "miniappversion": "5.1900",
            "accept-language": "en-US,en;q=0.9",
            "platform": "zhipin/mac",
            "ver": "5.1900",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac",
            "referer": "https://servicewechat.com/wxa8da525af05281f3/469/page-frame.html",
            "ua": "{\"model\":\"MacBookPro14,1\",\"platform\":\"mac\"}",
            "zpappid": "10002",
        }
    }).then(d => d.json())
}
!(async () => {

    const list = ["hcQBfg_gxlXz1-W1Nvz_hz-f4ibGHIGwOl0Qwyi6lOUUGxltUx2f_-8lCiqlmMY_Lsh-qArytMIdRONiAvs7ztPiaHhNt6OvVOLX6fNRZ7NHFGeuJug~",
        "qwwgXUZA2v1f2-M1ME5msaP9UJvQwmNyc6NH314jLQnPDah1LH3q3Pa4t6nFE2_eSotEI9wtxIAr1V-FnQyvhZcVqWkX-haicadoPfMP5bUkMU4~",
        "GjRR_nEqs0mB1-U1D0Y0fg-C2iHmqhyYsC-izBI1N9d7qPsCKWAMJhuCGBilJJGRDMZVT0NlTW8Mc6F3_hKSom0l8mfhml4NozKr0l8X3c8~",
        "sgpSXi9ODeEwM-_1m8Y_wVnKIQhgjRX42j4xXQbmo3CHNKwK3kja0kJkvGHCWa7zRKM9vrRmUzctsloKrso1iygrWOW_CpH_Ahe_x8tS3Iba9ObcXOO8",];

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const detail = await fetchDetail(item);

        console.log(detail)

        saveToFile(JSON.stringify(detail));
    }
})();


