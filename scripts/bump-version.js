#!/usr/bin/env node
/**
 * Виставляє версію застосунку одночасно в app.json та package.json.
 *
 *   node scripts/bump-version.js          → авто patch-бамп (1.0.0 → 1.0.1)
 *   node scripts/bump-version.js 1.1.0    → явно задана версія
 *
 * Якщо version в app.json уже вище за останній git-тег vX.Y.Z, скрипт вважає,
 * що її підняли вручну, і залишає як є. Це дає змогу змінити minor/major
 * звичайним комітом, не воюючи з автобампом у CI.
 *
 * У GitHub Actions віддає результат як output `version`.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const APP_JSON = path.join(__dirname, '..', 'app.json');
const PACKAGE_JSON = path.join(__dirname, '..', 'package.json');

const parseVersion = (value) => {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(value).trim());

  return match ? match.slice(1, 4).map(Number) : null;
};

const compareVersions = (a, b) => {
  for (let i = 0; i < 3; i += 1) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }

  return 0;
};

const getLastTagVersion = () => {
  try {
    const tag = execSync('git describe --tags --abbrev=0 --match "v[0-9]*"', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();

    return parseVersion(tag.replace(/^v/, ''));
  } catch {
    return null;
  }
};

const app = JSON.parse(fs.readFileSync(APP_JSON, 'utf8'));
const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));

const current = parseVersion(app.expo.version);

if (!current) {
  throw new Error(`app.json: версія "${app.expo.version}" не у форматі X.Y.Z`);
}

const explicit = (process.argv[2] || '').trim();

let next;
let reason;

if (explicit) {
  next = parseVersion(explicit);

  if (!next) {
    throw new Error(`Аргумент "${explicit}" не є версією у форматі X.Y.Z`);
  }

  reason = 'явно задана версія';
} else {
  const lastTag = getLastTagVersion();

  if (lastTag && compareVersions(current, lastTag) > 0) {
    next = current;
    reason = `app.json (${current.join('.')}) вище за тег v${lastTag.join('.')} — залишаю ручний бамп`;
  } else {
    next = [current[0], current[1], current[2] + 1];
    reason = 'авто patch-бамп';
  }
}

const version = next.join('.');

app.expo.version = version;
pkg.version = version;

fs.writeFileSync(APP_JSON, `${JSON.stringify(app, null, 2)}\n`);
fs.writeFileSync(PACKAGE_JSON, `${JSON.stringify(pkg, null, 2)}\n`);

console.log(`${version} (${reason})`);

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\n`);
}
