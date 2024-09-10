import mdxParser from './parser/mdxParser.mjs';
import fileParser from './parser/fileParser.mjs';
import blogConfig from '../../blog.config.mjs';


class Initialize {
    static instance;
    constructor() {
        if (!Initialize.instance) {
            Initialize.instance = this;
        }

        return Initialize.instance;
    }

    async init() {
        const siteMetadata = blogConfig.siteMetadata;
        const allFile = fileParser('/src/pages');
        const allMdx = await mdxParser('/posts');

        this.data = {
            siteMetadata,
            allMdx,
            allFile,
        };
    }

    getData() {
        return this.data;
    }
}

export default Initialize;