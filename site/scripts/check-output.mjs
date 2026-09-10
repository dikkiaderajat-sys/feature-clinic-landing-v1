import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve(import.meta.dirname, '../out');
const html = await fs.readFile(path.join(root, 'clinic/index.html'), 'utf8');
const css = await fs.readFile(path.join(root, 'clinic/styles.css'), 'utf8');
const urls = [
  ...[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]),
  ...[...css.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)].map(match => match[1]),
];
for (const url of new Set(urls)) {
  if (url.startsWith('#') || url.startsWith('data:')) continue;
  if (url.startsWith('mailto:') || url.startsWith('https:')) {
    assert(['mailto:sales@datautomasi.com', 'https://wa.me/628155551600', 'https://datautomasi.com/clinic/'].includes(url), 'Unexpected external link: ' + url);
    continue;
  }
  assert(url.startsWith('/clinic/'), 'Asset must stay under /clinic/: ' + url);
  const asset = path.resolve(root, '.' + url);
  assert(asset.startsWith(root + path.sep), 'Asset outside output');
  assert((await fs.stat(asset)).size > 0, 'Empty asset: ' + url);
}
assert(html.includes('0815 555 1600'), 'Incorrect WhatsApp display');
assert(html.includes('<link rel="canonical" href="https://datautomasi.com/clinic/">'), 'Incorrect canonical');
assert.equal((await fs.readdir(root)).sort().join(','), '_headers,_redirects,clinic', 'Unexpected root output');
const redirects = await fs.readFile(path.join(root, '_redirects'), 'utf8');
assert.equal(redirects.trim(), '/ /clinic/ 302', 'Root redirect must be exactly "/ /clinic/ 302"');
const redirectSource = redirects.trim().split(/\s+/)[0];
assert.equal(redirectSource, '/', 'Only the root path may be redirected');
assert.notEqual(redirectSource, '/clinic/', 'Clinic path must not be redirected');
assert(html.includes('content="' + (process.env.SITE_INDEXABLE === 'true' ? 'index,follow' : 'noindex,nofollow') + '"'), 'Incorrect indexing mode');
assert.equal((html.match(/class="feature-card"/g) || []).length, 3);
assert.equal((html.match(/class="feature-pill"/g) || []).length, 28);
assert(!html.includes('<script'), 'Export must not contain QA instrumentation');
assert(!html.includes('/__qa/'), 'QA route leaked into output');
console.log('Output QA passed: assets, CTA targets, 3 cards, 14 duplicated pills, no QA scripts.');
