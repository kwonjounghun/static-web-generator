import fs from 'fs';
import path from 'node:path';
import mdxParser from './mdxParser.mjs';
import blogConfig from '../../blog.config.mjs';

// blog.config.mjs 파일의 siteMetadata 정보 파싱
// posts 디렉토리를 파싱해 mdx 파일의 정보를 추출

function getFileList(dir) {
    const fileList = [];
    const needVisit = fs.readdirSync(path.join(process.cwd(), dir), { withFileTypes: true }).map(fileInfo => ({ parentPath: '', fileInfo }));

    for (const file of needVisit) {
        if (file.fileInfo.isDirectory()) {
            const parentPath = file.parentPath || '';
            const subDirPath = `${parentPath}/${file.fileInfo.name}`;
            const subDir = fs
                .readdirSync(path.join(process.cwd(), `${dir}/${subDirPath}`), { withFileTypes: true })
                .map(fileInfo => ({ parentPath: subDirPath, fileInfo }));

            needVisit.push(...subDir);
        } else {
            fileList.push({
                fileName: file.fileInfo.name,
                path: file.parentPath
            });
        }
    }

    return fileList;
}

async function initallize() {
    const allFile = getFileList('/src/pages');
    const mdxList = fs.readdirSync(path.join(process.cwd(), '/posts'));
    console.log(mdxList);
    const allMdx = [];
    for (const mdxDir of mdxList) {
        const markdownData = await mdxParser(mdxDir);
        allMdx.push(markdownData);
    }

    return {
        siteMetadata: blogConfig.siteMetadata,
        allMdx,
        allFile,
    }
}

export default initallize;