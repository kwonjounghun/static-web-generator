import fs from 'fs';
import path from 'node:path';
import prettier from 'prettier';

const template = (children) => `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        ${children}
    </body>
</html>
`;



export function readPagesDir() {
    const dir = fs.readdirSync(path.join(process.cwd(), '/src/pages'));

    return dir;
}

export async function generatHtml(fileInfo, pageContent) {
    if (!fs.existsSync(path.join(process.cwd(), '/public'))) {
        fs.mkdirSync(path.join(process.cwd(), '/public'));
    }

    const name = path.basename(fileInfo.fileName, '.mjs')
    const reformatContent = await prettier.format(template(pageContent), { parser: 'html' });

    if (fileInfo.path && !fs.existsSync(path.join(process.cwd(), `/public/${fileInfo.path}`))) {
        fs.mkdirSync(path.join(process.cwd(), `/public/${fileInfo.path}`));
    }

    fs.writeFileSync(path.join(process.cwd(), '/public', `${`/${fileInfo.path}`}/${name}.html`), reformatContent);
}

export async function createPageContent(pageDir, props) {
    const page = await import(path.join(process.cwd(), '/src/pages', pageDir));
    const content = page.default(props);

    return content;
}


