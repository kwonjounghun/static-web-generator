import { createPageContent, generatHtml } from './src/builder/createPage.mjs';
import initallize from './src/builder/initallize.mjs';

const DB = await initallize();

// 블로그 상세 페이지를 만드는 로직
DB.allMdx.forEach(async mdxData => {
    const pageContent = await createPageContent('detail.mjs', mdxData);
    generatHtml({ fileName: mdxData.metaData.slug, path: '' }, pageContent);
});

// 상세페이지 이외의 페이지를 만드는 로직
DB.allFile.forEach(async fileInfo => {
    if (!fileInfo.fileName.includes('detail')) {
        const pageContent = await createPageContent(fileInfo.path === '' ? fileInfo.fileName : `${fileInfo.path}/${fileInfo.fileName}`);
        generatHtml(fileInfo, pageContent);
    }
});

