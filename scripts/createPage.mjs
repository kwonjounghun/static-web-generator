import fs from 'fs';
import path from 'node:path';
import createElement from '../src/helpers/createElement.mjs';

const template = (children) => `
<html>
    <body>
        ${children}
    <body>
</html>
`

function readPagesDir() {
    const dir = fs.readdirSync(path.join(process.cwd(), '/src/pages'));

    return dir;
}

function createPage(pageList) {
    if (!fs.existsSync(path.join(process.cwd(), '/public'))) {
        fs.mkdirSync(path.join(process.cwd(), '/public'));
    }

    const listItem = [1, 2, 3, 4, 5, 6].map((item) => createElement('li', null, item)).join('');
    const list = createElement('ul', null, listItem);
    const data = template(list);


    pageList.forEach((filename) => {
        const name = path.basename(filename, '.mjs')
        fs.writeFileSync(path.join(process.cwd(), '/public', `${name}.html`), data);
    });

}

const pageList = readPagesDir();
createPage(pageList);