import fs from 'fs'

export default async () => {
  let list = []
  for (let i = 1; i <= 7; i++) {
    const txt = fs.readFileSync(new URL(`./${i}.json`, import.meta.url))

    list = list.concat(JSON.parse(txt).zpData.jobList.map(t => t.securityId))
  }

  return list
}
