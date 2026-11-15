#!/usr/bin/env node
/* Đọc .env  ->  ghi config.js (index.html nạp file này).
   Chạy:  node build.js
   Không cần cài thêm gì. */
const fs = require('fs');
const path = require('path');

const MAX_WED = 10; // số ảnh cưới tối đa (IMG_W1..IMG_W10)
const MAX_MP3 = 2;  // số file nhạc tối đa (MP3_1..MP3_2)

const dir = __dirname;
const envFile = path.join(dir, '.env');
if (!fs.existsSync(envFile)) {
  console.error('Không thấy file .env');
  process.exit(1);
}

const env = {};
fs.readFileSync(envFile, 'utf8').split(/\r?\n/).forEach(function (line) {
  line = line.trim();
  if (!line || line[0] === '#') return;
  const i = line.indexOf('=');
  if (i < 0) return;
  const key = line.slice(0, i).trim();
  let val = line.slice(i + 1).trim();
  if (/^(".*"|'.*')$/.test(val)) val = val.slice(1, -1);
  if (val) env[key] = val;
});

const warn = [];
const isUrl = function (p) { return /^https?:\/\//.test(p); };
const check = function (key, p) {
  if (!isUrl(p) && !fs.existsSync(path.join(dir, p))) warn.push('Không thấy file: ' + key + ' -> ' + p);
};

const cfg = { SHEET_CSV: env.SHEET_CSV || '', IMG: {}, MUSIC: [] };

Object.keys(env).forEach(function (k) {
  if (k.indexOf('IMG_') !== 0) return;
  const name = k.slice(4).toLowerCase();
  const w = /^w(\d+)$/.exec(name);
  if (w && (+w[1] < 1 || +w[1] > MAX_WED)) {
    warn.push(k + ' bị bỏ qua (chỉ nhận IMG_W1..IMG_W' + MAX_WED + ')');
    return;
  }
  cfg.IMG[name] = env[k];
  check(k, env[k]);
});

for (let n = 1; n <= MAX_MP3; n++) {
  const v = env['MP3_' + n];
  if (!v) continue;
  cfg.MUSIC.push(v);
  check('MP3_' + n, v);
}
Object.keys(env).forEach(function (k) {
  const m = /^MP3_(\d+)$/.exec(k);
  if (m && +m[1] > MAX_MP3) warn.push(k + ' bị bỏ qua (chỉ nhận MP3_1..MP3_' + MAX_MP3 + ')');
});

fs.writeFileSync(
  path.join(dir, 'config.js'),
  '/* TỰ SINH từ .env bằng "node build.js" - đừng sửa tay */\nwindow.APP_CONFIG = ' + JSON.stringify(cfg, null, 2) + ';\n'
);

const wed = Object.keys(cfg.IMG).filter(function (k) { return /^w\d+$/.test(k); }).length;
console.log('Đã ghi config.js: ' + Object.keys(cfg.IMG).length + ' ảnh (' + wed + ' ảnh cưới), ' +
  cfg.MUSIC.length + ' nhạc, SHEET_CSV ' + (cfg.SHEET_CSV ? 'có' : 'trống'));
if (warn.length) console.warn('CẢNH BÁO:\n  ' + warn.join('\n  '));
