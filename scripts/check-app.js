'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<script src="src/ahp-core.js"></script>'), 'index.html 未加载共享核心模块');
assert(html.includes('return coreCalc(names,ps)'), '页面计算必须调用经过测试的共享核心');
assert(html.includes('coreMigrateState(JSON.parse'), '页面导入必须调用经过测试的共享迁移器');
assert((html.match(/function setMatrixMode\(/g) || []).length === 1, 'setMatrixMode 必须只有一个定义');
assert((html.match(/function graphWidget\(/g) || []).length === 1, 'graphWidget 必须只有一个定义');
assert(!html.includes("if(mode==='graph')graphApply"), '矩阵渲染不得隐式写入图形判断');
assert(!html.includes('renderAbout();renderSetup();renderCriteria();renderSubcriteria();'), 'render 不应刷新所有隐藏页面');
assert(readme.includes('https://antilovsky.github.io/AHP-workbench/'), 'README 未指向根目录部署地址');
assert(fs.existsSync(path.join(root, 'assets', 'bozida-logo-white.png')), '缺少博咨达标识');
assert(fs.existsSync(path.join(root, 'assets', 'Ritsumeikan_University_logo.svg')), '缺少立命馆大学标识');

for (const source of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
  new vm.Script(source[1], { filename: 'index.html' });
}
new vm.Script(fs.readFileSync(path.join(root, 'src', 'ahp-core.js'), 'utf8'), {
  filename: 'src/ahp-core.js',
});

console.log('应用结构、脚本语法和部署路径检查通过。');
