import fs from 'fs';
import path from 'node:path';

import Initialize from './src/builder/initialize.mjs';
import publicDirCreator from './src/builder/creator/publicDirCreator.mjs';
import pageComponentToHtmlString from './src/builder/creator/pageComponentToHtmlString.mjs';
import htmlCreator from './src/builder/creator/htmlCreator.mjs';
import runBundler from './src/builder/creator/bundleCreator.mjs';


// 블로그를 구성하는 데이터를 수집 및 객체 생성
const initializeData = new Initialize();
await initializeData.init();
const DB = initializeData.getData();

// public 디렉토리를 생성
publicDirCreator();

// 블로그 상세 페이지를 만드는 로직
DB.allMdx.forEach(async mdxData => {
    const pageContent = await pageComponentToHtmlString('detail.mjs', mdxData);
    htmlCreator(mdxData, pageContent);
});

// 상세페이지 이외의 페이지를 만드는 로직
DB.allFile.forEach(async fileInfo => {
    if (!fileInfo.name.includes('detail')) {
        const pageContent = await pageComponentToHtmlString(fileInfo.absolutePath === '' ? fileInfo.base : `${fileInfo.absolutePath}/${fileInfo.base}`);
        htmlCreator(fileInfo, pageContent);
    }
});

// 블로그를 구성하는 데이터를 data.json파일로 생성
fs.writeFileSync(path.join(process.cwd(), '/public', 'data.json'), JSON.stringify(DB));

// SPA제공을 위해 bundle파일 생성
runBundler(path.join(process.cwd(), '/src/App.mjs'), path.join(process.cwd(), '/public/js/bundle.js'));