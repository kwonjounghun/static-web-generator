import createElement from "../helpers/createElement.mjs";
import Nav from "../components/Nav.mjs";

function List(props) {
    return createElement('main', null,
        Nav(),
        createElement(
            'ul',
            null,
            [1, 2, 3, 4, 5, 6].map(item => createElement('li', null, item)),
        )
    );
}

export default List;