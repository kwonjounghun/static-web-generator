import path from 'node:path';

async function pageComponentToHtmlString(pageDir, props) {
    const page = await import(path.join(process.cwd(), '/src/pages', pageDir));
    const content = page.default(props);

    return content;
}

export default pageComponentToHtmlString;
