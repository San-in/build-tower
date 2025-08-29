#!/usr/bin/env node

// RUN:
// npm i -D sharp globby \
// && node scripts/bg2webp-rewrite.mjs --q=80 --effort=4 --rm \
// && npm rm -D sharp globby

import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises'
import { dirname } from 'node:path'
import process from 'node:process'
import {globby} from 'globby'
import sharp from 'sharp'

const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, v] = a.replace(/^--/,'').split('=')
    return [k, v ?? true]
  })
)

const ASSETS_DIR = args.assets ?? 'assets'
const CODE_DIR   = args.src ?? 'src'
const quality    = Number(args.q ?? 80)
const effort     = Number(args.effort ?? 4)
const removePng  = Boolean(args.rm ?? args['remove-original'])
const dry        = Boolean(args.dry)

const pngGlob = [`${ASSETS_DIR}/**/[bB]ackground.png`]
const codeGlobs = [
  `${CODE_DIR}/**/*.{ts,tsx,js,jsx,json}`,
]

const pngFiles = await globby(pngGlob, { onlyFiles: true })
if (!pngFiles.length) {
  console.log('• Не знайдено файлів за шаблоном:', pngGlob.join(', '))
} else {
  console.log(`• Знайдено ${pngFiles.length} файл(и/ів) background.png`)
}

let converted = 0
for (const inPath of pngFiles) {
  const outPath = inPath.replace(/background\.png$/i, 'background.webp')

  if (dry) {
    console.log(`[dry] convert: ${inPath} → ${outPath}`)
    continue
  }
  await mkdir(dirname(outPath), { recursive: true })
  const buf = await sharp(inPath).webp({ quality, effort }).toBuffer()
  await writeFile(outPath, buf)
  if (removePng) {
    await unlink(inPath).catch(() => {})
  }
  console.log(`✓ ${inPath} → ${outPath} (${(buf.byteLength/1024).toFixed(1)} KB)`)
  converted++
}

const codeFiles = await globby(codeGlobs, { onlyFiles: true })
let changed = 0
for (const fp of codeFiles) {
  const src = await readFile(fp, 'utf8')
  const next = src.replace(/background\.png/gi, 'background.webp')
  if (next !== src) {
    if (dry) {
      console.log(`[dry] rewrite: ${fp}`)
      continue
    }
    await writeFile(fp, next, 'utf8')
    changed++
  }
}
