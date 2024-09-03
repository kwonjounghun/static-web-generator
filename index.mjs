import fs from 'fs';
import path from 'node:path';
import { createPageContent, generatHtml } from './src/builder/createPage.mjs';
import mdxParser from './src/builder/mdxParser.mjs';

const pageList = fs.readdirSync(path.join(process.cwd(), '/src/pages'));
const mdxList = fs.readdirSync(path.join(process.cwd(), '/posts'));

// 블로그 상세 페이지를 만드는 로직
mdxList.forEach(async mdxDir => {
    const mdxData = await mdxParser(mdxDir);
    const [filename, pageContent] = await createPageContent('detail.mjs', mdxData);
    generatHtml(mdxData.metaData?.slug || filename, pageContent);
});

// 상세페이지 이외의 페이지를 만드는 로직
pageList.forEach(async pageDir => {
    if (!pageDir.includes('detail')) {
        const [filename, pageContent] = await createPageContent(pageDir);
        generatHtml(filename, pageContent);
    }

});