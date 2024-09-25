import createElement from "../helpers/createElement.mjs";

function Link(props) {
    const { href } = props;
    const routePushEvent = new CustomEvent("routepush");
    const handleClick = (e) => {
        e.preventDefault();
        history.pushState(null, null, href);
        window.dispatchEvent(routePushEvent);
    }

    return createElement('a', { onclick: handleClick, href }, href)
}

export default Link;
