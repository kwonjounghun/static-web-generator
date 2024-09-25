import createElement from "../helpers/createElement.mjs";
import Link from "./Link.mjs";

function Nav(props) {
    const routePaths = ['/', '/list'];
    return createElement(
        'nav',
        null,
        createElement(
            'ul',
            null,
            routePaths.map(
                (path) => createElement(
                    'li',
                    null,
                    Link({ href: path })
                ),
            )
        ),
    )
}

export default Nav;
