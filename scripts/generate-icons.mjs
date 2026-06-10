import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

// Bat silhouette SVG on the app's dark background
const batSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0f0d0b"/>
  <g transform="translate(${size / 2}, ${size / 2}) scale(${size / 200})">
    <path fill="#cfc3b3" d="
      M0,-28
      C-6,-28 -10,-22 -10,-16
      C-20,-18 -38,-30 -52,-20
      C-60,-14 -60,-4 -52,2
      C-44,8 -30,6 -20,4
      C-16,10 -12,14 -10,20
      C-8,26 -4,30 0,30
      C4,30 8,26 10,20
      C12,14 16,10 20,4
      C30,6 44,8 52,2
      C60,-4 60,-14 52,-20
      C38,-30 20,-18 10,-16
      C10,-22 6,-28 0,-28Z
      M-6,-10 C-6,-14 -3,-16 0,-16 C3,-16 6,-14 6,-10 C6,-6 3,-4 0,-4 C-3,-4 -6,-6 -6,-10Z
    "/>
  </g>
</svg>
`

async function generate(size, filename) {
  await sharp(Buffer.from(batSvg(size)))
    .png()
    .toFile(join(publicDir, filename))
  console.log(`Generated public/${filename}`)
}

await generate(192, 'icon-192.png')
await generate(512, 'icon-512.png')
