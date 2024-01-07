import get from '../detail/fe_hz_20k-50k/get.mjs'
import fs from 'fs';

!(async () => {
  const list = await get()

//   统计
  const areas = new WeakMap()
  list.map(li => {
    const area = areas[li.locationDesc] || 0
    areas[li.locationDesc] = area + 1
  })
  // console.log(list, areas)
  console.log(JSON.stringify(areas, null, 2))

//   经纬度
  const res = list.map(item => ({
    longitude: item.jobBaseInfoVO.longitude,
    latitude: item.jobBaseInfoVO.latitude
  }))

  fs.writeFileSync(new URL('./list.json', import.meta.url), JSON.stringify(res, null, 2));
//   console.log(JSON.stringify(res, null, 2))
})()
