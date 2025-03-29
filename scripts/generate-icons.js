import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [16, 32, 48, 128];
const inputFile = join(__dirname, '../public/assets/icon.svg');
const outputDir = join(__dirname, '../public/assets');

async function generateIcons() {
    for (const size of sizes) {
        await sharp(inputFile)
            .resize(size, size)
            .png()
            .toFile(join(outputDir, `icon-${size}.png`));
        console.log(`Generated ${size}x${size} icon`);
    }
}

generateIcons().catch(console.error); 