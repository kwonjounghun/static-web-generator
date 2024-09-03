import fs from 'fs';
import path from 'node:path';

import initallize from './src/builder/initallize.mjs';
import publicDirCreater from './src/builder/creater/publicDirCreater.mjs';
import pageComponentToHtmlString from './src/builder/creater/pageComponentToHtmlString.mjs';
import htmlCreater from './src/builder/creater/htmlCreater.mjs';


// 블로그를 구성하는 데이터를 수집 및 객체 생성
const DB = await initallize();

// public 디렉토리를 생성
publicDirCreater();

// 블로그 상세 페이지를 만드는 로직
DB.allMdx.forEach(async mdxData => {
    const pageContent = await pageComponentToHtmlString('detail.mjs', mdxData);
    htmlCreater(mdxData, pageContent);
});

// 상세페이지 이외의 페이지를 만드는 로직
DB.allFile.forEach(async fileInfo => {
    if (!fileInfo.name.includes('detail')) {
        const pageContent = await pageComponentToHtmlString(fileInfo.absolutePath === '' ? fileInfo.base : `${fileInfo.absolutePath}/${fileInfo.base}`);
        htmlCreater(fileInfo, pageContent);
    }
});

// 블로그를 구성하는 데이터를 data.json파일로 생성
fs.writeFileSync(path.join(process.cwd(), '/public', 'data.json'), JSON.stringify(DB));
