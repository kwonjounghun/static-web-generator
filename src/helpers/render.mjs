const render = (component) => {
    window.requestAnimationFrame(() => {
        const main = document.querySelector('.root');

        main.innerHTML = '';
        main.appendChild(component);
    })
}

export default render;
