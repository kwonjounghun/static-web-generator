import mdxParser from './parser/mdxParser.mjs';
import fileParser from './parser/fileParser.mjs';
import blogConfig from '../../blog.config.mjs';


async function initialize() {
    const { siteMetadata } = blogConfig
    const allFile = fileParser('/src/pages');
    const allMdx = await mdxParser('/posts');

    const data = {
        siteMetadata,
        allMdx,
        allFile,
    };

    return data;
}

export default initialize;