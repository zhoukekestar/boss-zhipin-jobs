import nodejieba from "nodejieba";
import fs from 'fs';

function saveToFile(text) {
  fs.writeFileSync('./tmp', text);
}
const { cut, load } = nodejieba;


load({
  userDict: "./userdict.utf8",
});


const result = cut(`职位描述
1. 负责产品设计的前端代码开发工作，产出原型，配合完成后端数据的接口；
2. 熟悉业务逻辑，针对不同业务需求给出前端技术解决方案并实现交互原型；
3. 负责对产品页面性能的优化和维护；
4. 负责工具平台与Web项目的开发、维护、升级，完成核心代码的编写；
5. 负责网站相关功能设计、开发、测试和部署；
6. 和产品经理沟通并确定产品开发需求；
7. 跨部门协调沟通，完成各项工作。
任职要求
1.本科或以上学历，计算机相关专业，三年以上工作经验；
2.熟练掌握Web前端基础（HTML/CSS/JavaScript)、了解浏览器兼容性及相关调试方法;
3.深刻理解Web标准，对前端性能、可访问性、可维护性等相关知识有实际的了解和实践经验；
4.熟练掌握并在项目应用过 Angular / React / Vue 其中至少一项，有大型PC项目经验优先;
5.熟悉gulp / browserify / webpack，了解前端工程化，模块化，前后端分离优先；
6.有 NodeJS 服务开发经验，有以下任意一种Express/Koa/Egg服务开发框架使用经验优先;
7.对业界主流跨端方案有使用经验以及有深入了解大加分；`).filter(t => !!t.trim())
console.log(JSON.stringify(result));

saveToFile(JSON.stringify(result, null, 2))
