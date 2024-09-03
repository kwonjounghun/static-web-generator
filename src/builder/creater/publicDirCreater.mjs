import fs from 'fs';
import path from 'node:path';

function publicDirCreater() {
    if (!fs.existsSync(path.join(process.cwd(), '/public'))) {
        fs.mkdirSync(path.join(process.cwd(), '/public'));
    }
}

export default publicDirCreater;