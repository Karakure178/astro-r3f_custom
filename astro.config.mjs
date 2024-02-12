import { defineConfig } from 'astro/config';
// import vue from '@astrojs/vue';
import fs from 'fs';
import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import react from "@astrojs/react";

// https://teno-hira.com/media/?p=1615
// ES Moduleでは__dirnameがつかえないのでそれ対策
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileNameList = fs.readdirSync(resolve(__dirname, './src/pages'));

console.log(fileNameList);

// Build.rollupOptions.inputに渡すオブジェクトを生成
const inputFiles = {};
for (let i = 0; i < fileNameList.length; i++) {
    const file = fileNameList[i];
    inputFiles[file] = resolve(__dirname, `./src/pages/${file}/index.astro`);
    /*
    この形を自動的に作る
    input:{
      index: resolve(__dirname, './src/index.html'),
      list: resolve(__dirname, './src/list.html')
    }
  */
}

console.log(inputFiles);

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    compilerOptions: {
        baseUrl: '.',
    },
    vite: {
        optimizeDeps: {
            exclude: [],
        },
        RollupOptions: {
            // ファイル出力設定
            output: {
                assetFileNames(assetInfo) {
                    let extType = assetInfo.name.split('.')[1];
                    // Webフォントファイルの振り分け
                    if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
                        extType = 'fonts';
                    }

                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'images';
                    }

                    // ビルド時のCSS名を明記してコントロールする
                    if (extType === 'css') {
                        return `assets/css/[name].css`;
                    }

                    console.log(`assets/${extType}/[name][extname]`);

                    return `assets/${extType}/[name][extname]`;
                },
                chunkFileNames: 'assets/js/[name].js',
                entryFileNames: 'assets/js/[name].js',
            },
            // Input:
            // 生成オブジェクトを渡す
            input: inputFiles,
        },
    },
});