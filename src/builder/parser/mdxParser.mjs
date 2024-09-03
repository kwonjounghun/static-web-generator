import fs from 'fs';
import path from 'node:path';

import { unified } from 'unified'
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';


// MDX AST에서 헤더 정보만 분리하는 로직
function separationMataData(markdownAst) {
    return markdownAst
        .children
        .splice(1, 1)[0]
        .children[0].value.split('\n')
        .reduce((acc, crr) => {
            const [key, value] = crr.split(': ');
            acc[key] = value.replaceAll('"', '');
            return acc;
        }, {});
}

// MDX 파일의 내용을 읽어 AST로 변환 후 HTML string으로 변환하는 로직
async function mdxParser(dir) {
    const mdxList = [];
    const needVisit = fs
        .readdirSync(path.join(process.cwd(), dir), { withFileTypes: true })
        .map(fileInfo => ({ parentPath: '', fileInfo }));

    for (const mdx of needVisit) {
        const parentPath = mdx.parentPath || '';
        const subDirPath = `${parentPath}/${mdx.fileInfo.name}`;

        if (mdx.fileInfo.isDirectory()) {
            const subDir = fs
                .readdirSync(path.join(process.cwd(), `${dir}/${subDirPath}`), { withFileTypes: true })
                .map(fileInfo => ({ parentPath: subDirPath, fileInfo }));

            needVisit.push(...subDir);
        } else {
            const content = fs.readFileSync(path.join(process.cwd(), `${dir}/${subDirPath}`));
            const processor = await unified()
                .use(remarkParse)  // Markdown 파싱
                .use(remarkMdx);   // MDX 구문 파싱

            const markdownAst = processor.parse(content);
            const metaData = separationMataData(markdownAst)

            const transformHTML = await unified()
                .use(remarkRehype)   // Markdown AST를 HTML AST로 변환
                .use(rehypeStringify); // HTML AST를 HTML 문자열로 변환;


            const file = await transformHTML.run(markdownAst);
            const html = transformHTML.stringify(file);
            const [name, extention] = mdx.fileInfo.name.split('.');

            mdxList.push({
                base: mdx.fileInfo.name,
                name: name,
                extention: extention,
                basePath: dir,
                relativePath: mdx.parentPath ? `${dir}/${mdx.parentPath}` : dir,
                absolutePath: mdx.parentPath,
                html,
                metaData,
            })
        }
    }


    return mdxList;
}

export default mdxParser;
