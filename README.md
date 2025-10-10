## 介绍：
由于语雀登录时进行人机校验，所以改为手动登录，复用现有 Chrome 登录会话

步骤（Windows）：
1. 启动 Chrome 远程调试模式
在cmd终端执行：
// --user-data-dir 必须是一个新建的文件夹路径
chrome --remote-debugging-port=9222 --user-data-dir="C:\my-chrome-data"

2. 打开后，手动登录语雀网站（会话会保存在该文件夹中），保持浏览器窗口打开。

3. 打开项目目录，cmd终端：
set USER=xxx
set PASSWORD=xxx
node main.js


## 改动：
main.js中：
const browser = await puppeteer.launch({ headless: false });

替换为：
const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222', // 连接本地已启动的Chrome实例
});

并且注释掉自动登录：
// await autoLogin(page);
