import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  try {
    console.log('正在连接到 Chrome 浏览器...');
    const browser = await puppeteer.connect({
      browserURL: 'http://127.0.0.1:9222'
    });
    
    const page = await browser.newPage();
    console.log('正在访问语雀...');
    await page.goto('https://www.yuque.com/dashboard', { waitUntil: 'networkidle2' });
    
    console.log('正在提取 cookies...');
    const cookies = await page.cookies();
    
    if (cookies.length === 0) {
      console.error('❌ 未找到 cookies，请确保已登录语雀');
      process.exit(1);
    }
    
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
    console.log(`✅ Cookies 已保存到 cookies.json (共 ${cookies.length} 个 cookies)`);
    
    browser.disconnect();
    console.log('✅ 完成！现在可以复制 cookies.json 的内容到 GitHub Secret 了');
  } catch (error) {
    console.error('❌ 错误:', error.message);
    console.error('请确保：');
    console.error('1. Chrome 已启动并开启远程调试：chrome --remote-debugging-port=9222 --user-data-dir="C:\\my-chrome-data"');
    console.error('2. 已手动登录语雀');
    process.exit(1);
  }
})();

