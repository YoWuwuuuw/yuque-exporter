## 介绍
本仓库基于 `renyunkang/yuque-exporter` 进行修改，实现语雀知识库的本地导出或通过 Github Actions 自动同步至 Github 仓库

## 方案一：本地导出
由于语雀登录时进行人机校验，所以改为手动登录，复用现有 Chrome 登录会话

步骤（Windows）：
1. 启动 Chrome 远程调试模式：在cmd终端执行：

`chrome --remote-debugging-port=9222 --user-data-dir="C:\my-chrome-data"`

2. 打开后，手动登录语雀网站，保持浏览器窗口打开。

3. 打开项目目录，cmd/终端：

`set USER=xxx`

`set PASSWORD=xxx`

`node main.js`

## 方案二：配置 Github Actions 流水线，自动 PR 至 Github 笔记仓库

1. 在自己的笔记备份仓库配置工作流
参考：`.github/workflows/sync-yuque.yml`

2. 获取cookies：
```bash
   # 启动 Chrome 远程调试模式
   chrome --remote-debugging-port=9222 --user-data-dir="C:\my-chrome-data"
   
   # 在 Chrome 中手动登录语雀，然后运行
   npm run extract-cookies
   ```

3. **配置 GitHub Secret**：
   - Settings → Secrets → Actions → New repository secret
   - Name: `YUQUE_COOKIES`
   - Value: 粘贴 `cookies.json` 的完整内容

4. 开启 Github Actions 仓库 PR 权限：
setting → Actions → General → Workflow permissions → 选择 `Allow GitHub Actions to create and approve pull requests` -> Save


## fork改动：
main.js中：

`const browser = await puppeteer.launch({ headless: false });`

替换为：

`const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222', // 连接本地已启动的Chrome实例
});`

并且注释掉自动登录：

`// await autoLogin(page);`
