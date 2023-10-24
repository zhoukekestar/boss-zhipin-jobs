import fs from 'fs'

async function init (){
  let list = []
  for (let i = 1; i <= 300; i++) {
    const filePath = new URL(`./${i}.json`, import.meta.url);
    if (!fs.existsSync(filePath)) return list;

    const txt = fs.readFileSync(filePath)

    const job = JSON.parse(txt);
    list.push({
        jobDesc: job.zpData.jobBaseInfoVO.jobDesc,
        address: job.zpData.jobBaseInfoVO.address
    })
  }

  return list
}

export default init;