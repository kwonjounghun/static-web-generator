import fs from 'fs';
import path from 'node:path';
import prettier from 'prettier';
import publicDirCreator from './publicDirCreator.mjs';

const template = (children) => `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div class="root">
            ${children}
        </div>
    </body>
    <script defer src="/js/bundle.js"></script>
</html>
`;

async function htmlCreator(fileInfo, pageContent) {
    publicDirCreator();

    const name = fileInfo.name;
    const reformatContent = await prettier.format(template(pageContent), { parser: 'html' });

    if (fileInfo.absolutePath && !fs.existsSync(path.join(process.cwd(), `/public/${fileInfo.absolutePath}`))) {
        fs.mkdirSync(path.join(process.cwd(), `/public/${fileInfo.absolutePath}`));
    }

    fs.writeFileSync(path.join(process.cwd(), '/public', `${`/${fileInfo.absolutePath}`}/${fileInfo.metaData ? fileInfo.metaData.slug : name}.html`), reformatContent);
}

export default htmlCreator;
