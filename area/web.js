const AMap = await AMapLoader.load({
  key: 'f62c7a5ae49c1c3558352a756d953da4', //申请好的Web端开发者 Key，调用 load 时必填
  version: '2.0' //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
})

const map = new AMap.Map('container', {
  viewMode: '2D', // 默认使用 2D 模式
  zoom: 11, //初始化地图层级
  center: [119.996503, 30.276096] //初始化地图中心点
})

const list = await fetch('./list.json').then(d => d.json())

for (let item of list) {
  // 为避免重复，加个随机值
  // 0.0001 * Math.random()
  const position = new AMap.LngLat(
    item.longitude + 0.0005 * Math.random(),
    item.latitude + 0.0005 * Math.random()
  ) // Marker经纬度
  const marker = new AMap.Marker({
    position: position,
    title: item.brandName + item.salaryDesc
    // content: `<div class="custom-content-marker">
    //   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">

    //   ${item.brandName}
    // </div>`
    // offset: new AMap.Pixel(-13, -30) // 以 icon 的 [center bottom] 为原点
  })
  marker.on('click', () => {
    alert(item.title)
  })
  map.add(marker)
}
