import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Static React rendering: this marketing page needs no client runtime or server.
const root = path.resolve(import.meta.dirname, '..');
const content = JSON.parse(await fs.readFile(path.join(root, 'content.json'), 'utf8'));
const source = (await fs.readFile(path.join(root, 'app/page.tsx'), 'utf8'))
  .replace(/import content from ['"]\.\.\/content\.json['"];?/, `const content = ${JSON.stringify(content)};`);
const { outputText, diagnostics } = ts.transpileModule(source, {
  fileName: 'page.tsx', reportDiagnostics: true,
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
if (diagnostics?.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
  getCanonicalFileName: f => f, getCurrentDirectory: () => root, getNewLine: () => '\n',
}));
const intermediate = path.join(root, '.vinext', 'static-page.mjs');
await fs.mkdir(path.dirname(intermediate), { recursive: true });
await fs.writeFile(intermediate, outputText);
const { default: Page } = await import(pathToFileURL(intermediate).href + `?build=${Date.now()}`);
const markup = renderToStaticMarkup(React.createElement(Page));
const output = path.join(root, 'out');
// Only remove the known generated output, never a caller-supplied directory.
if (path.dirname(output) !== root || path.basename(output) !== 'out') throw new Error('Invalid build output path');
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
const clinic = path.join(output, 'clinic');
await fs.mkdir(clinic, { recursive: true });
await fs.cp(path.join(root, 'public/assets'), path.join(clinic, 'assets'), { recursive: true });
await fs.copyFile(path.join(root, 'public/_headers'), path.join(output, '_headers'));
const css = (await fs.readFile(path.join(root, 'app/globals.css'), 'utf8')).replace(/^@import[^;]+;\s*/gm, '');
await fs.writeFile(path.join(clinic, 'styles.css'), css);
await fs.writeFile(path.join(clinic, 'index.html'), `<!doctype html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="${process.env.SITE_INDEXABLE === 'true' ? 'index,follow' : 'noindex,nofollow'}"><title>Clinic WhatsApp Booking Automation | Datautomasi</title><meta name="description" content="Otomatisasi booking klinik melalui WhatsApp untuk cek jadwal, booking, reschedule, pembatalan, dan pencatatan data pasien secara lebih cepat dan profesional."><link rel="canonical" href="https://datautomasi.com/clinic/"><link rel="icon" href="/clinic/assets/brand.png"><link rel="preload" href="/clinic/assets/inter-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/clinic/styles.css"></head><body>${markup}</body></html>`);
console.log('Built static landing page: out/clinic/index.html');
await import('./check-output.mjs');
