import fs from 'node:fs';
import path from 'node:path';
import esprima from 'esprima';

function parseFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const ast = esprima.parseModule(content, { sourceType: 'module' });

    const dependencies = [];
    ast.body.forEach((node) => {
        if (node.type === 'ImportDeclaration') {
            dependencies.push(node.source.value);
        }
    });

    return { content, dependencies };
}

function resolveDependency(filePath, relativePath) {
    return path.resolve(path.dirname(filePath), relativePath).replace(`${process.cwd()}/`, '');
}

function transformModuleContent(content, modulePaths) {
    let transformedContent = content;

    modulePaths.forEach((modulePath) => {
        const moduleName = path.basename(modulePath, '.js');
        const regex = new RegExp(`import\\s+([\\s\\S]+?)\\s+from\\s+['"\`].*${moduleName}.*['"\`]`, 'g');
        transformedContent = transformedContent.replace(regex, `const $1 = require('${modulePath}')`);
    });

    transformedContent = transformedContent.replace(/export\s+default\s+/g, 'exports.default = ');

    return transformedContent;
}

function createDependencyGraph(entryPath) {
    const entryAbsolutePath = path.resolve(entryPath).replace(`${process.cwd()}/`, '');
    const graph = {};

    function visitModule(filePath) {
        if (graph[filePath]) {
            return;
        }

        const { content, dependencies } = parseFile(filePath);
        graph[filePath] = {
            filePath,
            content,
            dependencies: dependencies.map((dep) => resolveDependency(filePath, dep)),
        };

        dependencies.forEach((dep) => visitModule(resolveDependency(filePath, dep)));
    }

    visitModule(entryAbsolutePath);
    return graph;
}

function bundle(graph, entryPath) {
    let modules = '';

    for (const modulePath in graph) {
        const { content, dependencies } = graph[modulePath];
        const transformedContent = transformModuleContent(content, dependencies);
        const moduleWrapper = `
        '${modulePath}': function(module, exports, require) {
            ${transformedContent}
        },
        `;
        modules += moduleWrapper;
    }

    const result = `
    (function(modules) {
        const moduleCache = {};
        const require = moduleName => {

            if (moduleCache[moduleName]) {
            return moduleCache[moduleName];
            }
            const exports = {};
            moduleCache[moduleName] = exports;

            modules[moduleName](modules, exports, require);
            return moduleCache[moduleName];
        };

        require('${entryPath.replace(`${process.cwd()}/`, '')}');
    })({${modules}});
    `;

    return result;
}

function runBundler(entryPath, outputFilePath) {
    const graph = createDependencyGraph(entryPath);
    const bundleOutput = bundle(graph, entryPath);

    if (!fs.existsSync(path.join(process.cwd(), '/public/js'))) {
        fs.mkdirSync(path.join(process.cwd(), '/public/js'));
    }

    fs.writeFileSync(outputFilePath, bundleOutput, 'utf-8');
}

export default runBundler;
