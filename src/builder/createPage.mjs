import fs from 'fs';
import path from 'node:path';

const template = (children) => `
<html>
    <body>
        ${children}
    <body>
</html>
`;



function readPagesDir() {
    const dir = fs.readdirSync(path.join(process.cwd(), '/src/pages'));

    return dir;
}

function createPage() {
    const pageList = readPagesDir();

    if (!fs.existsSync(path.join(process.cwd(), '/public'))) {
        fs.mkdirSync(path.join(process.cwd(), '/public'));
    }

    pageList.forEach((filename) => {
        const name = path.basename(filename, '.mjs')
        fs.writeFileSync(path.join(process.cwd(), '/public', `${name}.html`), template(name));
    });

}

export default createPage;