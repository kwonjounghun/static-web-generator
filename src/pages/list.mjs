import createElement from "../helpers/createElement.mjs";

function List(props) {
    console.log('list');
    return createElement('main', null,
        createElement('ul', null, [1, 2, 3, 4, 5, 6].map(item => createElement('li', null, item)))
    );
}

export default List;