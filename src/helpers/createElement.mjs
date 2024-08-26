import getEnvironment from './getEnvironment.mjs';

function createElementForNode(tagName, props, children) {
    const attributes = (props === null || props === undefined) ? '' : Object.keys(props).map((key) => `${key}=${props[key]}`).join(' ');
    const tagAndAttrs = [tagName, attributes].filter(Boolean).join(' ');
    const result = `<${tagAndAttrs}>${children ? children.join('') : ''}</${tagName}>`;
    return result;
}

function createElementForBrowser(tagName, props, children) {
    // 추후 구현
}


function createElement(tagName, props, ...children) {
    const create = getEnvironment() === 'Node' ? createElementForNode : createElementForBrowser;
    return create(tagName, props, children.flat());
}

export default createElement;