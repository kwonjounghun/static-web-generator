import getEnvironment from './getEnvironment.mjs';

function createElementForNode(tagName, props, children) {
    const attributes = (props === null || props === undefined) ? '' : Object.keys(props).map((key) => `${key}="${props[key]}"`).join(' ');
    const tagAndAttrs = [tagName, attributes].filter(Boolean).join(' ');
    const result = `<${tagAndAttrs}>${children ? children.join('') : ''}</${tagName}>`;
    return result;
}

function createElementForBrowser(tagName, props, children) {
    const tag = document.createElement(tagName);
    Array.from(children).forEach(child => {
        let newChild = child;

        if (typeof child === 'string' || typeof child === 'number') {
            newChild = document.createTextNode(child);
        }

        tag.appendChild(newChild);
    });
    if (props) {
        Object.keys(props).forEach(key => {
            if (key.indexOf('on') === 0) {
                tag.addEventListener(key.replace('on', ''), props[key]);
            } else {
                tag.setAttribute(key, props[key]);
            }
        });
    }

    return tag;
}


function createElement(tagName, props, ...children) {
    const create = getEnvironment() === 'Node' ? createElementForNode : createElementForBrowser;
    return create(tagName, props, children.flat());
}

export default createElement;