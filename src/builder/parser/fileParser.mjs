import fs from 'fs';
import path from 'node:path';

// blog.config.mjs 파일의 siteMetadata 정보 파싱
// posts 디렉토리를 파싱해 mdx 파일의 정보를 추출
function fileParser(dir) {
    const fileList = [];
    const needVisit = fs
        .readdirSync(path.join(process.cwd(), dir), { withFileTypes: true })
        .map(fileInfo => ({ parentPath: '', fileInfo }));

    for (const file of needVisit) {
        if (file.fileInfo.isDirectory()) {
            const parentPath = file.parentPath || '';
            const subDirPath = `${parentPath}/${file.fileInfo.name}`;
            const subDir = fs
                .readdirSync(path.join(process.cwd(), `${dir}/${subDirPath}`), { withFileTypes: true })
                .map(fileInfo => ({ parentPath: subDirPath, fileInfo }));

            needVisit.push(...subDir);
        } else {
            const [name, extention] = file.fileInfo.name.split('.');

            fileList.push({
                base: file.fileInfo.name,
                name: name,
                extention: extention,
                basePath: dir,
                relativePath: file.parentPath ? `${dir}/${file.parentPath}` : dir,
                absolutePath: file.parentPath,
            });
        }
    }

    return fileList;
}

export default fileParser;
