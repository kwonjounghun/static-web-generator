import createElement from "../helpers/createElement.mjs";

function Detail(props) {
    return createElement('main', null,
        createElement('div', null, props.html)
    );
}

export default Detail;