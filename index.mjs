import { createPageContent, generatHtml, readPagesDir } from './src/builder/createPage.mjs';

const pageList = readPagesDir();
pageList.forEach(async pageDir => {
    const [filename, pageContent] = await createPageContent(pageDir);
    generatHtml(filename, pageContent);
});