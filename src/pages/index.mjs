import createElement from "../helpers/createElement.mjs";
import Nav from "../components/Nav.mjs";

function Index(props) {
    return createElement('main', null, Nav(), '메인 페이지');
}

export default Index;